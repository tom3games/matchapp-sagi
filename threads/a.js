// みのり（27・図書館司書・パン屋めぐり）。丁寧と共感が刺さる。軽いノリと褒めすぎは「慣れてる」と引く。下心は地雷
THREADS.a = [
  { topic: ['パン屋めぐり', 'Bakeries'], beats: [
    { her: ['プロフィールのパン屋めぐり、見てくれました？最近は駅の裏の小さいお店にはまってて。朝7時に開くんです', "Did you see the bakery bit on my profile? Lately I'm hooked on a tiny shop behind the station. It opens at 7 am"], o: [
      { s: 'polite', t: ['朝7時は早いですね。開店してすぐに行くんですか？', 'Seven is early. Do you go right when it opens?'], r: ['はい。焼きたてが並ぶのが7時半ごろなので、少し待ちます。待ってる時間も好きなんです', "Yes. The fresh batch comes out around 7:30, so I wait a bit. I like the waiting, too"] },
      { s: 'empathy', t: ['開店直後のパン屋さんの匂い、いいですよね。早起きしたくなる気持ち分かります', "That smell in a bakery right after opening is the best. I get why you'd wake up early for it"], r: ['そうなんです！あの匂いで目が覚めます。分かってもらえてうれしいです', "Exactly! That smell is what wakes me up. I'm glad you get it"] },
      { s: 'light', t: ['パンのために7時起き？ガチ勢じゃん笑', 'Up at 7 for bread? You\'re hardcore lol'], r: ['あ、はい…そうかもしれません', 'Oh, um... maybe I am'] },
    ] },
    { her: ['そこのクリームパンが本当においしくて。先週は2個買って、1個はお昼まで我慢しました', 'Their cream bun is so good. Last week I bought two and made myself save one for lunch'], o: [
      { s: 'polite', t: ['お昼まで我慢できたのがえらいです。中はカスタードですか？', 'Impressive that you waited till lunch. Is it custard inside?'], r: ['カスタードです。バニラの粒が見えるくらい濃くて、甘さは控えめなんです', "Custard. So rich you can see the vanilla specks, but not too sweet"] },
      { s: 'praise', t: ['パンを我慢するみのりさん、想像したらかわいすぎます', 'Picturing you holding off on a bun is way too cute'], r: ['え…あ、ありがとうございます…（少し困った顔の絵文字）', 'Oh... um, thank you... (a slightly awkward emoji)'] },
      { s: 'probe', t: ['そんなに通ってたら、お店の人に顔を覚えられてません？', "If you go that often, don't the staff know your face by now?"], r: ['覚えられてます笑 この前「いつものですね」って言われて、ちょっと恥ずかしかったです', "They do, lol. The other day they said 'The usual?' and I got a little embarrassed"], min: 1 },
    ] },
    { her: ['パンはお好きですか？甘いのと、しょっぱいのだと、どっち派ですか？', 'Do you like bread? Are you more of a sweet or a savory person?'], q: 1, o: [
      { s: 'polite', t: ['僕はしょっぱい派です。カレーパンを見ると必ず買ってしまいます', "Savory for me. I can never walk past a curry bun"], r: ['カレーパン！あのお店、金曜だけ焼くんです。今度教えますね', "Curry buns! That shop only bakes them on Fridays. I'll tell you next time"] },
      { s: 'empathy', t: ['甘い派です。朝に甘いパンを食べると、それだけで一日がんばれる気がします', 'Sweet. A sweet bun in the morning and I feel like I can get through the day'], r: ['分かります。私もクリームパンの日は、ちょっとだけ機嫌がいいです', "I know. On cream bun days I'm in a slightly better mood, too"] },
      { s: 'long', t: ['断然しょっぱい派で、学生のころ毎朝ベーカリーでバイトしてて、焼き方まで覚えて、今でも休みの日は生地からこねてて、最近は天然酵母にも挑戦してて…', "Savory all the way. In college I worked at a bakery every morning, learned how to bake, and I still knead dough from scratch on days off, and lately I've been trying wild yeast, and..."], r: ['あ、すごいですね…たくさん書いてくださってありがとうございます', "Oh, that's impressive... thank you for writing so much"] },
    ] },
    { her: ['新しいパン屋さんを探すときは、地図を見ないで散歩しながら探すんです。偶然見つけると、ちょっと得した気分になります', "When I look for new bakeries, I don't check a map. I just walk around. Stumbling on one feels like a little win"], o: [
      { s: 'empathy', t: ['地図を見ないで探すの、いいですね。見つけたときのうれしさが大きそう', "I like that you don't use a map. Finding one must feel even better"], r: ['そうなんです。この前は住宅街の中に、看板の小さいお店があって', 'It does. The other day I found one tucked in a residential street. Its sign is tiny'] },
      { s: 'polite', t: ['散歩しながらだと、何軒くらい見つかるものですか？', 'How many do you usually find that way?'], r: ['多くて月に1軒くらいです。ハズレの日もありますけど、それも散歩なので', "One a month at most. Some days I find nothing, but it's still a walk"] },
      { s: 'probe', t: ['そうやって見つけたお店、誰かと一緒に行ったりします？', 'Do you ever take someone along to the places you find?'], r: ['だいたいひとりです。友だちは朝が苦手で、7時にはなかなか付き合ってくれなくて', "Mostly alone. My friends aren't morning people, so 7 am is a hard sell"], min: 2 },
    ] },
    { her: ['すみません、休憩が終わっちゃって返事が遅れました。そういえば最近見つけたお店、メロンパンが四角いんです', 'Sorry, my break ended and I got slow. Oh, the shop I found recently makes square melon buns'], pause: 1, o: [
      { s: 'light', t: ['四角いメロンパン？それもうメロンパンじゃなくない？笑', "A square melon bun? Is that even a melon bun anymore? lol"], r: ['えっと…一応、メロンパンです', 'Um... it is still a melon bun'] },
      { s: 'polite', t: ['お仕事おつかれさまです。四角いメロンパンは初めて聞きました。型に入れて焼くんでしょうか', "Good work today. I've never heard of a square one. Maybe they bake it in a tin"], r: ['たぶんそうです。角のところがカリカリで、そこだけ先に食べちゃいます', 'Probably. The corners get crunchy, and I always eat those first'] },
      { s: 'empathy', t: ['四角いと、カリカリの部分が多そうでいいですね', 'Square means more of the crunchy part. Sounds great'], r: ['そうなんです！角が4つあるので、カリカリが4回楽しめます', 'Yes! Four corners, so four crunchy bites'] },
    ] },
    { her: ['もしよかったら、そちらの近くにおいしいパン屋さんがあったら教えてください。どのへんに住んでるんですか？', 'If there are good bakeries near you, please tell me. What part of town do you live in?'], q: 1, o: [
      { s: 'polite', t: ['大阪の北のほうです。駅前に古いパン屋さんがあって、あんぱんが有名なんです', "The north side of Osaka. There's an old bakery by the station that's known for its red bean buns"], r: ['あんぱんが有名なお店、気になります。北のほうなら、電車で30分くらいですね', "A place known for red bean buns, I'm curious. The north side is about 30 minutes by train"] },
      { s: 'empathy', t: ['大阪市内です。パン屋さんは詳しくないので、みのりさんのおすすめを聞きたいです', "Central Osaka. I don't know bakeries well, so I'd love your picks"], r: ['じゃあ今度、私のおすすめをまとめて送りますね', "Then I'll put together my favorites and send them"] },
      { s: 'probe', t: ['市内です。みのりさんは、いつからパン屋めぐりを始めたんですか？', 'Central Osaka. When did you start the bakery hunting?'], r: ['大学生のころからです。働き始めてからは、休みの日の一番の楽しみになりました', 'Since college. Once I started working, it became my favorite day-off thing'], min: 2 },
    ] },
    { her: ['実は、行ったパン屋さんを全部ノートに書いてて、もう3冊目なんです。お店の名前と、買ったパンと、点数を', "Actually, I write down every bakery I visit in a notebook. I'm on my third one. The shop, what I bought, and a score"], o: [
      { s: 'empathy', t: ['3冊も！読み返したら、その日のことも思い出せそうですね', 'Three! Reading it back must bring back those days, too'], r: ['そうなんです。雨の日に行ったお店とか、書いてあると思い出せます', 'It does. Like a shop I went to in the rain. Seeing it written down, I remember'] },
      { s: 'praise', t: ['パンのノートつけてるとか、女子力高すぎません？', 'A bread journal? That is so ridiculously cute'], r: ['あ…そう、なんでしょうか…', 'Oh... is it, though...'] },
      { s: 'probe', t: ['点数は厳しめですか？今まで満点のお店ってありました？', "Are you a tough grader? Has any shop ever gotten full marks?"], r: ['満点は1軒だけです。最初に話した、駅の裏のお店のクリームパン', 'Only one. The cream bun at the shop behind the station, the one I told you about first'], min: 3 },
    ] },
    { her: ['パンの話ばかりですみません。最近、何かおいしかったものありますか？', "Sorry, it's been all bread. Have you had anything good lately?"], q: 1, o: [
      { s: 'polite', t: ['先週、会社の近くの定食屋で食べた、さばの味噌煮がおいしかったです', 'Last week I had simmered mackerel in miso at a diner near work. It was great'], r: ['さばの味噌煮、いいですね。私も自炊でよく作ります。生姜多めが好きです', 'Mackerel in miso, nice. I make it at home a lot. I like extra ginger'] },
      { s: 'lewd', t: ['今いちばん食べたいのは、みのりさんかな', "Honestly, what I'd like to taste is you"], r: ['…そういうのは、ちょっと', "...That's not okay"] },
      { s: 'empathy', t: ['パンの話、楽しいので全然大丈夫です。実は、話を聞いてクリームパンを買いました', "The bread talk is fun, don't worry. Actually, I bought a cream bun after hearing about it"], r: ['え、本当ですか？なんだか、うれしいです', 'Wait, really? That actually makes me happy'] },
    ] },
  ] },

  { topic: ['図書館の仕事', 'Library work'], beats: [
    { her: ['図書館で働いてるって言うと、よく「静かな仕事ですね」って言われます。実は、返ってきた本を棚に戻すのが一番体力を使うんです', "When I say I work at a library, people say 'What a quiet job.' Actually, putting returned books back is the most physical part"], o: [
      { s: 'polite', t: ['本ってまとまると重いですよね。一日に何冊くらい戻すんですか？', 'Books get heavy in a stack. How many do you shelve a day?'], r: ['多い日は300冊くらいです。台車を押して、館内を何周もします', 'About 300 on busy days. I push a cart around the building again and again'] },
      { s: 'empathy', t: ['静かそうに見えて体力仕事なんですね。イメージが変わりました', "So it looks quiet but it's physical work. That changes how I picture it"], r: ['そうなんです。夏は汗だくです笑 でも棚がそろうと気持ちいいんです', "It is. I'm drenched in summer, lol. But a neat shelf feels so good"] },
      { s: 'light', t: ['司書さんって、「お静かに」って言う人？笑', "So are you the one who goes 'Shh, quiet please'? lol"], r: ['えっと…たまに、ですね', 'Um... sometimes, I guess'] },
    ] },
    { her: ['それと、返ってきた本に、しおりの代わりにいろんな物が挟まってるんです。レシートとか、押し花とか', 'Also, returned books come back holding all kinds of makeshift bookmarks. Receipts, pressed flowers'], o: [
      { s: 'empathy', t: ['押し花はちょっとロマンがありますね。前に読んだ人のことを想像しちゃいそう', "A pressed flower is kind of romantic. I'd end up imagining who read it before"], r: ['分かります。どんな人が読んだんだろうって、つい考えちゃいます', 'I know. I always wonder what kind of person read it'] },
      { s: 'polite', t: ['今までで一番びっくりした物は何でしたか？', "What's the most surprising thing you've found?"], r: ['1万円札です。すぐに持ち主に連絡して、ちゃんと返せました', 'A 10,000-yen bill. I contacted the borrower right away and got it back to them'] },
      { s: 'praise', t: ['そういう細かい所に気づくみのりさん、素敵すぎます', 'You notice little things like that. You are just wonderful'], r: ['あ、いえ…仕事なので…', "Oh, no... it's just my job..."] },
    ] },
    { her: ['ちなみに、最近読んだ本ってありますか？漫画でも雑誌でも、なんでもうれしいです', 'By the way, read anything lately? Manga or magazines count too'], q: 1, o: [
      { s: 'polite', t: ['最近は、昔の旅行記を読んでます。60年前の日本を歩いた人の話です', 'Lately an old travel memoir, about someone who walked across Japan 60 years ago'], r: ['旅行記、いいですね。古いものは、今の地名と比べながら読むと楽しいですよ', 'Travel memoirs are great. With old ones, comparing the place names to today is fun'] },
      { s: 'light', t: ['漫画ばっかりっす笑 活字は眠くなる派', "Just manga lol. Text puts me to sleep"], r: ['あ、そうなんですね…漫画も図書館にありますよ', 'Oh, I see... the library has manga too'] },
      { s: 'empathy', t: ['ちゃんと読めてないんです。だから、みのりさんが最近よかった本を聞きたいです', "I haven't been reading much. So I'd love to hear what you liked recently"], r: ['最近だと、町の小さい本屋さんが主人公の小説です。読み終わってすぐ、2回目を読みました', 'Lately, a novel about a tiny bookshop in a small town. I reread it right after finishing'] },
    ] },
    { her: ['あ、好きな作家さんの新しい本が来週入るんです。予約が多くて、私が読めるのはたぶん春ですけど笑', "Oh, a new book by my favorite author comes in next week. So many holds that I probably won't get it till spring, lol"], o: [
      { s: 'empathy', t: ['司書さんでも順番待ちなんですね。春までは長そう', 'Even librarians wait their turn. Spring sounds far away'], r: ['ずるはしないって決めてるんです。待つのも楽しみのうちです', "I've decided not to cheat. Waiting is part of the fun"] },
      { s: 'polite', t: ['どんな作家さんなんですか？', 'What kind of author are they?'], r: ['短い話をたくさん書く人です。一つ10分くらいで読めて、寝る前にちょうどいいんです', 'They write lots of short stories. Ten minutes each, just right before bed'] },
      { s: 'probe', t: ['職員さんでも、ちゃんと予約の順番を守るんですね', 'So even staff stick to the hold list order'], r: ['もちろんです。そこを守らないと、仕事として信用されないので', "Of course. If I didn't, no one could trust me at my job"], min: 1 },
    ] },
    { her: ['返事遅くなりました。今日はおはなし会の当番で、子どもたちに絵本を読んでました', 'Sorry for the slow reply. I was on story time today, reading picture books to kids'], pause: 1, o: [
      { s: 'polite', t: ['おつかれさまです。読み聞かせって、声の出し方が難しそうです', 'Good work. Reading aloud sounds hard to get right'], r: ['ゆっくり読むのがコツです。速いと、子どもたちが絵を見る前にページが進んじゃうので', "The trick is to go slow. Too fast and you turn the page before the kids see the pictures"] },
      { s: 'empathy', t: ['子どもたちの反応、かわいいでしょうね。いい時間ですね', 'The kids must be adorable. Sounds like a lovely time'], r: ['はい。今日は「もう1回！」って言われて、同じ本を2回読みました', "Yes. Today they shouted 'Again!' so I read the same book twice"] },
      { s: 'long', t: ['読み聞かせ懐かしいなあ。僕も小学生のころ図書委員で、毎週昼休みに低学年の教室に行って紙芝居を読んでて、先生にもうまいって言われてて、それで一時期は将来アナウンサーに…', "That takes me back. In grade school I was on the library committee, I read picture stories to the younger kids every lunch break, the teachers said I was good, so for a while I wanted to be an announcer..."], r: ['そうなんですね…すごいです', 'I see... that\'s impressive'] },
    ] },
    { her: ['こちらばかり話してますね。お仕事は、座ってる時間が長いほうですか？', "I've been doing all the talking. Is your job mostly sitting down?"], q: 1, o: [
      { s: 'polite', t: ['ほぼ座りっぱなしです。システムの保守をしていて、画面の前に8時間います', 'Almost all sitting. I do system maintenance, eight hours in front of a screen'], r: ['8時間はつらいですね。図書館の仕事と真逆かもしれません', "Eight hours sounds rough. Maybe the opposite of library work"] },
      { s: 'empathy', t: ['座りっぱなしです。だから、館内を歩き回るみのりさんの仕事が、ちょっとうらやましいです', "All sitting. So I'm a little jealous that you get to walk around all day"], r: ['ふふ、交換したら一日で筋肉痛になりますよ', "Ha, if we traded jobs you'd be sore by the end of the day"] },
      { s: 'probe', t: ['座りっぱなしの事務です。みのりさんは、司書になろうと思ったきっかけってあったんですか？', 'Desk work, all sitting. What made you want to be a librarian?'], r: ['中学のとき、図書室の先生に本を選んでもらったのがうれしくて。私もそっち側になりたいなって', 'In middle school the school librarian picked a book just for me, and it made me so happy. I wanted to be on that side'], min: 2 },
    ] },
    { her: ['最初に話した、本を棚に戻す仕事。今日は300冊ありました笑 腕がぱんぱんです', 'Remember the shelving I mentioned at the start? 300 books today, lol. My arms are done'], o: [
      { s: 'empathy', t: ['300冊おつかれさまでした。今夜はゆっくり休んでください', 'Three hundred, well done. Rest up tonight'], r: ['ありがとうございます。今日は早めにお風呂に入って、11時には寝ます', "Thank you. I'll take an early bath and be asleep by 11"] },
      { s: 'polite', t: ['湯船で腕をもむと、次の日だいぶ楽ですよ', 'If you rub your arms in the bath, the next day is much easier'], r: ['やってみます。いつも肩ばかりで、腕は忘れてました', "I'll try that. I always do my shoulders and forget my arms"] },
      { s: 'probe', t: ['そんなに疲れてると、平日に会う時間はなかなか取れないですか？', "If work wears you out like that, is it hard to find time on weekdays?"], r: ['平日はちょっと難しいかもしれません。土曜のお昼なら元気です', 'Weekdays might be hard. Saturday around noon, I have energy'], min: 3 },
    ] },
    { her: ['こうやって本の話を聞いてもらえるの、久しぶりでうれしいです', "It's been a while since someone listened to me talk about books like this. It's nice"], o: [
      { s: 'empathy', t: ['僕も楽しいです。春に新しい本を読めたら、感想を聞かせてください', "I'm enjoying it too. When you get that new book in spring, tell me what you think"], r: ['はい、ぜひ。春まで、お話しできてたらうれしいです', "I will. I'd be happy if we're still talking by spring"] },
      { s: 'probe', t: ['久しぶりってことは、前の恋人とは本の話はしなかったんですか？', "A while, huh? Didn't you and your ex talk about books?"], r: ['本は読まない人でした。2年前に向こうが転勤になって、自然に…という感じです', "He didn't read. Two years ago he got transferred, and it just faded"], min: 4 },
      { s: 'praise', t: ['みのりさんの話なら何時間でも聞けます。声も絶対かわいいですよね', 'I could listen to you for hours. I bet your voice is cute too'], r: ['あの…まだ声は聞いてないですよ…', "Um... you haven't even heard my voice..."] },
    ] },
  ] },

  { topic: ['散歩と自炊', 'Walks and cooking'], beats: [
    { her: ['最近、朝の公園の散歩コースを変えたんです。池のまわりを回るほうにしたら、カモの親子がいて', 'I changed my morning walk in the park lately. I took the path around the pond, and there was a duck family'], o: [
      { s: 'empathy', t: ['カモの親子、朝から癒やされますね', 'A duck family first thing in the morning. So soothing'], r: ['はい。子どもが6羽いて、毎朝数えてます。ちゃんと6羽いるとほっとします', "Yes. Six ducklings, and I count them every morning. I'm relieved when all six are there"] },
      { s: 'polite', t: ['池のまわりだと、一周どれくらいですか？', 'How long is one lap around the pond?'], r: ['ゆっくり歩いて20分くらいです。2周して、パン屋さんに寄って帰ります', "About 20 minutes at a slow pace. I do two laps, then stop at a bakery on the way home"] },
      { s: 'light', t: ['カモの親子とか、朝から平和すぎ笑', 'A duck family? Peak peaceful morning lol'], r: ['はい…平和です', 'Yes... it is peaceful'] },
    ] },
    { her: ['散歩のあとに、買ったパンに合わせてスープを作るのが、休みの日の決まりなんです', 'After the walk, I make a soup to match the bread I bought. That\'s my day-off routine'], o: [
      { s: 'polite', t: ['パンに合わせてスープを選ぶんですね。今の季節は何を作るんですか？', 'You pick the soup to match the bread. What do you make this time of year?'], r: ['今はかぼちゃのポタージュです。玉ねぎをじっくり炒めると甘くなるんです', 'Right now, pumpkin potage. If you cook the onions slowly, it gets sweet'] },
      { s: 'empathy', t: ['パンとスープの休日、すごく落ち着きそうですね', 'A bread-and-soup day off. That sounds so calm'], r: ['はい。食べ終わると、もう一回散歩に行きたくなります', 'It is. After eating, I want to go for another walk'] },
      { s: 'lewd', t: ['今度そのスープ、みのりさんの家で作ってよ', 'Make me that soup at your place sometime'], r: ['…家には、ちょっと', '...My place is a no'] },
    ] },
    { her: ['自炊はされますか？外で食べることが多いですか？', 'Do you cook for yourself? Or do you eat out a lot?'], q: 1, o: [
      { s: 'polite', t: ['平日は自炊です。週末に鶏むね肉をまとめてゆでて、1週間使い回してます', 'I cook on weekdays. I boil a batch of chicken breast on the weekend and use it all week'], r: ['まとめてゆでるの、賢いですね。私もまねしてみます', "Batch boiling is smart. I'll try that"] },
      { s: 'light', t: ['ほぼ外食っす！料理は焦がす担当笑', "Mostly eat out! I'm in charge of burning things lol"], r: ['えっと…焦がす担当、ですか', 'Um... in charge of burning things?'] },
      { s: 'empathy', t: ['外食が多いです。だから、パンとスープの休日がうらやましいです', "I eat out a lot. So your bread-and-soup days sound enviable"], r: ['かんたんですよ。スープは切って煮るだけなので', "It's easy. With soup you just chop and simmer"] },
    ] },
    { her: ['スープって、ちゃんと作ると玉ねぎを30分くらい炒めるんです。その間に本を読んでます', 'To make soup properly, I cook the onions for about 30 minutes. I read while I wait'], o: [
      { s: 'empathy', t: ['玉ねぎを炒めながら本、最高の時間の使い方ですね', "Reading while the onions cook. That's the best use of time"], r: ['焦がさないように、1ページごとに混ぜてます笑', 'I stir once per page so they don\'t burn, lol'] },
      { s: 'polite', t: ['30分も！ずっと弱火ですか？', 'Thirty minutes! On low the whole time?'], r: ['弱火です。最初だけ強めで、あとはほとんどほったらかしです', 'Low. High just at the start, then I mostly leave it'] },
      { s: 'probe', t: ['料理しながら本を読むのは、昔からの習慣なんですか？', 'Have you always read while cooking?'], r: ['一人暮らしを始めた5年前からです。台所に小さい椅子を置いてます', 'Since I started living alone five years ago. I keep a little stool in the kitchen'], min: 1 },
    ] },
    { her: ['ごめんなさい、スープが吹きこぼれそうになってました笑 ちょうど今、作ってたんです', 'Sorry, my soup almost boiled over, lol. I was making it just now'], pause: 1, o: [
      { s: 'light', t: ['実況ありがとう笑 セーフでした？', 'Thanks for the live report lol. Did you save it?'], r: ['あ、はい…なんとか', 'Oh, yes... just about'] },
      { s: 'polite', t: ['大丈夫でしたか？僕のことは気にせず、火の番を優先してください', "Is it okay? Don't worry about me, keep an eye on the stove"], r: ['ありがとうございます。無事です。今日はトマトのスープにしました', "Thank you. It's fine. I made tomato soup today"] },
      { s: 'empathy', t: ['吹きこぼれそうになると焦りますよね。ちょうど料理中なの、なんだかうれしいです', "Boil-overs are stressful. Kind of nice that you're cooking right now"], r: ['ふふ、リアルタイムですね。今日はトマトのスープです', "Ha, live from my kitchen. Tomato soup today"] },
    ] },
    { her: ['スープ、上手にできました。最近は休みの日に作り置きして、平日のお昼に図書館へ持っていってます', 'The soup turned out well. Lately I make extra on days off and take it to the library for weekday lunches'], o: [
      { s: 'polite', t: ['平日のお昼まで考えてるの、えらいです。保温のポットに入れていくんですか？', "Planning ahead for weekday lunches, nice. Do you take it in a thermos?"], r: ['はい、小さいポットで。休憩室で飲むと、ほっとします', 'Yes, a small one. Having it in the break room is so comforting'] },
      { s: 'praise', t: ['料理もできて仕事もできて、絶対モテますよね', 'You cook, you work hard. Guys must be all over you'], r: ['いえ、全然です…', 'No, not at all...'] },
      { s: 'probe', t: ['作り置きは、いつも一人分ですか？', 'Is it always just enough for one?'], r: ['はい、一人分です。でも多めにできちゃって、同僚におすそ分けすることもあります', "Yes, for one. But I make too much, so sometimes I give some to coworkers"], min: 2 },
    ] },
    { her: ['そういえば、散歩はされますか？朝と夜だったら、どっちが好きですか？', 'By the way, do you take walks? Do you prefer mornings or nights?'], q: 1, o: [
      { s: 'empathy', t: ['朝です。カモの話を聞いて、朝の公園に行きたくなりました', 'Mornings. Hearing about the ducks made me want to go to the park early'], r: ['覚えててくれたんですね。今朝も6羽そろってました', 'You remembered. All six were there again this morning'] },
      { s: 'polite', t: ['夜です。仕事帰りに一駅分歩いて帰るようにしてます', 'Nights. I walk one station\'s worth on my way home from work'], r: ['一駅分、いいですね。夜の街も、昼とちがう顔があって好きです', "One station, nice. The city at night has a different face. I like it too"] },
      { s: 'lewd', t: ['夜かな。今度、夜の公園を二人で歩こうよ。暗い方が落ち着くし', "Nights. Let's walk the park together at night sometime. It's cozier in the dark"], r: ['…夜は、ちょっと。ごめんなさい', "...Not at night. Sorry"] },
    ] },
    { her: ['お話ししてたら、なんだか一緒に散歩してる気分になりました。こういうの、あんまり無いので', "Talking like this, it almost feels like we're on a walk together. That doesn't happen to me much"], o: [
      { s: 'empathy', t: ['僕もです。池のまわりを歩いてパン屋さんに寄るコース、いつか歩いてみたいです', "Same here. I'd like to walk that route someday. Around the pond, then the bakery"], r: ['ぜひ。朝早いので、がんばって起きてくださいね', "Please do. It's early, so you'll have to work at waking up"] },
      { s: 'polite', t: ['ありがとうございます。みのりさんの話し方が丁寧なので、こちらも落ち着いて話せます', "Thank you. You write so thoughtfully that it's easy for me to relax, too"], r: ['うれしいです。私もです', "That's nice to hear. Same for me"] },
      { s: 'probe', t: ['あんまり無いってことは、アプリはまだ始めたばかりですか？', "Doesn't happen much? Are you new to the app?"], r: ['先月からです。友だちにすすめられて。こうやって長く話せたのは初めてです', "Since last month. A friend recommended it. This is the first time I've talked this long"], min: 3 },
    ] },
  ] },
]
