// マチアプ写真詐欺を見抜け。時間は全部ゲームの時計（G.t）で進める。検証は MA.dbg.pause / step で台本どおりに動かす
window.__jsUp = true
;(function () {
  const $ = s => document.querySelector(s)
  const LIKES = 4, MEET_WAIT = 60000, D2_WAIT = 60000, GAP = 4000, MAX_UNREAD = 3
  // ---- 言語
  let lang = 'ja'
  try { lang = localStorage.getItem('ms_lang') || ((navigator.language || 'ja').startsWith('ja') ? 'ja' : 'en') } catch (e) {}
  const L = () => T[lang], tx = a => (Array.isArray(a) ? a[lang === 'ja' ? 0 : 1] : a)
  // ---- 乱数（同じ種なら同じ並び）
  function rngOf(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
  const qSeed = +(new URLSearchParams(location.search).get('seed') || 0)
  // ---- ゲームの時計
  const G = { t: 0, timers: [], paused: false, speed: 1 }
  function after(ms, fn) { const o = { at: G.t + ms, fn }; G.timers.push(o); return o }
  function cancel(o) { if (o) o.dead = true }
  function advance(dt) {
    const end = G.t + dt
    for (;;) {
      let best = null
      for (const o of G.timers) if (!o.dead && o.at <= end && (!best || o.at < best.at)) best = o
      if (!best) break
      G.t = Math.max(G.t, best.at); best.dead = true; best.fn()
    }
    G.t = end; G.timers = G.timers.filter(o => !o.dead)
    frame()
  }
  let last = performance.now()
  function loop() {
    const now = performance.now(), dt = Math.min(250, now - last); last = now
    if (!G.paused) advance(dt * G.speed)
    requestAnimationFrame(loop)
  }
  // ---- 音
  Snd.def({ notif: ['snd/notif1.mp3', 'snd/notif2.mp3'], match: 'snd/match.mp3', reply: 'snd/reply.mp3', swipe: ['snd/swipe1.mp3', 'snd/swipe2.mp3', 'snd/swipe3.mp3'], stamp: 'snd/stamp.mp3', coin: 'snd/coin.mp3', win: 'snd/win.mp3', lose: 'snd/lose.mp3', rank: 'snd/rank.mp3', tap: 'snd/tap.mp3', angry: 'snd/angry.mp3', bell: 'snd/bell.mp3' })
  window.__soundCalls = 0
  const sfx = (n, o) => { window.__soundCalls++; try { Snd.play(n, o) } catch (e) {} }
  const bed = (k, u, v) => { try { Snd.loop(k, u, v) } catch (e) {} }
  let muted = false
  try { muted = localStorage.getItem('ms_mute') === '1' } catch (e) {}
  Snd.setMute(muted)
  document.addEventListener('pointerdown', () => { Snd.init() }, true)
  // ---- 画像
  const img = k => 'img/' + k + '.webp?v=2'
  const cache = {}
  function preload(keys, onEach) { return Promise.all(keys.map(k => new Promise(ok => { if (cache[k] && cache[k].complete) { onEach && onEach(); return ok() } const im = cache[k] = cache[k] || new Image(); im.onload = im.onerror = () => { onEach && onEach(); ok() }; im.src = img(k) }))) }
  // ---- 状態
  let S = null
  function newGame(seed) {
    const rng = rngOf(seed || ((Math.random() * 1e9) | 0))
    const rare = rng() < 0.3
    let list = GIRLS.filter(g => !g.rare && !(rare && g.id === 'f'))
    if (rare) list.push(GIRLS.find(g => g.rare))
    for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [list[i], list[j]] = [list[j], list[i]] }
    // 当たりが最初の1枚目に来ないようにする（チュートリアルで手がかりを覚える前に引かせない）
    const perm = {}
    for (const g of list) perm[g.id] = g.chat.map(() => { const a = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a })
    const perm2 = {}; for (const g of list) if (g.date2) { const a = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } perm2[g.id] = a }
    S = { seed, rare, perm2, rngT: rngOf((seed || 1) * 7 + 3), d2: {}, order: list, idx: 0, likesLeft: LIKES, battT: 0, phase: 'swipe', pred: {}, dec: {}, liked: [], chats: [], ci: 0, mi: 0, met: [], loupeN: 0, perm, tut: false, photo: 0, sheet: false, done: false }
  }
  // ---- 画面切り替え
  const VIEWS = ['vTitle', 'vSwipe', 'vMatch', 'vChat', 'vMeet', 'vEnd']
  function show(v) { for (const id of VIEWS) $('#' + id).hidden = id !== v; S && (S.view = v) }
  // ---- 文言
  function texts() {
    const t = L()
    document.documentElement.lang = lang
    $('#tName').innerHTML = lang === 'ja' ? '<span>マチアプ</span><span>写真詐欺を</span><span>見抜け</span>' : '<span>Dating App</span><span>Photo Fraud</span>'
    $('#tKick').textContent = lang === 'ja' ? '盛りを見抜く' : 'Spot the edits'
    $('#tSub').textContent = t.sub; $('#bStart').textContent = t.start; $('#bHow').textContent = t.how
    $('#bLang').textContent = lang === 'ja' ? 'EN' : 'JA'
    $('#bLoupe').textContent = t.loupe
    $('#bPass').textContent = t.pass; $('#bLike').textContent = t.like
    const ldt = $('#ldText'); if (ldt) ldt.textContent = t.loading
    $('#howH').textContent = t.howH; $('#howBody').innerHTML = t.howBody.map(s => '<p>' + s + '</p>').join(''); $('#howClose').textContent = t.close; $('#howCredit').textContent = t.credit
    $('#bSave').textContent = t.save; $('#bPost').textContent = t.post; $('#bAgain').textContent = t.again; $('#bTitle').textContent = t.toTitle
    $('#clueClose').textContent = t.close; $('#bToChat').textContent = t.toChat; $('#bMtNext').textContent = t.next
    if (S && S.view === 'vSwipe') { renderCards(); hud() }
    if (S && S.view === 'vEnd') renderEnd()
  }
  // ---- タイトル
  function titleGrid() { $('#tGrid').innerHTML = ['k1', 'a1', 'd1', 'j1', 'e1', 'i1', 'b1', 'h1', 'f1'].map(k => `<img src="${img(k)}" alt="">`).join('') }
  // ================= スワイプ =================
  const cur = () => S.order[S.idx]
  function hud() {
    const t = L()
    const ll = $('#likesLeft'); ll.textContent = t.likesLeft(S.likesLeft); ll.classList.toggle('zero', !S.likesLeft)
    const m = 41 + S.idx * 2; $('#clock').textContent = `23:${String(m).padStart(2, '0')}`
    $('#bLike').disabled = !S.likesLeft
  }
  function cardHTML(g, top) {
    const t = L(), ph = top ? S.photo : 0
    const bars = g.photos.map((_, i) => `<i class="${i === ph ? 'on' : ''}"></i>`).join('')
    return `<div class="photo"><img class="ph" src="${img(g.photos[ph])}" alt=""><div class="bars">${bars}</div><span class="likesN">${t.lbl.likes} ${g.likes.toLocaleString()}</span>
      <div class="decide l">${t.like}</div><div class="decide p">${t.pass}</div>
      <div class="nameBox"><b>${tx(g.name)}<small>${t.profAge(g.age, g.h)}</small></b><span>${tx(g.job)} / ${tx(g.area)} / ${t.lbl.body} ${tx(g.body)}</span></div></div>
      <div class="info"><div class="tags">${g.tags.map(x => '<i>' + tx(x) + '</i>').join('')}</div><button class="intro" data-sheet>${tx(g.intro)}</button></div>
      ${top && S.sheet ? sheetHTML(g) : ''}`
  }
  function sheetHTML(g) {
    const t = L(), l = t.lbl
    return `<div class="sheet"><h3>${tx(g.name)} ${t.profAge(g.age, g.h)}</h3><dl class="fields"><dt>${l.body}</dt><dd>${tx(g.body)}</dd><dt>${l.job}</dt><dd>${tx(g.job)}</dd><dt>${l.area}</dt><dd>${tx(g.area)}</dd><dt>${l.drink}</dt><dd>${tx(g.drink)}</dd><dt>${l.smoke}</dt><dd>${tx(g.smoke)}</dd><dt>${l.likes}</dt><dd>${g.likes.toLocaleString()}</dd></dl>
      <p>${tx(g.intro)}</p><div class="tags">${g.tags.map(x => '<i>' + tx(x) + '</i>').join('')}</div><button data-close>${t.close}</button></div>`
  }
  function renderCards() {
    const w = $('#cardWrap'), g = cur(), n = S.order[S.idx + 1]
    w.innerHTML = (n ? `<div class="card under">${cardHTML(n, false)}</div>` : '') + (g ? `<div class="card" id="topCard">${cardHTML(g, true)}</div>` : '')
    if (g) bindCard($('#topCard'))
  }
  function setPhoto(i) {
    const g = cur(); S.photo = (i + g.photos.length) % g.photos.length
    const c = $('#topCard'); c.querySelector('img.ph').src = img(g.photos[S.photo])
    c.querySelectorAll('.bars i').forEach((b, k) => b.classList.toggle('on', k === S.photo))
  }
  let loupeOn = false
  function bindCard(c) {
    const photo = c.querySelector('.photo')
    c.querySelector('[data-sheet]').onclick = () => { S.sheet = true; renderCards(); sfx('tap') }
    const cl = c.querySelector('[data-close]'); if (cl) cl.onclick = () => { S.sheet = false; renderCards() }
    let sx = 0, sy = 0, dx = 0, down = false
    photo.addEventListener('pointerdown', e => {
      if (S.phase !== 'swipe' || S.sheet) return
      down = true; sx = e.clientX; sy = e.clientY; dx = 0
      try { photo.setPointerCapture(e.pointerId) } catch (er) {}
      if (loupeOn) { loupeAt(e); S.loupeN++ } else c.classList.add('dragging')
    })
    photo.addEventListener('pointermove', e => {
      if (loupeOn) { if (down || e.pointerType === 'mouse') loupeAt(e); return }
      if (!down) return
      dx = e.clientX - sx
      c.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`
      c.querySelector('.decide.l').style.opacity = Math.max(0, Math.min(1, dx / 90))
      c.querySelector('.decide.p').style.opacity = Math.max(0, Math.min(1, -dx / 90))
    })
    const up = e => {
      if (!down) return; down = false
      if (loupeOn) { if (e.pointerType !== 'mouse') $('#loupe').style.display = 'none'; return }
      c.classList.remove('dragging')
      if (Math.abs(dx) > 90 && !(dx > 0 && !S.likesLeft)) { decide(dx > 0 ? 'like' : 'pass'); return }
      c.style.transform = ''; c.querySelectorAll('.decide').forEach(d => d.style.opacity = 0)
      if (dx > 90 && !S.likesLeft) toast(L().noLikes)
      if (Math.abs(dx) < 8 && Math.abs(e.clientY - sy) < 12) { const r = photo.getBoundingClientRect(); setPhoto(S.photo + (e.clientX - r.left < r.width / 2 ? -1 : 1)) }
    }
    photo.addEventListener('pointerup', up); photo.addEventListener('pointercancel', up)
    photo.addEventListener('pointerleave', e => { if (loupeOn && e.pointerType === 'mouse') $('#loupe').style.display = 'none' })
  }
  // 虫めがね: object-fit:cover で実際に描かれている範囲から計算する
  const ZOOM = 2.8
  function loupeAt(e) {
    const c = $('#topCard'); if (!c) return
    const im = c.querySelector('img.ph'), r = im.getBoundingClientRect(), nw = im.naturalWidth || 2, nh = im.naturalHeight || 3
    const s = Math.max(r.width / nw, r.height / nh), dw = nw * s, dh = nh * s, ox = (r.width - dw) * 0.5, oy = (r.height - dh) * 0.3
    const px = e.clientX - r.left - ox, py = e.clientY - r.top - oy, D = 156
    const lp = $('#loupe')
    lp.style.display = 'block'; lp.style.backgroundImage = `url("${im.src}")`
    lp.style.backgroundSize = `${dw * ZOOM}px ${dh * ZOOM}px`
    lp.style.backgroundPosition = `${-(px * ZOOM - D / 2)}px ${-(py * ZOOM - D / 2)}px`
    const lx = Math.min(innerWidth - D - 4, Math.max(4, e.clientX - D / 2)), ly = Math.max(4, e.clientY - D - 40)
    lp.style.left = lx + 'px'; lp.style.top = ly + 'px'
  }
  function setLoupe(on) { loupeOn = on; $('#bLoupe').classList.toggle('on', on); if (!on) $('#loupe').style.display = 'none' }
  function pred(v) {
    if (S.phase !== 'swipe' || !cur()) return
    const g = cur(); S.pred[g.id] = S.pred[g.id] === v ? undefined : v
    if (S.pred[g.id]) sfx('stamp')
    const keep = S.photo; renderCards(); S.photo = keep; hud()
  }
  function decide(kind) {
    if (S.phase !== 'swipe' || !cur() || S.busy) return
    if (kind === 'like' && !S.likesLeft) { toast(L().noLikes); return }
    const g = cur(); S.dec[g.id] = kind
    if (kind === 'like') { S.likesLeft--; S.liked.push(g.id) }
    sfx('swipe')
    const c = $('#topCard'); c.style.transform = ''; c.classList.remove('dragging'); c.classList.add(kind === 'like' ? 'outR' : 'outL')
    setLoupe(false); S.busy = true
    after(300, () => { S.busy = false; S.idx++; S.photo = 0; S.sheet = false; if (S.idx >= S.order.length || !S.likesLeft) endSwipe(); else { renderCards(); hud() } })
  }
  let toastT = null
  function toast(s) { const t = $('#toast'); t.textContent = s; t.classList.add('on'); cancel(toastT); toastT = after(1800, () => t.classList.remove('on')) }
  // チュートリアル（最初の1回だけ・自動で進む）
  function tutorial() {
    let seen = false; try { seen = localStorage.getItem('ms_tut') === '1' } catch (e) {}
    if (seen) return
    S.tut = true
    const tips = L().tut, tg = ['#topCard .photo', '#bLoupe', '#bLike']
    let i = 0
    const step = () => {
      document.querySelectorAll('.hl').forEach(e => e.classList.remove('hl'))
      const tip = $('#tip')
      if (i >= tips.length || S.phase !== 'swipe') { tip.hidden = true; S.tut = false; try { localStorage.setItem('ms_tut', '1') } catch (e) {} return }
      const el = $(tg[i]); if (el) el.classList.add('hl')
      tip.textContent = tips[i]; tip.hidden = false
      const pr = $('#vSwipe .phone').getBoundingClientRect(), r = el ? el.getBoundingClientRect() : pr
      if (i === 0) { tip.classList.add('down'); tip.style.top = (r.top - pr.top + 60) + 'px' } else { tip.classList.remove('down'); tip.style.top = (r.top - pr.top - 50) + 'px' }
      i++; after(2400, step)
    }
    step()
  }
  function startGame(seed) {
    newGame(seed || qSeed || 0); G.timers = []
    show('vSwipe'); setLoupe(false); renderCards(); hud(); tutorial()
    bed('bgm', 'snd/bgm.mp3', 0.32); bed('amb', null)
    window.TM && TM.start()
  }
  function endSwipe() {
    if (S.phase !== 'swipe') return
    S.phase = 'match'; setLoupe(false); $('#tip').hidden = true
    for (const g of S.order) if (!S.dec[g.id]) S.dec[g.id] = 'none'
    S.chats = S.liked.map(id => ({ g: GIRLS.find(x => x.id === id), good: 0, r: 0, ch: [], log: [], unread: 0, rushed: 0, state: 'wait', patLen: 0, left: false, offered: false, meet: null, timeouts: 0 }))
    if (!S.chats.length) { finish(); return }
    show('vMatch'); const t = L()
    $('#mH').textContent = t.matched
    $('#mFaces').innerHTML = S.chats.map((c, i) => `<img src="${img(c.g.photos[0])}" style="animation-delay:${i * 0.12}s" alt="">`).join('')
    $('#mP').textContent = ''
    sfx('match')
    S.mT = after(3200, toChat)
  }
  function toChat() {
    if (S.phase !== 'match') return; cancel(S.mT); S.phase = 'chat'; S.open = -1; show('vChat')
    const t = L(); $('#lH').textContent = t.chatH; $('#lSub').textContent = t.chatSub(S.chats.length)
    $('#room').classList.remove('on')
    // 最初の1通は、子ごとの返信の速さで届く
    S.chats.forEach(c => herSend(c, tx(c.g.chat[0].her), () => myTurn(c)))
    renderList()
  }
  // ================= トーク（同時進行） =================
  // 状態: wait（相手の返事待ち）/ mine（こちらの番）/ offer（会うかの返事待ち）/ done
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const spd = c => { const [a, b] = c.g.spd; return a + Math.floor(S.rngT() * (b - a)) }
  const idxOf = c => S.chats.indexOf(c)
  function herSend(c, text, then, d) {
    c.state = 'wait'; c.typing = false
    const ms = d == null ? spd(c) : d
    const at = Math.max(G.t + ms, (S.lastDue || 0) + GAP); S.lastDue = at
    cancel(c.tyT); c.tyT = after(Math.max(0, at - G.t - 1500), () => { c.typing = true; refresh(c) })
    const arrive = () => {
      if (S.phase !== 'chat') return
      // 一度に未読が増えすぎないよう、ほかの子の未読が多い間は少し待たせる
      const unread = S.chats.reduce((a, x) => a + (x === c ? 0 : x.unread), 0)
      if (S.open !== idxOf(c) && unread >= MAX_UNREAD) { c.dueT = after(3000, arrive); return }
      c.typing = false
      push(c, 'her', text)
      then && then()
    }
    cancel(c.dueT); c.dueT = after(at - G.t, arrive)
  }
  function push(c, who, text) {
    c.log.push({ who, text }); if (c.log.length > 30) c.log.shift()
    c.last = G.t
    if (who === 'her') {
      c.arrivedAt = G.t
      if (S.open !== idxOf(c)) { c.unread++; banner(c, text) }
      sfx('notif', { vol: 0.6 })
    }
    refresh(c)
  }
  function myTurn(c) {
    c.state = 'mine'; c.myT0 = G.t; c.patLen = c.g.pat * 1000
    cancel(c.patT); c.patT = after(c.patLen, () => timeoutC(c))
    refresh(c)
  }
  function choose(k) {
    const c = S.chats[S.open]
    if (S.phase !== 'chat' || !c || c.state !== 'mine') return
    cancel(c.patT); c.patLen = 0
    const g = c.g, o = g.chat[c.r].o[k]
    let rushed = false
    if (g.tooFast && G.t - c.arrivedAt < g.tooFast) { c.rushed++; rushed = true }
    c.ch.push(k); if (o.g > 0) c.good++
    push(c, 'me', tx(o.t)); sfx('reply', { vol: 0.5 })
    const pre = rushed && c.rushed === 1 && g.fastLine ? tx(g.fastLine) : ''
    herSend(c, pre + tx(o.r), () => {
      if (o.flag === 'instant') { c.instant = true; return offer(c) }
      c.r++
      if (c.r >= g.chat.length) after(900, () => wrapUp(c))
      else herSend(c, tx(g.chat[c.r].her), () => myTurn(c), 1800)
    })
  }
  function timeoutC(c) {
    if (S.phase !== 'chat' || c.state !== 'mine') return
    const g = c.g; c.patLen = 0; c.timeouts++; c.ch.push(-1)
    if (g.angry) {
      push(c, 'her', tx(g.timeout)); sfx('angry')
      after(900, () => { push(c, 'sys', L().left); c.left = true; done(c) })
      return
    }
    push(c, 'her', L().timeoutQ)
    c.r++
    if (c.r >= g.chat.length) after(900, () => wrapUp(c))
    else herSend(c, tx(g.chat[c.r].her), () => myTurn(c))
  }
  function wrapUp(c) {
    const g = c.g
    if (g.type === 'atari') {
      const lastK = c.ch[2], ok = lastK >= 0 && g.chat[2].o[lastK].g > 0
      if (!(ok && c.good - c.rushed >= 2)) { push(c, 'sys', L().declined); return done(c) }
    }
    offer(c)
  }
  function offer(c) {
    const t = L()
    c.offered = true; c.state = 'offer'
    push(c, 'place', t.meetHead + '  ' + tx(c.g.place))
    c.myT0 = G.t; c.patLen = MEET_WAIT
    cancel(c.patT); c.patT = after(MEET_WAIT, () => decideMeet(c, null))
    refresh(c)
  }
  function meetChoice(v) { const c = S.chats[S.open]; if (c) decideMeet(c, v) }
  function decideMeet(c, v) {
    if (S.phase !== 'chat' || c.state !== 'offer') return
    cancel(c.patT); c.patLen = 0; c.decided = true; c.meet = v
    sfx('tap')
    if (v) S.met.push(c.g.id)
    done(c)
  }
  function done(c) {
    c.state = 'done'; refresh(c)
    if (S.chats.every(x => x.state === 'done')) after(1500, () => { if (S.phase !== 'chat') return; if (S.met.length) startMeets(); else finish() })
  }
  // ---- 描画
  function refresh(c) { renderList(); if (S.open === idxOf(c)) renderRoom() }
  function renderList() {
    if (S.phase !== 'chat') return
    const t = L()
    const order = S.chats.map((c, i) => i).sort((a, b) => (S.chats[b].last || 0) - (S.chats[a].last || 0))
    $('#clist').innerHTML = order.map(i => {
      const c = S.chats[i], lastMsg = [...c.log].reverse().find(m => m.who !== 'sys') || { text: '' }
      const pv = c.typing ? t.typing + '…' : lastMsg.text
      return `<button class="crow${c.state === 'done' ? ' done' : ''}" data-i="${i}"><img src="${img(c.g.photos[0])}" alt=""><div class="mid"><b>${esc(tx(c.g.name))}</b><span class="${c.typing ? 'ty' : ''}">${esc(pv)}</span></div><div class="side">${c.unread ? `<span class="badge">${c.unread}</span>` : ''}</div>${c.patLen ? '<i class="wait"></i>' : ''}</button>`
    }).join('')
    $('#clist').querySelectorAll('.crow').forEach(b => b.onclick = () => openRoom(+b.dataset.i))
    bars()
  }
  function openRoom(i) {
    S.open = i; const c = S.chats[i], g = c.g
    c.unread = 0
    $('#cAv').src = img(g.photos[0]); $('#msgs').style.setProperty('--av', `url("${img(g.photos[0])}")`); $('#cName').textContent = tx(g.name); $('#cSub').textContent = `${g.age} / ${tx(g.job)}`
    $('#room').classList.add('on'); sfx('tap')
    renderRoom(); renderList()
  }
  function closeRoom() { S.open = -1; $('#room').classList.remove('on'); renderList() }
  function renderRoom() {
    const c = S.chats[S.open]; if (!c) return
    const t = L(), g = c.g
    c.unread = 0
    const tot = S.chats.reduce((a, x) => a + x.unread, 0); $('#rBadge').textContent = tot || ''
    $('#msgs').innerHTML = c.log.slice(-14).map(m => `<div class="msg ${m.who}">${esc(m.text)}</div>`).join('') + (c.typing ? '<div class="msg her typing"><i></i><i></i><i></i></div>' : '')
    const op = $('#opts')
    if (c.state === 'mine') {
      op.innerHTML = S.perm[g.id][c.r].map(k => `<button data-k="${k}">${esc(tx(g.chat[c.r].o[k].t))}</button>`).join('')
      op.querySelectorAll('button').forEach(b => b.onclick = () => choose(+b.dataset.k))
    } else if (c.state === 'offer') {
      op.innerHTML = `<div class="sys" style="font:700 14px var(--sans);text-align:center;margin-top:4px">${esc(t.meetQ(tx(g.name)))}</div><div class="meet"><button class="no">${t.meetNo}</button><button class="yes">${t.meetYes}</button></div>`
      op.querySelector('.yes').onclick = () => meetChoice(true); op.querySelector('.no').onclick = () => meetChoice(false)
    } else op.innerHTML = c.state === 'wait' ? `<div class="hint">${t.waitHint}</div>` : ''
    bars()
  }
  function bars() {
    if (!S || S.phase !== 'chat') return
    S.chats.forEach((c, i) => {
      const k = c.patLen ? Math.max(0, 1 - (G.t - c.myT0) / c.patLen) : 0
      const el = document.querySelector(`.crow[data-i="${i}"] .wait`); if (el) { el.style.width = '100%'; el.style.transform = `scaleX(${k})`; el.classList.toggle('hot', k < 0.35) }
      if (S.open === i) { const p = $('#pat'); p.firstChild.style.transform = `scaleX(${k})`; p.classList.toggle('hot', k < 0.35) }
    })
    if (S.open < 0) $('#pat i').style.transform = 'scaleX(0)'
  }
  let banT = null
  function banner(c, text) {
    const b = $('#banner'); b.querySelector('img').src = img(c.g.photos[0]); b.querySelector('b').textContent = tx(c.g.name); b.querySelector('span').textContent = text
    b.classList.add('on'); b.onclick = () => { b.classList.remove('on'); openRoom(idxOf(c)) }
    cancel(banT); banT = after(2200, () => b.classList.remove('on'))
  }
  function stopPat() {}
  // トーク中にプロフを見返す（開いている間は時計を止める）
  function openProf() {
    const c = S.chats[S.open]; if (!c) return
    const g = c.g, t = L(), l = t.lbl; S.profPh = 0; S.hold = true
    const draw = () => { $('#profImg').src = img(g.photos[S.profPh]); $('#profBars').innerHTML = g.photos.map((_, i) => `<i class="${i === S.profPh ? 'on' : ''}"></i>`).join('') }
    draw()
    $('#profImg').onclick = e => { const r = e.target.getBoundingClientRect(); S.profPh = (S.profPh + (e.clientX - r.left < r.width / 2 ? -1 : 1) + g.photos.length) % g.photos.length; draw() }
    $('#profInfo').innerHTML = `<b>${esc(tx(g.name))} ${t.profAge(g.age, g.h)}</b>${esc(tx(g.job))} / ${esc(tx(g.area))} / ${l.body} ${esc(tx(g.body))} / ${l.likes} ${g.likes.toLocaleString()}<div>${esc(tx(g.intro))}</div>`
    $('#profClose').textContent = t.close
    $('#prof').hidden = false; sfx('tap')
  }
  function closeProf() { $('#prof').hidden = true; S.hold = false; last = performance.now() }
  // ================= 待ち合わせ =================
  function startMeets() { S.phase = 'meet'; S.mi = 0; show('vMeet'); bed('bgm', null); bed('amb', 'snd/amb_street.mp3', 0.35); meetScene() }
  function meetScene() {
    const g = GIRLS.find(x => x.id === S.met[S.mi]), t = L()
    $('#mtWhen').textContent = t.meetHead; $('#mtWho').textContent = tx(g.place)
    $('#mtProf').src = img(g.photos[0]); $('#mtProfL').textContent = t.photoWas
    const r = $('#mtReal'); r.classList.remove('on'); r.src = img(g.meet); $('#mtRealL').textContent = t.realWas
    $('#mtBill').hidden = true; $('#mtVerdict').hidden = true; $('#mtText').textContent = ''; $('#mtOpts').hidden = true; $('#mtPat i').style.transform = 'scaleX(0)'
    const nb = $('#bMtNext'); nb.disabled = true; nb.style.opacity = .4; nb.hidden = false; nb.textContent = t.next
    const mine = S.mi
    after(900, () => { if (S.mi !== mine) return; r.classList.add('on') })
    after(2300, () => {
      if (S.mi !== mine) return
      const good = g.type === 'atari', v = $('#mtVerdict')
      v.hidden = false; v.className = good ? 'good' : 'bad'; v.textContent = tx(TYPES[g.type])
      $('#mtText').textContent = tx(g.end)
      sfx(good ? 'win' : 'lose')
      if (g.bill) {
        const b = $('#mtBill'); let tot = 0
        b.innerHTML = `<h4>${t.bill}</h4>` + g.bill.map(([n, y]) => { tot += y; return `<div><span>${esc(tx(n))}</span><span>¥${y.toLocaleString()}</span></div>` }).join('') + `<div class="tot"><span>${t.billTotal}</span><span>¥${tot.toLocaleString()}</span></div>`
        b.hidden = false; sfx('coin')
      }
      nb.disabled = false; nb.style.opacity = 1
      if (g.date2) nb.textContent = t.date2Go
      S.mtT = after(14000, nextMeet)
    })
  }
  function nextMeet() {
    if (S.phase !== 'meet' || $('#bMtNext').disabled || S.d2wait) return
    cancel(S.mtT)
    const g = GIRLS.find(x => x.id === S.met[S.mi])
    if (g.date2 && !(g.id in S.d2)) return date2Scene(g)
    S.mi++; if (S.mi >= S.met.length) finish(); else meetScene()
  }
  // 2回目のデート（当たりの子だけ）。3択で続くか切られるかが決まる
  function date2Scene(g) {
    const t = L(), d = g.date2
    $('#mtWhen').textContent = t.date2Head; $('#mtWho').textContent = tx(d.scene)
    $('#mtVerdict').hidden = true; $('#mtText').textContent = ''
    const nb = $('#bMtNext'); nb.hidden = true
    const box = $('#mtOpts'); box.hidden = false
    box.innerHTML = S.perm2[g.id].map(k => `<button data-k="${k}">${esc(tx(d.o[k].t))}</button>`).join('')
    box.querySelectorAll('button').forEach(b => b.onclick = () => choose2(+b.dataset.k))
    S.d2wait = true; S.d2Start = G.t
    S.d2T = after(D2_WAIT, () => choose2(-1))
  }
  function choose2(k) {
    if (S.phase !== 'meet' || !S.d2wait) return
    const g = GIRLS.find(x => x.id === S.met[S.mi]), d = g.date2, t = L()
    cancel(S.d2T); S.d2wait = false; $('#mtPat i').style.transform = 'scaleX(0)'
    const ok = k >= 0 && d.o[k].g > 0
    S.d2[g.id] = { k, ok }
    $('#mtOpts').hidden = true
    $('#mtText').textContent = (k >= 0 ? '「' + tx(d.o[k].r) + '」 ' : '') + tx(ok ? d.ok : d.ng)
    const v = $('#mtVerdict'); v.hidden = false; v.className = ok ? 'good' : 'bad'; v.textContent = ok ? t.d2ok : t.d2ng
    sfx(ok ? 'win' : 'lose')
    const nb = $('#bMtNext'); nb.hidden = false; nb.textContent = t.next; nb.disabled = false; nb.style.opacity = 1
    S.mtT = after(14000, nextMeet)
  }
  // ================= 採点と結果 =================
  function score(st) {
    st = st || S
    let pts = 0, metGood = 0, metBad = 0, avoid = 0, d2ok = 0
    // 結果に出すのは、いいねしてマッチした子だけ（見送った子の正体は出さない）
    const rows = st.order.filter(g => st.liked.includes(g.id)).map(g => {
      const hit = g.type === 'atari', dec = st.dec[g.id], c = st.chats.find(x => x.g.id === g.id)
      let met = st.met.includes(g.id), res = ''
      if (met) { if (hit) metGood++; else metBad++; res = 'met'; const d = st.d2 && st.d2[g.id]; if (d) { res = d.ok ? 'kept' : 'dumped'; if (d.ok) d2ok++ } }
      else if (c && !hit && c.meet === false) { avoid++; res = 'avoid' }
      else if (c && c.left) res = 'left'
      else if (c) res = 'nomeet'
      return { g, hit, dec, res }
    })
    pts = metGood * 40 + d2ok * 30 - metBad * 20 + avoid * 15
    const rank = pts <= 0 ? 0 : pts < 40 ? 1 : pts < 80 ? 2 : pts < 140 ? 3 : 4
    return { pts, metGood, metBad, avoid, d2ok, rank, rows }
  }
  function finish() {
    S.phase = 'end'; S.done = true; stopPat()
    show('vEnd'); renderEnd()
    bed('amb', null); bed('bgm', 'snd/bgm.mp3', 0.25); sfx('rank')
    const r = score(); window.TM && TM.end(r.pts, r.rank >= 3)
  }
  function tipLine(r) {
    const pick = r.rows.find(x => x.res === 'met' && !x.hit) || r.rows.find(x => x.res === 'avoid') || r.rows.find(x => !x.hit) || r.rows[0]
    return pick ? `${tx(pick.g.name)}: ${tx(pick.g.clues[0])}` : ''
  }
  function renderEnd() {
    const t = L(), r = score()
    $('#eH').textContent = t.rTitle
    $('#eScore').innerHTML = `${r.pts}<small>${t.rScore}</small>`
    $('#eRank').textContent = t.ranks[r.rank]
    $('#eSum').innerHTML = `<span>${t.rMet} ${r.metGood}</span><span>${t.rAvoid} ${r.avoid}</span><span>${t.rBad} ${r.metBad}</span><span>${t.rD2} ${r.d2ok}</span>`
    const resL = { kept: t.d2ok, dumped: t.d2ng, met: lang === 'ja' ? '会った' : 'met', avoid: lang === 'ja' ? '断った' : 'skip', left: lang === 'ja' ? '解除された' : 'unmatched', nomeet: lang === 'ja' ? '会わず' : 'no date' }
    $('#eList').innerHTML = r.rows.map((x, i) => `<button class="eRow" data-i="${i}"><img src="${img(x.g.photos[0])}" alt=""><span class="nm">${tx(x.g.name)}</span><span class="ty ${x.hit ? 'good' : 'bad'}">${tx(TYPES[x.g.type])}</span><span class="mt">${resL[x.res] || ''}</span></button>`).join('') || `<p class="eNone">${t.noMatch}</p>`
    $('#eList').querySelectorAll('.eRow').forEach(b => b.onclick = () => openClue(r.rows[+b.dataset.i].g))
    $('#eTip').textContent = tipLine(r)
  }
  function openClue(g) {
    const t = L()
    $('#cluePics').innerHTML = [g.photos[g.type === 'sagi' ? 1 : 0], g.meet].map(k => `<img src="${img(k)}" alt="">`).join('')
    $('#clueH').innerHTML = `${esc(tx(g.name))}<small>${esc(tx(TYPES[g.type]))}</small>`
    $('#clueList').innerHTML = g.clues.map(c => '<li>' + esc(tx(c)) + '</li>').join('')
    $('#clue').hidden = false; S.clueOpen = g.id
  }
  // 結果の画像（1080x1350）
  function drawCover(ctx, im, x, y, w, h, py = 0.25) {
    if (!im || !im.naturalWidth) { ctx.fillStyle = '#ccc'; ctx.fillRect(x, y, w, h); return }
    const s = Math.max(w / im.naturalWidth, h / im.naturalHeight), sw = w / s, sh = h / s
    ctx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) * py, sw, sh, x, y, w, h)
  }
  async function makeCard() {
    const r = score(), t = L(), cv = $('#card'), ctx = cv.getContext('2d'), W = 1080, H = 1350
    const pair = r.rows.find(x => x.res === 'met' && !x.hit) || r.rows.find(x => ['met', 'kept', 'dumped'].includes(x.res))
    if (pair) await preload([pair.g.photos[0], pair.g.meet])
    await (document.fonts ? document.fonts.ready : Promise.resolve())
    ctx.fillStyle = '#fbf8f0'; ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#d9e2ec'; ctx.lineWidth = 2; for (let y = 70; y < H; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    ctx.strokeStyle = '#e8a7a2'; ctx.beginPath(); ctx.moveTo(70, 0); ctx.lineTo(70, H); ctx.stroke()
    ctx.fillStyle = '#1d2228'; ctx.font = '900 54px "Zen Kaku Gothic New",sans-serif'; ctx.fillText(t.title, 100, 110)
    ctx.font = '900 120px "Zen Kaku Gothic New",sans-serif'; ctx.fillText(String(r.pts), 100, 250)
    const sw = ctx.measureText(String(r.pts)).width; ctx.font = '700 44px "Zen Kaku Gothic New",sans-serif'; ctx.fillText(t.rScore, 110 + sw, 250)
    // ハンコ
    ctx.save(); ctx.translate(880, 200); ctx.rotate(-0.2); ctx.strokeStyle = '#c4302b'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 120, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = '#c4302b'; ctx.font = '400 44px "Yuji Syuku",serif'; ctx.textAlign = 'center'
    const rk = t.ranks[r.rank]; const half = lang === 'ja' && rk.length > 5 ? [rk.slice(0, Math.ceil(rk.length / 2)), rk.slice(Math.ceil(rk.length / 2))] : [rk]
    if (lang !== 'ja') ctx.font = '400 30px "Yuji Syuku",serif'
    half.forEach((s, i) => ctx.fillText(s, 0, 14 + (i - (half.length - 1) / 2) * 52)); ctx.restore(); ctx.textAlign = 'left'
    // 写真と来た人
    const py = 330, ph = 560, pw = 400
    if (pair) {
    ctx.save(); ctx.translate(120, py); ctx.rotate(-0.05); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 20; ctx.fillRect(-14, -14, pw + 28, ph + 80); ctx.shadowBlur = 0
    drawCover(ctx, cache[pair.g.photos[0]], 0, 0, pw, ph); ctx.fillStyle = '#1d2228'; ctx.font = '600 34px "Klee One",sans-serif'; ctx.fillText(t.photoWas, 10, ph + 50); ctx.restore()
    ctx.save(); ctx.translate(570, py + 10); ctx.rotate(0.04); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 20; ctx.fillRect(-14, -14, pw + 28, ph + 80); ctx.shadowBlur = 0
    drawCover(ctx, cache[pair.g.meet], 0, 0, pw, ph); ctx.fillStyle = '#1d2228'; ctx.font = '600 34px "Klee One",sans-serif'; ctx.fillText(t.realWas, 10, ph + 50); ctx.restore()
    ctx.fillStyle = '#8a3a2a'; ctx.font = '600 38px "Klee One",sans-serif'
    wrapText(ctx, `${tx(pair.g.name)}: ${tx(pair.g.clues[0])}`, 100, 1050, 900, 50)
    } else { ctx.fillStyle = '#6b7078'; ctx.font = '600 44px "Klee One",sans-serif'; ctx.fillText(r.rows.length ? (lang === 'ja' ? '誰とも会わなかった' : 'No dates this time') : t.noMatch, 100, 620) }
    ctx.fillStyle = '#1d2228'; ctx.font = '600 34px "Klee One",sans-serif'
    ctx.fillText(`${t.rMet} ${r.metGood}   ${t.rAvoid} ${r.avoid}   ${t.rD2} ${r.d2ok}`, 100, 1190)
    ctx.fillStyle = '#6b7078'; ctx.font = '500 30px "Zen Kaku Gothic New",sans-serif'; ctx.fillText('tom3games.com/play/matchapp-sagi/', 100, 1290)
    return cv
  }
  function wrapText(ctx, s, x, y, w, lh) { let line = ''; for (const ch of s) { if (ctx.measureText(line + ch).width > w) { ctx.fillText(line, x, y); y += lh; line = ch } else line += ch } ctx.fillText(line, x, y) }
  async function saveCard() {
    const cv = await makeCard(); window.TM && TM.share('save')
    cv.toBlob(b => { if (!b) return; const u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = 'matchapp-sagi.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000) }, 'image/png')
  }
  function postX() {
    const r = score(), t = L(); window.TM && TM.share('x')
    const u = 'https://x.com/intent/post?text=' + encodeURIComponent(t.postText(r.pts, t.ranks[r.rank]) + '\n' + t.tags) + '&url=' + encodeURIComponent('https://tom3games.com/play/matchapp-sagi/')
    window.open(u, '_blank', 'noopener')
  }
  // ================= 描画の毎コマ =================
  function frame() {
    if (!S) return
    if (S.phase === 'swipe' && S.view === 'vSwipe' && !S.tut && !S.busy) {
    }
    if (S.d2wait) $('#mtPat i').style.transform = `scaleX(${Math.max(0, 1 - (G.t - S.d2Start) / D2_WAIT)})`
    if (S.phase === 'chat') bars()
  }
  // トーク中に相手のプロフを開いている間は、時計を止める（考える時間）
  const _adv = advance
  advance = function (dt) { if (S && S.hold) { frame(); return } _adv(dt) }
  // ================= 入力 =================
  function wire() {
    $('#bStart').onclick = () => { Snd.init(); sfx('tap'); startGame() }
    $('#bHow').onclick = () => { $('#how').hidden = false }
    $('#howClose').onclick = () => { $('#how').hidden = true }
    $('#bLang').onclick = () => { lang = lang === 'ja' ? 'en' : 'ja'; try { localStorage.setItem('ms_lang', lang) } catch (e) {} texts() }
    $('#bMute').onclick = () => { muted = !muted; Snd.setMute(muted); try { localStorage.setItem('ms_mute', muted ? '1' : '0') } catch (e) {} muteIcon() }
    $('#bLoupe').onclick = () => { setLoupe(!loupeOn); sfx('tap') }
    $('#bLike').onclick = () => decide('like'); $('#bPass').onclick = () => decide('pass')
    $('#bToChat').onclick = toChat
    $('#bMtNext').onclick = nextMeet
    $('#bSave').onclick = saveCard; $('#bPost').onclick = postX
    $('#bAgain').onclick = () => { sfx('tap'); startGame() }
    $('#bTitle').onclick = () => { S.phase = 'title'; show('vTitle'); bed('bgm', null) }
    $('#rBack').onclick = closeRoom
    $('#cAv').onclick = openProf; $('#cName').onclick = openProf; $('#profClose').onclick = closeProf
    $('#clueClose').onclick = () => { $('#clue').hidden = true; S.clueOpen = null }
    $('#clue').onclick = e => { if (e.target.id === 'clue') { $('#clue').hidden = true; S.clueOpen = null } }
  }
  function muteIcon() { $('#muteWave').style.display = muted ? 'none' : ''; $('#muteX').hidden = !muted; $('#corner').style.color = S && S.view !== 'vSwipe' && S.view !== 'vChat' && S.view !== 'vEnd' ? '#fff' : '' }
  const _show = show
  show = function (v) { _show(v); const dark = v === 'vTitle' || v === 'vMatch' || v === 'vMeet'; $('#corner').style.color = dark ? '#fff' : 'var(--ink)' }
  // ================= 起動 =================
  async function boot() {
    newGame(qSeed || 1); S.phase = 'title'
    wire(); texts(); muteIcon(); show('vTitle')
    const first = ['k1', 'a1', 'd1', 'j1', 'e1', 'i1', 'b1', 'h1', 'f1', 'c1', 'g1']
    let n = 0
    const bar = $('#loadBar i'), done = () => { n++; bar.style.width = (n / first.length * 100) + '%' }
    const cap = new Promise(ok => setTimeout(ok, 12000))
    await Promise.race([preload(first, done), cap])
    titleGrid()
    const ld = $('#loading'); ld.style.opacity = 0; setTimeout(() => ld.remove(), 400)
    requestAnimationFrame(loop)
    window.__msReady = true
    // 残りは裏で読む
    const rest = []; for (const g of GIRLS) { rest.push(...g.photos.slice(1), g.meet) }
    preload(rest)
  }
  // ---- 検証用の窓口
  window.MA = {
    get S() { return S }, G, GIRLS, score: () => score(), lang: () => lang,
    dbg: { pause(v = true) { G.paused = v; last = performance.now() }, step(ms) { const n = Math.ceil(ms / 50); for (let i = 0; i < n; i++) advance(Math.min(50, ms - i * 50)) }, speed(x) { G.speed = x } },
    act: { start: s => startGame(s), like: () => decide('like'), pass: () => decide('pass'), loupe: setLoupe, photo: setPhoto, choose: i => { const c = S.chats[S.open]; choose(S.perm[c.g.id][c.r][i]) }, chooseK: choose, open: openRoom, back: closeRoom, prof: openProf, profClose: closeProf, meet: meetChoice, toChat, nextMeet, date2: i => { const g = GIRLS.find(x => x.id === S.met[S.mi]); choose2(S.perm2[g.id][i]) }, date2K: choose2, openClue, makeCard, endSwipe },
    view: () => S && S.view, opts: () => [...document.querySelectorAll('#opts button[data-k]')].map(b => +b.dataset.k), mine: () => (S ? S.chats.map((c, i) => ({ i, id: c.g.id, state: c.state, since: G.t - (c.arrivedAt || 0), left: c.patLen ? c.patLen - (G.t - c.myT0) : null })) : []), d2opts: () => (S && S.d2wait ? [...document.querySelectorAll('#mtOpts button[data-k]')].map(b => +b.dataset.k) : []),
  }
  boot()
})()
