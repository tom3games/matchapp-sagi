// あやね（h）: 内容より速さ。長文は「長い。結論だけ」。ほころび＝返信の速さ・既読無視・5分前集合・前の人を返信が遅くて切った話に何でも寄せる。マスクは会うまで外さない
THREADS.h = [
  { topic: ['ネイル', 'Nails'], beats: [
    { her: ['スマホ持ってる写真、爪見た？昨日変えたやつ', 'Did you see my nails in the phone photo? Changed them yesterday.'], o: [
      { s: 'light', t: ['見た。スマホより爪が主役だった', 'I did. The nails upstaged the phone.'], r: ['そこ見る人は合格', 'People who notice that pass.'] },
      { s: 'praise', t: ['あのベージュ、上品で似合ってる', 'That beige is elegant. Suits you.'], r: ['ありがと。グレージュだけど', 'Thanks. It\'s greige, though.'] },
      { s: 'doubt', t: ['マスクで顔が分からないから、爪を見るしかなかった', 'Your mask hides your face, so the nails were all I could look at.'], r: ['マスクは会うまで外さない。それが何？', 'The mask comes off when we meet. Problem?'], c: 1 },
    ] },
    { her: ['自分で塗ってない。サロン。予約は10時ちょうど', 'Not self-done. Salon. Booked for 10:00 sharp.'], o: [
      { s: 'light', t: ['「10時ちょうど」の言い方が強い', '"10:00 sharp" sounds intense.'], r: ['9時55分には店の前にいる', 'I\'m outside the shop by 9:55.'], c: 1 },
      { s: 'empathy', t: ['ネイルしてもらってる時間って落ち着くよね', 'Getting your nails done must be relaxing.'], r: ['落ち着かない。施術中も返信するから', 'Not really. I keep replying to messages during it.'], c: 1 },
      { s: 'probe', t: ['担当さんが遅れてきたらどうするの？', 'What if the nail artist runs late?'], r: ['前の担当、5分遅れたから替えた', 'My last one was five minutes late. I switched.'], min: 1, c: 1 },
    ] },
    { her: ['今の返信、何秒かかった？', 'How many seconds did that reply take?'], q: 1, o: [
      { s: 'light', t: ['数えてない。でもたぶん最速', 'Didn\'t count. Probably a record, though.'], r: ['最速は自分で言わないで', 'Don\'t call your own record.'] },
      { s: 'polite', t: ['すみません、20秒くらいだったと思います', 'Sorry, I think it was about 20 seconds.'], r: ['20秒ならいい', '20 seconds is fine.'] },
      { s: 'long', t: ['正確には分からないけど、ちょうど通知が来たときに別の画面を開いてて、それを閉じてから文章を考えて、一回消して書き直したから', 'I\'m not sure exactly. I had another screen open when the notification came, closed it, thought about what to write, deleted it once and rewrote it'], r: ['長い。結論だけ', 'Too long. Get to the point.'] },
    ] },
    { her: ['ネイルは3週間で変える。伸びてるのが許せない', 'I redo my nails every three weeks. I can\'t stand the regrowth.'], o: [
      { s: 'light', t: ['3週間ごとって、定期便みたい', 'Every three weeks, like a subscription box.'], r: ['定期便は遅れない。だからいい', 'Subscriptions don\'t arrive late. That\'s why I like them.'] },
      { s: 'empathy', t: ['カウンターだと、指先もお客さんに見られるもんね', 'At the counter, customers see your fingertips too.'], r: ['そう。指先が伸びてる美容部員はいない', 'Right. No beauty counter girl has grown-out nails.'] },
      { s: 'probe', t: ['3週間で切り替えるの、ネイル以外にもある？', 'Anything besides nails you switch out on a schedule?'], r: ['人。返信が3回遅れたら切る', 'People. Three slow replies and they\'re out.'], min: 2, c: 1 },
    ] },
    { her: ['ごめん。接客してた', 'Sorry. Was serving a customer.'], pause: 1, o: [
      { s: 'light', t: ['あやねさんも既読のまま止まることあるんだ', 'So even you leave people on read sometimes.'], r: ['仕事は別。あなたは仕事じゃない', 'Work is different. You\'re not work.'], c: 1 },
      { s: 'polite', t: ['お疲れさまです。忙しいのに返してくれてありがとう', 'Thanks for getting back to me while you\'re busy.'], r: ['うん。で、さっきの続き', 'Sure. Anyway, where were we.'] },
      { s: 'doubt', t: ['ほんとに接客？誰か別の人とやりとりしてたんじゃなくて？', 'Really a customer? Not messaging someone else?'], r: ['は？疑う人はムリ', 'Excuse me? I don\'t do people who doubt me.'] },
    ] },
    { her: ['爪、男の人も気にする？', 'Do guys care about their nails?'], q: 1, o: [
      { s: 'light', t: ['深爪ぎみ。あやねさんの爪見て反省してる', 'Mine are cut a bit too short. Your nails made me reflect.'], r: ['深爪は清潔。いい', 'Short is clean. Good.'] },
      { s: 'polite', t: ['週1で切って、やすりもかけてます', 'I trim them weekly and file them too.'], r: ['やすりまでは偉い', 'Filing too. Impressive.'] },
      { s: 'lewd', t: ['爪より、あやねさんの手を握ってみたい', 'Forget nails, I want to hold your hand.'], r: ['そういうのいいから', 'Skip that.'] },
    ] },
    { her: ['前の人、ネイル変えたのに気づかなかった。返信も遅かったし切った', 'The last guy didn\'t notice my new nails. Replied slowly too. Cut him off.'], o: [
      { s: 'light', t: ['爪と返信、二冠で負けたんだ', 'Lost on both nails and reply speed.'], r: ['そう。気づくのも返すのも速さ', 'Yes. Noticing and replying are both about speed.'] },
      { s: 'empathy', t: ['気づいてもらえないの、さみしいよね', 'It\'s lonely when someone doesn\'t notice.'], r: ['さみしくない。遅いのが嫌なだけ', 'Not lonely. I just hate slow.'], c: 1 },
      { s: 'probe', t: ['返信、何分遅れたらアウト？', 'How many minutes late is too late for a reply?'], r: ['5分。仕事中なら10分まで待つ', 'Five. Ten if you\'re at work.'], min: 3, c: 1 },
    ] },
    { her: ['次のネイル、何色がいいと思う？', 'What color should I do next?'], q: 1, o: [
      { s: 'light', t: ['深い赤。カウンターで一番強そう', 'Deep red. The strongest look at the counter.'], r: ['強そうは採用', 'Strong. Approved.'] },
      { s: 'praise', t: ['あやねさんなら何色でも似合う', 'Any color would suit you.'], r: ['それ答えになってない', 'That\'s not an answer.'] },
      { s: 'probe', t: ['マスクの色と合わせたりする？', 'Do you match them to your mask?'], r: ['マスクは白。会うまで外さないから関係ない', 'The mask is white. It stays on till we meet, so it doesn\'t matter.'], min: 3, c: 1 },
    ] },
    { her: ['決めた。次は赤。会う日に間に合わせる', 'Decided. Red. I\'ll have it done in time for when we meet.'], o: [
      { s: 'light', t: ['赤い爪で18時ちょうどに登場、強い', 'Red nails, arriving at exactly 18:00. Powerful.'], r: ['18時ちょうどじゃない。17時55分', 'Not 18:00. 17:55.'], c: 1 },
      { s: 'polite', t: ['楽しみにしてます。何曜日がいいですか', 'Looking forward to it. What day works?'], r: ['金曜。18時。遅れたら帰る', 'Friday. 18:00. Late and I leave.'] },
      { s: 'long', t: ['楽しみ。僕も何か合わせたほうがいいかな。服とか靴とか、あと時計も新しくしようか迷ってて、でも時計は高いし', 'Can\'t wait. Should I match something too? Clothes, shoes, and I\'ve been thinking about a new watch, but watches are expensive'], r: ['長い。時計は合わせて。秒まで', 'Too long. Sync your watch. To the second.'], c: 1 },
    ] },
  ] },
  { topic: ['韓国ドラマ', 'K-dramas'], beats: [
    { her: ['昨日の夜、韓国ドラマ一気見してた。寝不足', 'Binged a K-drama last night. Short on sleep.'], o: [
      { s: 'light', t: ['何話までいったの', 'How many episodes?'], r: ['12話。止めどころがない', 'Twelve. There\'s no good place to stop.'] },
      { s: 'empathy', t: ['止まらなくなるやつだ。どんな話？', 'One of those you can\'t stop. What\'s it about?'], r: ['財閥の男が、ヒロインに秒で返信する話', 'A rich heir who replies to the heroine in seconds.'] },
      { s: 'polite', t: ['寝不足なのに、返信ありがとうございます', 'Thanks for replying even though you\'re tired.'], r: ['返信は寝不足でもする。当然', 'I reply even when I\'m tired. Obviously.'] },
    ] },
    { her: ['主人公、ヒロインのメッセージに3秒で返す。理想', 'The lead replies to her messages in three seconds. Ideal.'], o: [
      { s: 'light', t: ['3秒は指が残像', 'Three seconds. His thumbs must blur.'], r: ['残像でいい。速ければ', 'Blur is fine. As long as it\'s fast.'] },
      { s: 'praise', t: ['あやねさんのメッセージなら、僕も3秒で返したくなる', 'For your messages, I\'d want to reply in three seconds too.'], r: ['言ったね。数えるから', 'You said it. I\'m counting.'] },
      { s: 'probe', t: ['好きなところ、話より返信の速さなんだ笑', 'So your favorite part is the reply speed, not the story, lol.'], r: ['そこ以外ある？前の人は1時間後に返してきた', 'What else is there? My last guy replied an hour later.'], min: 1, c: 1 },
    ] },
    { her: ['ドラマは一気見派？1日1話派？', 'Are you a binger or one-episode-a-day?'], q: 1, o: [
      { s: 'light', t: ['1日1話のつもりで、気づいたら朝の派', 'One a day in theory. Then suddenly it\'s morning.'], r: ['それは一気見。同じ', 'That\'s bingeing. Same as me.'] },
      { s: 'polite', t: ['1日1話ずつ、ゆっくり見る派です', 'I watch one episode a day, slowly.'], r: ['待てるんだ。私は無理', 'You can wait? I can\'t.'] },
      { s: 'long', t: ['昔は一気見だったけど、最近は休みの前の日だけまとめて見て、平日は1話にしてて、でも続きが気になる回だと結局2話見ちゃって', 'I used to binge, but now I only binge the night before a day off and stick to one on weekdays, though on cliffhangers I end up watching two'], r: ['長い。結論だけ', 'Too long. Get to the point.'] },
    ] },
    { her: ['途中で男が約束に10分遅れる回があって、そこで見るのやめかけた', 'There\'s an episode where the guy is ten minutes late. Almost quit there.'], o: [
      { s: 'light', t: ['10分遅刻で打ち切り危機', 'Ten minutes late and the show almost got canceled.'], r: ['現実なら打ち切ってる', 'In real life, I would have.'], c: 1 },
      { s: 'empathy', t: ['好きだったのにがっかりするよね', 'Disappointing when you liked him so much.'], r: ['がっかりじゃない。許せないだけ', 'Not disappointed. Just unforgivable.'] },
      { s: 'probe', t: ['現実で待たされたことある？', 'Has anyone made you wait in real life?'], r: ['ある。待ち合わせに1分遅れた人。帰った', 'Yes. A guy who was a minute late. I left.'], min: 2, c: 1 },
    ] },
    { her: ['ごめん、最終話見てた', 'Sorry, was watching the finale.'], pause: 1, o: [
      { s: 'polite', t: ['どうでしたか、最終話', 'How was the finale?'], r: ['泣いた。マスクが濡れた', 'I cried. Soaked my mask.'] },
      { s: 'light', t: ['最終話と並ぶなら光栄', 'Losing to a finale, I\'ll take it.'], r: ['最終話が勝った', 'The finale won.'] },
      { s: 'doubt', t: ['返信遅い人はムリって言ってなかった？', 'Didn\'t you say slow repliers are a no?'], r: ['私はいいの。理由があるから', 'It\'s fine when I do it. I have reasons.'], c: 1 },
    ] },
    { her: ['ドラマみたいな出会い、信じる？', 'Do you believe in drama-style romance?'], q: 1, o: [
      { s: 'light', t: ['アプリで会うのも、だいぶドラマ', 'Meeting on an app is pretty dramatic already.'], r: ['それはそう', 'Fair.'] },
      { s: 'empathy', t: ['信じたい。あやねさんは？', 'I want to. Do you?'], r: ['信じる。返信が速ければ', 'I do. If they reply fast.'] },
      { s: 'probe', t: ['前にアプリで、ドラマみたいなことあった？', 'Anything drama-like happen on the app before?'], r: ['ない。前の人は既読無視で終わった', 'No. The last one ended when he left me on read.'], min: 3, c: 1 },
    ] },
    { her: ['ヒロインが会うまでマスク外さない回もあった。私と同じ', 'There\'s an episode where the heroine keeps her mask on until they meet. Same as me.'], o: [
      { s: 'light', t: ['その回、絶対伏線', 'That episode is definitely foreshadowing.'], r: ['伏線じゃない。こだわり', 'Not foreshadowing. A principle.'] },
      { s: 'praise', t: ['外した瞬間が一番の山場だね', 'The moment it comes off is the climax.'], r: ['ハードル上げないで', 'Don\'t raise the bar.'] },
      { s: 'probe', t: ['マスクなしの写真って1枚もない？', 'Not a single photo without the mask?'], r: ['ない。会うまで外さない', 'None. It stays on until we meet.'], min: 4, c: 1 },
    ] },
    { her: ['続きのシーズン、一緒に見る？会ったあとで', 'Want to watch the next season together? After we meet.'], q: 1, o: [
      { s: 'light', t: ['見る。返信の速さの勉強として', 'Yes. To study fast replies.'], r: ['いい心がけ', 'Good attitude.'] },
      { s: 'lewd', t: ['じゃあ、うちで一緒に見よう', 'Then let\'s watch at my place.'], r: ['そういうのいいから', 'Skip that.'] },
      { s: 'polite', t: ['ぜひ。1話から見たいです', 'I\'d love to. From episode one.'], r: ['再生は5分前ね', 'Press play five minutes early.'], c: 1 },
    ] },
    { her: ['金曜ならいい。18時ちょうど', 'Friday works. 18:00 sharp.'], o: [
      { s: 'light', t: ['ドラマの男より速く着く', 'I\'ll beat the drama guy there.'], r: ['3秒前に着いて', 'Be there three seconds early.'] },
      { s: 'polite', t: ['わかりました。何分前に行けばいいですか', 'Got it. How early should I arrive?'], r: ['5分前。1秒でも遅れたら帰る', 'Five minutes. One second late and I leave.'], c: 1 },
      { s: 'long', t: ['金曜なら仕事のあと急げば間に合うと思うけど、もし電車が遅れたらその時は連絡するから、少しだけ待ってもらえたら', 'Friday should work if I hurry after work, but if the train is late I\'ll message you, so if you could wait just a little'], r: ['長い。遅れるなら来ないで', 'Too long. If you\'ll be late, don\'t come.'] },
    ] },
  ] },
  { topic: ['駅前のカフェ', 'The station cafe'], beats: [
    { her: ['2枚目のカフェ、駅前の。待ち合わせはいつもそこ', 'The cafe in photo 2 is by the station. I always meet people there.'], o: [
      { s: 'light', t: ['あのアイスコーヒー、氷が全然溶けてなかった', 'The ice in that iced coffee hadn\'t melted at all.'], r: ['着いて1分で撮った。待つ前', 'Took it one minute after arriving. Before the wait.'] },
      { s: 'empathy', t: ['落ち着いた店だね。窓ぎわの席が好きなの？', 'Calm place. Do you like window seats?'], r: ['入口が見える席。誰が何時に来たか分かる', 'Seats facing the door. I can see who arrives when.'], c: 1 },
      { s: 'doubt', t: ['あの写真、いつ撮ったやつ？', 'When was that photo taken?'], r: ['なんで聞くの。先週', 'Why ask? Last week.'] },
    ] },
    { her: ['待ち合わせ、5分前に来ない人はムリ', 'If you don\'t show up five minutes early, no.'], o: [
      { s: 'light', t: ['5分前が定刻。覚えた', 'Five early is on time. Noted.'], r: ['覚えたならいい', 'Good, as long as you remember.'] },
      { s: 'polite', t: ['5分前、必ず守ります', 'I\'ll always be five minutes early.'], r: ['必ずって言った人、前もいた', 'Someone else said "always" before.'] },
      { s: 'probe', t: ['5分前に来なかった人、いたの？', 'Was there someone who didn\'t?'], r: ['いた。17時56分に来た。帰った', 'Yes. He showed up at 17:56. I left.'], min: 1, c: 1 },
    ] },
    { her: ['カフェだと何たのむ？', 'What do you order at cafes?'], q: 1, o: [
      { s: 'light', t: ['アイスコーヒー。出てくるのが一番早い', 'Iced coffee. It comes out fastest.'], r: ['分かってる', 'You get it.'] },
      { s: 'long', t: ['季節限定があればそれで、なければラテ、甘いの飲みたい気分ならキャラメルのやつで、サイズは迷ったら真ん中', 'The seasonal one if there is one, otherwise a latte, something caramel if I want sweet, and medium if I can\'t decide on size'], r: ['長い。結論だけ', 'Too long. Get to the point.'] },
      { s: 'polite', t: ['ホットのブラックをお願いします、って感じです', 'A hot black coffee, please. That kind of thing.'], r: ['私に注文しないで', 'Don\'t order from me.'] },
    ] },
    { her: ['注文してから出てくるまで、毎回計ってる', 'I time it from ordering to getting the drink. Every time.'], o: [
      { s: 'light', t: ['ストップウォッチ係だ', 'The official timekeeper.'], r: ['平均2分。3分超えたら星1', 'Average two minutes. Over three gets one star.'] },
      { s: 'empathy', t: ['接客してる側だと、そこ気になるよね', 'When you work in service, you notice that stuff.'], r: ['そう。私なら1分で出す', 'Yes. I\'d have it out in one.'] },
      { s: 'probe', t: ['人とのやりとりも計ってる？', 'Do you time people\'s replies too?'], r: ['計ってる。あなたは今のところ平均40秒', 'I do. You\'re averaging 40 seconds so far.'], min: 2, c: 1 },
    ] },
    { her: ['ごめん、電車だった', 'Sorry, was on the train.'], pause: 1, o: [
      { s: 'light', t: ['電車の中でも返すタイプかと思ってた', 'I thought you\'d be the type to reply on the train.'], r: ['乗り換えで途切れた。それは別', 'The transfer cut me off. That\'s different.'], c: 1 },
      { s: 'polite', t: ['大丈夫です。移動お疲れさまです', 'No problem. Hope the ride was okay.'], r: ['うん', 'Yeah.'] },
      { s: 'doubt', t: ['既読から結構たってたけど', 'It\'d been a while since you read it, though.'], r: ['は？今それ言う？', 'Excuse me? You\'re bringing that up now?'] },
    ] },
    { her: ['マスクは会ってから。店でもギリギリまで外さない', 'The mask comes off after we meet. Even in the cafe I keep it on till the last second.'], o: [
      { s: 'light', t: ['飲むときだけ一瞬外す技術', 'The art of a one-second unmask per sip.'], r: ['ストロー使う。外さない', 'I use a straw. It stays on.'], c: 1 },
      { s: 'empathy', t: ['人に会う仕事だし、気をつかうよね', 'You meet people all day for work, so you\'re careful.'], r: ['仕事は関係ない', 'Not about work.'] },
      { s: 'probe', t: ['会う前に、マスクなしの写真って見れたりする？', 'Could I see a maskless photo before we meet?'], r: ['ない。撮らせない', 'There isn\'t one. I don\'t let anyone take them.'], min: 3, c: 1 },
    ] },
    { her: ['あなた、待ち合わせ何分前に着く？', 'How early do you usually arrive?'], q: 1, o: [
      { s: 'light', t: ['10分前。早すぎて引かれたことある', 'Ten minutes. Someone once found that too early.'], r: ['早すぎはいい。待つのは私じゃないから', 'Too early is fine. I\'m not the one waiting.'] },
      { s: 'polite', t: ['5分前には必ず着くようにしてます', 'I always make sure to be five minutes early.'], r: ['必ず、ね', '"Always." Sure.'] },
      { s: 'long', t: ['だいたい10分前だけど、初めての場所だと迷うかもしれないから、前の日に地図で出口を確認して、念のため一本早い電車に乗るようにしてる', 'Usually ten minutes, but for new places I check the exit on the map the day before and take one train earlier just in case'], r: ['長い。何分前？', 'Too long. How many minutes?'] },
    ] },
    { her: ['前の人、5分前には来たけど、一回既読無視したから切った', 'My last guy did come five minutes early, but he left me on read once, so I cut him.'], o: [
      { s: 'light', t: ['時間守っても既読でアウト。審査きびしい', 'On time but out for one read receipt. Tough judge.'], r: ['きびしくない。普通', 'Not tough. Normal.'] },
      { s: 'empathy', t: ['時間を守る人でも、そこはだめなんだ', 'Even if he was punctual, that was a dealbreaker.'], r: ['だめ。返信も時間と同じ', 'Yes. Replies are the same as time.'] },
      { s: 'probe', t: ['会って何回目で切ったの？', 'How many dates before you cut him?'], r: ['2回目のあと。既読から8分', 'After the second. Eight minutes after reading.'], min: 3, c: 1 },
    ] },
    { her: ['金曜、そのカフェ。18時ちょうど', 'Friday, that cafe. 18:00 sharp.'], o: [
      { s: 'light', t: ['了解。17時55分に入口の前で', 'Got it. 17:55, at the door.'], r: ['分かってるね', 'You get it.'] },
      { s: 'lewd', t: ['カフェのあと、うちで飲み直そう', 'After the cafe, let\'s have drinks at my place.'], r: ['そういうのいいから', 'Skip that.'] },
      { s: 'polite', t: ['楽しみにしてます。席、取っておきましょうか', 'Looking forward to it. Should I save a seat?'], r: ['いい。私が先にいるから', 'No need. I\'ll be there first.'] },
    ] },
  ] },
]
