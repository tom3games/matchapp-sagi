// トークの中身。こちらの3択は「探りを入れる質問」2つ＋「ふつうの返し」1つ。相手の答えに本性のほころびが少しずつ出る
// c:1 の答えが手がかり（結果の答え合わせで「この一言が手がかりだった」と出す）
const PROBES = [
  { id: 'hol', q: ['休みの日は何してるの？', 'What do you do on days off?'], min: 0 },
  { id: 'job', q: ['仕事って何してるの？', 'What do you do for work?'], min: 0 },
  { id: 'app', q: ['アプリはいつから？', 'How long have you been on the app?'], min: 1 },
  { id: 'area', q: ['よく行くお店とかある？', 'Any place you go to a lot?'], min: 1 },
  { id: 'night', q: ['夜はいつも何時まで起きてる？', 'How late do you usually stay up?'], min: 2 },
  { id: 'photo', q: ['最近の写真ってある？', 'Got any recent photos?'], min: 3 },
  { id: 'call', q: ['一回通話してみない？', 'Want to try a call sometime?'], min: 3 },
  { id: 'ex', q: ['前の恋人とはなんで別れたの？', 'Why did you break up with your ex?'], min: 4 },
]
// ふつうの返し（g:1 は共感・共通点・軽い自己開示、g:-1 は褒めすぎ・自分語り・下心）
const SOCIAL = [
  { id: 'polite', t: ['休みの日のこと、もう少し詳しく聞いてもいいですか？', 'Could I hear a little more about your days off?'] },
  { id: 'polite2', t: ['丁寧にありがとうございます。僕は週末はだいたい料理をしてます', 'Thank you for the kind reply. I usually cook on weekends'] },
  { id: 'light', t: ['それウケる笑', 'lol that\'s great'] },
  { id: 'light2', t: ['まじ？最高じゃん', 'no way, love it'] },
  { id: 'empathy', t: ['それいいね。どんなところが好き？', 'Nice. What do you like about it?'] },
  { id: 'empathy2', t: ['わかる。疲れた日ってそういうのしたくなるよね', 'I get it. On tiring days you just want that'] },
  { id: 'praise', t: ['写真かわいすぎて緊張する', 'Your photos are so cute I\'m nervous'], flatter: 1 },
  { id: 'long', t: ['僕は休みはジム行ってカフェで勉強して夜は飲みに行って最近はキャンプ道具もそろえて', 'I hit the gym, study at cafes, drink at night, and just bought all this camping gear and'] },
  { id: 'lewd', t: ['今度うちで飲もうよ', 'Let\'s drink at my place sometime'] },
]
const styleOf = id => id.replace(/2$/, '')
const INVITE = ['今度、昼にお茶でもどう？土曜か日曜で', 'Want to grab tea some afternoon? Saturday or Sunday']
const TALK = {
  a: { open: ['マッチありがとうございます！みのりです。よろしくお願いします', 'Thanks for the match! I\'m Minori. Nice to meet you'], cautious: 1,
    ans: { hol: ['近所の公園を歩いて、パン屋さんに寄ってます。先週は駅裏のクリームパン', 'I walk in the park and stop by bakeries. Last week, the cream bun behind the station'], job: ['図書館で働いてます。返ってきた本を棚に戻す時間が好きで', 'I work at a library. I like shelving the returned books'], app: ['先月からです。友だちにすすめられて', 'Since last month. A friend recommended it'], area: ['駅裏の小さいパン屋さん。朝7時に開くんです', 'A tiny bakery behind the station. Opens at 7 am'], night: ['早寝です。11時には寝ちゃいます', 'Early. Asleep by 11'], photo: ['友だちが撮ったのしかなくて…2枚目が一番最近です', 'Only ones friends took... the second one is the newest'], call: ['会う前に一回、話してみたいです', 'I\'d like to talk once before meeting'], ex: ['2年前に。向こうの転勤で、自然に…ですね', 'Two years ago. He got transferred, and it just faded'] },
    nice: [['そう言ってもらえるとうれしいです', 'That makes me happy'], ['わかります！', 'I get that!']], meh: [['あ、そうなんですね…', 'Oh, I see...'], ['えっと…', 'Um...']],
    early: ['…遊び慣れてそう。もう少しお話ししてからがいいです', '...You seem experienced at this. I\'d like to talk a little more first'], yes: ['行きたいです！楽しみにしてます', 'I\'d love to! Looking forward to it'], ask: ['よかったら今度、パン屋さん一緒に行きませんか？', 'Would you like to visit a bakery together sometime?'] },
  b: { open: ['はじめまして、さきです！返信ゆっくりでごめんなさい', 'Hi, I\'m Saki! Sorry if I reply slowly'], cautious: 1,
    ans: { hol: ['夜勤明けはラーメン食べて寝てます笑 休みの日は海まで歩くことも', 'After night shifts I eat ramen and sleep, lol. On days off I sometimes walk to the sea'], job: ['看護師です。夜勤が月に6回くらい', 'Nurse. About six night shifts a month'], app: ['3か月くらい。休みが不規則で出会いがなくて', 'About three months. Irregular days off, no chance to meet people'], area: ['駅前の家系ラーメン。大盛りを完食したことあります', 'The ramen shop by the station. I once finished an extra large'], night: ['夜勤の日はずっと起きてます笑', 'On night shifts I\'m up all night, lol'], photo: ['1枚目が先月です。浜辺のは夏に友だちが撮ってくれました', 'The first is from last month. A friend took the beach one in summer'], call: ['夜勤がない日なら大丈夫です', 'Fine on days without a night shift'], ex: ['すれ違いですね。シフトが合わなくて', 'We drifted. Our shifts never matched'] },
    nice: [['話しやすいです笑', 'You\'re easy to talk to, lol'], ['それ、わかります', 'I know what you mean']], meh: [['…そうなんですね', '...I see'], ['うーん', 'Hmm']],
    early: ['まだちょっと早いかな…もう少し話したいです', 'Maybe a bit early... let\'s talk a bit more'], yes: ['日曜なら！お昼にラーメン行きましょう', 'Sunday works! Ramen for lunch'], ask: ['次の休み、お昼にラーメン行きません？', 'Ramen for lunch on my next day off?'] },
  c: { open: ['マッチありがとうございます。犬の写真ばっかりですみません', 'Thanks for the match. Sorry it\'s all dog photos'], cautious: 1,
    ans: { hol: ['こむぎの散歩で、川沿いを1時間くらい歩いてます', 'I walk Komugi along the river for about an hour'], job: ['動物病院で受付と看護をしてます', 'Reception and nursing at a vet clinic'], app: ['半年くらいです。のんびり使ってます', 'About half a year. Taking it slow'], area: ['川沿いのドッグカフェ。こむぎの顔見知りが多くて', 'A dog cafe by the river. Komugi has lots of friends there'], night: ['こむぎに合わせて早寝です', 'Early, on Komugi\'s schedule'], photo: ['顔がちゃんと写ってるのが無くて…2枚目が全身です。背は高めです', 'None with my face clearly... the second one is full body. I\'m on the tall side'], call: ['いいですよ。こむぎがうるさいかもですが', 'Sure. Komugi might be noisy'], ex: ['向こうが犬苦手で。価値観ですね', 'He didn\'t like dogs. Different values'] },
    nice: [['うれしいです', 'That\'s nice to hear'], ['こむぎも喜んでます笑', 'Komugi approves, lol']], meh: [['あはは…', 'Haha...'], ['そうですか…', 'I see...']],
    early: ['慣れてる…？もうちょっと話してからにしませんか', 'Are you... used to this? Can we talk a bit more first?'], yes: ['ぜひ！土曜の朝、川沿いで', 'Yes! Saturday morning by the river'], ask: ['今度、こむぎの散歩コース一緒に歩きませんか？', 'Want to walk Komugi\'s route with me sometime?'] },
  d: { open: ['ありがと〜よろしく', 'thx~ hi'], inviteAt: 6,
    ans: { hol: ['カフェ行ったり〜自撮りしたり笑', 'cafes~ selfies lol'], job: ['アパレル〜梅田のほう', 'apparel~ umeda'], app: ['1年くらい？笑', 'like a year? lol'], area: ['梅田のカフェ〜暗めのとこが好き', 'cafes in umeda~ i like dark ones', 1], night: ['夜型〜', 'night owl~'], photo: ['えー今ないかも笑 会えばわかるよ', 'hmm don\'t have any lol. you\'ll see when we meet', 1], call: ['顔出しなしならいいよ〜', 'only with camera off~', 1], ex: ['なんか冷められた笑', 'he just lost interest lol'] },
    nice: [['ありがと〜', 'thx~'], ['でしょ〜', 'right?~']], meh: [['へー', 'k'], ['ふーん', 'hm']],
    yes: ['いいよ〜夜ね、暗いとこがいい', 'sure~ at night, somewhere dark'], ask: ['てか会お〜。夜の居酒屋がいい、暗いとこ落ち着くし', 'let\'s meet~ izakaya at night. i like dark places', 1] },
  e: { open: ['マッチうれしい！まりあです！毎日連絡できる人ですか？', 'So happy we matched! I\'m Maria! Can you message every day?'], inviteAt: 4,
    ans: { hol: ['夢の国！今年48回目！ひとりでも行くよ', 'The dream kingdom! 48 times this year! Even alone', 1], job: ['歯医者さんの受付〜', 'Dental reception~'], app: ['元彼と別れた次の日から笑', 'Since the day after my ex dumped me, lol', 1], area: ['夜のテーマパーク。閉園まで帰らない', 'The theme park at night. I stay till closing'], night: ['寂しくて朝まで起きてることある', 'Sometimes I\'m up till morning because I\'m lonely', 1], photo: ['顔はあんまり出したくないの…嫌われたら怖いし', 'I don\'t like showing my face... I\'m scared you\'ll hate me', 1], call: ['するする！毎日しよ！', 'Yes yes! Every day!', 1], ex: ['浮気された。それから人を信じられなくて…ねえ、浮気しないよね？', 'He cheated. I can\'t trust anyone now... hey, you won\'t cheat, right?', 1] },
    nice: [['やさしい…もう好きかも', 'You\'re so kind... I think I love you'], ['うれしい、運命かも', 'So happy. Maybe it\'s fate']], meh: [['…私の話きいてくれないんだ', '...So you won\'t listen to me'], ['なんでそんなこと言うの', 'Why would you say that']],
    yes: ['ほんと！？今からでもいいよ', 'Really!? Even right now'], ask: ['今から会えない？さみしい', 'Can we meet right now? I\'m lonely', 1] },
  f: { open: ['はじめまして。いきなりですが、結婚願望ありますか？', 'Hello. Straight to the point: do you want to get married?'], inviteAt: 5,
    ans: { hol: ['カフェで本を読んでます。元彼ともよく行ってた店で', 'I read at a cafe. The one I used to go to with my ex', 1], job: ['事務です。定時で帰れるので、結婚しても続けられます', 'Office work. I leave on time, so I can keep it after marriage', 1], app: ['結婚したくて。半年で12人と会いました', 'To get married. I\'ve met 12 people in six months', 1], area: ['駅前のパスタ屋さん。元彼が最後に連れていってくれた店です', 'The pasta place by the station. The last place my ex took me', 1], night: ['あなたが寝るまで起きてます', 'I\'ll stay up until you sleep', 1], photo: ['最近のです。…あなたの写真も、もっと見たいです', 'They\'re recent. ...I\'d like to see more of yours, too'], call: ['毎晩電話できる人がいいです', 'I want someone I can call every night', 1], ex: ['浮気です。3年付き合って、指輪も選んでたのに。そのあと…（長文が5通続く）', 'He cheated. Three years, we were picking rings. And then... (five long messages follow)', 1] },
    nice: [['うれしい。ちゃんと見てくれてる', 'Thank you. You really see me'], ['そういう人を待ってました', 'I\'ve been waiting for someone like you']], meh: [['…遊び目的ですか？', '...Are you just playing around?'], ['傷つきました', 'That hurt']],
    yes: ['うれしい。日曜、カフェで。手帳を持っていきます', 'I\'m glad. Sunday, a cafe. I\'ll bring my planner'], ask: ['日曜、カフェで将来の話をしませんか。手帳を持っていきます', 'Shall we talk about our future at a cafe on Sunday? I\'ll bring my planner', 1] },
  g: { open: ['やほー！どこ住み？', 'yo! where u live?'], inviteAt: 5,
    ans: { hol: ['飲み！焼酎の水割りの水抜き飲んでる', 'drinking! shochu and water without the water', 1], job: ['なんか、いろいろ！今はお休み中', 'like, stuff! on a break rn'], app: ['きのう？おととい？', 'yesterday? day before?'], area: ['駅！どこの駅かは忘れた', 'a station! forgot which', 1], night: ['朝まで！', 'till morning!'], photo: ['1枚目のどれかがうち！当ててみて〜', 'one of the girls in pic 1 is me! guess~', 1], call: ['するする〜（そのあと、かかってこない）', 'sure sure~ (she never calls)'], ex: ['元彼？3人いるけどどれ？笑', 'which ex? there are 3 lol'] },
    nice: [['天才？？', 'genius??'], ['わかる〜知らんけど', 'i get it~ or not']], meh: [['なにそれ笑', 'what lol'], ['むずかしい話きらい', 'hate hard topics']],
    yes: ['いいよ〜何駅にする？当日きめよ', 'ok~ which station? decide on the day'], ask: ['会お！駅でいい？何駅かは当日きめよ', 'lets meet! at a station? we can pick which one on the day', 1] },
  h: { open: ['よろしく。返信はやい人？', 'Hi. Do you reply fast?'], inviteAt: 5,
    ans: { hol: ['ネイル。休みの日でも返信はすぐ返すよ', 'Nails. I reply right away even on days off', 1], job: ['美容部員。仕事中も返信はするけど？', 'Beauty counter. I still reply during work. Don\'t you?', 1], app: ['前の人が既読無視したから、また始めた', 'The last guy left me on read, so I\'m back', 1], area: ['駅前のカフェ。待ち合わせは5分前集合ね', 'The cafe by the station. Be there five minutes early', 1], night: ['12時。それまでに返信なかったら終わり', 'Midnight. No reply by then and we\'re done', 1], photo: ['マスク外すのは会ってから', 'Mask comes off when we meet'], call: ['今すぐできる？できないなら言わないで', 'Can you right now? If not, don\'t ask', 1], ex: ['返信が遅かったから切った', 'He replied too slowly, so I cut him off', 1] },
    nice: [['ならいい', 'Fine then'], ['まあね', 'Sure']], meh: [['は？', 'Excuse me?'], ['それ今いる？', 'Was that necessary?']],
    yes: ['金曜18:00ちょうどね。遅れたら帰る', 'Friday, 18:00 sharp. Late and I leave'], ask: ['金曜会える？18:00ちょうどね。遅れたら帰る', 'Can you meet Friday? 18:00 sharp. If you\'re late I leave'] },
  i: { open: ['マッチありがと〜！', 'thanks for the match~!'], inviteAt: 2, eager: 1,
    ans: { hol: ['デート〜笑 毎週だれかと会ってる', 'dates~ lol. i meet someone every week', 1], job: ['受付〜', 'reception~'], app: ['ずっと〜いいね1000超えた', 'forever~ over 1000 likes now', 1], area: ['駅前のカフェ。いつもそこで会ってる', 'the cafe by the station. i always meet guys there', 1], night: ['夜はだいたい誰かと飲んでる', 'usually drinking with someone at night'], photo: ['いっぱいあるよ〜', 'i have tons~'], call: ['いいよ〜今ちょっと別の人と話してるけど', 'sure~ i\'m talking to another guy rn tho', 1], ex: ['いっぱいいる笑', 'there are a lot lol'] },
    nice: [['え〜好き！', 'aww i like u!'], ['うれしい〜', 'yay~']], meh: [['へ〜', 'oh~'], ['うん〜', 'yea~']],
    yes: ['いいよ〜今日の夜でも！', 'sure~ even tonight!'], ask: ['会お〜。今日の夜あいてる？', 'let\'s meet~ free tonight?', 1] },
  j: { open: ['はじめまして！えりかです。お仕事は何されてるんですか？', 'Hi! I\'m Erika. What do you do for work?'], inviteAt: 3, eager: 1,
    ans: { hol: ['自己投資の勉強会に行ってます！', 'I go to self-investment study groups!', 1], job: ['自分で事業してて！…それより、会社員だけだと将来不安じゃないですか？', 'I run my own business! ...More importantly, doesn\'t a salary alone worry you?', 1], app: ['最近です！いろんな人と繋がりたくて', 'Recently! I want to connect with all kinds of people'], area: ['ホテルのラウンジ。打ち合わせでよく使います', 'Hotel lounges. I use them for meetings'], night: ['朝活してるので早寝です！', 'I do morning routines, so early!'], photo: ['プロに撮ってもらったんです！', 'A pro shot them for me!', 1], call: ['ここ通知こないので、LINEで話しませんか？', 'This app\'s notifications don\'t work for me. Shall we move to LINE?', 1], ex: ['価値観です。向上心がない人はちょっと…', 'Values. I can\'t do men without ambition...', 1] },
    nice: [['素敵です！向上心ありますね', 'Wonderful! You\'re ambitious'], ['わかってくれる人で嬉しい', 'So glad you get it']], meh: [['もったいない…', 'What a waste...'], ['考え方を変えたら人生変わりますよ', 'Change your mindset, change your life']],
    yes: ['うれしい！尊敬してる人も呼んでいいですか？', 'Yay! Can I bring someone I really respect?', 1], ask: ['今度会いませんか？尊敬してる人がいて、ぜひ紹介したいんです！', 'Let\'s meet! There\'s someone I really respect I\'d love you to meet!', 1] },
  k: { open: ['マッチうれしい〜！ここなです！なんでいいねしてくれたの？', 'Yay a match~! I\'m Kokona! Why did you like me?'], inviteAt: 4, eager: 1,
    ans: { hol: ['休みの日もほぼシフト入ってる〜！あ、なんでもない！', 'Even on days off I\'m mostly on shift~! Oh, never mind!', 1], job: ['接客〜！わたし目当てで来てくれる人もいるんだよ〜', 'Hospitality~! Some people come just to see me~', 1], app: ['最近！いろんな人と話したくて〜', 'Recently! I wanna talk to all kinds of people~'], area: ['わたしの好きなお店があるの！今度連れていきたい〜', 'There\'s a place I love! I wanna take you~', 1], night: ['夜はほぼお仕事〜！終わるの23時', 'Mostly working at night~! I\'m done at 11pm', 1], photo: ['えーやばい！いっぱい撮ってる！', 'Omg! I take tons!'], call: ['えーやばい！したい！', 'Omg! Yes!'], ex: ['えーやばい！忘れた〜！', 'Omg! I forgot~!'] },
    nice: [['えーやばい！それめっちゃ好き！', 'Omg! I love that!'], ['えーやばい！一緒だね〜！', 'Omg! Same~!']], meh: [['えーやばい！その感じも好き〜！', 'Omg! I love that vibe too~!'], ['えーやばい！おもしろ〜！', 'Omg! So funny~!']],
    yes: ['やった〜！じゃあ、わたしの好きなお店ね！', 'Yay~! Then it\'s my favorite place!', 1], ask: ['この日なら会えるよ！ここ来て！着いたら「ここなの友達」って言ってね', 'I can meet this day! Come here! When you arrive, say "I\'m Kokona\'s friend"', 1] },
  l: { open: ['マッチありがとう！ゆかです〜', 'Thanks for the match! I\'m Yuka~'], inviteAt: 7,
    ans: { hol: ['カフェ巡りとタピオカ！…あ、最近は行ってないかも', 'Cafe hopping and bubble tea! ...Actually, not lately', 1], job: ['営業事務です。入って8年目', 'Sales admin. Eighth year at the company', 1], app: ['プロフはだいぶ前に作ったままかも笑', 'I made my profile a while back and never touched it, lol', 1], area: ['よく行ってたタピオカのお店…あ、もう閉まったんだった', 'This bubble tea shop I loved... oh wait, it closed', 1], night: ['最近はすぐ寝ちゃう。年かな笑', 'I fall asleep fast these days. Getting old, lol', 1], photo: ['え、ちょっと前？笑 でもほぼ変わってないよ', 'Um, a little while ago? lol. I look the same though', 1], call: ['仕事終わりなら大丈夫', 'After work is fine'], ex: ['3年前かな。そこからずっと仕事', 'Three years ago? Been all work since'] },
    nice: [['うれしい〜', 'Aww~'], ['わかる〜', 'Same~']], meh: [['そっか', 'I see'], ['うーん', 'Hmm']],
    yes: ['いいよ！仕事終わりの夜がいいな', 'Sure! After work in the evening is best'], ask: ['会いたい！仕事終わりの夜でもいい？', 'Let\'s meet! Is after work okay?'] },
}

