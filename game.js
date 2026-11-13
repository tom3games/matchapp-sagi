// マチアプで本命を見抜け（slug は matchapp-sagi のまま）。時間は全部ゲームの時計（G.t）で進める。検証は MA.dbg.pause / step で台本どおりに動かす
window.__jsUp = true
;(function () {
  const $ = s => document.querySelector(s)
  const LIKES = 4, FIRST_WAIT = 180000, MEET_WAIT = 60000, D2_WAIT = 60000, GAP = 4000, MAX_UNREAD = 3
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
  const img = k => 'img/' + k + '.webp?v=3'
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
    const perm2 = {}; for (const g of list) if (g.date2) { const a = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } perm2[g.id] = a }
    const shuf = n => { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
    const porder = {}, sorder = {}
    for (const g of list) { const pi = shuf(PROBES.length).map(i => PROBES[i].id); porder[g.id] = ['hol', 'job'].filter(x => pi.includes(x)).concat(pi.filter(x => x !== 'hol' && x !== 'job')); if (rng() < .5) porder[g.id].splice(0, 2, porder[g.id][1], porder[g.id][0]); sorder[g.id] = shuf(SOCIAL.length) }
    const thread = {}; for (const g of list) { const th = (window.THREADS || {})[g.id]; if (th && th.length) thread[g.id] = Math.floor(rng() * th.length) }
    S = { seed, rare, perm2, porder, sorder, thread, sends: [], yesAt: {}, resched: 0, clash: null, rngT: rngOf((seed || 1) * 7 + 3), rngJ: rngOf((seed || 1) * 13 + 5), d2: {}, order: list, idx: 0, likesLeft: LIKES, battT: 0, phase: 'swipe', pred: {}, dec: {}, liked: [], chats: [], ci: 0, mi: 0, met: [], loupeN: 0, perm, tut: false, photo: 0, sheet: false, done: false }
  }
  // ---- 画面切り替え
  const VIEWS = ['vTitle', 'vSwipe', 'vMatch', 'vChat', 'vMeet', 'vEnding', 'vEnd']
  function show(v) { for (const id of VIEWS) $('#' + id).hidden = id !== v; S && (S.view = v) }
  // ---- 文言
  function texts() {
    const t = L()
    document.documentElement.lang = lang
    $('#tName').innerHTML = lang === 'ja' ? '<span>マチアプで</span><span>本命を</span><span>見抜け</span>' : '<span>Find Your</span><span>Match</span>'
    $('#tKick').textContent = lang === 'ja' ? '本性を探れ' : 'Read between the lines'
    $('#tSub').textContent = t.sub; $('#bStart').textContent = t.start; $('#bHow').textContent = t.how
    $('#bLang').textContent = lang === 'ja' ? 'EN' : 'JA'
    $('#bLoupe').textContent = t.loupe
    $('#bPass').textContent = t.pass; $('#bLike').textContent = t.like
    const ldt = $('#ldText'); if (ldt) ldt.textContent = t.loading
    $('#howH').textContent = t.howH; $('#howBody').innerHTML = t.howBody.map(s => '<p>' + s + '</p>').join(''); $('#howClose').textContent = t.close; $('#howCredit').textContent = t.credit
    $('#bSave').textContent = t.save; $('#bPost').textContent = t.post; $('#bAgain').textContent = t.again; $('#bTitle').textContent = t.toTitle
    $('#clueClose').textContent = t.close; $('#newMsg').textContent = t.newMsg; $('#bToChat').textContent = t.toChat; $('#bMtNext').textContent = t.next
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
    S.chats = S.liked.map(id => ({ th: (window.THREADS || {})[id] ? THREADS[id][S.thread[id]] : null, bi: 0, g: GIRLS.find(x => x.id === id), turn: 0, aff: 0, run: 0, asked: [], heard: [], memo: [], log: [], unread: 0, rushed: 0, state: 'wait', patLen: 0, left: false, offered: false, meet: null, invBlock: 0, deep: 0 }))
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
    // 最初の1通はこちらから送る
    S.chats.forEach(c => { c.state = 'first'; c.myT0 = G.t; c.patLen = FIRST_WAIT; c.patT = after(FIRST_WAIT, () => { if (c.state !== 'first') return; c.patLen = 0; push(c, 'sys', L().noFirst); done(c) }) })
    renderList()
  }
  // ================= トーク（同時進行・探りを入れる） =================
  // 状態: wait（相手の返事待ち）/ mine（こちらの番）/ offer（会うかの返事待ち）/ clash（日時がかぶった）/ sus（疑われた）/ done
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const spd = c => { const [a, b] = c.g.spd; return a + Math.floor(S.rngT() * (b - a)) }
  const idxOf = c => S.chats.indexOf(c)
  const byId = id => S.chats.find(c => c.g.id === id)
  const atari = g => g.type === 'atari'
  function herSend(c, text, then, d, clue, ctx) {
    c.state = 'wait'; c.typing = false
    // 本人「既読が早すぎる。ほんの少しランダムで遅らせて」: 読むまで +0.5〜1.5秒、打つ時間 +0〜0.5秒（届くまで計 +0.5〜2秒）。子ごとの速さの差はそのまま
    const rj = 500 + Math.floor(S.rngJ() * 1000), tj = Math.floor(S.rngJ() * 500)
    const ms = (d == null ? spd(c) : d) + rj + tj, lead = 1500 + tj
    const at = Math.max(G.t + ms, (S.lastDue || 0) + GAP); S.lastDue = at
    cancel(c.tyT); c.tyT = after(Math.max(0, at - G.t - lead), () => { c.typing = true; refresh(c) })
    const arrive = () => {
      if (S.phase !== 'chat') return
      // 一度に未読が増えすぎないよう、ほかの子の未読が多い間は待たせる
      const unread = S.chats.reduce((a, x) => a + (x === c || x.state === 'done' ? 0 : x.unread), 0)
      // こちらが返した後の返事は止めない（1人とじっくり話している時に止まらないように）。止めるのは最初の1通だけ
      // ただし、返せる子が1人もいない時は止めない（全員が止まって動かなくなるのを防ぐ）
      const busy = S.chats.some(x => x !== c && ['mine', 'offer', 'clash', 'first'].includes(x.state))
      if (S.open !== idxOf(c) && unread >= MAX_UNREAD && (S.lastSent !== c || c.unread >= 1) && busy) { c.dueT = after(3000, arrive); return }
      c.typing = false
      c.ctx = ctx || null
      push(c, 'her', text, clue)
      then && then()
    }
    cancel(c.dueT); c.dueT = after(at - G.t, arrive)
  }
  function push(c, who, text, clue) {
    const m = { who, text, n: (S.msgN = (S.msgN || 0) + 1) }
    if (clue) m.clue = 1
    c.log.push(m); if (c.log.length > 40) c.log.shift()
    if (who === 'her') { c.heard.push(m); c.arrivedAt = G.t; if (S.open !== idxOf(c)) { c.unread++; banner(c, text) } sfx('notif', { vol: 0.6 }) }
    if (who === 'me') {
      S.sends.push({ t: G.t, id: c.g.id }); S.lastSent = c
      for (const h of S.chats) if (h !== c && h.state === 'mine' && (TALK[h.g.id].mines || []).includes('others')) { h.otherN = (h.otherN || 0) + 1; if (h.otherN >= 3) after(1200, () => { if (h.state === 'mine') { push(h, 'her', L().sawOthers); block(h, L().whyOthers) } }) }
    }
    c.last = G.t
    refresh(c)
  }
  function myTurn(c) {
    if (c.state === 'done') return
    c.otherN = 0
    c.state = 'mine'; c.myT0 = G.t; c.patLen = c.g.pat * 1000
    cancel(c.patT); c.patT = after(c.patLen, () => timeoutC(c))
    refresh(c)
  }
  // こちらの3択: まだ聞いていない探り2つ＋ふつうの返し1つ（並びは種で決まる）
  // 3択は相手の直前の一言への返事として組む（質問なら全部その答え、つらい話・あいさつ・疲れた話は専用、ふつうの話は受けてつなぐ）
  const beatOf = c => c.th && c.th.beats[c.bi]
  function optsFor(c) {
    const b = beatOf(c)
    if (b) {
      const o = b.o.map(x => ({ k: x.s === 'probe' ? 'p' : 's', id: x.s, t: x.t, r: x.r, c: x.c, min: x.min || 0, beat: 1 }))
      const r = (c.bi * 7 + S.seed) % 3
      return [o[r % 3], o[(r + 1) % 3], o[(r + 2) % 3]]
    }
    const ctx = c.ctx || '', left = S.porder[c.g.id].filter(id => !c.asked.includes(id)), pid = left[0]
    const set = QA[ctx] || (GREET_LINES.includes(ctx) ? GREET : SAD_LINES.includes(ctx) ? SAD : null)
    let o
    if (set) {
      o = set.a.map(([st, ja, en]) => ({ k: 's', id: st, t: [ja, en] }))
      o.push(pid ? { k: 'p', id: pid, pre: set.p } : { k: 's', id: 'polite2', t: REPLY.polite2 })
    } else {
      const react = REACT_LINES.includes(ctx), pool = react ? REACT : REPLY
      o = pid ? [{ k: 'p', id: pid, pre: react ? REACT_BRIDGE : BRIDGE }] : []
      const tired = !react && TIRED_LINES.includes(ctx), used = new Set()
      if (tired) { o.push({ k: 's', id: 'empathy2', t: REPLY.empathy2 }); used.add('empathy') }
      const so = S.sorder[c.g.id]
      for (let si = c.turn * 2, n = 0; o.length < 3 && n < SOCIAL.length * 2; si++, n++) { const s = SOCIAL[so[si % SOCIAL.length]]; if (s.id === 'empathy2' || used.has(styleOf(s.id))) continue; used.add(styleOf(s.id)); o.push({ k: 's', id: s.id, t: pool[s.id] }) }
    }
    const r = (c.turn * 7 + S.seed) % 3
    return [o[r % 3], o[(r + 1) % 3], o[(r + 2) % 3]]
  }
  const optText = o => o.beat || o.k !== 'p' ? tx(o.t) : tx(o.pre || BRIDGE) + tx(PROBES.find(p => p.id === o.id).q)
  function choose(oi) {
    const c = S.chats[S.open]
    if (S.phase !== 'chat' || !c || c.state !== 'mine') return
    const o = optsFor(c)[oi]; if (!o) return
    cancel(c.patT); c.patLen = 0
    const g = c.g, tk = TALK[g.id]
    let pre = ''
    if (g.tooFast && G.t - c.arrivedAt < g.tooFast) { c.rushed++; c.aff--; if (c.rushed === 1 && g.fastLine) pre = tx(g.fastLine) }
    push(c, 'me', optText(o)); sfx('reply', { vol: 0.5 })
    let reply, clue = 0, instant = false, ctx = null
    if (o.beat) {
      // 筋の3択: 型で好感が動く。探りは時期が早いと引かれ、続けすぎても引かれる
      const st = o.id, v = st === 'probe' ? 0 : ((tk.like && tk.like[st]) || 0)
      if (st === 'probe') {
        c.run++
        if (!tk.eager && c.bi < o.min) { c.aff--; pre += lang === 'ja' ? 'え、いきなり？ ' : 'Whoa, already? ' }
        else if (!tk.eager && c.run >= 4) { c.aff--; pre += lang === 'ja' ? '質問ばっかりだね笑 ' : 'So many questions, lol. ' }
      } else { c.run = 0; c.aff += v }
      c.styles = c.styles || []; c.styles.push(st)
      if (tk.heavy && (st === 'polite' || st === 'empathy')) c.deep++
      if ((st === 'lewd' || st === 'doubt') && (tk.mines || []).includes(st)) { c.turn++; c.bi++; return herSend(c, tx(o.r), () => block(c, optText(o)), 1500) }
      if (st === 'praise' && g.id === 'i') instant = true
      reply = tx(o.r); clue = o.c ? 1 : 0
      c.bi++
    } else if (o.k === 'p') {
      const p = PROBES.find(x => x.id === o.id); c.asked.push(o.id); c.run++
      const a = tk.ans[o.id]; reply = tx(a); clue = a[2] ? 1 : 0; ctx = a[0]
      if (!tk.eager && c.turn < p.min) { c.aff--; pre += lang === 'ja' ? 'え、いきなり？ ' : 'Whoa, already? ' }
      else if (!tk.eager && c.run >= 4) { c.aff--; pre += lang === 'ja' ? '質問ばっかりだね笑 ' : 'So many questions, lol. ' }
    } else {
      // 刺さる返しは子ごとに違う
      const st = styleOf(o.id), v = (tk.like && tk.like[st]) || 0, s = { flatter: st === 'praise' }
      c.run = 0; c.aff += v; c.styles = c.styles || []; c.styles.push(st)
      if (tk.heavy && (st === 'polite' || st === 'empathy')) c.deep++
      const rr = tk.re && tk.re[st] ? tk.re[st] : (v < 0 ? tk.meh : tk.nice)[c.turn % 2]; reply = tx(rr); ctx = rr[0]
      if (s.flatter && g.id === 'i') instant = true
      if ((st === 'lewd' || st === 'doubt') && (tk.mines || []).includes(st)) { c.turn++; return herSend(c, tx(tk.meh[0]), () => block(c, optText(o)), 1500) }
    }
    c.turn++
    herSend(c, pre + reply, () => afterReply(c, instant), null, clue, ctx)
  }
  function afterReply(c, instant) {
    const g = c.g, tk = TALK[g.id]
    if (c.aff <= -3) { push(c, 'sys', L().fizzle); return done(c) }
    if (instant || (!tk.cautious && tk.inviteAt && c.turn >= tk.inviteAt && c.aff >= 0) || (tk.cautious && c.turn >= 8 && c.aff >= 2)) {
      return herSend(c, tx(tk.ask), () => offer(c), 1800, tk.ask[2])
    }
    if (c.th) {
      const nb = beatOf(c)
      if (!nb) { if (tk.cautious && c.aff >= 1) return herSend(c, tx(tk.ask), () => offer(c), 1800, tk.ask[2]); push(c, 'sys', L().fizzle); return done(c) }
      return herSend(c, tx(nb.her), () => myTurn(c), nb.pause ? 9000 : 1800)
    }
    if (c.turn >= 12) { push(c, 'sys', L().fizzle); return done(c) }
    myTurn(c)
  }
  function firstSend(k) {
    const c = S.chats[S.open]
    if (S.phase !== 'chat' || !c || c.state !== 'first') return
    cancel(c.patT); c.patLen = 0
    const tk = TALK[c.g.id], f = FIRST[k], v = tk.first[f.id]
    c.firstK = f.id; c.aff += Math.max(-1, v)
    push(c, 'me', tx(f.t)); sfx('reply', { vol: 0.5 })
    if (v <= -2) { c.state = 'wait'; after(spd(c) + 6000, () => { if (S.phase !== 'chat') return; push(c, 'sys', L().ignored); c.ignored = true; done(c) }); refresh(c); return }
    const re = tk.fre && tk.fre[f.id] ? tx(tk.fre[f.id]) : tx((v < 0 ? tk.meh : tk.nice)[0])
    if (tk.instantFirst === f.id) return herSend(c, re, () => offer(c))
    const b0 = beatOf(c)
    herSend(c, re, () => herSend(c, tx(b0 ? b0.her : tk.open), () => myTurn(c), 1800, 0, b0 ? null : tk.open[0]))
  }
  // 地雷を踏むとブロック
  function block(c, why) {
    if (c.state === 'done') return
    cancel(c.patT); cancel(c.dueT); cancel(c.tyT); c.patLen = 0; c.typing = false
    c.blocked = true; c.left = true; c.blockWhy = why
    push(c, 'block', L().blocked); sfx('angry')
    done(c)
  }
  function invite() {
    const c = S.chats[S.open]
    if (S.phase !== 'chat' || !c || c.state !== 'mine') return
    cancel(c.patT); c.patLen = 0
    const tk = TALK[c.g.id]
    push(c, 'me', tx(INVITE)); sfx('reply', { vol: 0.5 })
    c.turn++
    if (tk.cautious && (c.turn < 5 || c.aff < 1 || c.turn < c.invBlock)) {
      c.aff--; c.invBlock = c.turn + 2
      if (c.th) { c.bi++; return herSend(c, tx(tk.early), () => afterReply(c, false), null, 0, tk.early[0]) }
      return herSend(c, tx(tk.early), () => (c.turn >= 12 ? (push(c, 'sys', L().fizzle), done(c)) : myTurn(c)), null, 0, tk.early[0])
    }
    herSend(c, tx(tk.yes), () => offer(c), null, tk.yes[2])
  }
  function timeoutC(c) {
    if (S.phase !== 'chat' || c.state !== 'mine') return
    const g = c.g; c.patLen = 0; c.timeouts = (c.timeouts || 0) + 1
    if (g.angry) {
      push(c, 'her', tx(g.timeout))
      after(900, () => block(c, L().whyWait))
      return
    }
    push(c, 'her', L().timeoutQ); c.aff--; c.turn++
    if (c.th) { c.bi++; return after(1500, () => afterReply(c, false)) }
    if (c.turn >= 12) { push(c, 'sys', L().fizzle); return done(c) }
    herSend(c, tx(TALK[g.id].meh[1]), () => myTurn(c), null, 0, TALK[g.id].meh[1][0])
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
  const slotOf = c => c.moved ? 'moved-' + c.g.id : c.g.slot
  function decideMeet(c, v) {
    if (S.phase !== 'chat' || c.state !== 'offer') return
    cancel(c.patT); c.patLen = 0
    if (v) {
      // 日時がかぶったら、どちらかにリスケを頼むか、両方と会うか
      const y = S.chats.find(x => x !== c && x.meet === true && !x.clash && slotOf(x) === slotOf(c))
      if (y) { c.state = 'clash'; c.with = y; c.myT0 = G.t; c.patLen = MEET_WAIT; c.patT = after(MEET_WAIT, () => clashPick(c, 'both')); push(c, 'sys', L().clashQ(tx(y.g.name))); return }
    }
    c.decided = true; c.meet = v
    sfx('tap')
    if (v) { S.met.push(c.g.id); S.yesAt[c.g.id] = G.t }
    done(c)
  }
  function clashPick(c, how) {
    if (S.phase !== 'chat' || c.state !== 'clash') return
    cancel(c.patT); c.patLen = 0
    const y = c.with, t = L()
    if (how === 'both') {
      c.meet = true; c.decided = true; c.clash = y.g.id; y.clash = c.g.id; S.clash = [c.g.id, y.g.id]
      S.met.push(c.g.id); S.yesAt[c.g.id] = G.t
      return done(c)
    }
    const z = how === 'me' ? c : y
    S.resched++
    push(c, 'me', (z === c ? '' : t.toRs(tx(z.g.name))) + tx(RESCHED.ask))
    if (z.g.sus) {
      c.state = 'sus'; c.susOf = z
      herSend(c, (z === c ? '' : tx(z.g.name) + ': ') + tx(RESCHED.sus[z.g.id]), () => { c.state = 'sus'; c.myT0 = G.t; c.patLen = z.g.pat * 1000; c.patT = after(c.patLen, () => susPick(c, 2)); refresh(c) }, 1800)
      return
    }
    herSend(c, (z === c ? '' : tx(z.g.name) + ': ') + tx(RESCHED.ok), () => { z.moved = true; finishClash(c) }, 1800)
  }
  function susPick(c, k) {
    if (S.phase !== 'chat' || c.state !== 'sus') return
    cancel(c.patT); c.patLen = 0
    const z = c.susOf, o = RESCHED.o[k]
    push(c, 'me', tx(o.t))
    let res = o.res
    if (res === 'deep' && z.g.sus === 2) res = 'cut'
    herSend(c, (z === c ? '' : tx(z.g.name) + ': ') + tx(res === 'cut' ? RESCHED.o[2].r : o.r), () => {
      if (res === 'cut') {
        z.left = true; z.cut = true
        if (z.meet) { z.meet = false; S.met = S.met.filter(id => id !== z.g.id) }
        if (z === c) { c.decided = true; c.meet = false; return done(c) }
      } else { z.moved = true; if (res === 'deep') z.deep++ }
      finishClash(c)
    }, 1800)
  }
  function finishClash(c) { c.decided = true; c.meet = true; S.met.push(c.g.id); S.yesAt[c.g.id] = G.t; done(c) }
  function done(c) {
    c.state = 'done'; refresh(c)
    if (S.chats.every(x => x.state === 'done')) after(1500, () => { if (S.phase !== 'chat') return; if (S.met.length) startMeets(); else finish() })
  }
  // メモ: 相手の吹き出しを押すと残す
  function toggleMemo(n) {
    const c = S.chats[S.open]; if (!c) return
    const m = c.log.find(x => x.n === n); if (!m || m.who !== 'her') return
    m.memo = !m.memo; c.memo = c.log.filter(x => x.memo).map(x => x.text); sfx('tap'); renderRoom()
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
      return `<button class="crow${c.state === 'done' ? ' done' : ''}${c.blocked ? ' blk' : ''}" data-i="${i}"><img src="${img(c.g.photos[0])}" alt=""><div class="mid"><b>${esc(tx(c.g.name))}</b><span class="${c.typing ? 'ty' : ''}">${esc(c.blocked ? t.blocked : c.state === 'first' ? t.firstQ : pv)}</span></div><div class="side">${c.unread ? `<span class="badge">${c.unread}</span>` : ''}</div>${c.patLen ? '<i class="wait"></i>' : ''}</button>`
    }).join('')
    $('#clist').querySelectorAll('.crow').forEach(b => b.onclick = () => openRoom(+b.dataset.i))
    bars()
  }
  function openRoom(i) {
    S.open = i; S.stickOpen = -1; $('#newMsg').hidden = true; const c = S.chats[i], g = c.g
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
    const box = $('#msgs'), stick = S.stickOpen !== S.open || box.scrollTop + box.clientHeight >= box.scrollHeight - 30, prevTop = box.scrollTop, prevN = box.dataset.n | 0
    const fresh = S.stickOpen === S.open ? prevN : 1e9
    S.stickOpen = S.open
    $('#msgs').innerHTML = c.log.slice(-80).map(m => `<div class="msg ${m.who}${m.memo ? ' memo' : ''}${m.n > fresh ? ' fresh' : ''}" data-n="${m.n}">${esc(m.text)}</div>`).join('') + (c.typing ? '<div class="msg her typing"><i></i><i></i><i></i></div>' : '')
    $('#msgs').querySelectorAll('.msg.her[data-n]').forEach(e => e.onclick = () => toggleMemo(+e.dataset.n))
    const lastN = c.log.length ? c.log[c.log.length - 1].n : 0; box.dataset.n = lastN
    if (stick) { box.scrollTop = box.scrollHeight; requestAnimationFrame(() => { box.scrollTop = box.scrollHeight }); $('#newMsg').hidden = true } else { box.scrollTop = prevTop; if (lastN > prevN && c.log[c.log.length - 1].who === 'her') $('#newMsg').hidden = false }
    const op = $('#opts'), inv = $('#bInvite')
    inv.hidden = !(c.state === 'mine' && c.turn >= 1); inv.textContent = t.invite
    if (c.blocked) { op.innerHTML = `<div class="blocked">${t.blocked}</div>`; bars(); return }
    if (c.state === 'first') {
      op.innerHTML = `<div class="sys" style="font:700 13px var(--sans);text-align:center">${t.firstQ}</div>` + FIRST.map((f, i) => `<button data-f="${i}">${esc(tx(f.t))}</button>`).join('')
      op.querySelectorAll('button').forEach(b => b.onclick = () => firstSend(+b.dataset.f))
    } else if (c.state === 'mine') {
      op.innerHTML = optsFor(c).map((o, i) => `<button data-o="${i}">${esc(optText(o))}</button>`).join('')
      op.querySelectorAll('button').forEach(b => b.onclick = () => choose(+b.dataset.o))
    } else if (c.state === 'offer') {
      op.innerHTML = `<div class="sys" style="font:700 14px var(--sans);text-align:center;margin-top:4px">${esc(t.meetQ(tx(g.name)))}</div><div class="meet"><button class="no">${t.meetNo}</button><button class="yes">${t.meetYes}</button></div>`
      op.querySelector('.yes').onclick = () => meetChoice(true); op.querySelector('.no').onclick = () => meetChoice(false)
    } else if (c.state === 'clash') {
      const y = c.with
      op.innerHTML = [['other', t.rsTo(tx(y.g.name))], ['me', t.rsTo(tx(g.name))], ['both', t.both]].map(([k, s]) => `<button data-c="${k}">${esc(s)}</button>`).join('')
      op.querySelectorAll('button').forEach(b => b.onclick = () => clashPick(c, b.dataset.c))
    } else if (c.state === 'sus' && c.patLen) {
      op.innerHTML = RESCHED.o.map((o, i) => `<button data-s="${i}">${esc(tx(o.t))}</button>`).join('')
      op.querySelectorAll('button').forEach(b => b.onclick = () => susPick(c, +b.dataset.s))
    } else op.innerHTML = c.state === 'wait' || c.state === 'sus' ? `<div class="hint">${t.waitHint}</div>` : ''
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
  // トーク中にプロフとメモを見返す（開いている間は時計を止める）
  function openProf() {
    const c = S.chats[S.open]; if (!c) return
    const g = c.g, t = L(), l = t.lbl; S.profPh = 0; S.hold = true
    const draw = () => { $('#profImg').src = img(g.photos[S.profPh]); $('#profBars').innerHTML = g.photos.map((_, i) => `<i class="${i === S.profPh ? 'on' : ''}"></i>`).join('') }
    draw()
    $('#profImg').onclick = e => { const r = e.target.getBoundingClientRect(); S.profPh = (S.profPh + (e.clientX - r.left < r.width / 2 ? -1 : 1) + g.photos.length) % g.photos.length; draw() }
    const memo = c.memo.length ? `<div class="pm"><b>${t.memo}</b>${c.memo.map(m => '<span>' + esc(m) + '</span>').join('')}</div>` : ''
    $('#profInfo').innerHTML = `<b>${esc(tx(g.name))} ${t.profAge(g.age, g.h)}</b>${esc(tx(g.job))} / ${esc(tx(g.area))} / ${l.body} ${esc(tx(g.body))} / ${l.likes} ${g.likes.toLocaleString()}<div class="pt">${esc(tx(g.intro))}</div>${memo}`
    $('#profClose').textContent = t.close
    $('#prof').hidden = false; sfx('tap')
  }
  function closeProf() { $('#prof').hidden = true; S.hold = false; last = performance.now() }
  // ================= 待ち合わせ =================
  function startMeets() {
    S.phase = 'meet'; S.mi = 0
    // 修羅場の2人は1つの場面にまとめる
    if (S.clash) { const [x, y] = S.clash; S.met = S.met.filter(id => id !== x); S.clashAt = y }
    show('vMeet'); bed('bgm', null); bed('amb', 'snd/amb_street.mp3', 0.35); meetScene()
  }
  const meetT = () => { const t = L(); return $('#bMtNext') }
  function meetScene() {
    const g = GIRLS.find(x => x.id === S.met[S.mi]), t = L()
    const clash = S.clash && S.clashAt === g.id, other = clash && GIRLS.find(x => x.id === S.clash[0])
    $('#mtWhen').textContent = t.meetHead; $('#mtWho').textContent = tx(g.place)
    $('#mtProf').src = img(clash ? other.meet : g.photos[0]); $('#mtProfL').textContent = clash ? tx(other.name) : t.photoWas
    const r = $('#mtReal'); r.classList.remove('on'); r.src = img(g.meet); $('#mtRealL').textContent = t.realWas
    $('#mtBill').hidden = true; $('#mtVerdict').hidden = true; $('#mtText').textContent = ''; $('#mtOpts').hidden = true; $('#mtPat i').style.transform = 'scaleX(0)'
    const nb = $('#bMtNext'); nb.disabled = true; nb.style.opacity = .4; nb.hidden = false; nb.textContent = t.next
    const mine = S.mi
    after(900, () => { if (S.mi !== mine) return; r.classList.add('on') })
    after(2300, () => {
      if (S.mi !== mine) return
      const v = $('#mtVerdict')
      v.hidden = !clash; v.className = 'neutral'; v.textContent = clash ? t.clashTag : '' // 正体の札（手帳持参など）は出さない（本人 2026-11-13）
      $('#mtText').textContent = clash ? t.clashText(tx(other.name), tx(g.name)) : tx(g.end)
      sfx(clash || !atari(g) ? 'lose' : 'win')
      if (g.bill && !clash) {
        const b = $('#mtBill'); let tot = 0
        b.innerHTML = `<h4>${t.bill}</h4>` + g.bill.map(([n, y]) => { tot += y; return `<div><span>${esc(tx(n))}</span><span>¥${y.toLocaleString()}</span></div>` }).join('') + `<div class="tot"><span>${t.billTotal}</span><span>¥${tot.toLocaleString()}</span></div>`
        b.hidden = false; sfx('coin')
      }
      if (clash) { nb.disabled = false; nb.style.opacity = 1; S.mtT = after(14000, nextMeet); return }
      // 2回目も会うかは、どの子でも自分で決める
      nb.hidden = true
      const box = $('#mtOpts'); box.hidden = false
      box.innerHTML = `<button data-d="1">${esc(t.d2yes)}</button><button data-d="0">${esc(t.d2no)}</button>`
      box.querySelectorAll('button').forEach(b => b.onclick = () => d2Ask(+b.dataset.d === 1))
      S.d2q = true; S.d2Start = G.t; S.d2wait = true
      S.d2T = after(D2_WAIT, () => d2Ask(false))
    })
  }
  function d2Ask(yes) {
    if (S.phase !== 'meet' || !S.d2q) return
    S.d2q = false; S.d2wait = false; cancel(S.d2T)
    const g = GIRLS.find(x => x.id === S.met[S.mi])
    if (yes) return date2Scene(g)
    S.d2[g.id] = { no: true }
    $('#mtOpts').hidden = true
    const nb = $('#bMtNext'); nb.hidden = false; nb.disabled = false; nb.style.opacity = 1
    nextMeet()
  }
  function nextMeet() {
    if (S.phase !== 'meet' || $('#bMtNext').disabled || S.d2wait || S.d2q) return
    cancel(S.mtT)
    S.mi++; if (S.mi >= S.met.length) finish(); else meetScene()
  }
  function date2Scene(g) {
    const t = L(), d = g.date2
    $('#mtWhen').textContent = t.date2Head; $('#mtWho').textContent = tx(d.scene)
    $('#mtVerdict').hidden = true; $('#mtText').textContent = ''; $('#mtBill').hidden = true
    const nb = $('#bMtNext'); nb.hidden = true
    const box = $('#mtOpts'); box.hidden = false
    box.innerHTML = S.perm2[g.id].map(k => `<button data-k="${k}">${esc(tx(d.o[k].t))}</button>`).join('')
    box.querySelectorAll('button').forEach(b => b.onclick = () => choose2(+b.dataset.k))
    S.d2wait = true; S.d2Start = G.t
    S.d2T = after(D2_WAIT, () => choose2(-1))
  }
  function choose2(k) {
    if (S.phase !== 'meet' || !S.d2wait || S.d2q) return
    const g = GIRLS.find(x => x.id === S.met[S.mi]), d = g.date2, t = L()
    cancel(S.d2T); S.d2wait = false; $('#mtPat i').style.transform = 'scaleX(0)'
    const ok = k >= 0 && d.o[k].g > 0
    S.d2[g.id] = { k, ok }
    $('#mtOpts').hidden = true
    $('#mtText').textContent = (k >= 0 ? '「' + tx(d.o[k].r) + '」 ' : '') + tx(ok ? d.ok : d.ng)
    const v = $('#mtVerdict'); v.hidden = false; v.className = 'neutral'; v.textContent = t.date2Head
    sfx(ok ? 'win' : 'lose')
    const nb = $('#bMtNext'); nb.hidden = false; nb.textContent = t.next; nb.disabled = false; nb.style.opacity = 1
    S.mtT = after(14000, nextMeet)
  }
  // ================= 点・エンディング・結果 =================
  function score(st) {
    st = st || S
    let pts = 0, metGood = 0, metBad = 0, avoid = 0, d2ok = 0, d2n = 0
    const rows = st.order.filter(g => st.liked.includes(g.id)).map(g => {
      const hit = atari(g), c = st.chats.find(x => x.g.id === g.id), d = st.d2 && st.d2[g.id]
      let res = ''
      const met = st.met.includes(g.id) || (st.clash && st.clash.includes(g.id))
      if (st.clash && st.clash.includes(g.id)) { res = 'clash'; pts -= 15 }
      else if (met) {
        if (hit) { metGood++; pts += 40 } else { metBad++; pts -= 20 }
        res = 'met'
        if (d && !d.no) { d2n++; res = 'd2'; if (d.ok && (hit || g.type === 'sagi')) { d2ok++; pts += 30 } else if (!hit) pts -= 10 }
      } else if (c && !hit && c.meet === false) { avoid++; pts += 15; res = 'avoid' }
      else if (c && c.blocked) { res = 'blocked'; pts -= 10 }
      else if (c && c.left) res = 'left'
      else if (c) res = 'nomeet'
      return { g, hit, res, c }
    })
    // 結末の重み（誠実なら上がり、二股や重たい子の放置は下がる）
    const en = st.phase === 'swipe' ? null : ending(st).id
    pts += ({ best: 60, honest: 40, futamata: -40, stalk: -30, exposed: -20 })[en] || 0
    const rank = pts <= 0 ? 0 : pts < 40 ? 1 : pts < 80 ? 2 : pts < 140 ? 3 : 4
    return { pts, metGood, metBad, avoid, d2ok, d2n, rank, rows, met: metGood + metBad, end: en, blocked: st.chats.filter(c => c.blocked).length }
  }
  // エンディング（上から順に見て最初に合った1つ）
  function ending(st) {
    st = st || S
    const met = id => st.met.includes(id), d2 = id => st.d2[id] && !st.d2[id].no, d2ok = id => d2(id) && st.d2[id].ok
    const sendsAfter = id => st.sends.filter(s => s.id !== id && s.t > st.yesAt[id]).length
    const metIds = st.met.slice()
    const nm = id => tx(GIRLS.find(g => g.id === id).name)
    const heavy = ['e', 'f'].find(id => met(id) && (sendsAfter(id) >= 1 || metIds.length > 1 || d2(id) || (byIdS(st, id) || {}).deep))
    const at = metIds.find(id => atari(GIRLS.find(g => g.id === id)) && d2ok(id))
    let e, v = {}
    if (st.clash) { e = 'clash'; v = { a: nm(st.clash[1]), o: nm(st.clash[0]) } }
    else if (heavy) { e = 'stalk'; v = { h: nm(heavy) } }
    else if (st.resched >= 2 || (st.resched >= 1 && metIds.length >= 3)) e = 'exposed'
    else if (at && (metIds.length > 1 || sendsAfter(at) >= 2)) { e = 'futamata'; v = { a: nm(at), o: nm(metIds.find(id => id !== at) || st.sends.filter(s => s.id !== at && s.t > st.yesAt[at]).map(s => s.id)[0]) } }
    else if (at) { e = 'best'; v = { a: nm(at) } }
    else if (met('d') && d2ok('d')) { e = 'honest'; v = { d: nm('d') } }
    else if (met('j')) e = 'seminar'
    else if (met('k')) e = 'regular'
    else if (!metIds.length && st.chats.filter(c => c.blocked).length >= 2) e = 'blocks'
    else if (st.chats.some(c => c.g.id === 'h' && c.left)) e = 'silent'
    else if (!metIds.length) e = 'sleep'
    else e = 'again'
    return { id: e, v }
  }
  const byIdS = (st, id) => st.chats.find(c => c.g.id === id)
  function fill(s, v) { return s.replace(/\{(\w)\}/g, (_, k) => v[k] || '') }
  let seenEnds = []
  try { seenEnds = JSON.parse(localStorage.getItem('ms_ends') || '[]') } catch (e) {}
  function finish() {
    S.phase = 'end'; S.done = true; stopPat()
    const en = ending(); S.ending = en.id
    if (!seenEnds.includes(en.id)) { seenEnds.push(en.id); try { localStorage.setItem('ms_ends', JSON.stringify(seenEnds)) } catch (e) {} }
    showEnding(en)
    bed('amb', null); bed('bgm', 'snd/bgm.mp3', 0.25); sfx('rank')
    const r = score(); window.TM && TM.end(r.pts, r.rank >= 3)
  }
  function endPic(en) {
    const st = S, v = en.id, gi = id => GIRLS.find(g => g.id === id)
    const im = k => `<img src="${img(k)}" alt="">`
    if (v === 'clash') return { h: im(gi(st.clash[1]).meet) + im(gi(st.clash[0]).meet) }
    if (v === 'stalk') { const h = ['e', 'f'].find(id => st.met.includes(id)); return { h: im(gi(h).meet) + `<span class="ov n1">${lang === 'ja' ? '未読 127' : '127 unread'}</span><span class="ov n2">${lang === 'ja' ? '着信 14' : '14 calls'}</span><span class="ov n3">${lang === 'ja' ? '今どこ？' : 'Where are you?'}</span>` } }
    if (v === 'exposed') { const ids = st.met.slice(0, 2); return { h: ids.map(id => im(gi(id).photos[0])).join('') + `<span class="ov n1">${lang === 'ja' ? '予定いっぱいなんだね' : 'Busy, huh'}</span>`, cls: 'gray' } }
    if (v === 'futamata' || v === 'best') { const at = st.met.find(id => atari(gi(id))); return { h: im(gi(at).meet) + (v === 'futamata' ? `<span class="ov n1">${lang === 'ja' ? 'ブロックされました' : 'Blocked'}</span>` : '') , cls: v === 'futamata' ? 'gray' : '' } }
    if (v === 'honest') return { h: im('d2') + im('dm') }
    if (v === 'seminar') return { h: im('jm') }
    if (v === 'regular') return { h: im('km') + `<div class="scard"><b>${lang === 'ja' ? 'スタンプカード' : 'Stamp card'}</b>${'<i></i>'.repeat(10)}</div>` }
    if (v === 'silent') return { h: im('h1') + `<span class="ov n1 dim">${lang === 'ja' ? '通知 0' : '0 notifications'}</span>`, cls: 'gray' }
    if (v === 'sleep') return { h: `<div class="moon"><span>${lang === 'ja' ? 'このアプリを削除しました' : 'App deleted'}</span></div>` }
    return { h: st.met.slice(0, 2).map(id => im(gi(id).photos[0])).join(''), cls: 'gray' }
  }
  function showEnding(en) {
    const t = L(), E = ENDS.find(x => x.id === en.id), p = endPic(en)
    show('vEnding')
    $('#enKick').textContent = t.endHead; $('#enTitle').textContent = tx(E.title); $('#enText').textContent = fill(tx(E.text), en.v)
    const pic = $('#enPic'); pic.className = 'enPic ' + (p.cls || ''); pic.innerHTML = p.h
    $('#bToNote').textContent = t.toNote
  }
  function toNote() { show('vEnd'); renderEnd() }
  function tipLine(r) {
    const pick = r.rows.find(x => x.res === 'met' && !x.hit) || r.rows.find(x => x.res === 'avoid') || r.rows.find(x => !x.hit) || r.rows[0]
    return pick ? `${tx(pick.g.name)}: ${tx(pick.g.clues[0])}` : ''
  }
  function renderEnd() {
    const t = L(), r = score(), E = ENDS.find(x => x.id === S.ending)
    $('#eH').textContent = t.rTitle + (E ? ' / ' + tx(E.title) : '')
    $('#eScore').innerHTML = `${r.pts}<small>${t.rScore}</small>`
    $('#eRank').textContent = t.ranks[r.rank]
    $('#bEnds').textContent = t.endList(seenEnds.length, ENDS.length)
    $('#eSum').innerHTML = `<span>${t.rMet} ${r.met}</span><span>${t.rD2} ${r.d2n}</span><span>${t.rAvoid} ${r.avoid}</span><span class="bk">${t.rBlocked} ${r.blocked}</span>`
    const resL = { d2: lang === 'ja' ? '2回目' : '2nd date', met: lang === 'ja' ? '会った' : 'met', avoid: lang === 'ja' ? '断った' : 'declined', left: lang === 'ja' ? '解除された' : 'unmatched', nomeet: lang === 'ja' ? '会わず' : 'no date', clash: t.clashTag, blocked: t.blockedShort }
    $('#eList').innerHTML = r.rows.map((x, i) => `<button class="eRow" data-i="${i}"><img src="${img(x.g.photos[0])}" alt=""><span class="nm">${tx(x.g.name)}</span><span class="mt${x.res === 'blocked' ? ' bk' : ''}">${resL[x.res] || ''}</span></button>`).join('') || `<p class="eNone">${t.noMatch}</p>`
    $('#eList').querySelectorAll('.eRow').forEach(b => b.onclick = () => openClue(r.rows[+b.dataset.i].g))
    $('#eTip').textContent = tipLine(r)
  }
  function openClue(g) {
    const t = L(), c = S.chats.find(x => x.g.id === g.id)
    $('#cluePics').innerHTML = [g.photos[g.type === 'sagi' ? 1 : 0], g.meet].map(k => `<img src="${img(k)}" alt="">`).join('')
    $('#clueH').innerHTML = `${esc(tx(g.name))}`
    const heard = c ? c.heard.filter(m => m.clue) : []
    const hit = TALK[g.id].hit ? `<li class="hd">${lang === 'ja' ? 'この子に刺さったのは' : 'What worked on her'}</li><li class="q">${esc(tx(TALK[g.id].hit))}</li>` : ''
    const first = TALK[g.id].firstHit ? `<li class="hd">${lang === 'ja' ? '最初の1通' : 'The opener'}</li><li class="q">${esc(tx(TALK[g.id].firstHit))}</li>` : ''
    const mine = c && c.blocked ? `<li class="hd bk">${t.mineWas}</li><li class="q bk">「${esc(c.blockWhy)}」</li>` : ''
    $('#clueList').innerHTML = mine + g.clues.slice(0, 2).map(x => '<li>' + esc(tx(x)) + '</li>').join('') + first + hit + (heard.length ? `<li class="hd">${t.heard}</li>` + heard.slice(0, 3).map(m => '<li class="q">「' + esc(m.text) + '」' + (m.memo ? t.memoed : '') + '</li>').join('') : '')
    $('#clue').hidden = false; S.clueOpen = g.id
  }
  function openEnds() {
    const t = L()
    $('#endsH').textContent = t.endList(seenEnds.length, ENDS.length)
    $('#endsList').innerHTML = ENDS.map(E => seenEnds.includes(E.id) ? `<div><b>${esc(tx(E.title))}</b></div>` : `<div class="no"><b>？？？</b>${esc(tx(E.hint))}</div>`).join('')
    $('#endsClose').textContent = t.close
    $('#ends').hidden = false
  }
  // 結果の画像（1080x1350）
  function drawCover(ctx, im, x, y, w, h, py = 0.25) {
    if (!im || !im.naturalWidth) { ctx.fillStyle = '#ccc'; ctx.fillRect(x, y, w, h); return }
    const s = Math.max(w / im.naturalWidth, h / im.naturalHeight), sw = w / s, sh = h / s
    ctx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) * py, sw, sh, x, y, w, h)
  }
  async function makeCard() {
    const r = score(), t = L(), cv = $('#card'), ctx = cv.getContext('2d'), W = 1080, H = 1350
    const E = ENDS.find(x => x.id === (S.ending || 'sleep'))
    const pair = r.rows.find(x => x.res === 'met' && !x.hit) || r.rows.find(x => ['met', 'd2', 'clash'].includes(x.res))
    if (pair) await preload([pair.g.photos[0], pair.g.meet])
    await (document.fonts ? document.fonts.ready : Promise.resolve())
    ctx.fillStyle = '#fbf8f0'; ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#d9e2ec'; ctx.lineWidth = 2; for (let y = 70; y < H; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    ctx.strokeStyle = '#e8a7a2'; ctx.beginPath(); ctx.moveTo(70, 0); ctx.lineTo(70, H); ctx.stroke()
    ctx.fillStyle = '#1d2228'; ctx.font = '900 46px "Zen Kaku Gothic New",sans-serif'; ctx.fillText(t.title, 100, 100)
    ctx.fillStyle = '#c4302b'; ctx.font = '400 64px "Yuji Syuku",serif'; ctx.fillText(tx(E.title), 100, 190)
    ctx.fillStyle = '#1d2228'; ctx.font = '900 80px "Zen Kaku Gothic New",sans-serif'; ctx.fillText(String(r.pts), 100, 290)
    const sw = ctx.measureText(String(r.pts)).width; ctx.font = '700 36px "Zen Kaku Gothic New",sans-serif'; ctx.fillText(t.rScore + '  ' + t.ranks[r.rank], 116 + sw, 290)
    const py = 340, ph = 560, pw = 400
    if (pair) {
      ctx.save(); ctx.translate(120, py); ctx.rotate(-0.05); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 20; ctx.fillRect(-14, -14, pw + 28, ph + 80); ctx.shadowBlur = 0
      drawCover(ctx, cache[pair.g.photos[0]], 0, 0, pw, ph); ctx.fillStyle = '#1d2228'; ctx.font = '600 34px "Klee One",sans-serif'; ctx.fillText(t.photoWas, 10, ph + 50); ctx.restore()
      ctx.save(); ctx.translate(570, py + 10); ctx.rotate(0.04); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 20; ctx.fillRect(-14, -14, pw + 28, ph + 80); ctx.shadowBlur = 0
      drawCover(ctx, cache[pair.g.meet], 0, 0, pw, ph); ctx.fillStyle = '#1d2228'; ctx.font = '600 34px "Klee One",sans-serif'; ctx.fillText(t.realWas, 10, ph + 50); ctx.restore()
      ctx.fillStyle = '#8a3a2a'; ctx.font = '600 38px "Klee One",sans-serif'
      wrapText(ctx, `${tx(pair.g.name)}: ${tx(pair.g.clues[0])}`, 100, 1060, 900, 50)
    } else { ctx.fillStyle = '#6b7078'; ctx.font = '600 40px "Klee One",sans-serif'; wrapText(ctx, fill(tx(E.text), {}), 100, 520, 880, 60) }
    ctx.fillStyle = '#1d2228'; ctx.font = '600 34px "Klee One",sans-serif'
    ctx.fillText(`${t.rMet} ${r.met}   ${t.rD2} ${r.d2n}   ${t.rAvoid} ${r.avoid}`, 100, 1200)
    ctx.fillStyle = '#6b7078'; ctx.font = '500 30px "Zen Kaku Gothic New",sans-serif'; ctx.fillText('tom3games.com/play/matchapp-sagi/', 100, 1290)
    return cv
  }
  function wrapText(ctx, s, x, y, w, lh) { let line = ''; for (const ch of s) { if (ctx.measureText(line + ch).width > w) { ctx.fillText(line, x, y); y += lh; line = ch } else line += ch } ctx.fillText(line, x, y) }
  async function saveCard() {
    const cv = await makeCard(); window.TM && TM.share('save')
    cv.toBlob(b => { if (!b) return; const u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = 'matchapp-sagi.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000) }, 'image/png')
  }
  function postX() {
    const r = score(), t = L(), E = ENDS.find(x => x.id === (S.ending || 'sleep')); window.TM && TM.share('x')
    const u = 'https://x.com/intent/post?text=' + encodeURIComponent(t.postText(r.pts, t.ranks[r.rank], tx(E.title)) + '\n' + t.tags) + '&url=' + encodeURIComponent('https://tom3games.com/play/matchapp-sagi/')
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
    $('#bToNote').onclick = toNote; $('#bEnds').onclick = openEnds; $('#endsClose').onclick = () => { $('#ends').hidden = true }
    $('#bInvite').onclick = invite
    $('#bSave').onclick = saveCard; $('#bPost').onclick = postX
    $('#bAgain').onclick = () => { sfx('tap'); startGame() }
    $('#bTitle').onclick = () => { S.phase = 'title'; show('vTitle'); bed('bgm', null) }
    $('#rBack').onclick = closeRoom
    $('#newMsg').onclick = () => { const b = $('#msgs'); b.scrollTop = b.scrollHeight; $('#newMsg').hidden = true }
    $('#msgs').addEventListener('scroll', () => { const b = $('#msgs'); if (b.scrollTop + b.clientHeight >= b.scrollHeight - 30) $('#newMsg').hidden = true }, { passive: true })
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
    get S() { return S }, G, GIRLS, SOCIAL, PROBES, TALK, score: () => score(), lang: () => lang,
    dbg: { pause(v = true) { G.paused = v; last = performance.now() }, step(ms) { const n = Math.ceil(ms / 50); for (let i = 0; i < n; i++) advance(Math.min(50, ms - i * 50)) }, speed(x) { G.speed = x }, fizzleAll() { for (const c of S.chats) if (c.state !== 'done') { cancel(c.patT); cancel(c.dueT); cancel(c.tyT); c.patLen = 0; push(c, 'sys', L().fizzle); done(c) } } },
    act: { start: s => startGame(s), like: () => decide('like'), pass: () => decide('pass'), loupe: setLoupe, photo: setPhoto, choose, invite, first: firstSend, clash: k => clashPick(S.chats[S.open], k), sus: k => susPick(S.chats[S.open], k), memo: toggleMemo, d2ask: d2Ask, toNote, ending: () => ending(), seen: () => seenEnds.slice(), open: openRoom, back: closeRoom, prof: openProf, profClose: closeProf, meet: meetChoice, toChat, nextMeet, date2: i => { const g = GIRLS.find(x => x.id === S.met[S.mi]); choose2(S.perm2[g.id][i]) }, date2K: choose2, openClue, makeCard, endSwipe },
    view: () => S && S.view, opts: () => (S && S.open >= 0 && S.chats[S.open].state === 'mine' ? optsFor(S.chats[S.open]) : []), FIRST, mine: () => (S ? S.chats.map((c, i) => ({ i, id: c.g.id, state: c.state, since: G.t - (c.arrivedAt || 0), left: c.patLen ? c.patLen - (G.t - c.myT0) : null })) : []), d2opts: () => (S && S.d2wait ? [...document.querySelectorAll('#mtOpts button[data-k]')].map(b => +b.dataset.k) : []),
  }
  boot()
})()
