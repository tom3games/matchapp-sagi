// threads/*.js の点検。node check_threads.mjs [id...]  → 形・数・噛み合わせの機械チェック、表を shots/threads_check.md に出す
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
const ROOT = import.meta.dirname
const ids = process.argv.slice(2).length ? process.argv.slice(2) : 'abcdefghijkl'.split('')
const STY = ['polite', 'light', 'empathy', 'praise', 'long', 'lewd', 'doubt', 'probe']
const BAN = /(ディズニー|USJ|ユニバ|スタバ|スターバックス|マック|マクドナルド|LINE以外|iPhone|インスタ|Instagram|TikTok|ペアーズ|タップル|Tinder|Pairs|Omiai|ユニクロ|無印|コンビニ名)/
let errs = [], rows = [], nBeats = 0, nThreads = 0
for (const id of ids) {
  const f = `${ROOT}/threads/${id}.js`
  if (!existsSync(f)) { errs.push(`${id}: ファイルが無い`); continue }
  const T = {}; new Function('THREADS', readFileSync(f, 'utf8'))(T)
  const th = T[id]
  if (!Array.isArray(th) || th.length < 3) { errs.push(`${id}: 筋が3本未満`); continue }
  th.forEach((t, ti) => {
    nThreads++
    if (!t.topic || t.topic.length !== 2) errs.push(`${id}#${ti}: topic`)
    if (!Array.isArray(t.beats) || t.beats.length < 8) errs.push(`${id}#${ti}: 往復が8未満 (${t.beats && t.beats.length})`)
    ;(t.beats || []).forEach((b, bi) => {
      nBeats++
      const w = `${id}#${ti}.${bi}`
      if (!b.her || b.her.length !== 2 || !b.her[0] || !b.her[1]) errs.push(`${w}: her`)
      const q = /[？?]/.test(b.her[0].slice(-6))
      if (q && !b.q) errs.push(`${w}: 質問なのに q:1 が無い 「${b.her[0]}」`)
      if (!Array.isArray(b.o) || b.o.length !== 3) { errs.push(`${w}: 選択肢が3つでない`); return }
      const st = b.o.map(o => o.s)
      if (new Set(st).size !== 3) errs.push(`${w}: 型が重複 ${st}`)
      b.o.forEach((o, oi) => {
        if (!STY.includes(o.s)) errs.push(`${w}.${oi}: 型 ${o.s}`)
        for (const k of ['t', 'r']) if (!o[k] || o[k].length !== 2 || !o[k][0] || !o[k][1]) errs.push(`${w}.${oi}: ${k}`)
        if (o.s === 'probe' && o.min == null) errs.push(`${w}.${oi}: probe に min が無い`)
      })
      const all = [b.her, ...b.o.flatMap(o => [o.t, o.r])].flat().join(' ')
      if (BAN.test(all)) errs.push(`${w}: 実在の名前 ${all.match(BAN)[0]}`)
      rows.push(`| ${w} | ${t.topic[0]} | ${b.her[0]}${b.q ? '（質問）' : ''} | ${b.o.map(o => `[${o.s}${o.c ? '・手がかり' : ''}] ${o.t[0]} → ${o.r[0]}`).join('<br>')} |`)
    })
  })
}
writeFileSync(`${ROOT}/shots/threads_check.md`, `# 筋 ${nThreads} 本・往復 ${nBeats}・NG ${errs.length}\n\n| 場所 | 話題 | 相手 | 3択 → 相手の返事 |\n|---|---|---|---|\n` + rows.join('\n') + '\n')
console.log(`筋 ${nThreads} / 往復 ${nBeats} / NG ${errs.length}`); if (errs.length) console.log(errs.slice(0, 40).join('\n'))
process.exit(errs.length ? 1 : 0)