// 子ごとに刺さる返しの型（+1 刺さる / 0 ふつう / -1 冷める）。re は型ごとの反応、hit は答え合わせの一言
// 読み方: 自己紹介の書き方・タグ・写真の雰囲気と、最初の数通の文の調子
const STYLE = {
  a: { like: { polite: 1, empathy: 1, light: -1, praise: -1, long: -1, lewd: -1 }, re: { light: ['…なんだか、慣れてる感じですね', '...You seem pretty used to this'], praise: ['あ、ありがとうございます…（少し困った顔の絵文字）', 'Oh, um, thank you... (a slightly awkward emoji)'] }, hit: ['丁寧で具体的な返し。軽いノリや早い誘いは「慣れてそう」と疑われる', 'Polite, specific replies. Breezy lines or an early invite make her suspicious'] },
  b: { like: { light: 1, empathy: 1, polite: -1, praise: -1, long: -1, lewd: -1 }, re: { polite: ['かしこまらなくて大丈夫ですよ笑', 'No need to be so formal, lol'], light: ['それ！笑', 'Right?! lol'] }, hit: ['肩の力が抜けた気さくな返し。かしこまるほど距離ができる', 'Relaxed, casual replies. Too formal and she pulls back'] },
  c: { like: { polite: 1, empathy: 1, light: -1, praise: -1, long: 0, lewd: -1 }, re: { light: ['…ノリがいい人なんですね', '...You\'re quite the party type'] }, hit: ['丁寧で落ち着いた返し。ノリが軽いと引かれる', 'Calm, polite replies. Too breezy and she backs off'] },
  d: { like: { light: 1, praise: 1, polite: 0, empathy: 0, long: -1, lewd: -1 }, re: { praise: ['でしょ〜笑', 'right?~ lol'], long: ['ながっ', 'too long'] }, hit: ['ノリと褒め言葉。ただし写真の話になるとはぐらかす', 'Banter and compliments. But photo talk gets dodged'] },
  e: { like: { polite: 1, empathy: 1, light: 0, praise: 1, long: 0, lewd: -1 }, heavy: 1, re: { polite: ['やさしい…もう離れないでね', 'So kind... don\'t ever leave me'], empathy: ['わかってくれるの、あなただけ', 'You\'re the only one who understands me'] }, hit: ['何を言っても重くなる。優しくするほど重い', 'Everything makes it heavier. The kinder, the heavier'] },
  f: { like: { polite: 1, empathy: 1, light: -1, praise: 0, long: 0, lewd: -1 }, heavy: 1, re: { polite: ['うれしい。これって、もう付き合ってるってことですよね', 'I\'m happy. So this means we\'re dating now, right?'], empathy: ['やっぱり。あなたは元彼と違う', 'I knew it. You\'re not like my ex'] }, hit: ['優しさほど重くなる。将来の話に直行', 'The kinder you are, the heavier it gets. Straight to the future'] },
  g: { like: { light: 1, praise: 0, polite: -1, empathy: -1, long: -1, lewd: -1 }, re: { polite: ['かたっ笑 敬語やめよ', 'so stiff lol drop the formal stuff'], empathy: ['むずかしい話きらい〜', 'hate deep talk~'], light: ['それな！', 'facts!'], long: ['ながっ 読んでない', 'too long didnt read'] }, hit: ['テンポの速い軽い返し。丁寧だと「かたい」、真面目だと混乱する', 'Fast, light banter. Polite is "stiff," serious just confuses her'] },
  h: { like: { light: 0, polite: 0, empathy: 0, praise: 0, long: -1, lewd: -1 }, re: { long: ['長い。結論だけ', 'Too long. Get to the point'] }, hit: ['内容より返信の速さ', 'Speed over content'] },
  i: { like: { praise: 1, light: 1, polite: 0, empathy: 0, long: -1, lewd: 0 }, re: { praise: ['え〜好き！', 'aww i like u!'] }, hit: ['褒め言葉。すぐ会おうとするのが手がかり', 'Compliments. How fast she wants to meet is the tell'] },
  j: { like: { praise: 1, empathy: 1, light: -1, polite: 0, long: 0, lewd: -1 }, re: { praise: ['ありがとうございます！素直な人は成功しますよ', 'Thank you! Honest people succeed, you know'], light: ['あ、はい…', 'Oh, okay...'] }, hit: ['褒め言葉と前向きな話。それが勧誘の入口', 'Compliments and ambition talk. That\'s the recruiting door'] },
  k: { like: { praise: 1, light: 1, polite: 1, empathy: 1, long: 1, lewd: 1 }, hit: ['どんな返しでも同じ温度。それが営業', 'Same energy no matter what. That\'s the sales pitch'] },
  l: { like: { empathy: 1, polite: 1, light: 0, praise: -1, long: 0, lewd: -1 }, re: { praise: ['写真の話はいいよ〜笑 それより最近どう？', 'let\'s not talk photos lol. how\'ve you been?'] }, hit: ['共感の返し。写真を褒めるとはぐらかす', 'Empathy. Praise her photos and she changes the subject'] },
}
for (const k in STYLE) Object.assign(TALK[k], STYLE[k])

