import './mute-auto.mjs'
// 全量の検証。node verify.mjs
import { MUTE_LAUNCH, muteContext } from './mute.mjs'
import { chromium, webkit } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { BOT } from './bots.mjs'
const ROOT = import.meta.dirname
mkdirSync(ROOT + '/shots', { recursive: true })
const PORT = +(process.env.VPORT || 7000 + Math.floor(Math.random() * 900))
const server = spawn(process.execPath, ['server.mjs'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) } })
for (let i = 0; i < 60; i++) { try { await fetch(`http://localhost:${PORT}/`); break } catch (e) { await new Promise(r => setTimeout(r, 100)) } }
const URL0 = `http://localhost:${PORT}/`
const HELP = `
window.__h = {
  to(seed, ids) { MA.act.start(seed); MA.dbg.pause(); for (let i = 0; i < 14 && MA.S.phase === 'swipe'; i++) { const g = MA.S.order[MA.S.idx]; if (ids.includes(g.id) && MA.S.likesLeft) MA.act.like(); else MA.act.pass(); if (MA.S.liked.length === ids.length && MA.S.phase === 'swipe') { MA.dbg.step(400); MA.act.endSwipe(); break } MA.dbg.step(400) } MA.act.toChat(); return MA.S.chats.map(c => c.g.id) },
  ci(id) { return MA.S.chats.findIndex(c => c.g.id === id) },
  wait(id, ms = 120000) { const i = this.ci(id); let n = 0; while (n < ms && !['mine', 'offer', 'done'].includes(MA.S.chats[i].state)) { MA.dbg.step(250); n += 250 } return MA.S.chats[i].state },
  reply(id, pick, gap = 4000) { const i = this.ci(id); const st = this.wait(id); if (st !== 'mine') return st; const c = MA.S.chats[i]; const since = MA.dbg && (MA.G.t - c.arrivedAt); if (since < gap) MA.dbg.step(gap - since); MA.act.open(i); const o = c.g.chat[c.r].o, b = MA.opts(); const k = pick === 'good' ? b.find(k => o[k].g > 0) ?? b[0] : pick === 'bad' ? b.find(k => o[k].g < 0) ?? b[0] : pick === 'instant' ? b.find(k => o[k].flag === 'instant') : typeof pick === 'number' ? b[pick] : b[0]; MA.act.chooseK(k); MA.act.back(); return 'sent' },
  play(id, pick, gap) { for (let n = 0; n < 6; n++) { const st = this.wait(id); if (st !== 'mine') return st; this.reply(id, pick, gap) } return this.wait(id) },
  meet(id, v) { const i = this.ci(id); MA.act.open(i); MA.act.meet(v); MA.act.back(); MA.dbg.step(2000) },
}`
let pass = 0, fail = 0
const results = []
async function t(name, fn) {
  try { const r = await fn(); if (r === false) throw new Error('false'); pass++; results.push(`ok   ${name}${r && r !== true ? '  ' + JSON.stringify(r) : ''}`) }
  catch (e) { fail++; results.push(`FAIL ${name}  ${e.message.split('\n')[0]}`) }
}
const expect = (c, msg) => { if (!c) throw new Error(msg) }
async function open(browser, opts = {}, q = '') {
  const ctx = await browser.newContext({ locale: 'ja-JP', viewport: { width: 390, height: 844 }, ...opts })
  await muteContext(ctx)
  await ctx.addInitScript(() => { try { localStorage.clear(); localStorage.setItem('ms_tut', '1') } catch (e) {} })
  const p = await ctx.newPage(); p.errs = []
  p.on('pageerror', e => p.errs.push('pageerror ' + e.message))
  p.on('console', m => { if (m.type() === 'error') p.errs.push('console ' + m.text()) })
  p.on('requestfailed', r => { if (!/fonts\.(googleapis|gstatic)|x\.com/.test(r.url())) p.errs.push('reqfail ' + r.url()) })
  await p.goto(URL0 + q); await p.waitForFunction(() => window.__msReady, null, { timeout: 15000 })
  await p.addScriptTag({ content: BOT }); await p.addScriptTag({ content: HELP })
  return p
}
const overflow = p => p.evaluate(() => {
  const W = document.documentElement.clientWidth, bad = []
  for (const el of document.querySelectorAll('main:not([hidden]) *, #clue:not([hidden]) *, #how:not([hidden]) *')) {
    if (el.closest('[hidden]') || (el.checkVisibility && !el.checkVisibility({ visibilityProperty: true }))) continue
    if (el.closest('.card.under,.tGrid,.tags,#loupe')) continue
    const r = el.getBoundingClientRect(); if (r.width && (r.right > W + 1 || r.left < -1)) bad.push((el.id || el.className || el.tagName) + ':' + Math.round(r.left) + '-' + Math.round(r.right))
  }
  return { sw: document.documentElement.scrollWidth, W, bad: bad.slice(0, 5) }
})
const fit = q => q.evaluate(() => {
  const H = innerHeight, de = document.documentElement, over = []
  if (de.scrollHeight > H + 1) over.push('page:' + de.scrollHeight)
  for (const el of document.querySelectorAll('main:not([hidden]) button,#clue:not([hidden]) button,#how:not([hidden]) button')) { if (!el.offsetParent) continue; const r = el.getBoundingClientRect(); if (r.bottom > H + 1 || r.top < -1) over.push((el.id || el.className) + ':' + Math.round(r.top) + '-' + Math.round(r.bottom)) }
  // 文字が箱からあふれていないか（説明・トークの選択肢・結果の行）
  for (const el of document.querySelectorAll('#how:not([hidden]) .box, #clue:not([hidden]) .box, #opts, .mtFoot, #eList')) { if (el.offsetParent && el.scrollHeight > el.clientHeight + 2) over.push('clip:' + (el.id || el.className) + ':' + el.scrollHeight + '>' + el.clientHeight) }
  return { H, over: over.slice(0, 6) }
})
const SIZES = [[360, 640, 'small'], [390, 844, 'phone'], [430, 932, 'big'], [375, 667, 'se'], [768, 1024, 'tab'], [1440, 900, 'pc']]

