import './mute-auto.mjs'
import { chromium } from 'playwright'
import { MUTE_LAUNCH, muteContext } from './mute.mjs'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
const PORT = 7300 + Math.floor(Math.random() * 300)
const server = spawn(process.execPath, ['server.mjs'], { cwd: import.meta.dirname, env: { ...process.env, PORT: String(PORT) } })
for (let i = 0; i < 50; i++) { try { await fetch(`http://localhost:${PORT}/`); break } catch (e) { await new Promise(r => setTimeout(r, 100)) } }
const br = await chromium.launch(MUTE_LAUNCH); const ctx = await br.newContext({ locale: 'ja-JP', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); await muteContext(ctx)
await ctx.addInitScript(() => localStorage.setItem('ms_tut', '1'))
const p = await ctx.newPage(); p.on('pageerror', e => console.log('ERR', e.stack))
await p.goto(`http://localhost:${PORT}/`); await p.waitForFunction(() => window.__msReady)
const v = readFileSync('verify.mjs', 'utf8'); const help = v.slice(v.indexOf('window.__h = {'), v.indexOf('}`\n', v.indexOf('window.__h = {')) + 1)
await p.addScriptTag({ content: help })
await p.evaluate(() => { __h.to(9, ['b']); __h.talk('b', 6, 'good'); __h.wait('b'); MA.act.open(0) }); await p.waitForTimeout(800)
console.log(await p.evaluate(() => { const m = document.querySelector('#msgs'); const el = document.elementFromPoint(360, 655); return { st: m.scrollTop, sh: m.scrollHeight, ch: m.clientHeight, el: el && (el.id || el.className || el.tagName), par: el && el.parentElement && (el.parentElement.id || el.parentElement.className) } }))
await br.close(); server.kill()
