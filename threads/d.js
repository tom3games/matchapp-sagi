// りな（アパレル・自撮り・写真詐欺）。ノリと褒めが刺さる、長文は「ながっ」。全身・最近の写真・顔出し通話・昼の約束をはぐらかす。写真を疑う（doubt）は地雷
THREADS.d = [
  { topic: ['服屋の店員', 'Working the shop floor'], beats: [
    { her: ['てか今日、新作の入荷日でずっと段ボール開けてた笑 腕しぬ', "ugh today was new-arrivals day, opened boxes all day lol. my arms are dead"], o: [
      { s: 'light', t: ['おつかれ〜 段ボールと戦う店員さん笑', "good work~ shop girl vs cardboard lol"], r: ['まじ戦いだった笑 しかも全敗', "it was literal war lol. and i lost every round"] },
      { s: 'polite', t: ['入荷日ってそんなに大変なんだ。何箱くらい開けるの？', "new-arrivals day sounds rough. how many boxes do you open?"], r: ['50箱くらい？数えたくない笑', "like 50? don't wanna count lol"] },
      { s: 'long', t: ['俺も前に倉庫でバイトしてて、段ボールって腰にくるし手も切れるし、カッターの刃も替えなきゃだし、あの頃は毎日湿布貼ってて…', "i used to work at a warehouse, boxes wreck your back, you cut your hands, you gotta keep changing blades, i had pain patches on every day back then and..."], r: ['ながっ笑 湿布の話はいいよ〜', "too long lol. skip the patches~"] },
    ] },
    { her: ['でも新作かわいいの多かった〜 冬のニットとか', "but the new stuff is so cute~ like the winter knits"], o: [
      { s: 'praise', t: ['りなちゃんが着たら絶対かわいいやつじゃん', "those would look so cute on you, no doubt"], r: ['でしょ〜笑 もう3枚取り置きした', "right?~ lol already put three on hold"] },
      { s: 'empathy', t: ['売ってる側でも欲しくなるよね。店員さんが一番のお客さんになりそう', "you'd want them even while selling them. bet the staff are the best customers"], r: ['それ〜 給料だいたい服に消える笑', "exactly~ my paycheck basically turns into clothes lol"] },
      { s: 'probe', min: 1, c: 1, t: ['お店って梅田のほう？', "is the shop over in umeda?"], r: ['そう梅田〜 地下のほう。照明暗めで落ち着くの', "yeah umeda~ the underground part. the lights are kinda dim, it's chill"] },
    ] },
    { her: ['てか服とか好き？いつもどんな系着てる？', "do you even like clothes? what's your usual style?"], q: 1, o: [
      { s: 'light', t: ['全身黒。迷ったら黒', "all black. when in doubt, black"], r: ['出た〜全身黒笑 楽なのはわかる', "classic all black lol. easy, i get it"] },
      { s: 'polite', t: ['シンプルなのが多いかな。白シャツとデニムとか', "pretty simple. white shirt and jeans, that kind of thing"], r: ['いいじゃん清潔感〜 そういう人すき', "nice, clean look~ i like that"] },
      { s: 'praise', t: ['正直よくわからない。りなちゃんみたいなおしゃれな人に選んでほしい', "honestly no idea. i'd want someone stylish like you to pick for me"], r: ['でしょ〜笑 まかせて', "right?~ lol leave it to me"] },
    ] },
    { her: ['今度お店来たら選んであげる〜 でも平日の夜ね笑', "come by the shop sometime and i'll pick stuff for you~ weekday nights tho lol"], o: [
      { s: 'light', t: ['え、店員さんって指名できるの？笑', "wait, you can request a specific shop girl? lol"], r: ['できるできる笑 りな指名で〜', "yep yep lol. ask for rina~"] },
      { s: 'probe', min: 3, c: 1, t: ['夜なんだ。土曜の昼に行こうかと思ってた', "nights, huh. i was thinking saturday afternoon"], r: ['昼は…いないことにしといて笑 夜のほうが落ち着くし', "daytime is... let's say i'm not there lol. nights are calmer"] },
      { s: 'doubt', t: ['お店で会ったら写真と全然ちがったりして笑', "bet you look totally different from your pics in person lol"], r: ['…は？そういうのいいから', "...excuse me? not doing this"] },
    ] },
    { her: ['ごめん、お客さん来てた〜 閉店前に限って来るのなんで笑', "sorry, a customer came in~ why do they always show up right before closing lol"], pause: 1, o: [
      { s: 'empathy', t: ['閉店まぎわの客あるあるだね。断れないし', "the classic closing-time customer. and you can't turn them away"], r: ['それ〜 しかも試着5着とか笑', "right~ and they try on like five things lol"] },
      { s: 'praise', t: ['閉店前でも会いに来たくなる店員さんなんでしょ', "they just wanna see the cute shop girl before closing"], r: ['でしょ〜笑 うまいこと言う', "right?~ lol smooth"] },
      { s: 'long', t: ['閉店前の客って、俺の友達も飲食で働いてて、ラストオーダーのあとに来る客が多いって言ってて、それ聞いてから俺はどこでも絶対早めに入るようにしてて…', "closing-time customers, so my friend works in a restaurant and says tons of people show up after last order, and ever since he told me that i always make sure to go early and..."], r: ['ながっ笑 で、早めに来る人なのね', "too long lol. so you're an early guy, got it"] },
    ] },
    { her: ['試着室の鏡ってさ、店によって盛れ方ちがうの知ってた？', "did you know fitting room mirrors flatter you differently depending on the shop?"], q: 1, o: [
      { s: 'light', t: ['知らなかった。じゃあ盛れる店で買うわ笑', "had no idea. guess i'll shop where the mirrors lie lol"], r: ['それが正解笑 うちの鏡めっちゃ盛れるよ', "correct answer lol. our mirrors are super flattering"] },
      { s: 'polite', t: ['初めて聞いた。照明とか角度で変わるの？', "first i've heard of it. is it the lights or the angle?"], r: ['そう、上からの照明と、鏡がちょっと傾いてるの〜 プロの技笑', "yep, light from above and the mirror's tilted a little~ pro tricks lol"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['知ってた。りなちゃんの写真も、そういう盛れる場所で撮ってるの？', "i knew that. do you take your pics somewhere flattering like that too?"], r: ['え〜写真の話はいいじゃん笑 次いこ次', "ehh let's skip photo talk lol. next, next"] },
    ] },
    { her: ['てか店員って自分の店の服着なきゃなの。だから毎シーズン買うんだよね', "also staff have to wear the shop's own clothes. so i buy a new set every season"], o: [
      { s: 'empathy', t: ['それ実質、給料の一部返してるやつじゃん。きついね', "so you're basically handing part of your pay back. that's rough"], r: ['ほんとそれ〜 わかってくれる人すき', "exactly~ i like people who get it"] },
      { s: 'praise', t: ['毎シーズン新作着こなしてるの、普通にすごい', "pulling off the new stuff every season is honestly impressive"], r: ['でしょ〜笑 歩く広告だから', "right?~ lol i'm a walking ad"] },
      { s: 'probe', min: 3, c: 1, t: ['じゃあ今シーズンのコーデ、全身で見せてよ', "then show me this season's outfit, full body"], r: ['全身は〜会えばわかるよ笑', "full body... you'll see when we meet lol"] },
    ] },
    { her: ['ねえ、会うなら夜がいいな。仕事終わりの21時とか', "hey, if we meet, nights are better. like 9pm after work"], o: [
      { s: 'light', t: ['21時了解。終電までの勝負だね笑', "9pm, got it. a race against the last train lol"], r: ['それな笑 暗めの居酒屋知ってる〜', "lol yes. i know a dim little izakaya~"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['休みの日の昼にお茶とかはだめ？', "what about tea on a day off, in the afternoon?"], r: ['昼は〜ちょっと苦手笑 明るいと落ち着かないの', "daytime is... not my thing lol. too bright, i can't relax"] },
      { s: 'lewd', t: ['じゃあそのまま朝まで一緒にいようよ', "then let's just stay together till morning"], r: ['え、そういうのはいいかな', "uh, i'll pass on that"] },
    ] },
    { her: ['会う前に通話とかする派？', "are you the type to call before meeting?"], q: 1, o: [
      { s: 'polite', t: ['できたら一回声を聞きたいかな。顔なしでもいいし', "i'd like to hear your voice once, if that's ok. camera off is fine"], r: ['声だけならいいよ〜 顔は会ってからのお楽しみ笑', "voice only is fine~ my face is a surprise for when we meet lol"], c: 1 },
      { s: 'light', t: ['しない派。会ったほうが早い', "nope. meeting is faster"], r: ['わかる〜 そっちのほうが楽しいじゃん', "same~ way more fun that way"] },
      { s: 'probe', min: 3, c: 1, t: ['ビデオ通話したい。お店の服着てるとこ見たい', "i'd like a video call. wanna see you in the shop's clothes"], r: ['ビデオは無理〜 部屋汚いし笑 声ならいいよ', "video's a no~ my room's a mess lol. voice is ok"] },
    ] },
  ] },
  { topic: ['ひとり韓国旅行', 'Solo trip to Korea'], beats: [
    { her: ['てか韓国好き？私この前ひとりで行ってきた〜', "do you like korea? i just went on my own~"], q: 1, o: [
      { s: 'polite', t: ['まだ行ったことない。ひとりで行けるのすごいね', "never been. going alone is impressive"], r: ['すごくないよ〜 2泊で食べて買って終わり笑', "nah~ two nights of eating and shopping, that's it lol"] },
      { s: 'praise', t: ['好き。りなちゃん、向こうにいても馴染んでそう', "i do. bet you blended right in over there"], r: ['でしょ〜笑 現地の人に道聞かれた', "right?~ lol a local asked me for directions"] },
      { s: 'long', t: ['好き好き、俺も3年前に行って、屋台で辛いの食べすぎて次の日ずっとホテルで寝てて、2日目の予定が全部なくなって、帰りの空港でも…', "love it, i went three years ago, ate way too much spicy street food, spent the next day in the hotel, lost all of day two, and even at the airport on the way back..."], r: ['ながっ笑 で、何食べたの', "too long lol. so what'd you eat"] },
    ] },
    { her: ['屋台のトッポッキが一番おいしかった〜 あと夜の市場', "the street tteokbokki was the best~ and the night market"], o: [
      { s: 'empathy', t: ['屋台の辛いのって、寒い夜に食べると最高だよね', "spicy street food on a cold night hits different"], r: ['それ〜 鼻すすりながら食べた笑', "yesss~ i was sniffling the whole time lol"] },
      { s: 'light', t: ['夜の市場で全部買い占めてそう笑', "bet you bought out the whole night market lol"], r: ['バレた笑 スーツケースぱんぱん', "busted lol. suitcase was bursting"] },
      { s: 'probe', min: 1, c: 1, t: ['夜の市場いいね。何時くらいまでやってるの？', "night markets sound fun. how late are they open?"], r: ['朝までやってるとこもある〜 私も夜型だから天国だった', "some go till morning~ i'm a night owl so it was heaven"] },
    ] },
    { her: ['てか辛いの得意？', "wait, can you handle spicy food?"], q: 1, o: [
      { s: 'light', t: ['無理。甘口のカレーで汗かく', "nope. mild curry makes me sweat"], r: ['かわい笑 じゃあ私が全部食べる', "cute lol. then i'll eat it all"] },
      { s: 'polite', t: ['わりと得意。激辛の店とかたまに行くよ', "pretty good actually. i go to super spicy places sometimes"], r: ['え、じゃあ今度辛いの勝負しよ〜', "ooh, then let's have a spice battle sometime~"] },
      { s: 'long', t: ['得意…と言いたいけど、前に激辛ラーメンに挑戦したら、三口目で汗が止まらなくなって、店員さんに水を5回頼んで、最後は友達に…', "i'd like to say yes, but i once tried a super spicy ramen, by the third bite i was drenched, asked the staff for water five times, and in the end my friend..."], r: ['ながっ笑 結局だめだったのね', "too long lol. so you lost"] },
    ] },
    { her: ['あと韓国コスメもめっちゃ買った〜 肌つるつるになるやつ', "also bought tons of korean skincare~ the kind that makes your skin super smooth"], o: [
      { s: 'praise', t: ['これ以上つるつるになってどうするの', "how much smoother do you even need to get"], r: ['でしょ〜笑 上には上があるの', "right?~ lol there's always another level"] },
      { s: 'polite', t: ['男でも使えるやつある？乾燥ひどくて', "anything a guy can use? my skin's super dry"], r: ['あるある！化粧水から教えてあげる〜', "totally! i'll start you off with toner~"] },
      { s: 'probe', min: 3, c: 1, t: ['写真の肌が白いのも、コスメの力？', "is that the skincare too, how pale you look in your pics?"], r: ['まあそんな感じ〜笑 写真の話はいいって', "kinda~ lol enough about the pics"] },
    ] },
    { her: ['ごめん寝落ちしかけてた笑 韓国ドラマ一気見してて', "sorry, almost fell asleep lol. was bingeing korean dramas"], pause: 1, o: [
      { s: 'light', t: ['何話目で力尽きたの', "what episode took you out"], r: ['12話〜 主人公がやっと告白したとこ笑', "ep 12~ right when the lead finally confessed lol"] },
      { s: 'empathy', t: ['一気見すると止まらないよね。気づいたら夜中の2時とか', "once you start, you can't stop. suddenly it's 2am"], r: ['わかる〜 毎日3時就寝笑', "i know~ i sleep at 3 every night lol"] },
      { s: 'lewd', t: ['寝落ちするなら隣で寝かせてよ', "if you're falling asleep, let me sleep next to you"], r: ['え、まだそういうの早い〜', "uh, way too soon for that~"] },
    ] },
    { her: ['韓国ドラマってさ、だいたい雨の中で告白するんだよね', "in korean dramas the confession is always in the rain"], o: [
      { s: 'light', t: ['じゃあ告白するときは雨待ちだ笑', "so i should wait for rain to confess lol"], r: ['それな笑 傘はさしてあげない', "exactly lol. and i'm not sharing my umbrella"] },
      { s: 'praise', t: ['りなちゃんなら雨の中でも絵になる', "you'd look good even soaked in the rain"], r: ['でしょ〜笑 でも髪くずれるからやだ', "right?~ lol but it ruins my hair, so no"] },
      { s: 'probe', min: 3, c: 1, t: ['ドラマみたいに、昼の公園で会うのはどう？', "what about meeting in a park in the afternoon, like a drama?"], r: ['昼の公園は〜明るすぎ笑 夜の雨ならいいよ', "a park in daylight... too bright lol. night rain is fine"] },
    ] },
    { her: ['次の連休もまた韓国行きたいんだよね〜 誰か一緒に行ってくれないかな笑', "i wanna go back to korea next long weekend~ wish someone would come with me lol"], o: [
      { s: 'light', t: ['荷物持ちならやる', "i'll volunteer as luggage carrier"], r: ['採用笑 スーツケース2個ね', "hired lol. two suitcases"] },
      { s: 'polite', t: ['行ってみたいな。おすすめの街とか教えてほしい', "i'd love to go. tell me which neighborhoods are good"], r: ['いいよ〜 市場の近くの屋台通りが一番', "sure~ the food stall street by the market is the best"] },
      { s: 'probe', min: 3, c: 1, t: ['旅行の写真見たい。りなちゃんが写ってるやつ', "i wanna see your trip pics. ones with you in them"], r: ['景色のならあるよ〜 私が写ってるのはないかも笑', "i've got scenery ones~ not sure i have any of me lol"] },
    ] },
    { her: ['でも旅行って朝早いのがやだ〜 すっぴん見られたくないし笑', "but i hate early mornings on trips~ don't want anyone seeing me without makeup lol"], o: [
      { s: 'light', t: ['朝はサングラス解禁で', "sunglasses allowed all morning, then"], r: ['それ天才笑 夜まで外さない', "genius lol. not taking them off till night"] },
      { s: 'empathy', t: ['朝の準備って時間かかるもんね。ゆっくり出発しよ', "getting ready takes time. we can leave late"], r: ['やさし〜 昼過ぎ出発ね笑', "so sweet~ leaving after noon then lol"] },
      { s: 'doubt', t: ['すっぴんと写真、別人だったりして笑', "bet you look like a different person without makeup lol"], r: ['…そういうこと言う人なんだ。ばいばい', "...so you're that type. bye"] },
    ] },
    { her: ['てかあの屋台のトッポッキ、また食べたすぎる。日本にも似た店ないかな', "i'm craving that street tteokbokki again. wish there was a place like it here"], o: [
      { s: 'light', t: ['探しとく。見つけたら一番に報告する', "i'll look. you'll be the first to know"], r: ['えらい笑 暗めの店でお願い', "good boy lol. a dim one, please"], c: 1 },
      { s: 'polite', t: ['うちの近くに韓国料理の店あるよ。ランチもやってる', "there's a korean place near me. they do lunch too"], r: ['ランチかぁ…夜もやってる？笑', "lunch, huh... are they open at night? lol"], c: 1 },
      { s: 'praise', t: ['トッポッキ食べてるりなちゃん、見てみたい', "i'd love to see you eating tteokbokki"], r: ['でしょ〜笑 食べてる顔かわいいよ', "right?~ lol my eating face is cute"] },
    ] },
  ] },
  { topic: ['夜だけのカフェ', 'The night-only cafe'], beats: [
    { her: ['今、仕事終わりにカフェ寄ってる〜 夜しかやってない店', "stopped by a cafe after work~ one that's only open at night"], o: [
      { s: 'light', t: ['夜しかやってないカフェ、もはやバーじゃん笑', "a cafe that's only open at night is basically a bar lol"], r: ['ちがうし笑 ちゃんとケーキある', "it's not lol. they have cake"] },
      { s: 'polite', t: ['夜だけのカフェいいね。何時までやってるの？', "a night-only cafe sounds nice. how late is it open?"], r: ['夜中の2時まで〜 照明暗くて落ち着くの', "till 2am~ the lights are dim, so it's chill"], c: 1 },
      { s: 'praise', t: ['夜カフェにいるってだけでおしゃれ', "being at a night cafe is already stylish"], r: ['でしょ〜笑 わかってる', "right?~ lol you get it"] },
    ] },
    { her: ['ここのプリン固めで最高なの。固め派？やわらかい派？', "their pudding is the firm kind and it's perfect. firm or soft?"], q: 1, o: [
      { s: 'light', t: ['固め派。スプーンが立つくらいがいい', "firm. the spoon should stand up in it"], r: ['わかってる〜 握手しよ笑', "you get it~ let's shake on it lol"] },
      { s: 'polite', t: ['やわらかい派かな。とろとろのやつ', "soft, i think. the melty kind"], r: ['えー派閥ちがう笑 でも許す', "ugh, rival faction lol. i'll allow it"] },
      { s: 'long', t: ['固め派で、昔おばあちゃんが作ってくれたプリンが、蒸し器で作るやつで、カラメルがちょっと苦くて、夏休みに行くと必ず冷蔵庫に…', "firm, because my grandma used to make it in a steamer, the caramel was a bit bitter, and every summer break there'd always be some in the fridge..."], r: ['ながっ笑 おばあちゃんのプリンは気になる', "too long lol. grandma's pudding sounds good tho"] },
    ] },
    { her: ['カフェ行くとき、車で連れてってもらうこと多いんだよね〜 夜のドライブすき', "i usually get driven to cafes~ i love night drives"], o: [
      { s: 'light', t: ['助手席で自撮りしてるタイプだ', "you're the selfie-in-the-passenger-seat type"], r: ['なんでわかるの笑 車の中の光っていい感じなの', "how'd you know lol. the light in a car is just right"] },
      { s: 'polite', t: ['車あるよ。夜の海沿いとか走るの好き', "i have a car. i like driving along the coast at night"], r: ['え、いいじゃん〜 連れてって', "ooh, nice~ take me"] },
      { s: 'long', t: ['俺も車好きで、去年中古で買ったんだけど、最初はエンストばっかりで、坂道発進が怖くて、駐車場でも前の車に…', "i love cars too, bought a used one last year, kept stalling at first, scared of hill starts, and in the parking lot i almost hit..."], r: ['ながっ笑 エンストする車は乗りたくない', "too long lol. i'm not riding in a stalling car"] },
    ] },
    { her: ['このカフェ、明るすぎないのがいいの。明るい店って落ち着かなくて', "what i like about this cafe is it's not too bright. bright places make me uneasy"], o: [
      { s: 'empathy', t: ['わかる。暗いほうが話しやすいよね', "i get it. it's easier to talk when it's dim"], r: ['そう〜わかってくれるじゃん', "yes~ you get me"] },
      { s: 'praise', t: ['暗い店でも、りなちゃんがいたら明るい', "even a dark place gets brighter with you there"], r: ['でしょ〜笑 うまい', "right?~ lol smooth"] },
      { s: 'probe', min: 3, c: 1, t: ['明るい店のほうが、写真きれいに撮れない？', "don't bright places make for better pics?"], r: ['写真は暗いほうが…いや、なんでもない笑', "pics actually look better when it's dark... never mind lol"] },
    ] },
    { her: ['ごめん、店員さんと話してた〜 ここの店員さん知り合いなの', "sorry, was chatting with the staff~ i know the guy who works here"], pause: 1, o: [
      { s: 'light', t: ['常連すぎる笑', "you're such a regular lol"], r: ['週3だから笑 もはや家', "three times a week lol. it's basically home"] },
      { s: 'polite', t: ['常連なんだね。どのくらい通ってるの？', "so you're a regular. how long have you been going?"], r: ['2年くらい？夜しか来たことないけど笑', "like two years? only ever at night tho lol"], c: 1 },
      { s: 'lewd', t: ['今からそっち行ってもいい？', "can i come over there right now?"], r: ['え、今日はむり〜 急すぎ', "uh, not tonight~ way too sudden"] },
    ] },
    { her: ['今度一緒に来ようよ〜 夜の10時とか空いてる？', "let's come here together sometime~ are you free like 10pm?"], q: 1, o: [
      { s: 'light', t: ['10時からカフェ、夜ふかし確定じゃん', "cafe at 10pm? that's an all-nighter for sure"], r: ['それがいいんじゃん笑', "that's the point lol"] },
      { s: 'polite', t: ['空いてる。ただ帰りが心配だから、駅から近い？', "i'm free. just worried about getting home, is it near the station?"], r: ['駅から3分〜 優しいじゃん', "3 min from the station~ aren't you sweet"] },
      { s: 'probe', min: 3, c: 1, t: ['夜もいいけど、休みの日の昼じゃだめ？', "nights are fine, but what about an afternoon on a day off?"], r: ['昼は〜寝てる笑 夜がいいの', "afternoons i'm... asleep lol. nights are better"] },
    ] },
    { her: ['ここのカウンター、ろうそくだけなの。雰囲気やばいよ', "the counter here is lit only by candles. the vibe is unreal"], o: [
      { s: 'praise', t: ['ろうそくの明かりのりなちゃん、絶対かわいい', "you by candlelight? definitely cute"], r: ['でしょ〜笑 会ったら惚れるよ', "right?~ lol you'll fall for me when we meet"] },
      { s: 'light', t: ['メニュー読めなさそう笑', "bet you can't even read the menu lol"], r: ['それな笑 毎回スマホのライトで読んでる', "so true lol. i read it with my phone light every time"] },
      { s: 'doubt', t: ['ろうそくだけって、顔見せたくないとか？笑', "only candles? is that so no one sees your face? lol"], r: ['…は？もういい', "...what? forget it"] },
    ] },
    { her: ['あ、店員さんがおまけでクッキーくれた〜 常連の特権', "oh, the staff gave me a free cookie~ regular perks"], o: [
      { s: 'light', t: ['常連の特権うらやま', "jealous of the regular perks"], r: ['でしょ〜笑 あげないよ', "right?~ lol not sharing"] },
      { s: 'empathy', t: ['そういうのうれしいよね。通ってるかいがある', "that kind of thing makes your day. worth being a regular"], r: ['そう〜 だからまた来ちゃう', "yes~ that's why i keep coming back"] },
      { s: 'probe', min: 3, c: 1, t: ['いいな。そのクッキーとりなちゃん、一緒に撮って送ってよ', "nice. send me a pic of you with the cookie"], r: ['クッキーだけ送る〜 私は暗くて写んない笑', "i'll send just the cookie~ i won't show up, it's too dark lol"] },
    ] },
    { her: ['ねえ、初めて会うならこのカフェありかも。暗いし落ち着くし', "hey, this cafe might be good for our first meet. it's dim and chill"], o: [
      { s: 'polite', t: ['いいね。最初は話しやすい店がいい', "sounds good. somewhere easy to talk is best at first"], r: ['でしょ〜 じゃあ決まり、夜ね', "right~ then it's decided. at night"] },
      { s: 'light', t: ['暗すぎてお互い見つけられなかったら笑う', "lol if it's so dark we can't find each other"], r: ['私が見つけるから大丈夫笑', "don't worry, i'll find you lol"] },
      { s: 'long', t: ['初めて会うときって緊張するよね。前に友達の紹介で会ったときも、待ち合わせの30分前に着いちゃって、ずっと鏡の前で髪直してて…', "first meets make me nervous. once when a friend set me up, i got there 30 minutes early and kept fixing my hair in a mirror and..."], r: ['ながっ笑 緊張しなくていいよ〜', "too long lol. no need to be nervous~"] },
    ] },
  ] },
]
