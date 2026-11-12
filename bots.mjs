// ページの中で回す bot。MA の窓口だけを使う（答えの type は見ない。見るのは画面に出ている情報だけ）
// kind: random（適当）/ clue（手がかりを読む）/ nothing（全員見送り）/ meetall（上から4人いいねして全員と会う）
// react: 1手ごとの考える時間（ゲーム内ミリ秒）。人の速さなら 5000、じっくり考える人は 10000
export const BOT = `
window.__bot = function (kind, seed, react) {
  let a = seed * 9301 + 49297; const R = () => { a = (a * 9301 + 49297) % 233280; return a / 233280 }
  react = react || 300
  // 手がかりの読み方（画面のプロフから分かることだけ）
  const RED = /ブロック|毎日|ずっと一緒|ムリ|自由|お金|たくさんのいいね|ノリ|写真ふやします|好きな場所|夜はほぼ|ぼしゅー|わ飲み|最近のです/
  const looksGood = g => !!g.full && !RED.test(g.intro[0])   // 全身の写真があるか（写真を見れば分かる）＋自己紹介の赤信号
  const S = () => MA.S
  MA.act.start(seed); MA.dbg.pause()
  let guard = 0
  while (S().phase === 'swipe' && guard++ < 200) {
    const g = S().order[S().idx]; if (!g) break
    MA.dbg.step(react)
    if (kind === 'nothing') MA.act.pass()
    else if (kind === 'random') { if (R() < .45) MA.act.like(); else MA.act.pass() }
    else if (kind === 'meetall') MA.act.like()
    else { if (looksGood(g)) MA.act.like(); else MA.act.pass() }
    MA.dbg.step(400)
  }
  guard = 0
  while (S().phase === 'match' && guard++ < 50) MA.dbg.step(500)
  // トーク: 返事が来た子から順に、考えてから返す（同時進行）
  guard = 0
  while (S().phase === 'chat' && guard++ < 3000) {
    const ready = MA.mine().filter(x => x.state === 'mine' || x.state === 'offer')
    if (!ready.length) { MA.dbg.step(500); continue }
    // 手がかり bot は待てる時間が短い子を先に。返信が早すぎると引く子には少し間をあけて返す
    ready.sort((x, y) => kind === 'clue' ? (x.left - y.left) : (y.since - x.since))
    const c = ready[0]
    if (kind === 'clue' && c.state === 'mine' && c.since < 3000 && react < 3000) { MA.dbg.step(3000 - c.since); continue }
    MA.dbg.step(react)
    MA.act.open(c.i)
    const st = MA.mine()[c.i].state
    if (st === 'offer') {
      const g = S().chats[c.i].g
      const yes = kind === 'random' ? R() < .5 : kind === 'meetall' ? true : looksGood(g)
      MA.act.meet(yes)
    } else if (st === 'mine') {
      const b = MA.opts(), ch = S().chats[c.i], o = ch.g.chat[ch.r].o
      const k = kind === 'clue' ? b.reduce((x, y) => (o[y].g > o[x].g ? y : x), b[0]) : b[Math.floor(R() * b.length)]
      MA.act.chooseK(k)
    }
    MA.act.back(); MA.dbg.step(300)
  }
  guard = 0
  while (S().phase === 'chat' && guard++ < 200) MA.dbg.step(1000)
  guard = 0
  while (S().phase === 'meet' && guard++ < 80) {
    MA.dbg.step(3000)
    const d = MA.d2opts()
    if (d.length) {
      MA.dbg.step(react)
      const g = MA.GIRLS.find(x => x.id === S().met[S().mi]), o = g.date2.o
      const k = kind === 'clue' ? d.reduce((x, y) => (o[y].g > o[x].g ? y : x), d[0]) : d[Math.floor(R() * d.length)]
      MA.act.date2K(k); continue
    }
    MA.act.nextMeet()
  }
  const r = MA.score()
  return { pts: r.pts, rank: r.rank, d2ok: r.d2ok, metGood: r.metGood, metBad: r.metBad, avoid: r.avoid, phase: S().phase, rare: S().rare }
}
`
