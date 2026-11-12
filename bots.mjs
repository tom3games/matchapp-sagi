// ページの中で回す bot。MA の窓口と画面に出ている情報だけを使う（正体の type は見ない）
// kind:
//   clue    … プロフを見て、トークで探りを入れ、ほころびが出た子とは会わない
//   profile … プロフだけで選び、探りを入れずに会う（考察しない人）
//   random  … 適当
//   mix     … 種ごとに癖を変えた「ふつうの人」（エンディングの届きやすさを見る用）
//   nothing … 全員見送り
//   meetall … 上から4人いいねして、全員と会う
// react: 1手ごとの考える時間（ゲーム内ミリ秒）
export const BOT = `
window.__bot = function (kind, seed, react) {
  let a = (seed * 9301 + 49297) % 233280; const R = () => { a = (a * 9301 + 49297) % 233280; return a / 233280 }
  react = react || 300
  const RED = /ブロック|毎日|ずっと一緒|ムリ|自由|お金|たくさんのいいね|ノリ|写真ふやします|ぼしゅー|わ飲み|最近のです/
  const looksGood = g => !!g.full && !RED.test(g.intro[0])
  const S = () => MA.S
  // mix の癖
  const P = { like: .35 + R() * .4, probe: R(), bad: R() * .4, meet: .3 + R() * .7, d2: R(), early: R() < .3, wait: 1000 + R() * 14000, clash: Math.floor(R() * 3), sus: Math.floor(R() * 3), stopAfterYes: R() < .5 }
  MA.act.start(seed); MA.dbg.pause()
  let guard = 0
  while (S().phase === 'swipe' && guard++ < 200) {
    const g = S().order[S().idx]; if (!g) break
    MA.dbg.step(react)
    if (kind === 'nothing') MA.act.pass()
    else if (kind === 'random') { if (R() < .45) MA.act.like(); else MA.act.pass() }
    else if (kind === 'mix') { if (R() < P.like) MA.act.like(); else MA.act.pass() }
    else if (kind === 'meetall') MA.act.like()
    else if (kind === 'clue') { if (looksGood(g) || (g.full && R() < .3)) MA.act.like(); else MA.act.pass() }
    else { if (looksGood(g) || g.full) MA.act.like(); else MA.act.pass() }
    MA.dbg.step(400)
  }
  guard = 0
  while (S().phase === 'match' && guard++ < 50) MA.dbg.step(500)
  const red = c => c.heard.filter(m => m.clue).length
  guard = 0
  while (S().phase === 'chat' && guard++ < 4000) {
    const ready = MA.mine().filter(x => ['mine', 'offer', 'clash'].includes(x.state) || (x.state === 'sus' && x.left != null))
    if (!ready.length) { MA.dbg.step(500); continue }
    ready.sort((x, y) => (x.left ?? 1e9) - (y.left ?? 1e9))
    const ci = ready[0].i, c = S().chats[ci]
    // 手がかり bot は、会うと決めた子ができたら、ほかの子には返さない（誠実）
    if (kind === 'clue' && S().met.length && c.state === 'mine') { MA.dbg.step(2000); continue }
    if (kind === 'mix' && P.stopAfterYes && S().met.length && c.state === 'mine' && R() < .7) { MA.dbg.step(2000); continue }
    let think = kind === 'mix' ? P.wait : react
    if (kind === 'clue' && c.state === 'mine' && ready[0].since < 3000) think = Math.max(think, 3000 - ready[0].since)
    MA.dbg.step(think)
    MA.act.open(ci)
    const st = c.state
    if (st === 'offer') {
      const yes = kind === 'random' ? R() < .5 : kind === 'mix' ? R() < P.meet : kind === 'meetall' || kind === 'profile' ? true : red(c) === 0 && !S().met.length
      MA.act.meet(yes)
    } else if (st === 'clash') {
      MA.act.clash(kind === 'clue' ? 'me' : kind === 'mix' ? ['other', 'me', 'both'][P.clash] : ['other', 'me', 'both'][Math.floor(R() * 3)])
    } else if (st === 'sus') {
      MA.act.sus(kind === 'clue' ? 0 : kind === 'mix' ? P.sus : Math.floor(R() * 3))
    } else if (st === 'mine') {
      const o = MA.opts(), soc = o.map((x, i) => ({ x, i })).filter(z => z.x.k === 's')
      const goodS = soc.find(z => MA.SOCIAL.find(s => s.id === z.x.id).g > 0)
      const probes = o.map((x, i) => ({ x, i })).filter(z => z.x.k === 'p' && MA.PROBES.find(p => p.id === z.x.id).min <= c.turn)
      const cautious = MA.TALK[c.g.id].cautious
      if (kind === 'clue') {
        if (cautious && c.turn >= 6 && c.aff >= 1 && c.turn >= c.invBlock && red(c) === 0) MA.act.invite()
        else if (cautious && c.aff < 1 && goodS) MA.act.choose(goodS.i)
        else if (probes.length && c.run < 3) MA.act.choose(probes[0].i)
        else if (goodS) MA.act.choose(goodS.i)
        else MA.act.choose(probes.length ? probes[0].i : 0)
      } else if (kind === 'profile') {
        if (cautious && c.turn >= 6 && c.turn >= c.invBlock) MA.act.invite()
        else MA.act.choose(goodS ? goodS.i : 0)
      } else if (kind === 'mix') {
        if ((P.early && c.turn >= 2 && R() < .3) || (c.turn >= 6 && R() < .3)) MA.act.invite()
        else if (R() < P.bad) MA.act.choose(soc.length ? soc[0].i : 0)
        else if (R() < P.probe && o.some(x => x.k === 'p')) MA.act.choose(o.findIndex(x => x.k === 'p'))
        else MA.act.choose(goodS ? goodS.i : Math.floor(R() * 3))
      } else {
        if (c.turn >= 3 && R() < .15) MA.act.invite(); else MA.act.choose(Math.floor(R() * 3))
      }
    }
    MA.act.back(); MA.dbg.step(300)
  }
  guard = 0
  while (S().phase === 'chat' && guard++ < 300) MA.dbg.step(1000)
  guard = 0
  while (S().phase === 'meet' && guard++ < 80) {
    MA.dbg.step(3000)
    if (S().d2q) {
      MA.dbg.step(react)
      const g = MA.GIRLS.find(x => x.id === S().met[S().mi]), c = S().chats.find(x => x.g.id === g.id)
      const yes = kind === 'clue' ? (c && red(c) === 0 && g.full) : kind === 'mix' ? R() < P.d2 : kind === 'profile' || kind === 'meetall' ? true : R() < .5
      MA.act.d2ask(yes); continue
    }
    const d = MA.d2opts()
    if (d.length) {
      MA.dbg.step(react)
      const g = MA.GIRLS.find(x => x.id === S().met[S().mi]), o = g.date2.o
      const k = kind === 'clue' || kind === 'profile' || (kind === 'mix' && R() < .6) ? d.reduce((x, y) => (o[y].g > o[x].g ? y : x), d[0]) : d[Math.floor(R() * d.length)]
      MA.act.date2K(k); continue
    }
    MA.act.nextMeet()
  }
  let g2 = 0
  while (S().view === 'vEnding' && g2++ < 3) MA.act.toNote()
  const r = MA.score()
  return { pts: r.pts, rank: r.rank, end: S().ending, met: S().met.slice(), phase: S().phase }
}
`
