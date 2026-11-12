#!/bin/zsh
# raw/*.png → img/*.webp（幅720）。引数で指定したものだけ、無ければ全部
cd ${0:a:h}
for f in ${@:-$(ls raw/*.png | xargs -n1 basename | sed 's/.png//')}; do
  cwebp -quiet -q 78 -resize 720 0 raw/$f.png -o ../img/$f.webp
done
ls -la ../img | awk '{s+=$5} END {print s/1024 " KB total"}'