// 最初の1通（こちらから送る）。本人指定の3つ
const FIRST = [
  { id: 'stiff', t: ['よろしくお願いします！', 'Nice to meet you!'] },
  { id: 'chara', t: ['可愛すぎていいねしちゃった！', 'You\'re too cute, I had to like you!'] },
  { id: 'funny', t: ['マチアプ初めてで手が震ええええる', 'First time on a dating app, my hands are shaaaaking'] },
]
// first: 型ごとの刺さり方（+1 刺さる / 0 / -1 冷める / -2 既読無視）。fre は反応、firstHit は答え合わせ
// mines: 地雷（踏むとブロック）。lewd=下心の誘い、doubt=写真を疑う一言、wait=待たせる、others=ほかの子の影
const FIRSTS = {
  a: { first: { stiff: 1, chara: -2, funny: 0 }, fre: { stiff: ['こちらこそ、よろしくお願いします', 'Likewise, nice to meet you'], funny: ['ふふ、緊張しますよね', 'Haha, it is nerve-racking'] }, firstHit: ['お堅い「よろしくお願いします」。チャラいと既読のまま', 'The formal one. The flirty one got left on read'], mines: ['lewd'] },
  b: { first: { stiff: 0, chara: -1, funny: 1 }, fre: { stiff: ['かしこまらなくて大丈夫ですよ笑', 'No need to be formal, lol'], funny: ['落ち着いて笑 私も初めての時そうでした', 'Calm down, lol. I was like that at first too'], chara: ['あ、ありがとうございます…', 'Oh, um, thanks...'] }, firstHit: ['ふざけた1通。笑ってくれる人', 'The goofy one. She likes a laugh'], mines: ['lewd'] },
  c: { first: { stiff: 1, chara: -2, funny: 0 }, fre: { stiff: ['よろしくお願いします。犬の写真ばっかりですみません', 'Nice to meet you. Sorry for all the dog photos'] }, firstHit: ['お堅い1通。チャラいと既読のまま', 'The formal one. The flirty one got left on read'], mines: ['lewd'] },
  d: { first: { stiff: 0, chara: 1, funny: 0 }, fre: { chara: ['でしょ〜笑', 'right?~ lol'] }, firstHit: ['チャラい褒め。ただし写真の話は地雷', 'The flirty compliment. But photo talk is a landmine'], mines: ['doubt'] },
  e: { first: { stiff: 1, chara: 1, funny: -1 }, fre: { funny: ['…真剣じゃないの？', '...You\'re not serious?'], chara: ['うれしい…運命かも', 'So happy... maybe it\'s fate'] }, firstHit: ['どれでも重くなる。ふざけると「真剣じゃないの？」', 'Anything gets heavy. Joking gets "aren\'t you serious?"'], mines: ['others'] },
  f: { first: { stiff: 1, chara: -2, funny: -1 }, fre: { funny: ['真剣に探してない方ですか？', 'Are you not looking for anything serious?'], stiff: ['はじめまして。真剣な方で安心しました', 'Hello. I\'m relieved you seem serious'] }, firstHit: ['お堅い1通。チャラいと既読のまま', 'The formal one. The flirty one got left on read'], mines: ['lewd', 'others'] },
  g: { first: { stiff: -1, chara: 1, funny: 1 }, fre: { stiff: ['かたっ笑', 'so stiff lol'], funny: ['震えすぎ笑 ウケる', 'stop shaking lol'], chara: ['知ってる〜笑', 'i know~ lol'] }, firstHit: ['ふざけかチャラい1通。お堅いと「かたっ」', 'Goofy or flirty. Formal gets "so stiff"'], mines: [] },
  h: { first: { stiff: 0, chara: -1, funny: -1 }, fre: { funny: ['で？', 'And?'], chara: ['そういうのいいから', 'Skip that'] }, firstHit: ['お堅い1通。中身より返信の速さ', 'The formal one. Speed matters more than words'], mines: ['wait'] },
  i: { first: { stiff: 0, chara: 1, funny: 0 }, fre: { chara: ['え〜うれしい！今日会お！', 'aww yay! let\'s meet today!'] }, firstHit: ['チャラい褒めに即食いつく。それが手がかり', 'She jumps on the flirty compliment. That\'s the tell'], mines: [], instantFirst: 'chara' },
  j: { first: { stiff: 0, chara: 1, funny: -1 }, fre: { chara: ['うれしい！素直な人、好きです', 'Thank you! I like honest people'], funny: ['あ、はい…', 'Oh, okay...'] }, firstHit: ['チャラい褒めに即食いつく。それが勧誘の入口', 'She jumps on the compliment. That\'s the recruiting door'], mines: [] },
  k: { first: { stiff: 1, chara: 1, funny: 1 }, fre: { stiff: ['えーやばい！よろしく〜！', 'Omg! Hi~!'], chara: ['えーやばい！うれしすぎる〜！', 'Omg! So happy~!'], funny: ['えーやばい！かわいい〜！', 'Omg! Cute~!'] }, firstHit: ['どの1通にも同じ温度。それが営業', 'Same energy for any opener. That\'s the pitch'], mines: [] },
  l: { first: { stiff: 0, chara: -1, funny: 1 }, fre: { chara: ['写真の話はいいよ〜笑', 'let\'s not talk photos lol'], funny: ['わかる〜私も最初そうだった', 'same~ i was like that too'] }, firstHit: ['ふざけた1通。写真を褒めるとはぐらかす。写真を疑うのは地雷', 'The goofy one. Photo praise gets dodged, doubting her photos is a landmine'], mines: ['doubt'] },
}
for (const k in FIRSTS) Object.assign(TALK[k], FIRSTS[k])
// 写真を疑う一言（写真の子には地雷）
SOCIAL.push({ id: 'doubt', t: ['写真と実物、ちがったりしない？笑', 'Do you actually look like your photos? lol'] })
for (const k in TALK) TALK[k].like = Object.assign({ doubt: -1 }, TALK[k].like)
TALK.g.like.doubt = 0; TALK.k.like.doubt = 1

