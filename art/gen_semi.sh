#!/bin/zsh
# 使い方: ./gen_semi.sh <key> <参照画像パス>
cd ${0:a:h}
python3 ~/.claude/skills/3d-homepage/scripts/codex_imagegen.py raw_semi/$1.png prompts_semi/$1.md $2 --quality high --size 1024x1536 > logs/s_$1.log 2>&1
echo "$1 $?"
