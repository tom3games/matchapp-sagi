// みゆ（i）: 褒めと軽いノリに即食いつく（褒めると「今日会お！」）。ほころび＝毎週だれかと会っている・今も別の人と話している・いいねの数の自慢・すぐ会おうとする
THREADS.i = [
  { topic: ['ハートのラテ', 'The heart latte'], beats: [
    { her: ['2枚目のラテ、駅前のカフェのやつ〜 ハートじょうずでしょ', "pic 2 is a latte from the cafe by the station~ cute heart right"], o: [
      { s: 'praise', t: ['ラテより、横で指ハートしてる手がかわいい', "the finger heart next to it is cuter than the latte"], r: ['え〜うれしい！今日会お！', "aww yay! let's meet today!"], c: 1 },
      { s: 'light', t: ['ラテにまでハート作らせてる', "u even got the latte to make a heart for u"], r: ['でしょ〜笑 ハート集めてる', "right~ lol i collect hearts"] },
      { s: 'polite', t: ['きれいなラテアートですね。よく行くお店なんですか', 'That\'s beautiful latte art. Do you go there often?'], r: ['うん〜 週3くらい？いつもそこで会ってる', "yea~ like 3 times a week? i always meet guys there"], c: 1 },
    ] },
    { her: ['あそこの店員さん、もう顔おぼえてくれてる〜', "the staff there know my face now~"], o: [
      { s: 'light', t: ['もう常連の域', "that's regular status"], r: ['毎回ちがう人と行くから、たぶん有名笑', "i go w/ a different guy every time so i'm prob famous lol"], c: 1 },
      { s: 'empathy', t: ['顔を覚えてもらえると、ちょっとうれしいよね', "It's kind of nice when they remember you."], r: ['わかる〜 安心する', "ikr~ it's comforting"] },
      { s: 'probe', t: ['毎回だれと行ってるの？', "who do u usually go with?"], r: ['そのときマッチした人〜 今週は3人', "whoever i matched with~ 3 this week"], min: 1, c: 1 },
    ] },
    { her: ['ラテ派？ブラック派？', "latte or black?"], q: 1, o: [
      { s: 'light', t: ['ラテ。ハートは自分で飲む', "latte. i drink the heart myself"], r: ['ウケる笑', "lol"] },
      { s: 'polite', t: ['ブラックです。甘いものと一緒に頼むことが多いです', 'Black. I usually get something sweet on the side.'], r: ['大人〜', "so grown up~"] },
      { s: 'long', t: ['基本はブラックだけど、疲れてる日はラテにして、夏はアイスで、冬はホットで、たまに甘いのが飲みたくなったらキャラメルのやつも頼む', 'Usually black, but a latte when I\'m tired, iced in summer, hot in winter, and sometimes the caramel one when I want something sweet'], r: ['ながい〜 てか要するにラテ？', "long~ so basically latte?"] },
    ] },
    { her: ['いまもそのカフェにいる〜', "im at that cafe rn~"], o: [
      { s: 'light', t: ['ハート何杯目？', "how many hearts so far?"], r: ['2杯目〜 1杯目はさっきの人のぶん', "2nd one~ the 1st was w/ the guy before"], c: 1 },
      { s: 'praise', t: ['カフェにいるみゆちゃん、絶対かわいい', "u at the cafe rn is def cute"], r: ['え〜好き！今からくる？', "aww i like u! wanna come now?"], c: 1 },
      { s: 'probe', t: ['1人で？', "alone?"], r: ['いまは1人〜 さっきまで別の人いた', "alone now~ someone else was here till a bit ago"], min: 1, c: 1 },
    ] },
    { her: ['ごめん〜 ほかの人から通知きてた笑', "sorry~ got a notif from someone else lol"], pause: 1, o: [
      { s: 'light', t: ['人気者の通知ラッシュ', "popular girl notification rush"], r: ['いいね1180だもん〜', "i have 1180 likes~"], c: 1 },
      { s: 'empathy', t: ['通知多いと、返すの大変だよね', "Lots of notifications must be tiring to keep up with."], r: ['うん〜 でもきらいじゃない', "yea~ but i don't hate it"] },
      { s: 'doubt', t: ['ほかの人ともやりとりしてるんだ', "so ur talking to other guys too"], r: ['してるよ〜？みんなしてない？', "yea~? doesn't everyone?"], c: 1 },
    ] },
    { her: ['駅前のカフェ、行ったことある？', "ever been to that cafe by the station?"], q: 1, o: [
      { s: 'light', t: ['ない。ハートのラテ頼む練習しとく', "nope. gonna practice ordering a heart latte"], r: ['笑 いっしょにいこ〜', "lol let's go together~"] },
      { s: 'polite', t: ['まだです。おすすめのメニューはありますか', 'Not yet. Is there anything you recommend?'], r: ['ラテ！あとプリン〜', "the latte! and the pudding~"] },
      { s: 'praise', t: ['ない。でもみゆちゃんがいるなら毎日行く', "no. but i'd go every day if ur there"], r: ['え〜好き！今日いこ！', "aww i like u! let's go today!"] },
    ] },
    { her: ['今日20時ならそこいるよ〜', "i'll be there at 8 tonight~"], o: [
      { s: 'light', t: ['20時ね。ラテ2つ頼んどいて', "8 it is. order 2 lattes"], r: ['いいよ〜 21時から別の約束あるけど笑', "ok~ i have another plan at 9 tho lol"], c: 1 },
      { s: 'polite', t: ['今日ですか。急なので少し考えさせてください', 'Today? That\'s sudden, let me think about it.'], r: ['え〜考えなくていいのに', "aww u don't have to think~"] },
      { s: 'probe', t: ['20時のあとも予定あるの？', "do u have plans after 8?"], r: ['21時にもう1人〜 でもそれまではいっしょ', "another guy at 9~ but till then we're together"], min: 2, c: 1 },
    ] },
    { her: ['わたし、褒めてくれる人とすぐ会っちゃうんだよね〜', "i end up meeting guys who compliment me super fast~"], o: [
      { s: 'light', t: ['知ってる。プロフに書いてあった', "i know. it's in ur profile"], r: ['読んでくれてる〜うれしい', "u read it~ yay"] },
      { s: 'empathy', t: ['褒められると、安心するもんね', "Compliments make you feel safe, right."], r: ['うん〜 褒め言葉あつめてる', "yea~ i collect compliments"] },
      { s: 'probe', t: ['今週、何人くらい会った？', "how many guys did u meet this week?"], r: ['4人〜？数えてない笑', "4~? didn't count lol"], min: 3, c: 1 },
    ] },
    { her: ['で、今日くる？', "so, u coming today?"], q: 1, o: [
      { s: 'praise', t: ['かわいい子に呼ばれたら行くしかない', "when a cute girl calls, i go"], r: ['え〜好き！20時ね！', "aww i like u! 8 o'clock!"] },
      { s: 'polite', t: ['今日はむずかしいです。週末はどうですか', 'Today is difficult. How about the weekend?'], r: ['週末は埋まってる〜', "weekend's booked~"], c: 1 },
      { s: 'light', t: ['ラテのハートが消える前に行く', "i'll get there before the heart melts"], r: ['はやくきて〜笑', "hurry~ lol"] },
    ] },
  ] },
  { topic: ['タクシーの窓の夜景', 'City lights from the taxi'], beats: [
    { her: ['3枚目、きのうの帰りのタクシー〜 夜景きれいじゃない？', "pic 3 is the taxi home last night~ isnt the view pretty?"], q: 1, o: [
      { s: 'praise', t: ['夜景より、窓にうつってる手がきれい', "ur hand in the window reflection is prettier than the view"], r: ['え〜そこ見る？好き！', "omg u noticed that? i like u!"] },
      { s: 'light', t: ['きれい。でもちょっとブレてる笑', "pretty. kinda blurry tho lol"], r: ['酔ってたから笑', "i was tipsy lol"] },
      { s: 'polite', t: ['きれいですね。遅くまで出かけてたんですか', 'It\'s lovely. Were you out late?'], r: ['うん〜 2軒はしごした', "yea~ hit 2 places"] },
    ] },
    { her: ['きのうは2軒目まで行って、そのあと解散〜', "went to 2 places yesterday then called it~"], o: [
      { s: 'light', t: ['解散して1人タクシー、大人', "solo taxi after, very grown up"], r: ['1人じゃなかったけど笑', "wasn't solo tho lol"], c: 1 },
      { s: 'empathy', t: ['楽しかったんだね。お酒は強いの？', "Sounds fun. Can you hold your drink?"], r: ['ふつう〜 でもよく飲む', "average~ but i drink a lot"] },
      { s: 'probe', t: ['だれと飲んでたの？', "who were u drinking with?"], r: ['アプリの人〜 その前は別の人とごはん', "a guy from the app~ dinner w/ another one before that"], min: 1, c: 1 },
    ] },
    { her: ['夜ふかしする？', "do u stay up late?"], q: 1, o: [
      { s: 'light', t: ['する。いまも起きてる', "yep. im up rn"], r: ['なかま〜笑', "same~ lol"] },
      { s: 'polite', t: ['平日は0時には寝るようにしてます', 'On weeknights I try to be asleep by midnight.'], r: ['えらい〜 わたし3時', "good boy~ im up till 3"] },
      { s: 'long', t: ['最近は早く寝ようとしてるんだけど、寝る前についスマホを見ちゃって、動画を一本だけのつもりが気づいたら2時で、次の日の朝つらいっていうのを毎週やってる', 'I\'ve been trying to sleep earlier, but I check my phone in bed, say just one video, and suddenly it\'s 2 am and the next morning is rough, every week'], r: ['ながい〜 要するに夜ふかし？笑', "long~ so basically yes? lol"] },
    ] },
    { her: ['夜って、だれかとしゃべってないとさみしくない〜？', "don't u get lonely at night if ur not talking to someone~?"], q: 1, o: [
      { s: 'light', t: ['だからいま、しゃべってる', "that's why im talking to u now"], r: ['それ〜笑', "exactly~ lol"] },
      { s: 'empathy', t: ['わかる、夜は人恋しくなるよね', "I get it. Nights make you miss people."], r: ['でしょ〜 だから毎日だれかと会ってる', "right~ that's why i meet someone every day"], c: 1 },
      { s: 'lewd', t: ['さみしいなら、今から行こうか', "if ur lonely, want me to come over now?"], r: ['え〜笑 今日は先約ある〜', "lol~ i already have plans tonight"], c: 1 },
    ] },
    { her: ['ごめん〜 寝落ちしてた', "sorry~ fell asleep"], pause: 1, o: [
      { s: 'light', t: ['夜ふかし宣言から寝落ちまでが早い', "that was fast for a night owl"], r: ['ウケる笑 ほかの人とも話してたから疲れた', "lol i was talking to other guys too so i got tired"], c: 1 },
      { s: 'polite', t: ['おはようございます。ゆっくり休めましたか', 'Good morning. Did you get some rest?'], r: ['うん〜 3時間', "yea~ 3 hours"] },
      { s: 'doubt', t: ['寝落ち？ほかの人と話してたとか？', "fell asleep? or talking to someone else?"], r: ['どっちも〜笑', "both~ lol"], c: 1 },
    ] },
    { her: ['夜景みにいくなら、どこがいい？', "if we went to see the city lights, where?"], q: 1, o: [
      { s: 'light', t: ['観覧車のてっぺん', "the top of a ferris wheel"], r: ['いいね〜 てっぺんで写真とる', "nice~ i'll take a pic at the top"] },
      { s: 'praise', t: ['みゆちゃんの隣なら、どこでも夜景', "anywhere next to u is a night view"], r: ['え〜好き！今日いこ！', "aww i like u! let's go today!"] },
      { s: 'polite', t: ['高いビルの展望台はどうでしょう', 'How about an observation deck on a tall building?'], r: ['いいね〜 先週も行った笑', "nice~ went last week too lol"], c: 1 },
    ] },
    { her: ['タクシーの写真、いいねめっちゃついた〜', "the taxi pic got sooo many likes~"], o: [
      { s: 'light', t: ['タクシーにだけは負けたくない', "i refuse to lose to a taxi"], r: ['笑 がんばって〜', "lol good luck~"] },
      { s: 'probe', t: ['いいね、いま何件くらい？', "how many likes u got now?"], r: ['1180！きのうから50ふえた〜', "1180! up 50 since yesterday~"], min: 2, c: 1 },
      { s: 'empathy', t: ['いいねがつくと、うれしいよね', "Getting likes feels good, right."], r: ['うん〜 1日の楽しみ', "yea~ highlight of my day"] },
    ] },
    { her: ['今日の夜もあいてるよ〜 21時まで', "im free tonight too~ till 9"], o: [
      { s: 'praise', t: ['21時までに惚れさせる', "i'll make u fall for me by 9"], r: ['え〜好き！20時ね！', "aww i like u! 8 o'clock!"] },
      { s: 'polite', t: ['今日は急なので、別の日にしませんか', 'Today is sudden. Could we do another day?'], r: ['え〜 別の日は埋まってる〜', "aww~ other days are booked~"], c: 1 },
      { s: 'probe', t: ['21時までなのは、なんで？', "why only till 9?"], r: ['21時から別の人と会う〜', "meeting another guy at 9~"], min: 2, c: 1 },
    ] },
    { her: ['帰り、タクシー割り勘する？', "split a taxi home after?"], q: 1, o: [
      { s: 'light', t: ['する。夜景も半分こで', "sure. we split the view too"], r: ['かわい〜笑', "cute~ lol"] },
      { s: 'polite', t: ['家の近くまで送りますよ', 'I\'ll take you close to home.'], r: ['うれし〜 でも途中で降りる〜', "aww~ but i'll get off halfway~"], c: 1 },
      { s: 'long', t: ['割り勘でもいいけど、家の方向がちがったら別々に乗ったほうが安いし、深夜料金もあるし、駅まで歩いて終電に乗れたらそれが一番安いかも', 'We could split, but if we live in different directions separate cabs are cheaper, plus there\'s the late-night rate, and if we can walk to the station and catch the last train that\'s cheapest'], r: ['ながい〜 じゃあいいや', "long~ never mind then"] },
    ] },
  ] },
  { topic: ['切ったばかりの前髪', 'The fresh bangs'], beats: [
    { her: ['1枚目の写真、きのう前髪切ったやつ〜', "pic 1 is right after i cut my bangs yesterday~"], o: [
      { s: 'praise', t: ['前髪似合いすぎて、スクロール止まった', "the bangs suit u so much i stopped scrolling"], r: ['え〜好き！今日会お！', "aww i like u! let's meet today!"], c: 1 },
      { s: 'light', t: ['前髪の報告、たしかに受けとった', "bang update received"], r: ['笑 ありがと〜', "lol thanks~"] },
      { s: 'polite', t: ['似合ってますね。美容院で切ったんですか', 'It suits you. Did you get it done at a salon?'], r: ['うん〜 担当さんにも褒められた', "yea~ my stylist complimented me too"] },
    ] },
    { her: ['前髪切ると、いいねめっちゃ増える〜', "every time i cut my bangs i get way more likes~"], o: [
      { s: 'light', t: ['前髪が営業してる', "ur bangs r doing the marketing"], r: ['それ〜笑 前髪のおかげ', "exactly~ lol all thanks to the bangs"] },
      { s: 'empathy', t: ['見た目が変わると、気分も上がるよね', "Changing your look really lifts your mood."], r: ['わかる〜 自分すきになる', "ikr~ i like myself more"] },
      { s: 'probe', t: ['いま、いいね何件？', "how many likes u at now?"], r: ['1180〜 きのうより40ふえた', "1180~ up 40 from yesterday"], min: 1, c: 1 },
    ] },
    { her: ['髪、長いのと短いのどっちがすき？', "long hair or short, which do u like?"], q: 1, o: [
      { s: 'praise', t: ['みゆちゃんの今の長さが正解', "ur length right now is the right answer"], r: ['え〜好き！', "aww i like u!"] },
      { s: 'light', t: ['肩くらい。つまり今のそれ', "shoulder length. so, basically that"], r: ['わかってる〜笑', "u get it~ lol"] },
      { s: 'long', t: ['長いのも短いのも似合う人は似合うし、季節によっても印象が変わるし、服の系統とか顔の形とかでも全然ちがうから一概には言えなくて', 'It depends. Some people suit both, the impression changes by season, and it varies by style and face shape, so I can\'t really say'], r: ['ながい〜 どっち？', "long~ which one?"] },
    ] },
    { her: ['美容院のあとは、いつもそのまま誰かと会うの〜', "after the salon i always go straight to meet someone~"], o: [
      { s: 'light', t: ['髪がいちばんきれいな日を有効活用', "using peak hair day wisely"], r: ['でしょ〜 もったいないもん', "right~ can't waste it"] },
      { s: 'empathy', t: ['きれいにしたら、見せたくなるよね', "When you look good, you want to show it off."], r: ['うん〜 見てほしい', "yea~ i want ppl to see"] },
      { s: 'probe', t: ['きのうは誰と会ったの？', "who'd u meet yesterday?"], r: ['アプリの人〜 2人。どっちも前髪褒めてくれた', "guys from the app~ 2. both liked my bangs"], min: 2, c: 1 },
    ] },
    { her: ['ごめん〜 返信いっぱいたまってた笑', "sorry~ had a pile of replies to get thru lol"], pause: 1, o: [
      { s: 'light', t: ['前髪効果で通知渋滞', "bang effect traffic jam"], r: ['それ〜笑 20件くらい', "exactly~ lol like 20"], c: 1 },
      { s: 'polite', t: ['大丈夫ですよ、ゆっくりで', 'No worries, take your time.'], r: ['やさし〜', "so sweet~"] },
      { s: 'doubt', t: ['そんなにいろんな人と話してるの？', "ur talking to that many guys?"], r: ['え、ふつうじゃない〜？', "huh, isn't that normal~?"], c: 1 },
    ] },
    { her: ['わたしのどこがいちばんいいと思う？', "what do u think is my best feature?"], q: 1, o: [
      { s: 'praise', t: ['笑ったときの目', "ur eyes when u smile"], r: ['え〜好き！今日会お！', "aww i like u! let's meet today!"] },
      { s: 'light', t: ['前髪。きのう生まれたばっかの', "the bangs. born yesterday"], r: ['笑 新生前髪〜', "lol newborn bangs~"] },
      { s: 'polite', t: ['まだ会っていないので、会ってから伝えたいです', 'We haven\'t met yet, so I\'d like to tell you in person.'], r: ['え〜まじめ〜 じゃあ今日会お', "aww so serious~ then let's meet today"], c: 1 },
    ] },
    { her: ['わたし受付だから、笑顔はプロ〜', "i work reception so smiling is my pro skill~"], o: [
      { s: 'light', t: ['プロの笑顔、無料でもらっていいの', "i get a pro smile for free?"], r: ['いいよ〜 みんなにあげてる', "sure~ i give it to everyone"], c: 1 },
      { s: 'empathy', t: ['一日中笑顔って、つかれない？', "Doesn't smiling all day wear you out?"], r: ['ちょっと〜 でも慣れた', "a little~ but i'm used to it"] },
      { s: 'probe', t: ['受付で声かけられたりする？', "do guys hit on u at the front desk?"], r: ['するする〜 そこからごはんも行った', "all the time~ went to dinner w/ some"], min: 2, c: 1 },
    ] },
    { her: ['褒めてくれる人、ほんとすぐ会いたくなる〜', "guys who compliment me, i just wanna meet them right away~"], o: [
      { s: 'light', t: ['わかりやすくて助かる', "appreciate the clear instructions"], r: ['でしょ〜笑', "right~ lol"] },
      { s: 'lewd', t: ['じゃあ今夜、うちで飲みながら褒め続ける', "then tonight i'll compliment u nonstop over drinks at my place"], r: ['え〜笑 駅前のカフェならいいよ', "lol~ the cafe by the station is fine tho"] },
      { s: 'probe', t: ['これまで、何人くらいすぐ会った？', "how many guys have u met that fast?"], r: ['数えたことない〜 今月は5人？', "never counted~ 5 this month?"], min: 3, c: 1 },
    ] },
    { her: ['今日の夜あいてる？', "u free tonight?"], q: 1, o: [
      { s: 'praise', t: ['前髪見に行く。あいてる', "free. coming to see the bangs"], r: ['え〜好き！20時に駅前のカフェ！', "aww i like u! 8 at the cafe by the station!"] },
      { s: 'polite', t: ['今日は予定があります。来週はどうですか', 'I have plans today. How about next week?'], r: ['来週〜？たぶん埋まる笑', "next week~? prob gonna be booked lol"], c: 1 },
      { s: 'light', t: ['あいてる。前髪の感想まとめてく', "free. i'll prep my review of the bangs"], r: ['笑 たのしみ〜', "lol can't wait~"] },
    ] },
  ] },
]
