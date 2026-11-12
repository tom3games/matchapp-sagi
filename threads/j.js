// えりか（勧誘の業者）。褒めと共感が刺さる。軽いノリは冷める。ほころび: 仕事をそらす・将来とお金の不安・別の場所へ・尊敬してる人・写真はプロ
THREADS.j = [
  { topic: ['ホテルのラウンジ', 'Hotel lounges'], beats: [
    { her: ['プロフ見てくれました？ホテルのラウンジが好きで、週末はだいたいどこかのラウンジにいます！', "Did you see my profile? I love hotel lounges. On weekends I'm usually at one somewhere!"], o: [
      { s: 'praise', t: ['ラウンジ似合いそう。写真の雰囲気もそんな感じだった', 'I bet lounges suit you. Your photos have that vibe'], r: ['うれしい！似合う場所にいると、自分の格も上がる気がするんです', "Thank you! When I'm somewhere that suits me, I feel like I level up too"] },
      { s: 'light', t: ['ラウンジって、座るだけでお金とられるとこ？笑', 'Is that the place that charges you just to sit? lol'], r: ['あ、はい…まあ、そういう見方もありますね', "Oh, okay... I guess that's one way to see it"] },
      { s: 'probe', t: ['ラウンジで一人のとき、何してるの？', 'What do you do there when you go alone?'], r: ['打ち合わせが多いです！あとは、いい空間で将来のこと考えたり', 'Lots of meetings! And thinking about my future in a nice space'], min: 0, c: 1 },
    ] },
    { her: ['ラウンジって、まわりの話が聞こえてくるのが面白いんです。みんな夢の話をしてて', "The fun part is overhearing people. Everyone's talking about their dreams"], o: [
      { s: 'empathy', t: ['隣の席の会話って気になるよね。夢の話なら聞いてて元気出そう', 'The next table is always interesting. Dream talk would give me energy'], r: ['そうなんです！前向きな人のそばにいると、自分も変われるんですよ', "Exactly! Being around positive people changes you too"] },
      { s: 'long', t: ['おれは昼休みに会社の近くのカフェにいるくらいかな。隣はだいたい上司の愚痴で、夢の話なんて聞いたことない', "I just sit in a cafe near work at lunch. The next table is always complaining about their boss. Never heard a dream in there"], r: ['それ、環境がもったいないです…いる場所で人生変わりますよ', "That environment is such a waste... Where you spend time changes your life"] },
      { s: 'probe', t: ['さっき打ち合わせって言ってたけど、何のお仕事の？', 'You said meetings. What kind of work?'], r: ['いろいろです！それより、今の環境に満足してます？', 'All sorts! More importantly, are you happy where you are now?'], min: 0, c: 1 },
    ] },
    { her: ['ねえ、正直に聞いてもいいですか？今のお仕事、10年後も続けてると思います？', 'Can I ask you something honestly? Do you think you will still be in your job ten years from now?'], q: 1, o: [
      { s: 'polite', t: ['たぶん続けてると思う。異動はあっても、辞める予定はないよ', "Probably. Maybe a transfer, but I'm not planning to quit"], r: ['そっか…それも安定ですよね。でも会社の都合で変わることもあるから', "I see... That's stable, I guess. But the company could change things on you"] },
      { s: 'praise', t: ['分からない。そういう先のことまで考えてるえりかさん、かっこいいね', "No idea. You thinking that far ahead is pretty cool"], r: ['ありがとうございます！素直な人は成功しますよ。わたしも最初は全然でした', "Thank you! Honest people succeed. I wasn't like this at first either"] },
      { s: 'probe', t: ['分からない。…なんで将来の話ばっかり聞くの？', "Don't know. ...Why do you keep asking about the future?"], r: ['ごめんなさい！でもお金の不安って、早く向き合った人が勝つんですよ', "Sorry! But when it comes to money worries, the people who face them early win"], min: 1, c: 1 },
    ] },
    { her: ['わたしも前は会社員だったんです。毎朝満員電車で、このままでいいのかなってずっと思ってて', "I used to be an office worker too. Packed trains every morning, always wondering if this was it"], pause: 1, o: [
      { s: 'empathy', t: ['毎朝それ考えながら乗るの、しんどいよね。何がきっかけで変わったの？', 'Thinking that on every commute sounds rough. What made you change?'], r: ['ある人に出会ったんです。今も尊敬してる人で、考え方を全部変えてくれて', "I met someone. I still really respect them. They changed how I think about everything"], c: 1 },
      { s: 'light', t: ['おれ今まさに満員電車の中', "I'm on a packed train right now"], r: ['あ、そうなんですね…大変ですね', "Oh, I see... That must be tough"] },
      { s: 'probe', t: ['会社を辞めて、今は何で食べてるの？', 'So after you quit, how do you make a living?'], r: ['うーん、説明すると長くなるんです。会ったときにゆっくり話しますね', "Hmm, it's a long story. I'll tell you properly when we meet"], min: 1, c: 1 },
    ] },
    { her: ['その人、本当にすごいんです。20代で会社を辞めて、今は好きな時間に好きな場所で働いてて', "They're amazing. Quit their company in their twenties, and now they work whenever and wherever they want"], o: [
      { s: 'praise', t: ['そういう人と知り合えるえりかさんもすごいよ', "You're impressive too, knowing people like that"], r: ['ありがとうございます！類は友を呼ぶって本当ですよ', "Thank you! Birds of a feather, it's really true"] },
      { s: 'probe', t: ['その人は、何の仕事をしてる人なの？', 'What does that person actually do?'], r: ['人の人生を変える仕事、かな。会えば絶対わかります！', "Work that changes people's lives, I'd say. You'll get it the moment you meet them!"], min: 1, c: 1 },
      { s: 'lewd', t: ['その人より、えりかさんと二人で飲みたいな', "I\'d rather just have drinks, you and me"], r: ['…そういうのは、ちょっと', "...I'm not really into that"] },
    ] },
    { her: ['今度一緒にラウンジ行きません？紅茶がすごくおいしいところがあるんです', "Want to go to a lounge together sometime? There\'s one that serves really good tea"], q: 1, o: [
      { s: 'polite', t: ['いいね。土日の昼なら行けるよ。どのへんのホテル？', 'Sure. Weekend afternoons work for me. Which hotel?'], r: ['駅直結のところです！あ、その日もしかしたら、もう一人来るかも', "The one connected to the station! Oh, and someone else might come that day"], c: 1 },
      { s: 'praise', t: ['えりかさんとなら、紅茶じゃなくてもどこでも行く', "With you I'd go anywhere, tea or not"], r: ['うれしい！素直な人、好きです', 'Yay! I like honest people'] },
      { s: 'probe', t: ['行きたい。それって二人で？誰か来る？', 'Sounds good. Just us two, or is someone coming?'], r: ['実は、前に話した尊敬してる人も来られるかもなんです！ぜひ会ってほしくて', "Actually, the person I respect might be able to come! I really want you to meet them"], min: 2, c: 1 },
    ] },
    { her: ['あ、このアプリって通知が遅れること多くないですか？別のアプリのほうが連絡しやすいかも', "Oh, don't notifications on this app come late a lot? Another app might be easier"], q: 1, o: [
      { s: 'polite', t: ['こっちは普通に届いてるよ。もう少しここで話そう', "Mine come through fine. Let's talk here a bit longer"], r: ['そうですか…じゃあ、また今度で！', 'Oh, okay... Maybe another time then!'] },
      { s: 'empathy', t: ['たしかに遅いときあるね。じゃあID送ろうか？', 'Yeah, they do lag sometimes. Should I send you my ID?'], r: ['ありがとうございます！そっちなら、役に立つ情報も送れるので', "Thank you! Over there I can send you some useful info too"], c: 1 },
      { s: 'light', t: ['通知が遅いのは、たぶんおれの返信が遅いせい', "The lag is probably just me being slow to reply"], r: ['あ、はい…', 'Oh, okay...'] },
    ] },
    { her: ['ちなみに、お金のことって何か勉強してます？', 'By the way, are you studying anything about money?'], q: 1, o: [
      { s: 'polite', t: ['会社の積立くらいかな。ちゃんと調べたことはない', "Just the company savings plan. I've never really looked into it"], r: ['もったいない…知ってるか知らないかで、人生ほんとに変わるんです', "What a waste... Knowing or not knowing really changes your life"] },
      { s: 'long', t: ['去年本を一冊読んで、毎月少しだけ積み立ててる。増えたり減ったりで、正直よく分かってないけど続けてる', "I read one book last year and put a little away every month. It goes up and down and honestly I don't get it, but I keep at it"], r: ['素敵です！向上心ありますね。もっといいやり方、教えてくれる人いますよ', "Wonderful! You're ambitious. I know someone who can show you a better way"], c: 1 },
      { s: 'probe', t: ['してない。えりかさんの言う勉強って、誰かに教わるやつ？', "Not really. When you say studying, do you mean someone teaches you?"], r: ['そうです！ひとりだと限界があるので。月に何回か、みんなで集まってるんです', "Yes! There's only so far you get alone. We all meet a few times a month"], min: 2, c: 1 },
    ] },
    { her: ['なんか、話してて思いました。あなたなら絶対変われる人です', 'You know, talking to you, I can tell. You are someone who can really change'], o: [
      { s: 'praise', t: ['そう言ってもらえると自信つくな', 'Hearing that from you gives me confidence'], r: ['ほんとですよ！今度会ったとき、尊敬してる人にも会ってほしいです', "I mean it! When we meet, I'd love you to meet the person I respect too"], c: 1 },
      { s: 'doubt', t: ['プロフの写真すごくきれいだけど、あれ本人？', 'Your profile photos are gorgeous. Is that really you?'], r: ['もちろん本人です！プロのカメラマンさんに撮ってもらったんです', 'Of course it is! A professional photographer took them'], c: 1 },
      { s: 'polite', t: ['会うなら、まずは二人で普通にお茶したいな', "If we meet, I'd like it to be just us having tea first"], r: ['もちろんです！…あ、でも一人だけ紹介したい人がいて', 'Of course! ...Oh, but there is one person I want to introduce'], c: 1 },
    ] },
  ] },

  { topic: ['海外旅行', 'Travel abroad'], beats: [
    { her: ['このあいだ一人で海外に行ってきたんです！平日に行けるのが、今の働き方のいいところで', "I just got back from a solo trip abroad! Being able to go on weekdays is the best part of how I work now"], o: [
      { s: 'praise', t: ['平日にふらっと海外って、かっこいい生き方だね', 'Popping abroad on a weekday. That is a cool way to live'], r: ['ありがとうございます！自分で時間を決められると、人生が変わりますよ', 'Thank you! When you control your own time, your life changes'] },
      { s: 'light', t: ['平日に？有給どうなってんの笑', 'On a weekday? What about your vacation days lol'], r: ['あ、はい…有給とかは、もう関係ないので', "Oh, okay... Vacation days don't really apply to me anymore"] },
      { s: 'probe', t: ['どこ行ったの？仕事で？', 'Where did you go? For work?'], r: ['南の島です！半分は仕事かな。パソコン一台あればどこでもできるので', "A southern island! Half work, I guess. All I need is a laptop, and I can work anywhere"], min: 0, c: 1 },
    ] },
    { her: ['海の見えるカフェでパソコンを開いてたら、ここで生きていけたらなって本気で思っちゃって', "I had my laptop open in a cafe looking out at the sea, and I seriously thought, I could live here"], o: [
      { s: 'empathy', t: ['それはそう思うよね。帰ってきた日の朝とか、現実に戻るのしんどそう', 'Of course you would. The first morning back must be brutal'], r: ['そうなんです！だから、戻らなくていい生き方を選んだんです', "Exactly! That's why I chose a life where I don't have to go back"] },
      { s: 'long', t: ['おれが最後に海外行ったのは卒業旅行。帰りの飛行機でもう一回来るって決めたのに、気づいたら5年たってる', "The last time I went abroad was my graduation trip. I swore on the flight home I'd come back, and somehow five years went by"], r: ['それ、時間がもったいないです…行きたいって思ったときが行く時ですよ', "That's such wasted time... The moment you want to go is the moment to go"] },
      { s: 'probe', t: ['パソコン一台でって、どんな作業してるの？', 'Just a laptop? What kind of work do you do on it?'], r: ['連絡とか、人と会う約束とか…まあいろいろです！', 'Messages, setting up meetings... all sorts!'], min: 1, c: 1 },
    ] },
    { her: ['もし毎月自由に旅行できるとしたら、どこに行きたいですか？', 'If you could travel freely every month, where would you go?'], q: 1, o: [
      { s: 'polite', t: ['寒い国でオーロラを一回見てみたい', "I'd want to see the northern lights in some cold country"], r: ['素敵！そういう夢、ちゃんと叶える方法があるんですよ', "Lovely! There's actually a real way to make dreams like that happen"], c: 1 },
      { s: 'light', t: ['毎月なら、近所の温泉で十分かな', 'Every month? The local hot spring would do me fine'], r: ['あ、はい…欲がないんですね', "Oh, okay... You don't want much, do you"] },
      { s: 'praise', t: ['えりかさんが行ったその島。案内してほしい', 'That island you went to. With you as my guide'], r: ['うれしい！一緒に行けたら最高ですね', "Yay! Going together would be the best"] },
    ] },
    { her: ['でも、会社員のままだと休みも予算も限られちゃいますよね', "But as a company employee, your time off and budget are limited, right"], pause: 1, o: [
      { s: 'empathy', t: ['たしかに。休みを取るにも気をつかうし、行けて年1回だな', 'True. Even asking for time off is awkward. Once a year at best'], r: ['わかってくれる人で嬉しい！その「限られてる」を外す方法があるんです', "So glad you get it! There's a way to remove that limit"], c: 1 },
      { s: 'polite', t: ['でも、限られてるぶん計画するのが楽しいけどね', 'Having limits makes the planning fun, though'], r: ['うーん…それ、今の自分に慣れちゃってるのかも', "Hmm... Maybe you've just gotten used to where you are"] },
      { s: 'probe', t: ['えりかさんは、旅行のお金ってどうやって作ってるの？', 'How do you make the money for your trips?'], r: ['仕組みを作ったんです！くわしくは、教えてくれた人から聞いたほうが早いかも', "I built a system! It'd be quicker to hear the details from the person who taught me"], min: 1, c: 1 },
    ] },
    { her: ['前は旅行のたびに貯金がへって、不安で眠れない夜もありました', "I used to watch my savings drop after every trip. Some nights I couldn't sleep from the worry"], o: [
      { s: 'empathy', t: ['楽しいはずの旅行で不安になるの、つらいね。今は大丈夫なの？', "Getting anxious over a trip that should be fun is hard. Are you okay now?"], r: ['はい！お金の不安がなくなると、旅行も心から楽しめるんですよ', "Yes! Once the money worries go, you can really enjoy traveling"] },
      { s: 'lewd', t: ['眠れない夜は、おれが添い寝しにいくよ', "On sleepless nights I'll come keep you company in bed"], r: ['…そういうの、苦手です', "...I don't like that kind of thing"] },
      { s: 'probe', t: ['そこから何が変わったの？誰かに相談した？', 'So what changed? Did you talk to someone?'], r: ['ある勉強会に出会ったんです。そこで尊敬できる人に会えて', 'I found a study group. That is where I met someone I really respect'], min: 2, c: 1 },
    ] },
    { her: ['その勉強会、すごく前向きな人ばかりなんです。愚痴を言う人がひとりもいなくて', "Everyone at that study group is so positive. Not one person complains"], o: [
      { s: 'praise', t: ['えりかさんが前向きなのは、そこからなんだね', "So that's where your positivity comes from"], r: ['そうなんです！あなたもきっと合うと思う', "That's right! I think you'd fit right in"] },
      { s: 'polite', t: ['愚痴がない場所はいいね。何人くらい来てるの？', 'A place where nobody complains sounds nice. How many people go?'], r: ['毎回30人くらいかな。初めての人も多いですよ！', "About thirty each time. Lots of first-timers too!"], c: 1 },
      { s: 'light', t: ['愚痴禁止とか、おれ3分で追い出されそう', "No complaining? I'd get kicked out in three minutes"], r: ['あ、はい…そういうノリの方もいますよね', 'Oh, okay... Some people are like that, I guess'] },
    ] },
    { her: ['旅行先で知り合った人とも、まだつながってるんです。みんな自由に働いてて', "I still talk to people I met on trips. They all work freely too"], o: [
      { s: 'empathy', t: ['旅先の出会いが続くのいいね。どうやって知り合ったの？', 'Nice that those connections last. How did you meet them?'], r: ['ホテルのラウンジで声をかけてもらって！そういう縁は大事にしたいんです', 'Someone started talking to me in a hotel lounge! I want to treasure connections like that'] },
      { s: 'long', t: ['おれも旅先で知り合った人としばらく連絡してたけど、半年くらいで自然に終わっちゃった。続けられるのは、えりかさんがまめなんだと思う', "I kept messaging someone from a trip for a while too, but it faded after about six months. You must be good at staying in touch"], r: ['素敵です！そうやって振り返れる人、伸びますよ', 'Wonderful! People who can reflect like that grow'] },
      { s: 'probe', t: ['自由に働いてる人って、みんな同じ仕事？', 'These people who work freely, do they all do the same thing?'], r: ['うーん、近いかも笑 みんな同じ人に教わってるので', "Hmm, kind of, lol. They all learned from the same person"], min: 2, c: 1 },
    ] },
    { her: ['ねえ、次の旅行の前に、話だけでも聞いてほしいことがあって', "Hey, before my next trip, there's something I'd love you to just hear me out on"], o: [
      { s: 'polite', t: ['旅行の話ならいくらでも聞くよ。次はどこ行くの？', "I'll happily hear about travel. Where to next?"], r: ['それもなんですけど…まずはお金の話から、かな', "That too... but I\'d start by talking about money, I think"], c: 1 },
      { s: 'praise', t: ['えりかさんの話なら何でも聞きたい', "I want to hear anything you have to say"], r: ['うれしい！その素直さ、絶対に武器になりますよ', "Yay! That openness will be your biggest strength"] },
      { s: 'probe', t: ['話って、旅行じゃなくてお金のこと？', 'This talk, is it about money and not travel?'], r: ['ばれました？笑 でも本当にあなたのためになる話なんです', "You caught me? lol. But it really is for your own good"], min: 3, c: 1 },
    ] },
    { her: ['今度ゆっくり会えたら、旅の写真も見せますね！', "When we get to meet properly, I'll show you my trip photos!"], o: [
      { s: 'doubt', t: ['写真といえば、プロフの写真きれいすぎて本人か不安だった笑', 'Speaking of photos, yours are so perfect I wondered if they were really you lol'], r: ['もちろん本人です！プロに撮ってもらったので、ちょっと盛れてるかも', "Of course it's me! A pro took them, so maybe they're a little flattering"], c: 1 },
      { s: 'empathy', t: ['見たい。南の島の海の色、ずっと気になってた', "I'd love that. I've been curious what the sea looked like there"], r: ['ぜひ！見たら絶対行きたくなりますよ', "Please! You'll want to go the moment you see them"] },
      { s: 'light', t: ['じゃあおれは近所の公園の写真を持っていく', "Then I'll bring photos of my local park"], r: ['あ、はい…公園もいいですね', 'Oh, okay... Parks are nice too'] },
    ] },
  ] },

  { topic: ['朝活と自己成長', 'Mornings and self-growth'], beats: [
    { her: ['毎朝5時に起きて、ノートに目標を書いてから一日をはじめてるんです', 'I get up at five every morning and start the day by writing my goals in a notebook'], o: [
      { s: 'praise', t: ['5時起きはすごい。そういう人、尊敬する', "Up at five is impressive. I respect people like that"], r: ['ありがとうございます！尊敬って言ってもらえるの、いちばんうれしいです', "Thank you! Being respected is the best thing anyone can say to me"] },
      { s: 'light', t: ['5時は、おれにとってまだ深夜', 'For me five is still the middle of the night'], r: ['あ、はい…朝って気持ちいいですよ', 'Oh, okay... Mornings feel great, you know'] },
      { s: 'probe', t: ['ノートの目標って、どんなこと書くの？', 'What kind of goals go in the notebook?'], r: ['今年中に収入を倍にする、とかです！数字で書くと叶うんですよ', "Things like doubling my income this year! Write it as a number and it comes true"], min: 0, c: 1 },
    ] },
    { her: ['朝の時間って誰にも邪魔されないから、自分に投資できるんですよね', 'No one bothers you in the morning, so you can invest in yourself'], o: [
      { s: 'empathy', t: ['わかる。夜は疲れて何もできないけど、朝なら頭が動く', 'I get that. At night I am too tired, but in the morning my head works'], r: ['そうなんです！わかってくれる人で嬉しい', "Exactly! So glad you get it"] },
      { s: 'polite', t: ['おれは朝が弱いから、通勤の電車で本を読むようにしてる', "I'm bad at mornings, so I read on the train to work instead"], r: ['えらい！その積み重ね、絶対に返ってきますよ', "Good for you! That kind of habit always pays off"] },
      { s: 'probe', t: ['自分に投資って、具体的には何してるの？', 'Invest in yourself how, exactly?'], r: ['セミナーとか、尊敬してる人の話を聞きに行ったりです！', "Seminars, and going to hear the person I respect speak!"], min: 1, c: 1 },
    ] },
    { her: ['あなたは最近、自分のために何かしてます？', 'Have you been doing anything for yourself lately?'], q: 1, o: [
      { s: 'polite', t: ['週2でジムに通ってる。続いてるのはそれくらい', "The gym twice a week. That's about the only thing I've kept up"], r: ['素敵です！体に投資できる人は、お金にも投資できますよ', 'Wonderful! People who invest in their body can invest in money too'] },
      { s: 'long', t: ['去年から資格の勉強をしてて、仕事のあと毎日1時間だけやってる。来月が試験で、正直ちょっと緊張してる', "I've been studying for a certification since last year, an hour every day after work. The exam is next month and honestly I'm a bit nervous"], r: ['向上心ありますね！そういう人と話すと、こっちまで元気が出ます', "You're so driven! Talking to people like you gives me energy too"] },
      { s: 'light', t: ['毎晩ちゃんと寝てる。最高の自己投資', 'I sleep properly every night. Best investment there is'], r: ['あ、はい…それも大事ですけど', "Oh, okay... That's important too, I suppose"] },
    ] },
    { her: ['でも、がんばっても会社員のお給料って、そんなに上がらないじゃないですか', "But no matter how hard you work, a salary doesn't go up that much"], pause: 1, o: [
      { s: 'empathy', t: ['それはある。がんばった分が返ってこない感じ', 'That is true. It feels like the effort never comes back to you'], r: ['でしょう？だから、働き方そのものを変えるしかないんです', "Right? That's why the only way is to change how you work"], c: 1 },
      { s: 'polite', t: ['上がり方はゆっくりだけど、今の仕事は好きだからいいかな', "It goes up slowly, but I like my job, so I'm fine"], r: ['もったいない…好きなことで、もっと稼げるかもしれないのに', "What a waste... You could be earning more doing what you love"] },
      { s: 'probe', t: ['えりかさんは、どうやって上がるようにしたの？', 'How did you get yours to go up?'], r: ['それは会ってから話しますね！文字だと誤解されやすいので', "I'll tell you when we meet! It's easy to misunderstand in text"], min: 1, c: 1 },
    ] },
    { her: ['わたし、人生を変えたいって思ってる人を応援するのが好きなんです', 'I love cheering on people who want to change their lives'], o: [
      { s: 'praise', t: ['そういうことをまっすぐ言える人、なかなかいないよ', "Not many people can say that so openly"], r: ['うれしい！あなたみたいな人こそ応援したいです', "Thank you! People like you are exactly who I want to cheer on"] },
      { s: 'lewd', t: ['じゃあ、おれの夜も応援してほしいな', 'Then cheer me on at night too'], r: ['…そういうの、苦手です', "...I don't like that kind of thing"] },
      { s: 'probe', t: ['応援って、それも仕事として？', 'Cheering people on, is that part of your work?'], r: ['うーん、半分そうかも。人を紹介するのも、わたしの仕事みたいなものなので', "Hmm, half of it, maybe. Introducing people is kind of my job"], min: 2, c: 1 },
    ] },
    { her: ['前に付き合ってた人は、夢の話をすると笑う人でした', 'The guy I dated before used to laugh when I talked about my dreams'], pause: 1, o: [
      { s: 'empathy', t: ['夢を笑われるのはきついね。離れて正解だったと思う', "Having your dreams laughed at is hard. I think leaving was right"], r: ['わかってくれる人で嬉しい…向上心がない人とは、やっぱり合わなくて', "So glad you understand... men who lack ambition just aren\'t for me"] },
      { s: 'light', t: ['笑ったやつは、毎朝5時に起こしてやればいい', 'Anyone who laughed should be woken up at five every day'], r: ['あ、はい…', 'Oh, okay...'] },
      { s: 'probe', t: ['その人とは、それが原因で別れたの？', 'Is that why you two broke up?'], r: ['価値観です。向上心がない人はちょっと…あなたは大丈夫そう！', "Values. I can't do men without ambition... You seem fine though!"], min: 3, c: 1 },
    ] },
    { her: ['あなたは、変わりたいって思うことあります？', 'Do you ever feel like you want to change?'], q: 1, o: [
      { s: 'polite', t: ['あるよ。もう少し人前で話せるようになりたい', "I do. I'd like to be better at speaking in front of people"], r: ['そういう人が集まる場所があるんです！今度連れて行きたいな', "There's a place where people like that gather! I'd love to take you"], c: 1 },
      { s: 'long', t: ['最近ずっと思ってる。毎日同じ電車の同じ車両に乗って、このまま30代になるのかなって考える夜がある', "All the time lately. Same train, same car, every day, and some nights I wonder if I'll just drift into my thirties like this"], r: ['その気持ち、大事にしてください！気づいた人から変われるので', "Hold on to that feeling! The ones who notice are the ones who change"] },
      { s: 'light', t: ['変わりたい。まずは髪型から', 'Sure. My haircut first'], r: ['あ、はい…まずは中身からですよ', 'Oh, okay... Start on the inside first'] },
    ] },
    { her: ['今度、尊敬してる人の朝の会があるんです。一回だけ一緒に来てほしいな', "The person I respect is holding a morning meetup soon. I'd love you to come just once"], o: [
      { s: 'polite', t: ['朝はちょっと…まずは二人でお茶でもどう？', 'Mornings are tough... How about just us two for tea first?'], r: ['もちろんです！そのとき、その人も少しだけ顔を出してくれるかも', 'Of course! That person might stop by for a bit too'], c: 1 },
      { s: 'praise', t: ['えりかさんが尊敬する人なら会ってみたい', "If you respect them, I'd like to meet them"], r: ['ほんとですか！絶対に人生変わります！', "Really?! It will change your life, I promise!"], c: 1 },
      { s: 'probe', t: ['その会って、お金かかるやつ？', 'Does that meetup cost money?'], r: ['最初は無料です！そのあとは、本気の人だけなので', "The first one is free! After that it's only for people who are serious"], min: 3, c: 1 },
    ] },
    { her: ['今日話せてよかったです。前向きな人と話すと、朝の目標も書きやすくなるので', "I'm glad we talked today. Talking to positive people makes my morning goals easier to write"], o: [
      { s: 'empathy', t: ['こっちこそ。朝のノート、ちょっと真似してみようかな', 'Same here. Maybe I will try the morning notebook too'], r: ['ぜひ！明日の朝、何を書いたか教えてください', 'Please do! Tell me what you wrote tomorrow morning'] },
      { s: 'doubt', t: ['最後に聞いていい？写真、ちょっと加工してる？', 'One last thing. Are your photos edited a little?'], r: ['加工はしてないです！プロに撮ってもらっただけなので', "No editing! A professional just took them"], c: 1 },
      { s: 'light', t: ['明日5時に起きれたら奇跡', "If I'm up at five tomorrow it'll be a miracle"], r: ['あ、はい…がんばってください', 'Oh, okay... Good luck'] },
    ] },
  ] },
]
