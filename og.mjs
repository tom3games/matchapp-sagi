import './mute-auto.mjs'
// og.png（1200x630）: 盛ったプロフの写真と、待ち合わせに来た本人の対比。node og.mjs
import { chromium } from 'playwright'
import { MUTE_LAUNCH, muteContext } from './mute.mjs'
import { spawn } from 'node:child_process'
const ROOT = import.meta.dirname
const PORT = 6900 + Math.floor(Math.random() * 90)
const server = spawn(process.execPath, ['server.mjs'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) } })
for (let i = 0; i < 50; i++) { try { await fetch(`http://localhost:${PORT}/`); break } catch (e) { await new Promise(r => setTimeout(r, 100)) } }
const br = await chromium.launch(MUTE_LAUNCH)
const ctx = await br.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 }); await muteContext(ctx)
const p = await ctx.newPage()
await p.goto(`http://localhost:${PORT}/`)
await p.setContent(`<!doctype html><html><head><base href="http://localhost:${PORT}/">
<link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@700;900&family=Klee+One:wght@600&family=Yuji+Syuku&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#1b1f24;font-family:"Zen Kaku Gothic New",sans-serif;position:relative}
.app{position:absolute;left:48px;top:38px;width:330px;height:554px;border-radius:22px;overflow:hidden;background:#fffdf8;transform:rotate(-4deg);box-shadow:0 18px 40px rgba(0,0,0,.55)}
.app img{width:100%;height:440px;object-fit:cover;object-position:50% 30%;display:block}
.app .nm{position:absolute;left:0;right:0;top:360px;padding:20px 16px 10px;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff;font:900 30px "Zen Kaku Gothic New"}
.app .nm small{font-size:17px;margin-left:8px}
.app .lk{position:absolute;right:12px;top:14px;background:rgba(0,0,0,.45);color:#fff;font:700 15px sans-serif;padding:4px 10px;border-radius:12px}
.app .row{display:flex;gap:10px;padding:16px 14px}
.app .row b{flex:1;height:58px;border-radius:29px;display:flex;align-items:center;justify-content:center;font:900 22px "Zen Kaku Gothic New";background:#e7e2d8;color:#5a6068}
.app .row b+b{background:#1f6f5c;color:#fff}
.real{position:absolute;left:400px;top:30px;width:380px;height:570px;border-radius:6px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,.55);transform:rotate(2deg)}
.real img{width:100%;height:100%;object-fit:cover;object-position:50% 20%}
.real span{position:absolute;left:12px;bottom:12px;background:rgba(0,0,0,.6);color:#fff;font:700 18px sans-serif;padding:5px 12px;border-radius:14px}
.arrow{position:absolute;left:356px;top:280px;z-index:3;font:400 64px "Yuji Syuku";color:#c4302b;background:#fbf8f0;width:92px;height:92px;border-radius:50%;border:5px solid #c4302b;display:flex;align-items:center;justify-content:center;transform:rotate(-12deg);box-shadow:0 6px 18px rgba(0,0,0,.4)}
.ttl{position:absolute;left:820px;top:70px;right:36px;color:#fff}
.ttl .k{display:inline-block;background:#c4302b;font:700 20px "Zen Kaku Gothic New";padding:4px 12px;transform:rotate(-2deg)}
.ttl h1{font:900 62px/1.1 "Zen Kaku Gothic New";margin-top:14px}
.ttl p{font:700 21px/1.6 "Zen Kaku Gothic New";color:#ddd5c6;margin-top:18px}
</style></head><body>
<div class="app"><img src="img/d1.webp"><span class="lk">いいね 842</span><div class="nm">りな<small>26歳 157cm</small></div><div class="row"><b>見送り</b><b>いいね</b></div></div>
<div class="real"><img src="img/dm.webp"><span>待ち合わせに来た人</span></div>
<div class="ttl"><span class="k">盛りを見抜く</span><h1>マチアプ<br>写真詐欺を<br>見抜け</h1><p>手首、背景のゆがみ、<br>トークの一言。<br>本性を探れ。</p></div>
</body></html>`)
await p.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400)
await p.screenshot({ path: ROOT + '/og.png' })
await br.close(); server.kill(); console.log('og.png')
