// ページの中で回す bot。MA の窓口だけを使う（答えの type は見ない。見るのは画面に出ている情報だけ）
// kind: random（適当）/ clue（手がかりを読む）/ nothing（何もしない）/ meetall（上から4人いいねして全員と会う）
// react: 1手ごとの考える時間（ゲーム内ミリ秒）。人の速さなら 5000
export const BOT = `
window.__bot = function (kind, seed, react) {
  let a = seed * 9301 + 49297; const R = () => { a = (a * 9301 + 49297) % 233280; return a / 233280 }
  react = react || 300
  // 手がかりの読み方（画面のプロフから分かることだけ）
  const RED = /ブロック|毎日|ずっと一緒|ムリ|自由|お金|たくさんのいいね|ノリ|写真ふやします|好きな場所|夜はほぼ|ぼしゅー|わ飲み/
  const looksGood = g => !!g.full && !RED.test(g.intro[0])   // 全身の写真があるか（写真を見れば分かる）＋自己紹介の赤信号
  const S = () => MA.S
  MA.act.start(seed); MA.dbg.pause()
  let guard = 0
  while (S().phase === 'swipe' && guard++ < 200) {
    const g = S().order[S().idx]; if (!g) break
    MA.dbg.step(react)
    if (S().phase !== 'swipe') break
    if (kind === 'nothing') { MA.dbg.step(5000); continue }
    if (kind === 'random') { MA.act.pred(R() < .5 ? 'hit' : 'miss'); if (S().likesLeft && R() < .45) MA.act.like(); else MA.act.pass() }
    else if (kind === 'meetall') { if (S().likesLeft) MA.act.like(); else MA.act.pass() }
    else { const ok = looksGood(g); MA.act.pred(ok ? 'hit' : 'miss'); if (S().likesLeft && ok) MA.act.like(); else MA.act.pass() }
    MA.dbg.step(400)
  }
  guard = 0
  while (S().phase === 'match' && guard++ < 50) MA.dbg.step(500)
  guard = 0
  while (S().phase === 'chat' && guard++ < 2000) {
    const c = S().chats[S().ci]
    if (document.querySelector('#opts .yes')) {
      MA.dbg.step(react)
      if (kind === 'nothing') { MA.dbg.step(30000); continue }
      const yes = kind === 'random' ? R() < .5 : kind === 'meetall' ? true : looksGood(c.g)
      MA.act.meet(yes); MA.dbg.step(800); continue
    }
    const b = MA.opts()
    if (b.length) {
      MA.dbg.step(react)
      if (!MA.opts().length) continue
      if (kind === 'nothing') { MA.dbg.step(30000); continue }
      const o = c.g.chat[c.r].o
      let k
      if (kind === 'random' || kind === 'meetall') k = b[Math.floor(R() * b.length)]
      else k = b.reduce((x, y) => (o[y].g > o[x].g ? y : x), b[0])   // 共通点・質問を返す・具体的な誘い（ナレッジの良い返し）を選ぶ
      MA.act.chooseK(k); MA.dbg.step(300); continue
    }
    MA.dbg.step(300)
  }
  guard = 0
  while (S().phase === 'meet' && guard++ < 80) {
    MA.dbg.step(3000)
    const d = MA.d2opts()
    if (d.length) {
      MA.dbg.step(react)
      if (kind === 'nothing') { MA.dbg.step(16000); continue }
      const g = MA.GIRLS.find(x => x.id === S().met[S().mi]), o = g.date2.o
      const k = kind === 'clue' ? d.reduce((x, y) => (o[y].g > o[x].g ? y : x), d[0]) : d[Math.floor(R() * d.length)]
      MA.act.date2K(k); continue
    }
    MA.act.nextMeet()
  }
  const r = MA.score()
  return { pts: r.pts, rank: r.rank, d2ok: r.d2ok, metGood: r.metGood, metBad: r.metBad, avoid: r.avoid, predOk: r.predOk, phase: S().phase, rare: S().rare }
}
`
