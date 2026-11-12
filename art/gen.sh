#!/bin/zsh
# 使い方: ./gen.sh <key> [参照画像のkey]
k=$1; r=$2; cd ${0:a:h}
if [[ -n $r ]]; then ref=raw/$r.png; else ref=; fi
python3 ~/.claude/skills/3d-homepage/scripts/codex_imagegen.py raw/$k.png prompts/$k.md $ref --quality high --size 1024x1536 > logs/$k.log 2>&1
echo "$k $?"