const browser = await chromium.launch(MUTE_LAUNCH)
const p = await open(browser)
await t('起動時にエラーが出ない', async () => { expect(p.errs.length === 0, p.errs.join('|')) })
await t('ブラウザの拡大が起きない（viewport・ピンチ・Ctrl+ホイール・Ctrl+プラス）', async () => {
  const r = await p.evaluate(() => {
    const vp = document.querySelector('meta[name=viewport]').content
    const g = new Event('gesturestart', { cancelable: true }); document.dispatchEvent(g)
    const w = new WheelEvent('wheel', { ctrlKey: true, deltaY: -10, bubbles: true, cancelable: true }); window.dispatchEvent(w)
    const k = new KeyboardEvent('keydown', { key: '+', ctrlKey: true, bubbles: true, cancelable: true }); window.dispatchEvent(k)
    return { vp, gesture: g.defaultPrevented, wheel: w.defaultPrevented, key: k.defaultPrevented, ta: getComputedStyle(document.documentElement).touchAction, us: getComputedStyle(document.body).userSelect }
  })
  expect(/user-scalable=no/.test(r.vp) && r.gesture && r.wheel && r.key && r.ta === 'manipulation' && r.us === 'none', JSON.stringify(r))
})
await t('OGP 一式がある', async () => {
  const r = await p.evaluate(() => ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'].map(k => !!document.querySelector(`meta[property="${k}"]`)).concat(!!document.querySelector('meta[name="twitter:card"]')))
  expect(r.every(Boolean), JSON.stringify(r))
})
await t('写真が全部ある（12人 × 写真＋会った時）', async () => {
  const r = await p.evaluate(async () => { const keys = MA.GIRLS.flatMap(g => [...g.photos, g.meet]); const bad = []; await Promise.all(keys.map(k => fetch('img/' + k + '.webp').then(x => { if (!x.ok) bad.push(k) }))); return { n: keys.length, bad } })
  expect(!r.bad.length, JSON.stringify(r)); return r.n
})
await t('本物の指: いいね・見送りが効く（予想のハンコは無い）', async () => {
  await p.click('#bStart'); await p.evaluate(() => MA.dbg.pause())
  const none = await p.evaluate(() => !document.querySelector('#bHit,#bMiss,.predRow,.stampMark'))
  await p.click('#bLike'); await p.evaluate(() => MA.dbg.step(400))
  await p.click('#bPass'); await p.evaluate(() => MA.dbg.step(400))
  const b = await p.evaluate(() => ({ idx: MA.S.idx, likes: MA.S.likesLeft, liked: MA.S.liked.length }))
  expect(none && b.idx === 2 && b.likes === 3 && b.liked === 1, JSON.stringify([none, b]))
})
await t('写真を左右タップで切り替え・指でスワイプして見送り', async () => {
  const box = await p.locator('#topCard .photo').boundingBox()
  await p.mouse.click(box.x + box.width * 0.8, box.y + box.height * 0.5)
  const ph = await p.evaluate(() => MA.S.photo)
  await p.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.5); await p.mouse.down(); await p.mouse.move(box.x + box.width * 0.6 - 160, box.y + box.height * 0.5, { steps: 6 }); await p.mouse.up()
  await p.evaluate(() => MA.dbg.step(400))
  const r = await p.evaluate(() => ({ idx: MA.S.idx, dec: MA.S.dec[MA.S.order[2].id] }))
  expect(ph === 1 && r.idx === 3 && r.dec === 'pass', JSON.stringify([ph, r]))
})
await t('虫めがね: 押している所が拡大されて出る', async () => {
  await p.click('#bLoupe')
  const box = await p.locator('#topCard .photo').boundingBox()
  await p.mouse.move(box.x + 100, box.y + 200); await p.mouse.down(); await p.mouse.move(box.x + 120, box.y + 210)
  const r = await p.evaluate(() => { const l = document.querySelector('#loupe'); return { d: getComputedStyle(l).display, bg: l.style.backgroundImage.includes('img/'), n: MA.S.loupeN, idx: MA.S.idx } })
  await p.mouse.up(); await p.click('#bLoupe')
  expect(r.d === 'block' && r.bg && r.n >= 1 && r.idx === 3, JSON.stringify(r))
})
await t('プロフ全文を開いて閉じる', async () => {
  await p.click('#topCard [data-sheet]'); const a = await p.evaluate(() => !!document.querySelector('#topCard .sheet'))
  await p.click('#topCard [data-close]'); const b = await p.evaluate(() => !!document.querySelector('#topCard .sheet'))
  expect(a && !b)
})
await t('全員見送り（何もしない）: 0点・最下位・結果に誰も出ない', async () => {
  const r = await p.evaluate(() => { const b = window.__bot('nothing', 3, 300); return { ...b, rows: document.querySelectorAll('.eRow').length, none: !!document.querySelector('.eNone') } })
  expect(r.phase === 'end' && r.pts === 0 && r.rank === 0 && r.rows === 0 && r.none, JSON.stringify(r)); return r
})
await t('同じ種なら同じ並びと同じ結果（3回）', async () => {
  const a = await p.evaluate(() => { const o = []; for (let i = 0; i < 3; i++) { const r = window.__bot('random', 11, 300); o.push(JSON.stringify(r) + MA.S.order.map(g => g.id).join('')) } return o })
  const b = await p.evaluate(() => { window.__bot('random', 12, 300); return MA.S.order.map(g => g.id).join('') })
  expect(a[0] === a[1] && a[1] === a[2] && !a[0].endsWith(b), JSON.stringify([a[0], b]))
})
await t('スワイプに時間制限が無い（10分放置しても進まない）・いいね4回で次へ', async () => {
  const r = await p.evaluate(() => { MA.act.start(8); MA.dbg.pause(); MA.dbg.step(600000); const a = { phase: MA.S.phase, idx: MA.S.idx, batt: !!document.querySelector('#batt') }; for (let i = 0; i < 4; i++) { MA.act.like(); MA.dbg.step(400) } return { a, phase: MA.S.phase, idx: MA.S.idx } })
  expect(r.a.phase === 'swipe' && r.a.idx === 0 && !r.a.batt && r.phase === 'match' && r.idx === 4, JSON.stringify(r))
})
// 補助（ページの中）: 指定した子だけいいねしてトークへ／返事が来るまで待つ／返す
await t('同時進行: 複数の子から返事がずれて届き、未読の数と通知が出る', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['a', 'd', 'i', 'j']); MA.dbg.step(20000); const at = MA.S.chats.map(c => c.arrivedAt).filter(Boolean).sort((a, b) => a - b); return { n: at.length, gaps: at.slice(1).map((x, i) => x - at[i]), badges: [...document.querySelectorAll('.crow .badge')].map(b => +b.textContent), rows: document.querySelectorAll('.crow').length } })
  await p.screenshot({ path: ROOT + '/shots/v-chatlist.png' })
  expect(r.n >= 3 && r.gaps.every(g => g >= 3999) && r.badges.length >= 2 && r.rows === 4, JSON.stringify(r)); return r
})
await t('返事はすぐ来ない（入力中→数秒後）・未読は一度に3件まで', async () => {
  const r = await p.evaluate(() => {
    __h.to(5, ['e', 'f', 'i', 'j']); MA.dbg.step(60000)
    const unread = MA.S.chats.reduce((a, c) => a + c.unread, 0)
    // 1人に返して、相手の返事が来るまでの時間を測る
    const i = __h.ci('a') >= 0 ? __h.ci('a') : 0, c = MA.S.chats[0]; MA.act.open(0); const t0 = MA.G.t; MA.act.choose(0); MA.act.back()
    let n = 0; const len = c.log.length; while (c.log.length < len + 1 + 1 && n < 30000) { MA.dbg.step(100); n += 100 }
    return { unread, waited: MA.G.t - t0 }
  })
  expect(r.unread <= 3 && r.waited >= 1200, JSON.stringify(r)); return r
})
await t('待ち時間切れ: 即キレの子は10秒でマッチ解除（自己紹介に「返信遅い人はムリ」）', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['h']); __h.wait('h'); MA.dbg.step(11000); const c = MA.S.chats[0]; return { left: c.left, pat: c.g.pat, intro: c.g.intro[0].includes('返信遅い人はムリ') } })
  await p.evaluate(() => MA.dbg.step(4000))
  const ph = await p.evaluate(() => MA.S.phase)
  expect(r.left && r.pat === 10 && r.intro && ph === 'end', JSON.stringify([r, ph]))
})
await t('ふつうの子は90秒待ってくれる・過ぎると「？」で次の話題へ', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['a']); __h.wait('a'); MA.dbg.step(60000); const mid = MA.S.chats[0].r; MA.dbg.step(31000); const c = MA.S.chats[0]; return { mid, r: c.r, left: c.left, q: c.log.some(m => m.text === '？') } })
  expect(r.mid === 0 && r.r === 1 && !r.left && r.q, JSON.stringify(r))
})
await t('返信が早すぎると引く子: すぐ返し続けると誘いが来ない・間をあけると会える', async () => {
  const fast = await p.evaluate(() => { __h.to(5, ['a']); const st = __h.play('a', 'good', 0); MA.dbg.step(4000); return { st, offered: MA.S.chats[0].offered, rushed: MA.S.chats[0].rushed, line: MA.S.chats[0].log.some(m => m.text.startsWith('返信はやい')) } })
  const slow = await p.evaluate(() => { __h.to(5, ['a']); const st = __h.play('a', 'good', 4000); return { st, offered: MA.S.chats[0].offered } })
  expect(!fast.offered && fast.rushed === 3 && fast.line && slow.st === 'offer' && slow.offered, JSON.stringify([fast, slow]))
})
await t('当たりは良い返しで会える・悪い返しだと誘いが来ない', async () => {
  const g = await p.evaluate(() => { __h.to(5, ['b']); return __h.play('b', 'good') })
  const b = await p.evaluate(() => { __h.to(5, ['b']); const st = __h.play('b', 'bad'); MA.dbg.step(3000); return { st, phase: MA.S.phase } })
  expect(g === 'offer' && b.st === 'done' && b.phase === 'end', JSON.stringify([g, b]))
})
await t('褒めると即「会お」: 誰にでも会う子', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['i']); __h.reply('i', 'instant'); return { st: __h.wait('i'), r: MA.S.chats[0].r } })
  expect(r.st === 'offer' && r.r === 0, JSON.stringify(r))
})
await t('会う・会わない: 写真詐欺の子は会うと別人・マイナス／断ると見抜いた点', async () => {
  const met = await p.evaluate(() => { __h.to(5, ['d']); __h.play('d', 0); __h.meet('d', true); MA.dbg.step(4000); return { view: MA.view(), real: document.querySelector('#mtReal').src.includes('dm.webp'), prof: document.querySelector('#mtProf').src.includes('d1.webp'), verdict: document.querySelector('#mtVerdict').textContent } })
  await p.screenshot({ path: ROOT + '/shots/v-meet-sagi.png' })
  const s1 = await p.evaluate(() => { MA.act.nextMeet(); MA.dbg.step(500); return MA.score() })
  const s2 = await p.evaluate(() => { __h.to(5, ['d']); __h.play('d', 0); __h.meet('d', false); return MA.score() })
  expect(met.view === 'vMeet' && met.real && met.prof && met.verdict === '写真詐欺' && s1.metBad === 1 && s1.pts === -20 && s2.avoid === 1 && s2.pts === 15, JSON.stringify([met, s1.pts, s2.pts]))
})
await t('会うかの返事をしないと「会わない」扱いにもならない（点も無い）', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['j']); const st = __h.play('j', 0); MA.dbg.step(65000); return { st, s: MA.score().pts, phase: MA.S.phase, meet: MA.S.chats[0].meet } })
  expect(r.st === 'offer' && r.s === 0 && r.phase === 'end' && r.meet === null, JSON.stringify(r))
})
await t('お店の営業: どの返事にも同じ温度・会うと伝票', async () => {
  const r = await p.evaluate(() => { const reps = MA.GIRLS.find(g => g.id === 'k').chat[0].o.map(o => o.r[0].slice(0, 5)); __h.to(5, ['k']); __h.play('k', 2); __h.meet('k', true); MA.dbg.step(4000); return { reps, bill: !document.querySelector('#mtBill').hidden, total: document.querySelector('#mtBill .tot').textContent } })
  await p.screenshot({ path: ROOT + '/shots/v-meet-concafe.png' })
  expect(new Set(r.reps).size === 1 && r.bill && /8,500/.test(r.total), JSON.stringify(r))
})
await t('トーク中に相手の顔を押すとプロフ（写真の切り替え）が開き、その間は待ち時間が減らない', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['h']); __h.wait('h'); MA.act.open(0); const c = MA.S.chats[0]; document.querySelector('#cAv').click(); const open = !document.querySelector('#prof').hidden; const a = MA.G.t; MA.dbg.step(30000); const held = MA.G.t - a; document.querySelector('#profImg').dispatchEvent(new MouseEvent('click', { clientX: innerWidth - 5, clientY: 200, bubbles: true })); const ph = MA.S.profPh; document.querySelector('#profClose').click(); return { open, held, ph, left: c.left, state: c.state } })
  await p.screenshot({ path: ROOT + '/shots/v-chatroom.png' })
  expect(r.open && r.held === 0 && r.ph === 1 && !r.left && r.state === 'mine', JSON.stringify(r))
})
await t('結果に出るのは、いいねした子だけ（見送った子は出ない）', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['d', 'k']); __h.play('d', 0); __h.play('k', 0); __h.meet('d', false); __h.meet('k', false); MA.dbg.step(3000); return { phase: MA.S.phase, names: [...document.querySelectorAll('.eRow .nm')].map(e => e.textContent) } })
  expect(r.phase === 'end' && r.names.length === 2 && r.names.includes('りな') && r.names.includes('ここな'), JSON.stringify(r))
})
// 当たりの子に良い返しで会う所まで進める
const meetAtari = async (id) => p.evaluate(id => { __h.to(5, [id]); __h.play(id, 'good'); __h.meet(id, true); MA.dbg.step(3000); const nb = document.querySelector('#bMtNext').textContent; MA.act.nextMeet(); MA.dbg.step(300); return { nb, d2: MA.d2opts().length, head: document.querySelector('#mtWhen').textContent } }, id)
await t('2回目のデート: 当たりに会うと場面が出て、良い返しで続く（+30）', async () => {
  const a = await meetAtari('a')
  await p.screenshot({ path: ROOT + '/shots/v-date2.png' })
  const r = await p.evaluate(() => { const o = MA.GIRLS.find(g => g.id === 'a').date2.o; MA.act.date2K(o.findIndex(x => x.g > 0)); MA.dbg.step(500); const v = document.querySelector('#mtVerdict').textContent; MA.act.nextMeet(); MA.dbg.step(500); const s = MA.score(); return { v, pts: s.pts, d2ok: s.d2ok, phase: MA.S.phase, row: document.querySelector('#eList').textContent.includes('続いた') } })
  expect(a.nb === '2回目のデートへ' && a.d2 === 3 && a.head === '2回目のデート' && r.v === '続いた' && r.d2ok === 1 && r.pts === 70 && r.phase === 'end' && r.row, JSON.stringify([a, r]))
})
await t('2回目のデート: 雑に扱うと切られる・待たせても切られる（+0）', async () => {
  await meetAtari('b')
  const r1 = await p.evaluate(() => { const o = MA.GIRLS.find(g => g.id === 'b').date2.o; MA.act.date2K(o.findIndex(x => x.g < 0)); MA.dbg.step(500); const v = document.querySelector('#mtVerdict').textContent; MA.act.nextMeet(); MA.dbg.step(500); return { v, pts: MA.score().pts, row: document.querySelector('#eList').textContent.includes('フラれた') } })
  await meetAtari('a')
  const r2 = await p.evaluate(() => { MA.dbg.step(61000); const v = document.querySelector('#mtVerdict').textContent; return { v, d2: MA.S.d2.a } })
  expect(r1.v === 'フラれた' && r1.pts === 40 && r1.row && r2.v === 'フラれた' && r2.d2 && r2.d2.ok === false, JSON.stringify([r1, r2]))
})
await t('昔の写真の子: 会うと5年後の本人・答え合わせに日付', async () => {
  await p.evaluate(() => { MA.act.nextMeet(); MA.dbg.step(500) })
  const r = await p.evaluate(() => { __h.to(5, ['l']); __h.play('l', 0); __h.meet('l', true); MA.dbg.step(3000); return { real: document.querySelector('#mtReal').src.includes('lm.webp'), v: document.querySelector('#mtVerdict').textContent, nb: document.querySelector('#bMtNext').textContent } })
  await p.screenshot({ path: ROOT + '/shots/v-meet-mukashi.png' })
  const c = await p.evaluate(() => { MA.act.nextMeet(); MA.dbg.step(500); MA.act.openClue(MA.GIRLS.find(g => g.id === 'l')); const t = document.querySelector('#clueList').textContent; document.querySelector('#clueClose').click(); return { t, pts: MA.score().pts } })
  expect(r.real && r.v === '昔の写真' && r.nb === '次へ' && /2021/.test(c.t) && c.pts === -20, JSON.stringify([r, c]))
})
await t('結果: 答え合わせが開く（写真詐欺は手首）', async () => {
  await p.evaluate(() => { __h.to(5, ['d']); __h.play('d', 0); __h.meet('d', true); MA.dbg.step(3000); MA.act.nextMeet(); MA.dbg.step(500) })
  await p.click('#eList .eRow >> nth=0')
  const r = await p.evaluate(() => ({ open: !document.querySelector('#clue').hidden, txt: document.querySelector('#clueList').textContent, pics: document.querySelectorAll('#cluePics img').length }))
  await p.screenshot({ path: ROOT + '/shots/v-clue.png' })
  await p.click('#clueClose')
  expect(r.open && /手首/.test(r.txt) && r.pics === 2, JSON.stringify(r))
})
await t('結果の画像が描ける（1080x1350・絵が入っている）', async () => {
  const r = await p.evaluate(async () => { const cv = await MA.act.makeCard(); const d = cv.getContext('2d').getImageData(0, 0, 1080, 1350).data; let s = 0, s2 = 0, n = 0; for (let i = 0; i < d.length; i += 4 * 97) { const v = d[i] * .3 + d[i + 1] * .59 + d[i + 2] * .11; s += v; s2 += v * v; n++ } return { w: cv.width, h: cv.height, v: Math.round(s2 / n - (s / n) ** 2) } })
  expect(r.w === 1080 && r.h === 1350 && r.v > 300, JSON.stringify(r)); return r
})
await t('Xでポストの URL（本文・ハッシュタグ・公開URL）', async () => {
  const u = await p.evaluate(() => { let got = ''; const o = window.open; window.open = x => { got = x }; document.querySelector('#bPost').click(); window.open = o; return got })
  expect(/^https:\/\/x\.com\/intent\/post\?text=/.test(u) && u.includes(encodeURIComponent('#マチアプ写真詐欺を見抜け')) && u.includes(encodeURIComponent('tom3games.com/play/matchapp-sagi/')), u)
})
await t('英語に切り替え: 画面の文字が英語になる', async () => {
  await p.click('#bLang')
  const r = await p.evaluate(() => ({ h: document.querySelector('#eH').textContent, b: document.querySelector('#bAgain').textContent, ja: /[ぁ-ん]/.test(document.querySelector('#eSum').textContent) }))
  await p.click('#bLang')
  expect(r.h === 'Debrief notebook' && r.b === 'Again' && !r.ja, JSON.stringify(r))
})
await t('音: 鳴らす操作は呼ばれている・実際には無音', async () => {
  const r = await p.evaluate(() => ({ calls: window.__soundCalls, mute: window.__muteOk() }))
  expect(r.calls > 5 && r.mute, JSON.stringify(r))
})
await t('ここまでエラー0', async () => { expect(p.errs.length === 0, p.errs.slice(0, 3).join('|')) })
await p.close()

