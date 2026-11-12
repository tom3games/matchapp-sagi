// ここな（コンセプトカフェの営業）。どの型にも同じ温度で「えーやばい！」。ほころび: 休みもシフト・夜はほぼ仕事・わたし目当て・好きなお店に連れていきたい・場所を決めたがる・指名やチェキっぽい言葉
THREADS.k = [
  { topic: ['甘いもの', 'Sweets'], beats: [
    { her: ['プロフに甘いもの好きって書いたら、みんなおすすめ教えてくれるの〜！なに好き？', 'I put "loves sweets" on my profile and everyone tells me their favorites~! What do you like?'], q: 1, o: [
      { s: 'polite', t: ['プリンが好き。かためで、カラメルがちょっと苦いやつ', 'Pudding. The firm kind, and the caramel a little bitter'], r: ['えーやばい！かためプリンわかる〜！それめっちゃ好き！', 'Omg! Firm pudding, yes~! I love that!'] },
      { s: 'lewd', t: ['甘いものより、ここなちゃんがいちばん甘そう', "Honestly, you look sweeter than any dessert"], r: ['えーやばい！口うまい〜！', 'Omg! Smooth talker~!'] },
      { s: 'probe', t: ['逆に、ここなちゃんのおすすめ聞きたい。よく行くお店ある？', 'I want your pick instead. Is there a place you go to a lot?'], r: ['えーやばい！わたしの好きなお店あるの！今度連れていきたい〜', "Omg! There's a place I love! I wanna take you there~"], min: 1, c: 1 },
    ] },
    { her: ['ここなね、パフェのいちごは最後まで残しとく派なの！', "I'm the type who saves the strawberry on a parfait for last!"], o: [
      { s: 'light', t: ['残しといたいちご、誰かに取られたら泣くやつ', "And if someone steals it you'd cry"], r: ['えーやばい！それ泣く〜！', 'Omg! I would totally cry~!'] },
      { s: 'empathy', t: ['わかる。好きなのは最後にとっとくよね', 'Same. You save the best for last'], r: ['えーやばい！一緒だね〜！', 'Omg! Same~!'] },
      { s: 'long', t: ['おれは逆に最初に食べちゃう。子どものころ兄ちゃんに取られたのがトラウマで、それ以来好きな物から食べるようになった', 'I eat it first. My older brother stole mine when I was a kid, and ever since I eat my favorite thing first'], r: ['えーやばい！お兄ちゃんひど〜！かわいそ〜！', 'Omg! Your brother is so mean~! Poor you~!'] },
    ] },
    { her: ['お仕事中もね、甘いものの話になるとめっちゃ盛り上がるんだよ〜', 'Even at work, things get so lively when we talk about sweets~'], o: [
      { s: 'polite', t: ['接客って書いてたよね。お客さんとそういう話するんだ', 'Your profile said hospitality, right? So you talk about that to customers'], r: ['えーやばい！覚えててくれたの〜！うん、ここなの好きなもの覚えてくれてる人もいるの', 'Omg! You remembered~! Yeah, some people even remember what I like'], c: 1 },
      { s: 'praise', t: ['ここなちゃんと話してたら、誰でも楽しいと思う', 'Anyone would have fun talking to you'], r: ['えーやばい！うれしすぎる〜！', 'Omg! That makes me so happy~!'] },
      { s: 'probe', t: ['どんなお店で接客してるの？カフェ？', 'What kind of place do you work at? A cafe?'], r: ['えーやばい！カフェ…みたいな感じかな！わたし目当てで来てくれる人もいるんだよ〜', 'Omg! Kind of... like a cafe! Some people come just to see me~'], min: 1, c: 1 },
    ] },
    { her: ['このまえね、お客さんが手作りのクッキーくれたの！', 'The other day a customer gave me homemade cookies!'], o: [
      { s: 'empathy', t: ['それはうれしいね。好かれてるんだね', "That's sweet. They must really like you"], r: ['えーやばい！そうなの〜！いつも来てくれる人なんだ〜', "Omg! Right~! He comes in all the time~"], c: 1 },
      { s: 'light', t: ['手作りはちょっと怖くない？笑', 'Homemade is kind of scary though? lol'], r: ['えーやばい！それ言っちゃう〜？笑', 'Omg! You said it~? lol'] },
      { s: 'probe', t: ['お客さんからプレゼントもらえるお店なんだ', 'So customers give you presents at your work'], r: ['えーやばい！誕生日とかすごいよ〜！あ、なんでもない！', 'Omg! On my birthday it gets crazy~! Oh, never mind!'], min: 2, c: 1 },
    ] },
    { her: ['ねえねえ、甘いものって何時に食べるのがいちばんおいしいと思う？', 'Hey hey, what time of day do you think sweets taste best?'], q: 1, o: [
      { s: 'polite', t: ['仕事が終わった夜。疲れてるときがいちばん', 'At night after work. When you are tired is best'], r: ['えーやばい！わかる〜！ここなも終わるの23時だから、いつも夜中に食べてる', "Omg! Same~! I finish at 11pm, so I always eat them in the middle of the night"], c: 1 },
      { s: 'light', t: ['3時。おやつの時間は法律で決まってる', "Three o'clock. Snack time is the law"], r: ['えーやばい！法律なの〜？笑', "Omg! It's the law~? lol"] },
      { s: 'praise', t: ['ここなちゃんと一緒なら、何時でもいちばん', 'Any time, as long as you\'re there'], r: ['えーやばい！それ言われたら、もう会うしかない〜！', "Omg! After that we just have to meet~!"] },
    ] },
    { her: ['あ、ごめん！いま休憩中で、ちょっとしか返せないかも〜', "Oh, sorry! I'm on break, so I can only reply a little~"], pause: 1, o: [
      { s: 'empathy', t: ['忙しいのにありがとう。休憩はちゃんと休んでね', 'Thanks for replying when busy. Make sure you actually rest'], r: ['えーやばい！やさしい〜！今日もあと3時間がんばる〜', "Omg! You're so kind~! Three more hours today, I'll do my best~"] },
      { s: 'long', t: ['こっちは今日休みで、昼から部屋の片づけしてた。棚の奥から昔の手紙が出てきて、読んでたら夕方になってた', 'I had the day off and cleaned my room from noon. Found old letters in the back of a shelf and read them until evening'], r: ['えーやばい！それエモ〜！ここなは休みの日もほぼシフト入っちゃう〜', "Omg! So nostalgic~! I end up on shift even on my days off~"], c: 1 },
      { s: 'probe', t: ['夜に休憩ってことは、夜のお仕事なんだ', 'A break at night, so you work nights?'], r: ['えーやばい！夜はほぼお仕事〜！でもお昼にいるときもあるよ！', "Omg! Mostly nights~! But sometimes I'm there in the day too!"], min: 2, c: 1 },
    ] },
    { her: ['今度一緒に甘いの食べよ！ここなが行くところ決めてもいい？', "Let's eat sweets together sometime! Can I pick the place?"], q: 1, o: [
      { s: 'polite', t: ['いいよ。駅前に新しいパフェの店できたけど、そこはどう？', "Sure. There's a new parfait place by the station. What about there?"], r: ['えーやばい！そこもいいけど、ここなのお気に入りがあるの〜！そっちにしよ！', "Omg! That sounds good, but I've got a favorite~! Let's go there!"], c: 1 },
      { s: 'praise', t: ['ここなちゃんが選んだところなら、どこでも', 'Anywhere you pick is fine by me'], r: ['えーやばい！ほんと〜？じゃあ駅から3分のとこね！', "Omg! Really~? Then it's the place three minutes from the station!"], c: 1 },
      { s: 'probe', t: ['いいけど、なんでそんなに場所を決めたいの？', 'Sure, but why do you want to pick so badly?'], r: ['えーやばい！だってそこなら、ここなもいるし安心じゃん〜', "Omg! Because I'm always there, so it's safe~"], min: 3, c: 1 },
    ] },
    { her: ['そこね、甘いドリンクがかわいいの！名前つけてくれたりするんだよ〜', 'The sweet drinks there are so cute! They even give them names~'], o: [
      { s: 'empathy', t: ['名前つけてくれるのいいね。特別感ある', 'Naming your drink is nice. It feels special'], r: ['えーやばい！でしょ〜！ここながつけたげる〜！', "Omg! Right~! I'll name yours~!"], c: 1 },
      { s: 'light', t: ['ドリンクに名前つけるの、ペットみたい笑', 'Naming drinks, like they are pets lol'], r: ['えーやばい！その発想すき〜！', 'Omg! I love how you think~!'] },
      { s: 'probe', t: ['もしかして、ここなちゃんが作ってくれるの？', 'Wait, do you make them?'], r: ['えーやばい！ここなが運んでいくかも〜！あ、まだないしょ！', "Omg! Maybe I'll bring it to you~! Oh, that's still a secret!"], min: 3, c: 1 },
    ] },
    { her: ['来てくれたら、一緒に写真撮ろうね〜！かわいく撮るの得意なんだ', "When you come, let's take a picture together~! I'm good at cute photos"], o: [
      { s: 'praise', t: ['ここなちゃんとの写真なら待ち受けにする', "A photo of us would be my lock screen"], r: ['えーやばい！うれしい〜！ペン持ってくね、落書きしたげる！', "Omg! Yay~! I'll bring a pen and doodle on it!"], c: 1 },
      { s: 'doubt', t: ['写真って、プロフの写真とけっこう違ったりする？', 'Do you look a lot different from your profile photos?'], r: ['えーやばい！そのまんまだよ〜！会えばわかる〜！', "Omg! Exactly the same~! You'll see when we meet~!"] },
      { s: 'polite', t: ['写真はちょっと照れるけど、記念に一枚ならいいよ', "Photos make me shy, but one as a keepsake is fine"], r: ['えーやばい！一枚と言わず〜！何枚でも撮れるよ〜', "Omg! Not just one~! We can take as many as you want~"], c: 1 },
    ] },
  ] },

  { topic: ['アニメ', 'Anime'], beats: [
    { her: ['アニメもタグに入れてるんだけど、ここな今期は3本追ってる〜！', "I put anime in my tags too. I'm following three shows this season~!"], o: [
      { s: 'polite', t: ['3本はすごい。録画して週末にまとめて見る派？', 'Three is a lot. Do you record them and binge on weekends?'], r: ['えーやばい！ほんとはまとめて見たいけど、週末もシフトだから毎晩ちょっとずつ〜', "Omg! I'd love to binge, but I work weekends too, so a little every night~"], c: 1 },
      { s: 'light', t: ['3本って少なくない？おれ7本', 'Only three? I am on seven'], r: ['えーやばい！負けた〜！', 'Omg! You win~!'] },
      { s: 'empathy', t: ['わかる。追ってるのが何本かあると、一週間が楽しいよね', 'I get it. Having a few shows going makes the whole week fun'], r: ['えーやばい！それな〜！', 'Omg! So true~!'] },
    ] },
    { her: ['いちばん好きなのはね、喫茶店の店員さんが主人公のやつ！', 'My favorite is the one where the main character works at a coffee shop!'], o: [
      { s: 'probe', t: ['店員さんが主人公って、自分の仕事と重なるから？', 'A shop worker as the lead. Is it because it is like your job?'], r: ['えーやばい！そうかも〜！お客さんの好きなもの覚えるとことか、ここなと一緒', "Omg! Maybe~! Like remembering what customers like, same as me"], min: 1, c: 1 },
      { s: 'long', t: ['おれ昔、喫茶店でバイトしてた。常連さんの砂糖の数を覚えるのだけ得意で、店長にそれだけはほめられてた', 'I used to work part time at a coffee shop. The only thing I was good at was remembering how much sugar regulars took, and the manager praised me for just that'], r: ['えーやばい！ここなも常連さん覚えるの得意〜！一緒だね〜！', "Omg! I'm good at remembering regulars too~! Same~!"], c: 1 },
      { s: 'praise', t: ['ここなちゃんがあの店員さんだったら毎日通う', "If you worked there, I'd go every day"], r: ['えーやばい！毎日来てくれたら顔覚えちゃう〜！', "Omg! If you came every day I'd remember your face~!"] },
    ] },
    { her: ['そのアニメのね、決めゼリフ言えるの！「本日も、あなたのための一杯を」ってやつ〜', 'I can do the catchphrase from it! "Today too, a cup just for you"~'], o: [
      { s: 'light', t: ['それ言われたら一杯じゃ帰れないやつ', "Hear that and you can't leave after one cup"], r: ['えーやばい！そうなの〜！一杯じゃ帰らせない〜笑', "Omg! Exactly~! I won't let you leave after one~ lol"], c: 1 },
      { s: 'empathy', t: ['いいセリフだね。言われたら疲れが取れそう', "That's a nice line. Hearing it would melt the tiredness away"], r: ['えーやばい！ほんと〜？ここなもお仕事で言ってみよっかな〜', "Omg! Really~? Maybe I'll try saying it at work~"] },
      { s: 'polite', t: ['声に出して言えるくらい、ほんとに好きなんだね', 'You love it so much you can recite it'], r: ['えーやばい！めっちゃ練習したもん〜！', 'Omg! I practiced so much~!'] },
    ] },
    { her: ['アニメの話できる人って意外と少ないから、うれしい〜', "Not many people I know talk anime, so this makes me happy~"], o: [
      { s: 'probe', t: ['お店でもアニメの話になったりする？', 'Does anime come up at work too?'], r: ['えーやばい！なるなる〜！アニメ好きのお客さん多いよ〜', 'Omg! All the time~! Lots of our customers love anime~'], min: 2, c: 1 },
      { s: 'lewd', t: ['もっと仲よくなって、家で一緒に見たいな', "Let's get closer and watch together at my place"], r: ['えーやばい！それはまだ早い〜！笑', "Omg! That's too soon~! lol"] },
      { s: 'polite', t: ['こっちこそ。周りに見てる人がいなくて、ずっと話せなかった', "Same here. Nobody around me watches, so I never get to talk about it"], r: ['えーやばい！ここなでよければいくらでも話そ〜！', "Omg! Talk to me as much as you want~!"] },
    ] },
    { her: ['ねえ、好きなキャラってどんな子？', 'Hey, what kind of character do you like?'], q: 1, o: [
      { s: 'polite', t: ['まっすぐで、ちょっとドジな子', 'Honest and a little clumsy'], r: ['えーやばい！ここなもドジってよく言われる〜！', 'Omg! People always call me clumsy~!'] },
      { s: 'praise', t: ['ここなちゃんみたいに、よく笑う子', 'One who laughs a lot, like you'], r: ['えーやばい！それずるい〜！', "Omg! That's not fair~!"] },
      { s: 'long', t: ['強くないのに最後まで逃げない子。昔見たアニメで、震えながら仲間をかばうシーンがあって、そこから好きなキャラの基準になってる', "One who isn't strong but never runs. There was a scene in an old show where a character shields their friends while shaking, and that's been my standard ever since"], r: ['えーやばい！泣ける〜！その話もっと聞きたい〜', 'Omg! So moving~! Tell me more~'] },
    ] },
    { her: ['ごめん、いまちょっとバタバタしてた！ここな、夜はほぼ返せないんだ〜', "Sorry, things got hectic! I can hardly reply at night~"], pause: 1, o: [
      { s: 'empathy', t: ['いいよいいよ。夜も忙しいのは大変だね', "It's fine. Being busy at night too sounds hard"], r: ['えーやばい！やさしい〜！終わるの23時だから、そのあと返すね！', "Omg! So kind~! I finish at 11pm, I'll reply after!"], c: 1 },
      { s: 'light', t: ['夜に返せないって、もしかして魔法少女？', 'Busy at night? Are you a magical girl?'], r: ['えーやばい！ばれた〜？笑', 'Omg! You found out~? lol'] },
      { s: 'probe', t: ['夜って、毎日お仕事なの？', 'Do you work every night?'], r: ['えーやばい！ほぼ毎日〜！みんな夜に来るから〜', 'Omg! Almost every day~! Everyone comes at night~'], min: 2, c: 1 },
    ] },
    { her: ['そういえば、好きなアニメのグッズって集めてる？', 'Oh right, do you collect merch from shows you like?'], q: 1, o: [
      { s: 'polite', t: ['キーホルダーを少しだけ。カバンに一個つけてる', "Just a few keychains. I've got one on my bag"], r: ['えーやばい！見たい〜！ここなはお客さんにもらったのがいっぱいある〜', "Omg! I wanna see~! I've got tons that customers gave me~"], c: 1 },
      { s: 'light', t: ['集めすぎて、部屋が神社みたいになってる', "I've collected so much my room looks like a shrine"], r: ['えーやばい！神社〜？笑 見に行きたい〜！', 'Omg! A shrine~? lol I wanna see~!'] },
      { s: 'probe', t: ['少しだけ。ここなちゃん自身のグッズとかあったりして笑', 'A little. Bet there is merch of you too lol'], r: ['えーやばい！なんでわかったの〜？ここなの写真、買ってってくれる人いるよ〜', 'Omg! How did you know~? Some people buy photos of me~'], min: 3, c: 1 },
    ] },
    { her: ['今度会ったら、そのアニメのコラボのドリンク一緒に飲も〜！', "When we meet, let's get the collab drink from that show together~!"], o: [
      { s: 'polite', t: ['いいね。コラボやってるお店、どこか知ってる？', 'Sounds good. Do you know a place doing the collab?'], r: ['えーやばい！知ってる知ってる〜！ここなが連れてく！場所は任せて〜', "Omg! I know one~! I'll take you! Leave the place to me~"], c: 1 },
      { s: 'praise', t: ['ここなちゃんと飲めるなら、毎日でもいい', "If you\'re there, every day"], r: ['えーやばい！毎日はうれしい〜！', 'Omg! Every day would make me so happy~!'] },
      { s: 'probe', t: ['それって、ここなちゃんのお店でやってたりする？', 'Is it at your work, by any chance?'], r: ['えーやばい！するどい〜！来たらわかるよ〜', "Omg! Sharp~! You'll see when you come~"], min: 3, c: 1 },
    ] },
    { her: ['ここな、話してたらもっと仲よくなりたくなっちゃった〜', 'Talking to you makes me want to get even closer~'], o: [
      { s: 'empathy', t: ['こっちも。アニメの話できてよかった', "Me too. I'm glad we could talk anime"], r: ['えーやばい！一緒だね〜！今度ゆっくり話そ〜！', "Omg! Same~! Let's talk properly soon~!"] },
      { s: 'light', t: ['仲よくなる第一歩、好きなセリフ交換しよう', "First step to getting closer: let's swap favorite lines"], r: ['えーやばい！する〜！', "Omg! Let's~!"] },
      { s: 'long', t: ['ここまでアニメで盛り上がったの久しぶりで、ちょっと浮かれてる。明日の仕事のこと忘れそう', "It's been ages since anime talk got me this excited. I'm floating a bit. I might forget about work tomorrow"], r: ['えーやばい！うれしい〜！ここなも明日シフトだけど、がんばれる〜', "Omg! Yay~! I'm on shift tomorrow too, but now I can do it~"], c: 1 },
    ] },
  ] },

  { topic: ['夜型の生活', 'Night owl life'], beats: [
    { her: ['ここな夜型なの〜！いつも寝るの3時とかになっちゃう', "I'm a night owl~! I always end up sleeping around three"], o: [
      { s: 'empathy', t: ['3時はつらいね。朝起きるの大変じゃない？', "Three is rough. Isn't getting up hard?"], r: ['えーやばい！お昼まで寝てる〜！お仕事が夜だから平気なの', "Omg! I sleep till noon~! My work is at night so it's fine"], c: 1 },
      { s: 'light', t: ['3時なら、もう朝ごはんの時間', "Three? That's breakfast time"], r: ['えーやばい！それは早い〜！笑', "Omg! That's way too early~! lol"] },
      { s: 'probe', t: ['3時まで何してるの？', 'What are you doing until three?'], r: ['えーやばい！23時までお仕事で、そのあとみんなとごはん〜', 'Omg! Work until 11, then dinner, everyone together~'], min: 1, c: 1 },
    ] },
    { her: ['お仕事終わりにね、みんなでラーメン食べに行くのが楽しみなの〜', 'After work, we all go for ramen. That\'s what I look forward to~'], o: [
      { s: 'polite', t: ['仕事終わりのラーメンは最高だね。何味が好き？', 'Ramen after work is the best. What flavor do you like?'], r: ['えーやばい！とんこつ〜！こってりのやつ！', 'Omg! Pork bone~! The rich kind!'] },
      { s: 'praise', t: ['ここなちゃんと夜中のラーメン、行ってみたい', "I\'d love to get late-night ramen together"], r: ['えーやばい！行こ〜！でもその前に、お店に来てほしいな〜', "Omg! Let's~! But before that, I want you to come to my place~"], c: 1 },
      { s: 'long', t: ['おれも前は夜勤があって、朝方に開いてる店でラーメン食べてた。眠いのに、やたらおいしく感じるんだよね', 'I used to work night shifts and ate ramen at a place open at dawn. You are half asleep but it tastes amazing'], r: ['えーやばい！わかる〜！その時間のラーメン罪だよね〜', 'Omg! Same~! Ramen at that hour is a crime~'] },
    ] },
    { her: ['夜に起きてると、昼の人と話す時間ずれちゃうんだよね〜', 'Being up at night, my timing never matches day people~'], o: [
      { s: 'empathy', t: ['それはさみしいね。返事もすれ違うし', "That's lonely. Replies keep missing each other"], r: ['えーやばい！そうなの〜！だから、こうやって話せてうれしい〜', "Omg! Right~! That's why I'm so happy we're talking~"] },
      { s: 'light', t: ['じゃあ、おれも今日から夜型になる', "Then I'll become a night owl starting today"], r: ['えーやばい！なって〜！笑', 'Omg! Please do~! lol'] },
      { s: 'probe', t: ['お休みの日なら、昼に会えたりする？', 'Could we meet in the daytime on your day off?'], r: ['えーやばい！休みの日もほぼシフト入ってる〜！あ、なんでもない！', "Omg! I'm on shift even on my days off~! Oh, never mind!"], min: 2, c: 1 },
    ] },
    { her: ['ねえ、そっちは夜って何してる？', 'Hey, what do you do at night?'], q: 1, o: [
      { s: 'polite', t: ['帰ってごはん作って、ドラマ見て1時には寝てる', 'Go home, cook, watch a drama, and sleep by one'], r: ['えーやばい！ちゃんとしてる〜！えらい〜！', "Omg! So responsible~! Good for you~!"] },
      { s: 'light', t: ['夜はだいたい冷蔵庫と見つめ合ってる', "Mostly I stare into the fridge"], r: ['えーやばい！わかる〜！笑', 'Omg! Same~! lol'] },
      { s: 'lewd', t: ['夜はひとりでさみしいから、ここなちゃんがうちに来てよ', 'Nights get lonely, so come over to my place'], r: ['えーやばい！それはまだだめ〜！笑', 'Omg! Not yet~! lol'] },
    ] },
    { her: ['ここなのお店ね、夜のほうがにぎやかなの！お客さんみんな楽しそうで', "My place is livelier at night! Everyone looks like they're having fun"], o: [
      { s: 'probe', t: ['お店って、お酒も出るところ？', 'Does your place serve drinks?'], r: ['えーやばい！出るよ〜！ここなにも一杯くれたりするの〜', 'Omg! Yep~! People even buy me a drink~'], min: 2, c: 1 },
      { s: 'empathy', t: ['楽しい場所で働けるのいいね', 'Working somewhere fun sounds great'], r: ['えーやばい！そうなの〜！みんなに会えるのが楽しみ〜', 'Omg! It is~! I look forward to seeing everyone~'] },
      { s: 'praise', t: ['ここなちゃんがいたら、そりゃにぎやかになるよ', "Of course it\'s lively when you\'re there"], r: ['えーやばい！わたし目当てで来てくれる人もいるんだよ〜', 'Omg! Some people come just to see me~'], c: 1 },
    ] },
    { her: ['たまに常連さんが、ここなの名前を呼んでくれるの。それがうれしくて〜', 'Sometimes a regular calls out my name. It makes me so happy~'], pause: 1, o: [
      { s: 'empathy', t: ['名前を覚えてもらえるのはうれしいね', "It's nice to have people remember your name"], r: ['えーやばい！そうなの〜！呼んでもらえると、そのあいだずっと隣にいられるんだ〜', 'Omg! It is~! When they call for me, I get to sit next to them the whole time~'], c: 1 },
      { s: 'light', t: ['おれも今から叫んどく。ここなー！', "I'll shout it now. Kokonaaa!"], r: ['えーやばい！聞こえた〜！笑', 'Omg! I heard you~! lol'] },
      { s: 'probe', t: ['名前を呼ぶのって、お店で決まりがあるの？', 'Calling your name, is that a rule at your place?'], r: ['えーやばい！ないしょ〜！来たらわかる〜', "Omg! It's a secret~! You'll see when you come~"], min: 3, c: 1 },
    ] },
    { her: ['ここな、帰り道の夜の空気が好きなの。終わったーって感じで', 'I love the night air on the way home. It feels like, done for the day'], o: [
      { s: 'empathy', t: ['わかる。仕事終わりの夜って、ちょっと特別だよね', 'I get it. The night after work feels a bit special'], r: ['えーやばい！わかってくれる〜！', 'Omg! You get it~!'] },
      { s: 'long', t: ['おれも帰り道は遠回りすることある。川沿いを歩くと頭が空っぽになって、明日もまあいいかって思える', 'I take the long way home sometimes too. Walking by the river empties my head and I think, tomorrow will be fine'], r: ['えーやばい！川沿いいいな〜！今度連れてって〜', 'Omg! A river walk sounds nice~! Take me sometime~'] },
      { s: 'polite', t: ['23時に終わって一人で帰るのは心配だな。気をつけてね', "Heading home alone after 11 worries me. Be careful"], r: ['えーやばい！やさしい〜！お店の人が駅まで送ってくれるから大丈夫〜', "Omg! So sweet~! The staff walk me to the station, so it's fine~"], c: 1 },
    ] },
    { her: ['今度ね、ここなが早上がりできる日があったら会お〜！', "If I get a day where I can leave early, let's meet~!"], o: [
      { s: 'polite', t: ['いいよ。待ち合わせはどこにする？', 'Sure. Where should we meet?'], r: ['えーやばい！ここなが決める〜！駅から3分のとこ、着いたら名前言ってね', "Omg! I'll pick~! The place three minutes from the station. Say my name when you get there"], c: 1 },
      { s: 'praise', t: ['早上がりの貴重な夜をもらえるなんて、うれしい', 'Getting one of your rare early nights would make me so happy'], r: ['えーやばい！こっちこそ〜！', 'Omg! Same here~!'] },
      { s: 'probe', t: ['早上がりって、お店の近くで会う感じ？', 'Leaving early, so we would meet near your work?'], r: ['えーやばい！近くっていうか…お店に来ちゃえばいいじゃん〜！', 'Omg! Near... or you could just come to the shop~!'], min: 3, c: 1 },
    ] },
    { her: ['早く会いたいな〜！何時でも起きてるから連絡してね', "I can't wait to meet~! I'm up at all hours, so message me anytime"], o: [
      { s: 'empathy', t: ['夜型の人に言われると、ほんとに何時でもいそう笑 また連絡するね', "From a night owl, I believe it lol. I'll message you"], r: ['えーやばい！ほんとに何時でもいる〜！', "Omg! I really am up all the time~!"] },
      { s: 'light', t: ['じゃあ3時に「起きてる？」って送る', "Then I'll send \"you up?\" at three"], r: ['えーやばい！絶対起きてる〜！笑', "Omg! I'll definitely be up~! lol"] },
      { s: 'doubt', t: ['会ったら、写真とイメージ違ったりしない？', "Will you look different from your photos when we meet?"], r: ['えーやばい！そのまんまだよ〜！お店の写真もかわいいよ〜', 'Omg! Just the same~! The photos at the shop are cute too~'], c: 1 },
    ] },
  ] },
]
