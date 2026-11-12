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
  to(seed, ids, order) { for (let k = 0; k < 40; k++) { MA.act.start(seed + k * 101); if (ids.every(id => MA.S.order.some(g => g.id === id))) break } MA.dbg.pause(); MA.dbg.pause(); for (let i = 0; i < 14 && MA.S.phase === 'swipe'; i++) { const g = MA.S.order[MA.S.idx]; if (ids.includes(g.id) && MA.S.likesLeft) MA.act.like(); else MA.act.pass(); if (MA.S.liked.length === ids.length && MA.S.phase === 'swipe') { MA.dbg.step(400); MA.act.endSwipe(); break } MA.dbg.step(400) } if (order) for (const k in order) MA.S.porder[k] = order[k]; MA.act.toChat(); if (!this.noFirst) this.firsts(); return MA.S.chats.map(c => c.g.id) },
  // 最初の1通: その子に一番刺さる型を送る
  firsts() { MA.S.chats.forEach((c, i) => { const f = MA.TALK[c.g.id].first; const k = MA.FIRST.reduce((a, x, j) => (f[x.id] > f[MA.FIRST[a].id] ? j : a), 0); MA.act.open(i); MA.act.first(k); MA.act.back() }) },
  ci(id) { return MA.S.chats.findIndex(c => c.g.id === id) },
  c(id) { return MA.S.chats[this.ci(id)] },
  // 待つ間、未読がたまった部屋は開いて読む（人も一覧を見て読む）
  wait(id, ms = 200000) { const c = this.c(id); let n = 0; while (n < ms && !['mine', 'offer', 'clash', 'done'].includes(c.state) && !(c.state === 'sus' && c.patLen)) { MA.dbg.step(250); n += 250; if (n % 5000 === 0) { const o = MA.S.open; MA.S.chats.forEach((x, i) => { if (x.unread) { MA.act.open(i); MA.act.back() } }); if (o >= 0) MA.act.open(o) } } return c.state },
  // pol: good（礼儀よく探る）/ social（ふつうの返しだけ）/ probe（探りだけ）/ bad / 数字（その番号の選択肢）
  say(id, pol = 'good', gap = 4000) {
    const c = this.c(id), st = this.wait(id); if (st !== 'mine') return st
    const since = MA.G.t - c.arrivedAt; if (since < gap) MA.dbg.step(gap - since)
    MA.act.open(this.ci(id)); const o = MA.opts()
    const bi = c.th ? c.bi : c.turn, like = MA.TALK[c.g.id].like || {}, lk = x => like[x.id.replace(/2$/, '')] || 0, mines = MA.TALK[c.g.id].mines || []
    const isP = x => x.k === 'p', polite = x => isP(x) && (x.min != null ? x.min : MA.PROBES.find(p => p.id === x.id).min) <= bi, sg = x => x.k === 's' && lk(x) > 0, sb = x => x.k === 's' && lk(x) < 0 && !mines.includes(x.id)
    let i = 0
    if (typeof pol === 'number') i = pol
    else if (pol === 'good') { i = o.findIndex(x => polite(x)); if (i < 0 || c.run >= 3) i = o.findIndex(sg); if (i < 0) i = o.findIndex(polite); if (i < 0) i = o.findIndex(x => !mines.includes(x.id) && x.id !== 'lewd'); if (i < 0) i = 0 }
    else if (pol === 'social') { i = o.findIndex(sg); if (i < 0) i = o.findIndex(polite); if (i < 0) i = o.findIndex(x => x.k === 's' && !mines.includes(x.id) && x.id !== 'lewd'); if (i < 0) i = 0 }
    else if (pol === 'probe') i = Math.max(0, o.findIndex(isP))
    else if (pol === 'bad') { i = o.findIndex(sb); if (i < 0) i = 0 }
    MA.act.choose(i); MA.act.back(); return 'sent'
  },
  talk(id, n, pol, gap) { for (let k = 0; k < n; k++) { const st = this.say(id, pol, gap); if (st !== 'sent') return st } return this.wait(id) },
  inv(id) { this.wait(id); MA.act.open(this.ci(id)); MA.act.invite(); MA.act.back(); return this.wait(id) },
  // 会う約束まで進める（慎重な子は5往復以上してから誘う）
  date(id) { const tk = MA.TALK[id]; for (let k = 0; k < 14; k++) { const st = this.wait(id); if (st !== 'mine') return st; const c = this.c(id); if (tk.cautious && c.turn >= 6 && c.aff >= 1 && c.turn >= c.invBlock) { this.inv(id); continue } this.say(id, tk.cautious && c.aff < 1 ? 'social' : 'good') } return this.wait(id) },
  meet(id, v) { MA.act.open(this.ci(id)); MA.act.meet(v); MA.act.back(); MA.dbg.step(2000) },
  // 待ち合わせの場面を最後まで（2回目: d2=true/false、good=2回目で良い返し）
  meets(d2 = false, good = true) { for (let k = 0; k < 40 && MA.S.phase === 'meet'; k++) { MA.dbg.step(3000); if (MA.S.d2q) { MA.act.d2ask(d2); continue } const d = MA.d2opts(); if (d.length) { const g = MA.GIRLS.find(x => x.id === MA.S.met[MA.S.mi]), o = g.date2.o; MA.act.date2K(d.find(x => good ? o[x].g > 0 : o[x].g < 0)); continue } MA.act.nextMeet() } MA.dbg.step(3000); return MA.S.ending },
  finish() { MA.dbg.step(5000); if (MA.S.phase === 'chat') MA.dbg.fizzleAll(); MA.dbg.step(3000); return MA.S.phase },
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
  expect(r.phase === 'end' && r.pts === 0 && r.rank === 0 && r.rows === 0 && r.none && r.end === 'sleep', JSON.stringify(r)); return r
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
  const r = await p.evaluate(() => { __h.to(5, ['a', 'd', 'i', 'j']); MA.dbg.step(20000); const at = MA.S.chats.map(c => c.arrivedAt).filter(Boolean).sort((a, b) => a - b); return { n: at.length, gaps: at.slice(1).map((x, i) => x - at[i]), badges: [...document.querySelectorAll('.crow .badge')].length, rows: document.querySelectorAll('.crow').length } })
  await p.screenshot({ path: ROOT + '/shots/v-chatlist.png' })
  expect(r.n >= 3 && r.gaps.every(g => g >= 3999) && r.badges >= 2 && r.rows === 4, JSON.stringify(r)); return r
})
await t('返事はすぐ来ない・未読は一度に4件まで', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['e', 'f', 'i', 'j']); MA.dbg.step(60000); const unread = MA.S.chats.reduce((a, c) => a + c.unread, 0); const ci = __h.ci('e'); MA.act.open(ci); for (let n = 0; n < 120 && MA.S.chats[ci].state !== 'mine'; n++) MA.dbg.step(500); MA.act.back(); const c = MA.S.chats[ci]; MA.dbg.step(4000); MA.act.open(ci); const t0 = MA.G.t, n0 = c.log.length; MA.act.choose(0); MA.act.back(); let n = 0; while (c.log.length < n0 + 2 && n < 30000) { MA.dbg.step(100); n += 100 } return { unread, waited: MA.G.t - t0 } })
  expect(r.unread <= 4 && r.waited >= 1200 && r.waited < 30000, JSON.stringify(r)); return r
})
await t('トークは長い: 慎重な子は5往復より前に誘うと断られ、6往復ほどで会える', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['a']); __h.talk('a', 2); const early = __h.inv('a'); const e = { st: early, aff: __h.c('a').aff, txt: __h.c('a').log.filter(m => m.who === 'her').map(m => m.text).join('|') }; const st = __h.date('a'); return { e, st, turn: __h.c('a').turn } })
  expect(r.e.st === 'mine' && /もう少し/.test(r.e.txt) && r.st === 'offer' && r.turn >= 6, JSON.stringify(r)); return r
})
await t('すぐ会いたがる子（業者）は3往復で向こうから誘ってくる', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['j']); const st = __h.talk('j', 3, 'social'); return { st, turn: __h.c('j').turn, ask: __h.c('j').log.some(m => /紹介したい/.test(m.text)) } })
  expect(r.st === 'offer' && r.turn === 3 && r.ask, JSON.stringify(r))
})
await t('探り: 時期が早い探りは「いきなり？」で引かれる', async () => {
  const r = await p.evaluate(() => {
    for (const id of ['a', 'b', 'c', 'e', 'l']) {
      __h.to(5, [id]); const c = __h.c(id); if (!c.th) continue
      const k = c.th.beats.findIndex((b, bi) => b.o.some(o => o.s === 'probe' && o.min > bi)); if (k < 0) continue
      for (let n = 0; n < k; n++) __h.say(id, 'social')
      if (__h.wait(id) !== 'mine' || c.bi !== k) continue
      MA.dbg.step(4000); MA.act.open(__h.ci(id)); const o = MA.opts(); const i = o.findIndex(x => x.k === 'p' && x.min > c.bi); const a0 = c.aff; MA.act.choose(i); MA.act.back(); MA.dbg.step(20000)
      const txt = c.log.filter(m => m.who === 'her').map(m => m.text).find(x => /いきなり/.test(x))
      return { id, k, d: c.aff - a0, txt }
    }
    return null
  })
  expect(r && r.d < 0 && r.txt, JSON.stringify(r)); return r
})
await t('ほころび: 探りを入れると、気になる一言が出る子と出ない子がいる', async () => {
  const r = await p.evaluate(() => { const o = {}; for (const id of ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']) { __h.to(5, [id]); __h.talk(id, 7, 'good'); o[id] = __h.c(id).heard.filter(m => m.clue).length } return o })
  const sus = ['d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'].filter(id => r[id] > 0).length
  expect(r.a === 0 && r.b === 0 && sus >= 8, JSON.stringify(r)); return r
})
await t('刺さる返しは子ごとに違う: ギャルに丁寧は「かたっ」、みのりに軽いノリは「慣れてる」、さきに丁寧は距離', async () => {
  const pick = (id, style) => p.evaluate(([id, style]) => { __h.to(5, [id]); const c = __h.c(id); for (let k = 0; k < 8; k++) { __h.wait(id); MA.dbg.step(4000); MA.act.open(__h.ci(id)); const o = MA.opts(); const i = o.findIndex(x => x.k === 's' && x.id.replace(/2$/, '') === style); if (i >= 0) { const a0 = c.aff; MA.act.choose(i); MA.act.back(); MA.dbg.step(20000); return { d: c.aff - a0, txt: c.log.filter(m => m.who === 'her').slice(-1)[0].text } } MA.act.choose(o.findIndex(x => x.k === 'p')); MA.act.back() } return null }, [id, style])
  const g = await pick('g', 'polite'), a = await pick('a', 'light'), b = await pick('b', 'polite'), gl = await pick('g', 'light')
  expect(g && g.d < 0 && a && a.d < 0 && b && b.d < 0 && gl && gl.d > 0, JSON.stringify({ g, a, b, gl })); return { g: g.d, a: a.d, b: b.d, gl: gl.d }
})
await t('待ち時間切れ: 即キレの子は10秒でマッチ解除（自己紹介に「返信遅い人はムリ」）', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['h']); __h.wait('h'); MA.dbg.step(11000); const c = __h.c('h'); return { left: c.left, pat: c.g.pat, intro: c.g.intro[0].includes('返信遅い人はムリ') } })
  const e = await p.evaluate(() => { MA.dbg.step(4000); return { phase: MA.S.phase, view: MA.view(), end: MA.S.ending } })
  await p.screenshot({ path: ROOT + '/shots/v-ending-silent.png' })
  expect(r.left && r.pat === 10 && r.intro && e.view === 'vEnding' && e.end === 'silent', JSON.stringify([r, e]))
})
await t('ふつうの子は90秒待ってくれる・過ぎると「？」', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['a']); __h.wait('a'); MA.dbg.step(60000); const mid = __h.c('a').turn; MA.dbg.step(31000); const c = __h.c('a'); return { mid, turn: c.turn, left: c.left, q: c.log.some(m => m.text === '？') } })
  expect(r.mid === 0 && r.turn === 1 && !r.left && r.q, JSON.stringify(r))
})
await t('返信が早すぎると引く子がいる（みのり）', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['a']); __h.talk('a', 3, 'social', 0); const c = __h.c('a'); return { rushed: c.rushed, line: c.log.some(m => m.text.startsWith('返信はやい')) } })
  expect(r.rushed === 3 && r.line, JSON.stringify(r))
})
await t('メモ: 吹き出しを押すと残り、プロフに出る', async () => {
  const r = await p.evaluate(() => {
    __h.to(5, ['d']); const c = __h.c('d'); __h.talk('d', 7, 'good'); MA.dbg.step(10000)
    const m = c.log.find(x => x.who === 'her' && x.clue) || c.log.filter(x => x.who === 'her').pop()
    MA.act.open(0); const el = document.querySelector(`#msgs .msg.her[data-n="${m.n}"]`); el.click()
    document.querySelector('#cAv').click(); const pm = document.querySelector('#prof .pm') ? document.querySelector('#prof .pm').textContent : ''; document.querySelector('#profClose').click()
    MA.act.back(); return { memo: c.memo.length, has: pm.includes(m.text.slice(0, 6)) }
  })
  await p.screenshot({ path: ROOT + '/shots/v-memo.png' })
  expect(r.memo === 1 && r.has, JSON.stringify(r))
})
await t('最初の1通: 子によって刺さり方が違う（慎重な子にチャラいは既読のまま、ギャルにお堅いは「かたっ」、誰にでも会う子はチャラいに即食いつく、重たい子にふざけは「真剣じゃないの？」）', async () => {
  const one = (id, k) => p.evaluate(([id, k]) => { __h.noFirst = 1; __h.to(5, [id]); __h.noFirst = 0; MA.act.open(0); const btns = document.querySelectorAll('#opts button[data-f]').length; MA.act.first(k); MA.act.back(); MA.dbg.step(30000); const c = __h.c(id); return { btns, ignored: !!c.ignored, her: c.log.filter(m => m.who === 'her').map(m => m.text)[0] || '', state: c.state } }, [id, k])
  const aStiff = await one('a', 0), aChara = await one('a', 1), gStiff = await one('g', 0), iChara = await one('i', 1), eFunny = await one('e', 2)
  await p.screenshot({ path: ROOT + '/shots/v-first.png' })
  expect(aStiff.btns === 3 && !aStiff.ignored && aChara.ignored && /かたっ/.test(gStiff.her) && iChara.state === 'offer' && /真剣じゃない/.test(eFunny.her), JSON.stringify({ aStiff, aChara, gStiff, iChara, eFunny }))
})
await t('ブロック: 地雷を踏むと赤い字で出て、その子には送れない（慎重な子に下心・写真の子に写真を疑う一言・即キレを待たせる・重たい子を待たせてほかの子と話す）', async () => {
  const mine = (id, st) => p.evaluate(([id, st]) => { __h.to(5, [id]); const c = __h.c(id); for (let n = 0; n < 12 && c.state !== 'done'; n++) { if (__h.wait(id) !== 'mine') break; MA.dbg.step(4000); MA.act.open(0); const o = MA.opts(); const i = o.findIndex(x => x.id === st); if (i >= 0) { MA.act.choose(i); MA.dbg.step(8000); break } MA.act.back(); __h.say(id, 'good') } MA.act.open(0); return { blocked: !!c.blocked, why: c.blockWhy, red: !!document.querySelector('#opts .blocked'), btns: document.querySelectorAll('#opts button').length, row: (() => { MA.act.back(); return !!document.querySelector('.crow.blk') })() } }, [id, st])
  const a = await mine('a', 'lewd'), d = await mine('d', 'doubt')
  await p.screenshot({ path: ROOT + '/shots/v-blocked.png' })
  const h = await p.evaluate(() => { __h.to(5, ['h']); __h.wait('h'); MA.dbg.step(12000); return { blocked: !!__h.c('h').blocked } })
  const e = await p.evaluate(() => { __h.to(5, ['e', 'g']); __h.wait('e'); for (let n = 0; n < 4; n++) __h.say('g', 'probe', 0); MA.dbg.step(3000); return { blocked: !!__h.c('e').blocked, why: __h.c('e').blockWhy } })
  expect(a.blocked && a.red && a.btns === 0 && a.row && d.blocked && h.blocked && e.blocked, JSON.stringify({ a, d, h, e }))
})
await t('トークは上下にスクロールして見返せる。見返し中に新着が来ても勝手に戻らず案内が出る', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['b', 'a']); __h.talk('b', 6, 'good'); __h.wait('b'); MA.act.open(__h.ci('b')); const m = document.querySelector('#msgs'); const can = m.scrollHeight > m.clientHeight; m.scrollTop = 0; m.dispatchEvent(new Event('scroll')); MA.act.choose(0); MA.dbg.step(30000); return { can, top: m.scrollTop, pill: !document.querySelector('#newMsg').hidden, ov: getComputedStyle(m).overflowY, ob: getComputedStyle(m).overscrollBehaviorY } })
  await p.screenshot({ path: ROOT + '/shots/v-scroll.png' })
  expect(r.can && r.top < 40 && r.pill && r.ov === 'auto' && r.ob === 'contain', JSON.stringify(r)); return r
})
await t('会話データの点検: 筋は1人3本以上・8往復以上、質問には3択とも答え、型は重ならない（NG 0）', async () => {
  const { spawnSync } = await import('node:child_process')
  const r = spawnSync(process.execPath, ['check_threads.mjs'], { cwd: ROOT, encoding: 'utf8' })
  expect(r.status === 0, r.stdout.slice(0, 300)); return r.stdout.trim().split('\n')[0]
})
await t('会う: 写真詐欺の子は会うと別人。画面に「当たり」「外れ」の言葉が出ない', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['d']); __h.date('d'); __h.meet('d', true); MA.dbg.step(4000); return { view: MA.view(), real: document.querySelector('#mtReal').src.includes('dm.webp'), tag: document.querySelector('#mtVerdict').textContent, words: /当たり|外れ/.test(document.body.innerText), d2: MA.S.d2q } })
  await p.screenshot({ path: ROOT + '/shots/v-meet-sagi.png' })
  expect(r.view === 'vMeet' && r.real && r.tag === '' /* 正体の札は出さない（本人 2026-11-13） */ && !r.words && r.d2, JSON.stringify(r))
})
await t('2回目は、どの子でも自分で決める（写真詐欺の子と話が合う道 → 写真より本人）', async () => {
  const r = await p.evaluate(() => { MA.act.d2ask(true); MA.dbg.step(300); const n = MA.d2opts().length; const o = MA.GIRLS.find(g => g.id === 'd').date2.o; MA.act.date2K(o.findIndex(x => x.g > 0)); MA.dbg.step(500); MA.act.nextMeet(); MA.dbg.step(500); return { n, end: MA.S.ending, view: MA.view(), title: document.querySelector('#enTitle').textContent, words: /当たり|外れ/.test(document.body.innerText) } })
  await p.screenshot({ path: ROOT + '/shots/v-ending-honest.png' })
  expect(r.n === 3 && r.end === 'honest' && r.view === 'vEnding' && r.title === '写真より、本人' && !r.words, JSON.stringify(r))
})
await t('会うかの返事をしないと「会わない」扱いにもならない（点も無い）', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['j']); const st = __h.talk('j', 3, 'social'); MA.dbg.step(65000); return { st, s: MA.score().pts, phase: MA.S.phase, meet: __h.c('j').meet } })
  expect(r.st === 'offer' && r.s === 0 && r.phase === 'end' && r.meet === null, JSON.stringify(r))
})
await t('お店の営業: どの返事にも同じ温度・会うと伝票', async () => {
  const r = await p.evaluate(() => { const tk = MA.TALK.k; const temp = tk.nice.concat(tk.meh).every(x => x[0].startsWith('えーやばい')); __h.to(5, ['k']); __h.date('k'); __h.meet('k', true); MA.dbg.step(4000); return { temp, bill: !document.querySelector('#mtBill').hidden, total: document.querySelector('#mtBill .tot').textContent } })
  await p.screenshot({ path: ROOT + '/shots/v-meet-concafe.png' })
  expect(r.temp && r.bill && /8,500/.test(r.total), JSON.stringify(r))
})
await t('トーク中に顔を押すとプロフが開き、その間は待ち時間が減らない', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['h']); __h.wait('h'); MA.act.open(0); const c = __h.c('h'); document.querySelector('#cAv').click(); const open = !document.querySelector('#prof').hidden; const a = MA.G.t; MA.dbg.step(30000); const held = MA.G.t - a; document.querySelector('#profImg').dispatchEvent(new MouseEvent('click', { clientX: innerWidth - 5, clientY: 200, bubbles: true })); const ph = MA.S.profPh; document.querySelector('#profClose').click(); return { open, held, ph, left: c.left, state: c.state } })
  await p.screenshot({ path: ROOT + '/shots/v-chatroom.png' })
  expect(r.open && r.held === 0 && r.ph === 1 && !r.left && r.state === 'mine', JSON.stringify(r))
})
await t('ダブルブッキング: リスケをすぐ了承する子／両方と会うと修羅場', async () => {
  const r1 = await p.evaluate(() => { __h.to(5, ['a', 'c']); __h.date('a'); __h.meet('a', true); __h.date('c'); MA.act.open(__h.ci('c')); MA.act.meet(true); const st = __h.c('c').state; const q = document.querySelectorAll('#opts button').length; MA.act.clash('other'); MA.dbg.step(4000); MA.act.back(); return { st, q, resched: MA.S.resched, met: MA.S.met.slice(), moved: __h.c('a').moved } })
  const r2 = await p.evaluate(() => { __h.to(5, ['a', 'c']); __h.date('a'); __h.meet('a', true); __h.date('c'); MA.act.open(__h.ci('c')); MA.act.meet(true); MA.act.clash('both'); MA.act.back(); __h.finish(); __h.meets(); return { end: MA.S.ending, clash: MA.S.clash } })
  await p.screenshot({ path: ROOT + '/shots/v-ending-clash.png' })
  expect(r1.st === 'clash' && r1.q === 3 && r1.resched === 1 && r1.met.length === 2 && r1.moved && r2.end === 'clash', JSON.stringify([r1, r2]))
})
await t('リスケで疑う子: 「他に女いるの？」→ 返し方で持ち直す／切られる', async () => {
  const run = k => p.evaluate(k => { __h.to(5, ['e', 'i']); __h.date('e'); __h.meet('e', true); __h.date('i'); MA.act.open(__h.ci('i')); MA.act.meet(true); MA.act.clash('other'); MA.act.back(); __h.wait('i'); MA.act.open(__h.ci('i')); const q = __h.c('i').log.some(m => /他に女/.test(m.text)); const n = document.querySelectorAll('#opts button').length; MA.act.sus(k); MA.dbg.step(4000); MA.act.back(); return { q, n, eMet: MA.S.met.includes('e'), cut: !!__h.c('e').cut } }, k)
  const keep = await run(0), cut = await run(2)
  expect(keep.q && keep.n === 3 && keep.eMet && !keep.cut && cut.cut && !cut.eMet, JSON.stringify([keep, cut]))
})
await t('エンディング: 重たい子と会うと決めたあと、ほかの子に返すとバッドエンド', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['f', 'b']); __h.date('f'); __h.meet('f', true); __h.say('b', 'social'); __h.finish(); __h.meets(); return { end: MA.S.ending, title: document.querySelector('#enTitle').textContent } })
  await p.screenshot({ path: ROOT + '/shots/v-ending-stalk.png' })
  expect(r.end === 'stalk' && r.title === '既読、見てたよ', JSON.stringify(r))
})
await t('エンディング: 1人とだけまっすぐ → アプリを消した夜／2人と続ける → 同じ改札で', async () => {
  const best = await p.evaluate(() => { __h.to(5, ['a']); __h.date('a'); __h.meet('a', true); __h.finish(); return __h.meets(true, true) })
  const two = await p.evaluate(() => { __h.to(5, ['a', 'b']); __h.date('a'); __h.meet('a', true); __h.date('b'); __h.meet('b', true); __h.finish(); return __h.meets(true, true) })
  expect(best === 'best' && two === 'futamata', JSON.stringify([best, two]))
})
await t('エンディング: 業者 → セミナー／お店 → スタンプカード／会っても続かない → ふりだし／誰とも会わない → 寝る', async () => {
  const one = id => p.evaluate(id => { __h.to(5, [id]); __h.date(id); __h.meet(id, true); __h.finish(); return __h.meets(false) }, id)
  const sem = await one('j'), reg = await one('k'), again = await one('g')
  const sleep = await p.evaluate(() => { __h.to(5, ['b']); __h.date('b'); __h.meet('b', false); __h.finish(); MA.dbg.step(3000); return MA.S.ending })
  expect(sem === 'seminar' && reg === 'regular' && again === 'again' && sleep === 'sleep', JSON.stringify([sem, reg, again, sleep]))
})
await t('エンディング: リスケを重ねるとバレる', async () => {
  const r = await p.evaluate(() => { __h.to(5, ['a', 'c', 'd', 'l']); __h.date('a'); __h.meet('a', true); __h.date('c'); MA.act.open(__h.ci('c')); MA.act.meet(true); MA.act.clash('other'); MA.dbg.step(4000); MA.act.back(); __h.date('d'); __h.meet('d', true); __h.date('l'); MA.act.open(__h.ci('l')); MA.act.meet(true); MA.act.clash('other'); MA.dbg.step(4000); MA.act.back(); __h.finish(); return { end: __h.meets(), resched: MA.S.resched } })
  expect(r.end === 'exposed' && r.resched === 2, JSON.stringify(r))
})
await t('エンディング一覧: 見たものは題、見ていないものはヒント。同じ行動なら同じ結末', async () => {
  const r = await p.evaluate(() => { const a = MA.act.seen().length; const e1 = (() => { __h.to(5, ['j']); __h.date('j'); __h.meet('j', true); __h.finish(); return __h.meets(false) })(); const e2 = (() => { __h.to(5, ['j']); __h.date('j'); __h.meet('j', true); __h.finish(); return __h.meets(false) })(); MA.act.toNote(); document.querySelector('#bEnds').click(); const list = document.querySelector('#endsList').textContent; const hidden = document.querySelectorAll('#endsList .no').length; document.querySelector('#endsClose').click(); return { a, e1, e2, seen: MA.act.seen().length, total: MA.S && document.querySelectorAll('#endsList div').length, hidden, list: list.slice(0, 60) } })
  await p.screenshot({ path: ROOT + '/shots/v-endlist.png' })
  expect(r.e1 === r.e2 && r.seen >= 10 && r.hidden === r.total - r.seen && r.total === 12, JSON.stringify(r)); return r
})
await t('結果: いいねした子だけが並び、答え合わせに手がかり・最初の1通・地雷・「この一言」が出る', async () => {
  const r = await p.evaluate(() => { __h.to(7, ['d', 'k']); __h.talk('d', 6, 'good'); __h.date('d'); __h.meet('d', false); __h.date('k'); __h.meet('k', false); __h.finish(); MA.dbg.step(3000); MA.act.toNote(); const names = [...document.querySelectorAll('.eRow .nm')].map(e => e.textContent); MA.act.openClue(MA.GIRLS.find(g => g.id === 'd')); const txt = document.querySelector('#clueList').textContent; return { names, txt, words: /当たり|外れ/.test(document.body.innerText) } })
  await p.screenshot({ path: ROOT + '/shots/v-clue.png' })
  await p.evaluate(() => document.querySelector('#clueClose').click())
  expect(r.names.length === 2 && /手首/.test(r.txt) && /最初の1通/.test(r.txt) && /この一言/.test(r.txt) && !r.words, JSON.stringify(r))
})
await t('結果の画像が描ける（1080x1350・絵が入っている）', async () => {
  const r = await p.evaluate(async () => { const cv = await MA.act.makeCard(); const d = cv.getContext('2d').getImageData(0, 0, 1080, 1350).data; let s = 0, s2 = 0, n = 0; for (let i = 0; i < d.length; i += 4 * 97) { const v = d[i] * .3 + d[i + 1] * .59 + d[i + 2] * .11; s += v; s2 += v * v; n++ } return { w: cv.width, h: cv.height, v: Math.round(s2 / n - (s / n) ** 2) } })
  expect(r.w === 1080 && r.h === 1350 && r.v > 300, JSON.stringify(r)); return r
})
await t('Xでポストの URL（本文・ハッシュタグ・公開URL）', async () => {
  const u = await p.evaluate(() => { let got = ''; const o = window.open; window.open = x => { got = x }; document.querySelector('#bPost').click(); window.open = o; return got })
  expect(/^https:\/\/x\.com\/intent\/post\?text=/.test(u) && u.includes(encodeURIComponent('#マチアプで本命を見抜け')) && u.includes(encodeURIComponent('エンディング')) && u.includes(encodeURIComponent('tom3games.com/play/matchapp-sagi/')), u)
})
await t('英語に切り替え: 画面の文字が英語になる', async () => {
  await p.click('#bLang')
  const r = await p.evaluate(() => ({ h: document.querySelector('#eH').textContent, b: document.querySelector('#bAgain').textContent, ja: /[ぁ-ん]/.test(document.querySelector('#eSum').textContent) }))
  await p.click('#bLang')
  expect(r.h.startsWith('Debrief notebook') && r.b === 'Again' && !r.ja, JSON.stringify(r))
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
  await q.evaluate(() => { __h.to(9, ['a', 'c', 'k', 'b']); MA.dbg.step(25000) })
  await shot('chatlist')
  await q.evaluate(() => { __h.wait('b'); MA.act.open(__h.ci('b')); [...document.querySelectorAll('#msgs .msg.her')].pop().click() })
  await shot('chat')
  await q.evaluate(() => document.querySelector('#cAv').click()); await shot('prof'); await q.evaluate(() => { document.querySelector('#profClose').click(); MA.act.back() })
  await q.evaluate(() => { __h.date('a'); MA.act.open(__h.ci('a')) })
  await shot('meetq')
  await q.evaluate(() => { MA.act.meet(true); MA.act.back(); __h.date('c'); MA.act.open(__h.ci('c')); MA.act.meet(true) })
  await shot('clash')
  await q.evaluate(() => { MA.act.clash('other'); MA.dbg.step(4000); MA.act.back(); __h.date('k'); __h.meet('k', true); __h.date('b'); __h.meet('b', true); __h.finish(); MA.dbg.step(4000) })
  await shot('meet')
  for (let k = 0; k < 30; k++) {
    const st = await q.evaluate(() => { if (MA.S.phase !== 'meet') return 'done'; if (MA.S.d2q) return 'q'; if (MA.d2opts().length) return 'd2'; return MA.S.met[MA.S.mi] })
    if (st === 'done') break
    if (st === 'q') { if (!views.d2q) await shot('d2q'); await q.evaluate(() => { MA.act.d2ask(true); MA.dbg.step(300) }); continue }
    if (st === 'd2') { if (!views.date2) await shot('date2'); await q.evaluate(() => { const b = MA.d2opts(), g = MA.GIRLS.find(x => x.id === MA.S.met[MA.S.mi]); MA.act.date2K(b.reduce((a, k) => g.date2.o[k].t[0].length > g.date2.o[a].t[0].length ? k : a, b[0])); MA.dbg.step(500) }); if (!views.date2res) await shot('date2res'); await q.evaluate(() => { MA.act.nextMeet(); MA.dbg.step(4000) }); continue }
    if (st === 'k' && !views['meet-bill']) { await q.evaluate(() => MA.dbg.step(3000)); await shot('meet-bill') }
    await q.evaluate(() => { MA.dbg.step(3000); if (MA.S.d2q) return; MA.act.nextMeet(); MA.dbg.step(4000) })
  }
  await shot('ending')
  await q.evaluate(() => MA.act.toNote())
  await shot('end')
  await q.evaluate(() => MA.act.openClue(MA.GIRLS.find(g => g.id === 'k'))); await shot('clue'); await q.evaluate(() => { document.querySelector('#clueClose').click(); document.querySelector('#bEnds').click() }); await shot('ends')
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
await t('WebKit: トークをスクロールしてもページ全体は動かない', async () => {
  const r = await wp.evaluate(() => { __h.to(5, ['b']); __h.talk('b', 6, 'good'); __h.wait('b'); MA.act.open(0); const m = document.querySelector('#msgs'); return { sh: m.scrollHeight, ch: m.clientHeight } })
  const s = await wp.evaluate(() => { const m = document.querySelector('#msgs'); m.scrollTop = 0; window.scrollBy(0, 300); document.scrollingElement.scrollTop = 300; return { page: document.scrollingElement.scrollTop + window.scrollY, ob: getComputedStyle(m).overscrollBehaviorY, ta: getComputedStyle(m).touchAction } })
  expect(r.sh > r.ch && s.page === 0 && s.ob === 'contain' && /pan-y/.test(s.ta), JSON.stringify([r, s])); return s
})
await t('WebKit: 実際には無音', async () => { const r = await wp.evaluate(() => window.__muteOk()); expect(r, r) })
await t('WebKit: エラーなし', async () => { expect(wp.errs.length === 0, wp.errs.join('|')) })
await wb.close()
server.kill()
console.log(results.join('\n'))
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