// ---- 6サイズ × 全画面
for (const [w, h, name] of SIZES) {
  const q = await open(browser, { viewport: { width: w, height: h } })
  const views = {}
  const shot = async n => { await q.waitForTimeout(700); views[n] = await fit(q); views[n].o = await overflow(q); await q.screenshot({ path: `${ROOT}/shots/fit-${name}-${n}.png` }) }
  await shot('title')
  await q.click('#bHow'); await shot('how'); await q.click('#howClose')
  await q.evaluate(() => { MA.act.start(9); MA.dbg.pause() })
  await shot('swipe')
  await q.evaluate(() => { document.querySelector('#topCard [data-sheet]').click() }); await shot('sheet'); await q.evaluate(() => document.querySelector('#topCard [data-close]').click())
  await q.evaluate(() => { __h.to(9, ['a', 'k', 'l', 'b']); MA.dbg.step(0) })
  await q.evaluate(() => MA.dbg.step(25000))
  await shot('chatlist')
  await q.evaluate(() => { __h.wait('b'); MA.act.open(__h.ci('b')) })
  await shot('chat')
  await q.evaluate(() => document.querySelector('#cAv').click()); await shot('prof'); await q.evaluate(() => document.querySelector('#profClose').click())
  await q.evaluate(() => MA.act.back())
  // 選択肢は良い返しの中で一番長い文を選ぶ（折り返しが多くても収まるか）
  await q.evaluate(() => { for (let n = 0; n < 400 && MA.S.phase === 'chat'; n++) { const ready = MA.mine().filter(x => x.state === 'mine' || x.state === 'offer'); if (!ready.length) { MA.dbg.step(500); continue } const c = ready[0]; MA.dbg.step(3500); MA.act.open(c.i); if (MA.mine()[c.i].state === 'offer') { if (!window.__shotQ) { window.__shotQ = 1; return } MA.act.meet(true) } else { const ch = MA.S.chats[c.i], o = ch.g.chat[ch.r].o, b = MA.opts(); MA.act.chooseK(b.reduce((a, k) => (o[k].g > o[a].g || (o[k].g === o[a].g && o[k].t[0].length > o[a].t[0].length)) ? k : a, b[0])) } MA.act.back() } })
  await shot('meetq')
  await q.evaluate(() => { const c = MA.S.chats[MA.S.open]; MA.act.meet(true); MA.act.back(); for (let n = 0; n < 400 && MA.S.phase === 'chat'; n++) { const ready = MA.mine().filter(x => x.state === 'mine' || x.state === 'offer'); if (!ready.length) { MA.dbg.step(500); continue } const c = ready[0]; MA.dbg.step(3500); MA.act.open(c.i); if (MA.mine()[c.i].state === 'offer') MA.act.meet(true); else { const ch = MA.S.chats[c.i], o = ch.g.chat[ch.r].o, b = MA.opts(); MA.act.chooseK(b.reduce((a, k) => o[k].g > o[a].g ? k : a, b[0])) } MA.act.back() } MA.dbg.step(4000) })
  await shot('meet')
  for (let k = 0; k < 16; k++) {
    const st = await q.evaluate(() => { if (MA.S.phase !== 'meet') return 'done'; if (MA.d2opts().length) return 'd2'; return MA.S.met[MA.S.mi] })
    if (st === 'done') break
    if (st === 'd2') { if (!views.date2) await shot('date2'); await q.evaluate(() => { const b = MA.d2opts(), g = MA.GIRLS.find(x => x.id === MA.S.met[MA.S.mi]); MA.act.date2K(b.reduce((a, k) => g.date2.o[k].t[0].length > g.date2.o[a].t[0].length ? k : a, b[0])); MA.dbg.step(500) }); if (!views.date2res) await shot('date2res'); await q.evaluate(() => MA.act.nextMeet()); await q.evaluate(() => MA.dbg.step(4000)); continue }
    if (st === 'k' && !views['meet-bill']) await shot('meet-bill')
    await q.evaluate(() => { MA.act.nextMeet(); MA.dbg.step(4000) })
  }
  await shot('end')
  await q.evaluate(() => MA.act.openClue(MA.GIRLS.find(g => g.id === 'l'))); await shot('clue')
  for (const [v, r] of Object.entries(views)) await t(`一画面に収まる ${name} ${w}x${h} ${v}`, async () => { expect(!r.over.length && r.o.sw <= r.o.W && !r.o.bad.length, JSON.stringify(r)) })
  await t(`${name}: エラーなし`, async () => { expect(!q.errs.length, q.errs.join('|')) })
  await q.close()
}
// X のアプリ内: 下の操作が下52pxに入らない
{
  const q = await open(browser, { viewport: { width: 390, height: 844 } }, '?inapp=x')
  await q.evaluate(() => { MA.act.start(9); MA.dbg.pause() })
  const r = await q.evaluate(() => ({ like: document.querySelector('#bLike').getBoundingClientRect().bottom, H: innerHeight }))
  await t('X のアプリ内: いいねボタンが下52pxより上', async () => { expect(r.like <= r.H - 52, JSON.stringify(r)) })
  await q.close()
}
await browser.close()
// ---- WebKit（iPhone 相当）でタッチの通し
const wb = await webkit.launch(), wp = await open(wb, { isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await t('WebKit: 2本指の touchmove を止める', async () => {
  const r = await wp.evaluate(() => { const e = new Event('touchmove', { cancelable: true, bubbles: true }); Object.defineProperty(e, 'touches', { value: [{}, {}] }); document.body.dispatchEvent(e); return e.defaultPrevented })
  expect(r, r)
})
await t('WebKit: タップで始めて、いいねが効く', async () => {
  await wp.tap('#bStart'); await wp.evaluate(() => MA.dbg.pause())
  await wp.tap('#bLike'); await wp.evaluate(() => MA.dbg.step(400))
  const r = await wp.evaluate(() => ({ idx: MA.S.idx, liked: MA.S.liked.length }))
  expect(r.idx === 1 && r.liked === 1, JSON.stringify(r))
})
await t('WebKit: 通しで最後まで行ける（手がかり bot）', async () => {
  const r = await wp.evaluate(() => window.__bot('clue', 4, 300))
  await wp.screenshot({ path: ROOT + '/shots/webkit-end.png' })
  expect(r.phase === 'end' && r.pts > 80, JSON.stringify(r)); return r
})
await t('WebKit: 実際には無音', async () => { const r = await wp.evaluate(() => window.__muteOk()); expect(r, r) })
await t('WebKit: エラーなし', async () => { expect(wp.errs.length === 0, wp.errs.join('|')) })
await wb.close()
server.kill()
console.log(results.join('\n'))
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
