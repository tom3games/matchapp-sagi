// 相手の一言と、こちらの3択が噛み合っているかの点検。node check_talk.mjs [出力先]
// 相手の文が「？」で終わるのに専用の答え（QA）が無い組を数える。全組を表にして目で通読する
import { readFileSync, writeFileSync } from 'node:fs'
const ROOT = import.meta.dirname
globalThis.window = {}
const src = readFileSync(ROOT + '/data.js', 'utf8') + readFileSync(ROOT + '/talk.js', 'utf8') + ';return { GIRLS, TALK, QA, GREET, GREET_LINES, SAD, SAD_LINES, TIRED_LINES, REPLY, BRIDGE, PROBES, SOCIAL, styleOf, REACT, REACT_LINES, REACT_BRIDGE }'
const D = new Function(src)()
const lines = [], bad = []
for (const g of D.GIRLS) {
  const t = D.TALK[g.id]; if (!t) continue
  const her = [['open', t.open], ...Object.entries(t.ans).map(([k, v]) => ['ans.' + k, v]), ...(t.nice || []).map((v, i) => ['nice' + i, v]), ...(t.meh || []).map((v, i) => ['meh' + i, v]), ...Object.entries(t.re || {}).map(([k, v]) => ['re.' + k, v]), ['early', t.early]].filter(x => x[1])
  for (const [k, v] of her) {
    const ctx = v[0], set = D.QA[ctx] || (D.GREET_LINES.includes(ctx) ? D.GREET : D.SAD_LINES.includes(ctx) ? D.SAD : null)
    let opts
    if (set) opts = set.a.map(a => `[${a[0]}] ${a[1]}`).concat([`[探り] ${set.p[0]}（次の質問）`])
    else if (D.REACT_LINES.includes(ctx)) opts = [`[探り] ${D.REACT_BRIDGE[0]}（次の質問）`, '[話題を変える返し] ' + Object.keys(D.REACT).filter(x => x !== 'empathy2').map(x => D.REACT[x][0].slice(0, 12)).join(' / ')]
    else opts = [`[探り] ${D.BRIDGE[0]}（次の質問）`, ...(D.TIRED_LINES.includes(ctx) ? ['[empathy2] ' + D.REPLY.empathy2[0]] : []), '[受ける返し] ' + Object.keys(D.REPLY).filter(x => x !== 'empathy2').map(x => D.REPLY[x][0].slice(0, 12)).join(' / ')]
    const q = /[？?](笑)?\s*$|？できない/.test(ctx) && !/^(1年くらい|え、ちょっと前)/.test(ctx)
    const ok = !q || !!D.QA[ctx]
    if (!ok) bad.push(`${g.id} ${k}: ${ctx}`)
    lines.push(`| ${g.id} | ${k} | ${ctx.replace(/\|/g, '/')} | ${q ? '質問' : set === D.SAD ? 'つらい話' : set === D.GREET ? 'あいさつ' : D.REACT_LINES.includes(ctx) ? '短い反応' : 'ふつう'} | ${opts.join('<br>')} | ${ok ? 'OK' : 'NG'} |`)
  }
}
const out = `# 相手の一言とこちらの3択（${lines.length}組・NG ${bad.length}）\n\n| 子 | 種類 | 相手の一言 | 文の種類 | こちらの3択 | 判定 |\n|---|---|---|---|---|---|\n` + lines.join('\n') + '\n'
writeFileSync(process.argv[2] || ROOT + '/shots/talk_check.md', out)
console.log(`組 ${lines.length} / NG ${bad.length}`); if (bad.length) console.log(bad.join('\n'))
process.exit(bad.length ? 1 : 0)
