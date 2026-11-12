// まりあ（歯科受付・夜のテーマパーク・年パス・ぬいぐるみ）。丁寧・共感・褒めはどれも「もっと重く」なる。ふざけると「真剣じゃないの？」
// ほころび: 毎日の連絡を求める・すぐ運命と好き・元彼の浮気に戻る・寂しくて朝まで起きている・顔を出したくない・ほかの子の影に敏感
THREADS.e = [
  { topic: ['夜のテーマパーク', 'The theme park at night'], beats: [
    { her: ['今日も仕事終わりに夢の国に来てるの。夜のパレードだけ見て帰るよ', "I'm at the dream kingdom after work again today. Just watching the night parade, then heading home"], o: [
      { s: 'polite', t: ['仕事終わりに行けるの、年パスならではだね。今年は何回目？', "Going after work is the perk of an annual pass. How many times this year?"], r: ['今年48回目！ひとりでも全然行くよ', "This is my 48th time this year! I go alone all the time"], c: 1 },
      { s: 'light', t: ['もはや通勤路じゃん', "So it's basically your commute"], r: ['…ふざけてる？私にとっては大事な場所なの', "...Are you joking? It's a precious place to me"] },
      { s: 'praise', t: ['夜のパレード見に行く子って、それだけでかわいい', "A girl who goes to see the night parade? That alone is cute"], r: ['うれしい…そんなこと言ってくれる人、初めて', "That makes me so happy... no one's ever said that to me"] },
    ] },
    { her: ['パレード始まった。光ってるの見ると、なんか泣きそうになる', "The parade started. Seeing all the lights makes me want to cry for some reason"], o: [
      { s: 'empathy', t: ['わかる。きれいすぎて胸がぎゅってなるやつ', "I get it. So pretty it makes your chest tight"], r: ['わかってくれるの、あなただけ', "You're the only one who understands me"] },
      { s: 'polite', t: ['泣きそうになるくらい好きなんだね。どのへんで見てるの？', "You must really love it. Where are you watching from?"], r: ['お城の前の、いつもの柵のとこ。ここが一番光がきれいなの', "My usual spot by the railing in front of the castle. The lights are prettiest here"] },
      { s: 'probe', min: 1, c: 1, t: ['ひとりで見てるの？', "Are you watching alone?"], r: ['うん、ひとり。前は元彼と見てた場所なんだけどね', "Yeah, alone. It's where I used to watch with my ex, though"] },
    ] },
    { her: ['ねえ、テーマパークって好き？いつか一緒に来てくれる？', "Hey, do you like theme parks? Will you come with me someday?"], q: 1, o: [
      { s: 'polite', t: ['好きだよ。乗り物より夜の景色を見てたい派かな', "I do. I'm more into the night views than the rides"], r: ['うれしい…じゃあ次は一緒ね。約束だよ？', "I'm so happy... then next time, together. Promise?"] },
      { s: 'light', t: ['絶叫系で叫ぶ係ならやる', "I'll come as the guy who screams on the coasters"], r: ['…ちゃんと来てくれるの？冗談じゃないよね', "...You'll actually come? That wasn't a joke, right?"] },
      { s: 'long', t: ['好き。子どもの頃に家族で行ったとき迷子になって、案内所でずっと泣いてて、親が来るまで係の人が風船くれて、それ以来なんか…', "I do. When I was a kid I got lost there with my family, cried at the info desk the whole time, a staff member gave me a balloon until my parents came, and ever since..."], r: ['迷子かわいそう…私がそこにいたら見つけてあげたのに', "Poor little you... if I'd been there, I would've found you"] },
    ] },
    { her: ['くまの耳のカチューシャ買ったの。おそろいで2個', "I bought bear-ear headbands. A matching pair"], o: [
      { s: 'praise', t: ['くま耳、絶対似合う', "Bear ears? That has to look so good on you"], r: ['うれしい…2個目はあなたのだよ。もう決めてたの', "So happy... the second one's yours. I already decided"] },
      { s: 'light', t: ['2個目は予備？', "Is the second one a spare?"], r: ['…予備じゃないよ。あなたの分なのに', "...It's not a spare. It's yours"] },
      { s: 'probe', min: 3, c: 1, t: ['おそろいって、最初は誰とつけるつもりだったの？', "A matching pair... who were you planning to wear it with at first?"], r: ['最初は元彼とつけるはずだったの。でも今はあなたの', "It was supposed to be for my ex. But now it's yours"] },
    ] },
    { her: ['…ごめん、花火見てた。返信遅いって思った？', "...Sorry, I was watching the fireworks. Did you think I was slow to reply?"], q: 1, pause: 1, o: [
      { s: 'polite', t: ['全然。花火のときは見てていいよ', "Not at all. Watch the fireworks, it's fine"], r: ['やさしい…もう離れないでね', "So kind... don't ever leave me"] },
      { s: 'empathy', t: ['思ってないよ。花火きれいだった？', "I didn't. Were the fireworks pretty?"], r: ['うん。あなたにも見せたかった。…次は隣にいてね', "Yeah. I wanted you to see them too. ...Be next to me next time"] },
      { s: 'light', t: ['思った。3秒くらい', "I did. For like three seconds"], r: ['…3秒も待たせてごめんね。私なら1秒で返すのに', "...Sorry I made you wait three whole seconds. I'd reply in one"] },
    ] },
    { her: ['閉園の音楽が鳴ると、いつも帰りたくなくなるの', "When the closing music plays, I never want to go home"], o: [
      { s: 'empathy', t: ['わかる。楽しい場所ほど出口がさみしいよね', "I get it. The more fun the place, the lonelier the exit"], r: ['そうなの…あなたも同じ気持ちなんだ。運命かも', "Exactly... you feel the same way. Maybe it's fate"], c: 1 },
      { s: 'probe', min: 2, c: 1, t: ['閉園したあとは、どうしてるの？', "What do you do after closing?"], r: ['駅のベンチで朝まで誰かと連絡してる。…今日はあなたがいい', "I sit on a bench at the station and message someone till morning. ...Tonight I want it to be you"] },
      { s: 'praise', t: ['帰りたくなくなるくらい好きなものがあるの、すてきだね', "It's lovely to have something you love so much you don't want to leave"], r: ['うれしい…あなたのことも、帰りたくなくなるくらい好き', "So happy... I like you so much I don't want to leave you either"], c: 1 },
    ] },
    { her: ['ねえ、ほかの子ともこうやってやり取りしてる？', "Hey, are you messaging other girls like this too?"], q: 1, o: [
      { s: 'polite', t: ['今はまりあちゃんと話すのが一番楽しいよ', "Right now, talking with you is the most fun"], r: ['ほんと？…一番じゃなくて、だけがいいな', "Really? ...I want \"only,\" not \"most\""], c: 1 },
      { s: 'light', t: ['ノーコメントで', "No comment"], r: ['…笑えない。真剣じゃないの？', "...Not funny. Aren't you serious?"] },
      { s: 'probe', min: 4, c: 1, t: ['してないよ。気になる？前に何かあった？', "I'm not. Does it worry you? Did something happen before?"], r: ['元彼、ほかの子と連絡してたの。だから怖くて…ねえ、浮気しないよね？', "My ex was texting other girls. So I get scared... hey, you won't cheat, right?"] },
    ] },
    { her: ['…信じるね。あとね、年パス、実は2枚持ってるの。1枚あまってて', "...I'll trust you. Also, I actually have two annual passes. One's spare"], o: [
      { s: 'praise', t: ['まりあちゃんと行けるなら毎週でも通う', "If it's with you, I'd go every week"], r: ['ほんと！？じゃあ毎週ね。約束破ったら泣くよ', "Really!? Then every week. If you break the promise, I'll cry"] },
      { s: 'probe', min: 4, c: 1, t: ['あまってる1枚って、もともと誰の？', "Whose was the spare one originally?"], r: ['元彼の分。名前のとこ、シールで隠してある', "My ex's. I put a sticker over his name"] },
      { s: 'lewd', t: ['テーマパークより、今度ふたりきりになれる所がいいな', "Instead of a theme park, I'd rather go somewhere just the two of us"], r: ['…そういうのじゃないの。私、真剣なのに', "...That's not what this is. I'm being serious"] },
    ] },
    { her: ['帰りの電車。今日もいっぱい話してくれてありがとう。…明日も、絶対連絡くれる？', "On the train home. Thanks for talking so much today. ...You'll message me tomorrow too, for sure?"], q: 1, o: [
      { s: 'polite', t: ['うん、明日も連絡する。気をつけて帰ってね', "Yeah, I'll message tomorrow. Get home safe"], r: ['うれしい…明日だけじゃなくて毎日ね。朝7時と夜11時', "So happy... not just tomorrow, every day. 7am and 11pm"], c: 1 },
      { s: 'empathy', t: ['するよ。ひとりの帰り道ってさみしいもんね', "I will. The ride home alone gets lonely"], r: ['さみしい…家に着くまで通話しててほしい', "It does... stay on the phone with me till I get home"], c: 1 },
      { s: 'light', t: ['絶対は約束できないかも。寝坊するし', "Can't promise \"for sure.\" I oversleep"], r: ['…じゃあ私が起こす。毎朝電話するね', "...Then I'll wake you up. I'll call every morning"], c: 1 },
    ] },
  ] },
  { topic: ['ベッドのぬいぐるみ', 'The plushies on her bed'], beats: [
    { her: ['プロフの写真、ベッドのぬいぐるみなんだけど、全部で32匹いるの', "The bed photo on my profile, those plushies? There are 32 of them"], o: [
      { s: 'light', t: ['32匹って、ベッドの主はくまのほうだね', "Thirty-two? So the bears own the bed, not you"], r: ['…笑うとこじゃないよ。みんな家族なの', "...That's not funny. They're all family"] },
      { s: 'polite', t: ['すごい数だね。一番古い子はどの子？', "That's a lot. Which one's the oldest?"], r: ['左の茶色いくま。小学生のときから一緒なの', "The brown bear on the left. We've been together since grade school"] },
      { s: 'praise', t: ['ぬいぐるみに囲まれてるの、かわいすぎる', "You surrounded by plushies is way too cute"], r: ['うれしい…あなたもこの中に入ってほしい', "So happy... I want you in there with them"] },
    ] },
    { her: ['みんなに名前つけてるんだよ。くまのもちとか、うさぎのしらたまとか', "They all have names. Mochi the bear, Shiratama the bunny"], o: [
      { s: 'empathy', t: ['名前があると愛着わくよね。毎日話しかけてそう', "Names make you love them more. I bet you talk to them every day"], r: ['うん、寂しい夜は全員に話しかけてる。朝までかかる', "Yeah, on lonely nights I talk to every one. It takes till morning"], c: 1 },
      { s: 'light', t: ['和菓子屋さんの品ぞろえみたい', "Sounds like a sweet shop's menu"], r: ['…ふざけてる？まあ、ちょっとかわいいけど', "...Are you joking? Okay, that's a little cute"] },
      { s: 'probe', min: 1, c: 1, t: ['一番大事にしてる子は？', "Which one's your favorite?"], r: ['一番大きいくま。元彼にもらった子…でも捨てられないの', "The biggest bear. My ex gave it to me... I just can't throw it out"] },
    ] },
    { her: ['あなたに似てる子もいるよ。目がやさしい白いくま', "There's one that looks like you. A white bear with gentle eyes"], o: [
      { s: 'praise', t: ['その子、絶対いい子だね', "That one must be a good bear"], r: ['うん。今日からあなたの名前にした', "Yeah. As of today, it has your name"] },
      { s: 'polite', t: ['うれしいな。その子の名前は？', "That's sweet. What's its name?"], r: ['まだないの。…だから、あなたの名前つけちゃった', "It doesn't have one yet. ...So I gave it your name"] },
      { s: 'light', t: ['似てるなら、たぶん寝起き悪いよ', "If it looks like me, it's probably grumpy in the morning"], r: ['…そういう話じゃないの。ちゃんと聞いて', "...That's not what I mean. Listen properly"] },
    ] },
    { her: ['ぬいぐるみ、持ってる？', "Do you have any plushies?"], q: 1, o: [
      { s: 'polite', t: ['昔ゲームセンターで取ったのが1個だけある', "Just one, from an arcade claw machine a long time ago"], r: ['その子、大事にしてる？…私のことも大事にしてくれる？', "Do you take care of it? ...Will you take care of me too?"] },
      { s: 'light', t: ['ない。枕を抱いて寝てる', "Nope. I sleep hugging a pillow"], r: ['…じゃあ今度くまあげる。私だと思って毎日抱いてね', "...Then I'll give you a bear. Hug it every day and think of me"], c: 1 },
      { s: 'long', t: ['子どもの頃に犬のぬいぐるみがいて、どこに行くにも連れて行ってて、ボロボロになるまで一緒で、引っ越しのときに…', "When I was little I had a stuffed dog, took it everywhere, kept it until it fell apart, and when we moved..."], r: ['その子、今どこにいるの？…捨てたりしてないよね', "Where is it now? ...You didn't throw it away, did you?"] },
    ] },
    { her: ['ごめん、今もちを手洗いしてた。お風呂場で干してる', "Sorry, I was hand-washing Mochi. He's drying in the bathroom"], pause: 1, o: [
      { s: 'empathy', t: ['大事にしてるのが伝わる。もち、ふかふかに戻るね', "I can tell how much you care. Mochi'll be fluffy again"], r: ['わかってくれるの、あなただけ', "You're the only one who understands me"] },
      { s: 'light', t: ['もち、干されて伸びてない？', "Hope Mochi doesn't stretch out like real mochi"], r: ['…伸びてないもん。ちゃんと見ててよ', "...He's not stretching. Pay attention"] },
      { s: 'probe', min: 2, c: 1, t: ['夜中に洗ってるの？もう1時だよ', "You're washing him in the middle of the night? It's 1am"], r: ['寂しいと眠れないの。いつも朝まで起きてる。…あなたも起きててくれたらいいのに', "I can't sleep when I'm lonely. I'm always up till morning. ...I wish you'd stay up with me"] },
    ] },
    { her: ['元彼ね、ぬいぐるみ多すぎって言って、半分捨てようとしたの', "My ex said I had too many and tried to throw half of them out"], o: [
      { s: 'empathy', t: ['それはひどい。家族みたいなものなのに', "That's awful. They're like family"], r: ['でしょ…やっぱりあなたは違う。運命だと思う', "Right...? You really are different. I think it's fate"], c: 1 },
      { s: 'polite', t: ['それはつらかったね。止められたの？', "That must have hurt. Did you stop him?"], r: ['うん、全部抱えて泣いた。そのあと浮気されたの。…あなたはしないよね？', "Yeah, I hugged them all and cried. Then he cheated on me. ...You wouldn't, right?"], c: 1 },
      { s: 'probe', min: 4, c: 1, t: ['その元彼とは、どうして別れたの？', "Why did you two break up?"], r: ['浮気。ぬいぐるみの次は私を捨てたの。…ねえ、浮気しないよね？', "He cheated. After the plushies, he threw me out. ...Hey, you won't cheat, right?"] },
    ] },
    { her: ['…信じてるからね。ねえ、もしうちに来ても、ぬいぐるみ笑わない？', "...I'm trusting you. Hey, if you ever came over, you wouldn't laugh at the plushies?"], q: 1, o: [
      { s: 'polite', t: ['笑わないよ。名前もちゃんと覚える', "I won't. I'll even learn their names"], r: ['うれしい…じゃあ32匹ぶん、明日テストするね', "So happy... then tomorrow I'll quiz you on all 32"] },
      { s: 'light', t: ['たぶん一回は笑う。数に', "I'd probably laugh once. At the number"], r: ['…笑ったら、もちが泣くよ。私も泣く', "...If you laugh, Mochi will cry. So will I"] },
      { s: 'lewd', t: ['笑わないから、今夜行っていい？', "I won't laugh, so can I come over tonight?"], r: ['…今夜はだめ。そういうのが目的なら、悲しい', "...Not tonight. If that's what you're after, it makes me sad"] },
    ] },
    { her: ['ぬいぐるみと一緒に写った写真もあるんだけど、顔は隠してるの', "I have photos with the plushies too, but I hide my face"], o: [
      { s: 'praise', t: ['顔隠してても、絶対かわいいのわかる', "Even with your face hidden, I can tell you're cute"], r: ['うれしい…でも顔は見せられないの。嫌われたら怖いから', "So happy... but I can't show my face. I'm scared you'd hate me"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['どうして顔は隠すの？', "Why do you hide your face?"], r: ['前に見せたら、急に連絡こなくなったの。だからこわい', "Last time I showed it, he suddenly stopped messaging. So I'm scared"] },
      { s: 'empathy', t: ['顔を出すのって勇気いるよね。無理しなくていいよ', "Showing your face takes courage. Don't push yourself"], r: ['やさしい…もう離れないでね', "So kind... don't ever leave me"] },
    ] },
    { her: ['今日から、白いくまに話しかけるときは、あなたのこと話すね', "From today, when I talk to the white bear, I'll talk about you"], o: [
      { s: 'polite', t: ['ありがとう。くまによろしく伝えて', "Thanks. Say hi to the bear for me"], r: ['うん。くまも、毎日あなたから連絡ほしいって言ってる', "Okay. The bear says it wants a message from you every day too"], c: 1 },
      { s: 'light', t: ['くまに悪口だけは言わないでね', "Just don't badmouth me to the bear"], r: ['言わないよ…好きって話しかしない', "I won't... I'll only say I love you"], c: 1 },
      { s: 'empathy', t: ['話し相手がいると、夜も少し楽になるよね', "Having someone to talk to makes the nights a bit easier"], r: ['…あなたが話し相手になってくれたら、朝まで起きてなくていいのに', "...If you'd be the one I talk to, I wouldn't have to stay up till morning"], c: 1 },
    ] },
  ] },
  { topic: ['歯医者の受付', 'The dental front desk'], beats: [
    { her: ['今お昼休み。歯医者さんの受付なんだけど、午前だけで子どもが12人泣いてた', "On my lunch break. I work the front desk at a dentist, and twelve kids cried just this morning"], o: [
      { s: 'polite', t: ['お疲れさま。受付って、泣いてる子をなだめるのも仕事なの？', "Good work. Is calming crying kids part of the front desk job?"], r: ['うん、シールを渡す係もしてるよ。私も泣きたい日あるけど', "Yeah, I'm the sticker girl too. Some days I want to cry myself"] },
      { s: 'light', t: ['12人って、もう合唱団だね', "Twelve? That's a choir"], r: ['…笑いごとじゃないよ。ほんとに大変だったの', "...It's not funny. It was really hard"] },
      { s: 'empathy', t: ['泣き声をずっと聞いてると疲れるよね', "Listening to crying all morning must wear you out"], r: ['わかってくれるの、うれしい…あなたにだけ話せる', "I'm so glad you get it... you're the only one I can tell"] },
    ] },
    { her: ['歯医者さん、ちゃんと行ってる？', "Do you go to the dentist like you should?"], q: 1, o: [
      { s: 'polite', t: ['半年に一回、検診だけ行ってる', "Every six months, just for checkups"], r: ['えらい…うちの歯医者さんに来てほしい。毎回私が受付するから', "Good... I wish you'd come to ours. I'd check you in every time"] },
      { s: 'light', t: ['最後に行ったの、たぶん高校のとき', "Last time was probably high school"], r: ['…それはだめ。ちゃんとして。心配になる', "...That's not okay. Take care of yourself. I'll worry"] },
      { s: 'long', t: ['行ってる。前に親知らずを抜いたとき、顔が3日パンパンに腫れて、会社の人に心配されて、ゼリーしか食べられなくて…', "I do. When I got my wisdom tooth out, my face swelled up for three days, people at work were worried, I could only eat jelly..."], r: ['親知らず…痛かったね。そのとき隣にいたかった', "Your wisdom tooth... that must have hurt. I wish I'd been there with you"] },
    ] },
    { her: ['受付ってね、患者さんの名前と顔、全員覚えてるんだよ', "At the front desk, I remember every patient's name and face"], o: [
      { s: 'praise', t: ['それはすごい。記憶力いいんだね', "That's amazing. You've got a great memory"], r: ['うん。大事な人のことは全部覚えてる。あなたのことも', "Yeah. I remember everything about people who matter. You too"] },
      { s: 'light', t: ['俺が行ったら、歯石の量まで覚えられそう', "If I went, you'd remember how much tartar I had"], r: ['…ふふ、ちょっと笑った。でも真剣に聞いてね', "...Heh, okay, I laughed a little. But listen seriously"] },
      { s: 'probe', min: 2, c: 1, t: ['仕事中ってスマホ見られるの？', "Can you check your phone at work?"], r: ['見れないから、お昼に全部見るの。返信なかったら午後ずっと不安', "I can't, so I check everything at lunch. If there's no reply, I'm anxious all afternoon"] },
    ] },
    { her: ['ごめん、急患の電話だった。…待ってた？', "Sorry, it was an emergency call. ...Were you waiting?"], q: 1, pause: 1, o: [
      { s: 'polite', t: ['待ってたけど大丈夫。仕事を優先して', "I was, but it's fine. Work comes first"], r: ['やさしい…もう離れないでね', "So kind... don't ever leave me"] },
      { s: 'light', t: ['待ってた。正座して', "I was. Sitting up straight and everything"], r: ['…正座はしなくていいよ。でもうれしい、待っててくれて', "...You don't have to sit up straight. But I'm happy you waited"] },
      { s: 'empathy', t: ['待ってたよ。急患って焦るよね、お疲れさま', "I was. Emergencies are stressful, good work"], r: ['うん…あなたの「お疲れさま」で午後がんばれる。毎日言ってほしい', "Yeah... your \"good work\" keeps me going all afternoon. Say it every day"], c: 1 },
    ] },
    { her: ['受付の後輩がね、マッチングアプリで彼氏できたんだって', "A girl I work with at the desk got a boyfriend through a dating app"], o: [
      { s: 'light', t: ['アプリ仲間だ', "A fellow app user"], r: ['…その子の話より、あなたの話がいい', "...I'd rather talk about you than her"] },
      { s: 'empathy', t: ['いいね。身近にいると、ちょっと希望わくね', "Nice. Seeing it happen nearby gives you a little hope"], r: ['うん…私も、あなたで最後にしたい', "Yeah... I want you to be my last"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['まりあちゃんは、アプリいつから？', "When did you start on the app?"], r: ['元彼と別れた次の日から。…すぐすぎて変かな', "The day after my ex and I broke up. ...Is that too soon? Weird?"] },
    ] },
    { her: ['ねえ、歯並びとか気にする人？私、八重歯あるの', "Hey, are you picky about teeth? I have a snaggletooth"], q: 1, o: [
      { s: 'praise', t: ['気にしない。八重歯かわいいじゃん', "Not at all. Snaggleteeth are cute"], r: ['うれしい…でも笑うと見えるから、写真では隠してるの', "So happy... but it shows when I smile, so I hide it in photos"], c: 1 },
      { s: 'polite', t: ['全然気にしない。八重歯があると笑顔が印象に残るよ', "Not at all. A snaggletooth makes a smile memorable"], r: ['そんなこと言ってくれる人、初めて…もう好きかも', "No one's ever said that to me... I think I love you"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['気にしないよ。だから顔の写真がないの？', "I don't mind. Is that why there are no face photos?"], r: ['…うん。嫌われたら怖いから。会っても、最初はマスクしてるね', "...Yeah. I'm scared you'd hate me. Even when we meet, I'll keep a mask on at first"] },
    ] },
    { her: ['午後の予約、あと8人。終わったら連絡していい？夜は長く話したいな', "Eight more appointments this afternoon. Can I message you after? I want to talk a long time tonight"], q: 1, o: [
      { s: 'polite', t: ['いいよ。夜は11時くらいまでなら話せる', "Sure. I can talk until around 11"], r: ['11時…そのあとはひとりなの？私は朝まで起きてるから、いつでもいいよ', "11... and after that I'm alone? I'm up till morning, so anytime is fine"], c: 1 },
      { s: 'light', t: ['いいよ。8人ぶんの愚痴を聞く準備しとく', "Sure. I'll get ready for eight patients' worth of complaining"], r: ['ふふ…愚痴じゃなくて、あなたの声が聞きたいの。通話しよ？', "Heh... not complaining, I just want your voice. Call me?"], c: 1 },
      { s: 'lewd', t: ['いいよ。夜はベッドで横になって話そ', "Sure. Tonight let's talk lying in bed"], r: ['…そういう言い方、やだ。真剣に話したいのに', "...I don't like how you said that. I want to talk seriously"] },
    ] },
    { her: ['仕事終わった。今から夢の国に寄って帰る。…一緒に来てくれたらいいのに', "Done with work. Stopping by the dream kingdom on the way home. ...I wish you'd come"], o: [
      { s: 'polite', t: ['今日はもう遅いから、気をつけて行ってね', "It's late today, so be careful getting there"], r: ['…来てくれないんだ。ううん、いいの。待ってるから', "...So you won't come. No, it's okay. I'll wait"] },
      { s: 'praise', t: ['仕事のあとでも行く元気があるの、いいな', "I love that you still have energy for it after work"], r: ['あなたが来てくれたら、もっと元気になるよ。駅で23時半に待ってる', "I'd have even more if you came. I'll wait at the station at 11:30"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['毎日寄ってるの？ひとりで？', "Do you go every day? Alone?"], r: ['ほぼ毎日。家に帰ると寂しいから、閉園までいるの', "Almost every day. Home is lonely, so I stay till closing"] },
    ] },
    { her: ['明日も朝から受付。…起きたらおはようって、あなたから一番に言ってほしい', "Front desk again tomorrow morning. ...When you wake up, I want your \"good morning\" to be the first one"], o: [
      { s: 'polite', t: ['わかった。起きたら送るね', "Okay. I'll send it when I wake up"], r: ['うれしい…6時に起きるから、6時ちょうどね', "So happy... I wake up at 6, so 6 on the dot"], c: 1 },
      { s: 'empathy', t: ['朝のひとことで、一日の気分って変わるよね', "One message in the morning can change your whole day"], r: ['うん…あなたのおはようがない日は、もう無理かも', "Yeah... a day without your good morning, I don't think I could take it"], c: 1 },
      { s: 'light', t: ['起きられたら一番に送る。二番目は目覚ましかも', "If I'm up, you'll be first. The alarm might beat you"], r: ['…一番以外いらない。ちゃんと起きてね', "...I don't want anything but first. Wake up properly"] },
    ] },
  ] },
]
