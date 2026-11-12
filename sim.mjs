import './mute-auto.mjs'
// 遊び方ごとの点の分布。node sim.mjs [回数]
import { chromium } from 'playwright'
import { MUTE_LAUNCH, muteContext } from './mute.mjs'
import { spawn } from 'node:child_process'
import { BOT } from './bots.mjs'
const ROOT = import.meta.dirname, N = +(process.argv[2] || 12)
const PORT = 6000 + Math.floor(Math.random() * 900)
const server = spawn(process.execPath, ['server.mjs'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) } })
for (let i = 0; i < 50; i++) { try { await fetch(`http://localhost:${PORT}/`); break } catch (e) { await new Promise(r => setTimeout(r, 100)) } }
const br = await chromium.launch(MUTE_LAUNCH)
const ctx = await br.newContext({ locale: 'ja-JP', viewport: { width: 390, height: 844 } }); await muteContext(ctx)
await ctx.addInitScript(() => { try { localStorage.setItem('ms_tut', '1') } catch (e) {} })
const p = await ctx.newPage(); await p.goto(`http://localhost:${PORT}/`); await p.waitForFunction(() => window.__msReady)
await p.addScriptTag({ content: BOT })
const out = {}
for (const [kind, react] of [['random', 300], ['random', 5000], ['clue', 300], ['clue', 5000], ['clue', 10000], ['meetall', 300], ['nothing', 300]]) {
  const name = kind + (react >= 10000 ? '(1手10秒)' : react >= 5000 ? '(1手5秒)' : ''), pts = [], ranks = []
  for (let s = 1; s <= N; s++) { const r = await p.evaluate(([k, s, rt]) => window.__bot(k, s, rt), [kind, s * 17, react]); pts.push(r.pts); ranks.push(r.rank) }
  pts.sort((a, b) => a - b)
  out[name] = { 平均: Math.round(pts.reduce((a, b) => a + b, 0) / N), 最低: pts[0], 中央: pts[N >> 1], 最高: pts[N - 1], ランク: ranks.join('') }
}
console.table(out)
await br.close(); server.kill()
