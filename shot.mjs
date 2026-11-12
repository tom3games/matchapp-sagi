import './mute-auto.mjs'
// 画面を台本どおりに進めて撮る。node shot.mjs [幅] [高さ] [webkit]
import { chromium, webkit } from 'playwright'
import { MUTE_LAUNCH, muteContext } from './mute.mjs'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
const ROOT = import.meta.dirname
mkdirSync(ROOT + '/shots', { recursive: true })
const PORT = 5000 + Math.floor(Math.random() * 900) + 400
const server = spawn(process.execPath, ['server.mjs'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) } })
for (let i = 0; i < 50; i++) { try { await fetch(`http://localhost:${PORT}/`); break } catch (e) { await new Promise(r => setTimeout(r, 100)) } }
const W = +(process.argv[2] || 390), H = +(process.argv[3] || 844), B = process.argv[4] === 'webkit' ? webkit : chromium
const lang = process.env.LANG2 || 'ja-JP'
const br = await B.launch(B === chromium ? MUTE_LAUNCH : {})
const ctx = await br.newContext({ locale: lang, viewport: { width: W, height: H }, deviceScaleFactor: 2, hasTouch: true })
await muteContext(ctx)
const p = await ctx.newPage(); const errs = []
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()))
await p.goto(`http://localhost:${PORT}/?seed=7`); await p.waitForFunction(() => window.__msReady)
const tag = `${W}x${H}`
const snap = async n => { await p.waitForTimeout(450); await p.screenshot({ path: `${ROOT}/shots/${tag}-${n}.png` }) }
await snap('01title')
await p.evaluate(() => { localStorage.setItem('ms_tut', '1'); MA.dbg.pause(); MA.act.start() })
await snap('02card')

// 拡大
await p.evaluate(() => MA.act.loupe(true))
const box = await p.locator('#topCard .photo').boundingBox()
await p.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5); await p.mouse.down(); await p.mouse.move(box.x + box.width * 0.62, box.y + box.height * 0.55)
await snap('04loupe'); await p.mouse.up(); await p.evaluate(() => MA.act.loupe(false))
await p.click('#topCard [data-sheet]'); await snap('05sheet'); await p.click('#topCard [data-close]')
// 全員を回る: 当たりは like、外れのうち2人も like
await p.evaluate(() => {
  const S = MA.S; let extra = 0
  for (let i = 0; i < 12 && S.phase === 'swipe'; i++) {
    const g = S.order[S.idx]; if (!g) break

    if (S.likesLeft && (g.type === 'atari' || (['sagi', 'concafe'].includes(g.type) && extra < 2))) { if (g.type !== 'atari') extra++; MA.act.like() } else MA.act.pass()
    MA.dbg.step(400)
  }
})
await snap('06match')
await p.evaluate(() => { MA.act.toChat(); MA.dbg.step(4000) })
await snap('07chat')
// トークを最後まで: 良い返し・会うを選ぶ
for (let k = 0; k < 40; k++) {
  const st = await p.evaluate(() => {
    const S = MA.S; if (S.phase !== 'chat') return S.phase
    const c = S.chats[S.ci]
    if (document.querySelector('#opts .yes')) { MA.act.meet(true); MA.dbg.step(1500); return 'meet' }
    const btns = MA.opts(); if (btns.length) { const o = c.g.chat[c.r].o; let best = btns.reduce((a, k) => o[k].g > o[a].g ? k : a, btns[0]); MA.act.chooseK(best); MA.dbg.step(400); return 'chose' }
    MA.dbg.step(800); return 'wait'
  })
  if (k === 6) await snap('08chat2')
  if (st !== 'chat' && st !== 'chose' && st !== 'wait' && st !== 'meet') break
}
await snap('09meetA')
await p.evaluate(() => MA.dbg.step(3000)); await snap('10meet')
for (let k = 0; k < 6; k++) { const ph = await p.evaluate(() => { if (MA.S.phase === 'meet') { MA.act.nextMeet(); MA.dbg.step(3000) } return MA.S.phase }); if (ph !== 'meet') break; await snap('11meet' + k) }
await snap('12end')
await p.evaluate(() => MA.act.openClue(MA.GIRLS.find(g => g.type === 'sagi'))); await snap('13clue')
await p.evaluate(async () => { const cv = await MA.act.makeCard(); window.__card = cv.toDataURL('image/png') })
const durl = await p.evaluate(() => window.__card)
const { writeFileSync } = await import('node:fs'); writeFileSync(`${ROOT}/shots/card.png`, Buffer.from(durl.split(',')[1], 'base64'))
console.log('errors:', errs.length ? errs : 0)
await br.close(); server.kill()