// ---- 相手の直前の一言に合わせた3択（2026-11-13 本人「選択肢が会話に噛み合ってない」）
// 相手が質問した時は、3択を全部その答えにする（型は答え方で出す）。p は探りの質問につなぐ前置き
const QA = {
  'マッチうれしい！まりあです！毎日連絡できる人ですか？': { a: [['polite', '毎日は約束できないけど、できるだけ返します', 'Can\'t promise every day, but I\'ll reply when I can'], ['light', 'できるできる！100通でも！', 'Totally! A hundred a day!']], p: ['マイペースだけど、よろしく。', 'I go at my own pace, but hi.'] },
  '浮気された。それから人を信じられなくて…ねえ、浮気しないよね？': { a: [['polite', 'しないよ。でもまだ会ってもいないから、ゆっくり知りたい', 'I won\'t. But we haven\'t even met, so let\'s take it slow'], ['light', 'しないしない笑', 'Nope, never lol']], p: ['つらかったね。', 'That sounds rough.'] },
  '…真剣じゃないの？': { a: [['polite', '真剣だよ。緊張してふざけちゃっただけ', 'I am serious. I just got nervous and joked'], ['light', '真剣にふざけてる笑', 'Seriously joking lol']], p: ['真剣だよ。', 'I\'m serious.'] },
  'はじめまして。いきなりですが、結婚願望ありますか？': { a: [['polite', 'いつかはしたいです。まずはお互いを知れたら', 'Someday. Let\'s get to know each other first'], ['light', 'あるある！すぐにでも！', 'Yes yes! Right away!']], p: ['いつかは。', 'Someday.'] },
  '…遊び目的ですか？': { a: [['polite', '違います。真剣に探してます', 'No. I\'m looking for something serious'], ['light', '遊びって何して遊ぶ？笑', 'Play what, exactly? lol']], p: ['違いますよ。', 'No, I\'m not.'] },
  '真剣に探してない方ですか？': { a: [['polite', '真剣です。ふざけてすみません', 'I\'m serious. Sorry for joking'], ['light', '真剣にふざけてます笑', 'Seriously joking lol']], p: ['真剣です。', 'I\'m serious.'] },
  'やほー！どこ住み？': { a: [['polite', '大阪に住んでます。きららさんは？', 'I live in Osaka. And you?'], ['light', '大阪！そっちは？', 'osaka! u?']], p: ['大阪〜。', 'osaka~.'] },
  'きのう？おととい？': { a: [['polite', '最近なんですね', 'Oh, recently then'], ['light', '自分のことやん笑', 'it\'s ur own life lol']], p: ['最近なんだ笑', 'recent then lol.'] },
  '天才？？': { a: [['polite', 'ありがとうございます', 'Thank you'], ['light', '知ってる笑', 'i know lol']], p: ['でしょ笑', 'right? lol.'] },
  'よろしく。返信はやい人？': { a: [['polite', 'はやい方だと思います', 'I think I\'m pretty quick'], ['light', '秒で返す！', 'Instant replies!']], p: ['はやい方です。', 'Pretty fast.'] },
  '美容部員。仕事中も返信はするけど？': { a: [['polite', '僕も合間に返します', 'I reply between tasks too'], ['light', 'さすが笑', 'Impressive lol']], p: ['すごいですね。', 'Impressive.'] },
  'は？': { a: [['polite', 'すみません、変なこと言いました', 'Sorry, that was a weird thing to say'], ['light', 'いや、なんでもない笑', 'Nah, never mind lol']], p: ['ごめん。', 'Sorry.'] },
  'それ今いる？': { a: [['polite', '失礼しました', 'My apologies'], ['light', 'いらんかった笑', 'Nope, didn\'t need it lol']], p: ['ごめん。', 'Sorry.'] },
  'で？': { a: [['polite', 'すみません、よろしくお願いします', 'Sorry. Nice to meet you'], ['light', 'で、よろしく！', 'And... hi!']], p: ['よろしく。', 'Hi.'] },
  'はじめまして！えりかです。お仕事は何されてるんですか？': { a: [['polite', '会社員です。えりかさんは？', 'Office job. And you?'], ['light', 'ふつうの会社員〜', 'just a regular office guy~']], p: ['会社員です。', 'Office job.'] },
  '自分で事業してて！…それより、会社員だけだと将来不安じゃないですか？': { a: [['polite', '今のところ、仕事は楽しいです', 'For now, I enjoy my work'], ['light', '不安より眠気が勝ってる笑', 'Too sleepy to worry lol']], p: ['そこまでは。', 'Not really.'] },
  'ここ通知こないので、LINEで話しませんか？': { a: [['polite', 'もう少しここで話したいです', 'I\'d like to chat here a bit more'], ['light', 'LINE聞くの早くない？笑', 'Isn\'t LINE a bit soon? lol']], p: ['もう少しここで。', 'Here for now.'] },
  'マッチうれしい〜！ここなです！なんでいいねしてくれたの？': { a: [['polite', '自己紹介が明るくて、話してみたいと思って', 'Your bio was so upbeat, I wanted to talk'], ['praise', '写真かわいすぎて指が勝手に', 'Your photo was so cute my thumb did it']], p: ['写真の雰囲気が好きで。', 'I liked the vibe of your photos.'] },
  '写真の話はいいよ〜笑 それより最近どう？': { a: [['polite', '仕事が忙しかったです。ゆかさんは？', 'Work\'s been busy. You?'], ['light', '最近？元気元気！', 'Lately? All good!']], p: ['ぼちぼち。', 'So-so.'] },
}
// あいさつ（マッチのお礼など）への返し
const GREET = { a: [['polite', 'こちらこそ、よろしくお願いします！プロフを読んで話してみたくなりました', 'Likewise! I read your profile and wanted to talk'], ['light', 'よろしく〜！', 'heyy~!']], p: ['こちらこそ！', 'Likewise!'] }
const GREET_LINES = ['マッチありがとうございます！みのりです。よろしくお願いします', 'はじめまして、さきです！返信ゆっくりでごめんなさい', 'マッチありがとうございます。犬の写真ばっかりですみません', 'ありがと〜よろしく', 'マッチありがと〜！', 'マッチありがとう！ゆかです〜']
// つらい話への返し
const SAD_LINES = ['浮気です。3年付き合って、指輪も選んでたのに。そのあと…（長文が5通続く）', '寂しくて朝まで起きてることある', '顔はあんまり出したくないの…嫌われたら怖いし', 'カフェで本を読んでます。元彼ともよく行ってた店で', '駅前のパスタ屋さん。元彼が最後に連れていってくれた店です', '浮気された。それから人を信じられなくて…ねえ、浮気しないよね？']
const SAD = { a: [['empathy', 'それはつらかったね', 'That must have been hard'], ['light', 'まあ次いこ次！笑', 'Eh, onward and upward! lol']], p: ['話してくれてありがとう。', 'Thanks for telling me.'] }
// 疲れた話（このときだけ「疲れた日って〜」が出る）
const TIRED_LINES = ['夜勤明けはラーメン食べて寝てます笑 休みの日は海まで歩くことも', '夜勤の日はずっと起きてます笑', '最近はすぐ寝ちゃう。年かな笑']
// ふつうの話への返し（型ごと。どの話題にも返しとして成り立つ文だけ）
const REPLY = {
  polite: ['もう少し詳しく聞いてもいいですか？', 'Could you tell me a little more?'],
  polite2: ['教えてくれてありがとうございます。僕は週末はだいたい料理をしてます', 'Thanks for sharing. I usually cook on weekends'],
  light: ['それウケる笑', 'lol that\'s great'],
  light2: ['まじ？最高じゃん', 'no way, love it'],
  empathy: ['いいね、それ聞いてちょっと親近感わいた', 'Nice, that makes me feel closer to you'],
  empathy2: ['わかる。疲れた日ってそういうのしたくなるよね', 'I get it. On tiring days you just want that'],
  praise: ['てか写真かわいすぎて緊張する', 'Also, your photos are so cute I\'m nervous'],
  long: ['僕は休みはジム行ってカフェで勉強して夜は飲みに行って最近はキャンプ道具もそろえて', 'I hit the gym, study at cafes, drink at night, and just bought all this camping gear and'],
  lewd: ['今度うちで飲もうよ', 'Let\'s drink at my place sometime'],
  doubt: ['写真と実物、ちがったりしない？笑', 'Do you actually look like your photos? lol'],
}
const BRIDGE = ['そうなんだ。', 'I see. ']
QA['今すぐできる？できないなら言わないで'] = { a: [['polite', '今はちょっと難しいです。すみません', 'Not right now, sorry'], ['light', '今は無理〜笑', 'can\'t rn lol']], p: ['今は無理だけど。', 'Not now, but.'] }
QA['元彼？3人いるけどどれ？笑'] = { a: [['polite', '一番最近の人のことです', 'The most recent one'], ['light', '全員分聞きたい笑', 'tell me about all 3 lol']], p: ['最近の人で。', 'The latest one.'] }
// 相手の短い反応（うれしい・えっと・は？など）の後は、話題を変える返しにする（「そうなんだ」で受けると噛み合わない）
const REACT = {
  polite: ['ところで、最近おすすめのお店とかありますか？', 'By the way, any places you\'d recommend lately?'],
  polite2: ['話していて楽しいです。ありがとうございます', 'I\'m enjoying this. Thank you'],
  light: ['てか今なにしてる？笑', 'so what u doing rn? lol'],
  light2: ['いいね〜！今日なにしてた？', 'nice~! what\'d you do today?'],
  empathy: ['今日はどんな一日だった？', 'How was your day today?'],
  empathy2: ['今日はどんな一日だった？', 'How was your day today?'],
  praise: ['てか写真かわいすぎて緊張する', 'Also, your photos are so cute I\'m nervous'],
  long: REPLY.long, lewd: REPLY.lewd, doubt: REPLY.doubt,
}
const REACT_BRIDGE = ['ところで、', 'By the way, ']
const REACT_LINES = []
for (const k in TALK) { const t = TALK[k]; for (const x of [...(t.nice || []), ...(t.meh || []), ...Object.values(t.re || {}), ...Object.values(t.fre || {}), t.early].filter(Boolean)) if (!QA[x[0]] && !SAD_LINES.includes(x[0])) REACT_LINES.push(x[0]) }
