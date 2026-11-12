// ひより（京都・事務・カフェで読書・結婚を急ぐ）。丁寧と共感は「もう付き合ってる」に飛ぶ。軽いノリには冷める。下心（lewd）は地雷
// ほころび: 結婚・将来・親の話に直行・どの話も元彼に戻る・毎晩の電話を求める・遊び目的を疑う
THREADS.f = [
  { topic: ['カフェで読書', 'Reading at the cafe'], beats: [
    { her: ['ちょうど今、いつものカフェで本を読んでいました。窓際の席が好きなんです', "I was just reading at my usual cafe. I like the window seat"], o: [
      { s: 'polite', t: ['窓際で読書、いいですね。何を読んでいたんですか？', "Reading by the window sounds nice. What were you reading?"], r: ['エッセイです。結婚して10年たつ夫婦が書いた本で', "An essay collection. Written by a couple who've been married ten years"], c: 1 },
      { s: 'light', t: ['窓際の席、取り合いになりません？', "Don't people fight over the window seats?"], r: ['いえ、いつも空いています。…あまりそういう冗談は得意じゃないです', "No, it's always free. ...I'm not very good with jokes like that"] },
      { s: 'praise', t: ['窓際で本を読んでる人って、それだけで絵になりますね', "Someone reading by a window is a picture all by itself"], r: ['ありがとうございます。…写真、気に入ってもらえたならうれしいです', "Thank you. ...I'm glad if you liked the photo"] },
    ] },
    { her: ['本は読まれますか？', "Do you read?"], q: 1, o: [
      { s: 'polite', t: ['月に2冊くらいです。最近は短編が多いです', "About two books a month. Mostly short stories lately"], r: ['うれしい。…結婚したら、休みの日に並んで読めますね', "I'm glad. ...Once we're married, we can read side by side on our days off"], c: 1 },
      { s: 'light', t: ['漫画なら毎日読んでます', "I read manga every day, if that counts"], r: ['…そうですか。漫画も本ですよね。たぶん', "...I see. Manga are books too. Probably"] },
      { s: 'long', t: ['学生の頃は図書館にこもってて、卒論のときは毎日閉館までいて、司書さんに顔を覚えられて、帰りにはいつも…', "In college I basically lived in the library, stayed till closing every day for my thesis, the librarians knew my face, and on the way home I'd always..."], r: ['そうなんですね。…元彼は、本を一冊も読まない人でした', "I see. ...My ex never read a single book"], c: 1 },
    ] },
    { her: ['このカフェ、ラテの泡にハートを描いてくれるんです', "This cafe draws a heart in the latte foam"], o: [
      { s: 'empathy', t: ['そういう小さいことって、うれしいですよね', "Little things like that really make you happy"], r: ['はい。…やっぱり、あなたは元彼と違う', "Yes. ...I knew it. You're not like my ex"], c: 1 },
      { s: 'light', t: ['ハート、飲むの申し訳なくなりますね', "Must feel bad drinking the heart"], r: ['…ふつうに飲みます', "...I just drink it"] },
      { s: 'probe', min: 2, c: 1, t: ['ずっと通ってるお店なんですか？', "Have you been going there a long time?"], r: ['3年くらいです。…元彼と最初に来たお店なんです。今もやめられなくて', "About three years. ...It's the first place my ex took me. I still can't stop going"] },
    ] },
    { her: ['この本の夫婦、単身赴任中は毎晩寝る前に5分だけ電話するんです', "The couple in this book call for five minutes every night before bed while he's posted away"], o: [
      { s: 'empathy', t: ['5分でも毎晩って、すてきですね', "Even five minutes, every night. That's lovely"], r: ['ですよね。…私たちもそうしませんか。毎晩、5分だけ', "Isn't it? ...Shall we do that too? Every night, just five minutes"], c: 1 },
      { s: 'praise', t: ['そういう話に惹かれるの、ひよりさんらしいですね', "It's so you, being drawn to a story like that"], r: ['ありがとうございます。私、毎晩電話できる人がいいんです', "Thank you. I want someone I can call every night"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['前にお付き合いしていた方とは、電話してました？', "Did you call like that with your last boyfriend?"], r: ['毎晩していました。最後の半年は、出てもらえませんでしたけど', "Every night. For the last six months, he didn't pick up"] },
    ] },
    { her: ['すみません、隣の席の方が指輪の話をしていて、聞き入ってしまいました', "Sorry, the people at the next table were talking about rings and I got absorbed"], pause: 1, o: [
      { s: 'light', t: ['盗み聞きのプロですね', "A professional eavesdropper"], r: ['…盗み聞きではないです。聞こえたんです', "...I wasn't eavesdropping. I just heard"] },
      { s: 'polite', t: ['つい聞いちゃいますよね。どんな話でした？', "It's hard not to listen. What were they saying?"], r: ['婚約指輪の話でした。…私は、指輪は一緒に選びたい派です', "Engagement rings. ...I'd want to pick the ring together"], c: 1 },
      { s: 'long', t: ['指輪といえば、この前友達の結婚式に出て、新郎がスピーチで泣いちゃって、会場がみんなもらい泣きして、二次会でも…', "Speaking of rings, I just went to a friend's wedding, the groom cried during his speech, the whole room cried with him, and at the after-party..."], r: ['すてきですね。…私たちの式は、もう少し小さいほうがいいです', "How lovely. ...I'd like our wedding a bit smaller, though"], c: 1 },
    ] },
    { her: ['あなたは、本の結末を先に読んでしまう派ですか？', "Are you someone who reads the ending first?"], q: 1, o: [
      { s: 'polite', t: ['読まない派です。最後まで楽しみにしたいので', "No. I like to look forward to it till the end"], r: ['わかります。…でも人生の結末だけは、先に決めておきたいんです。結婚とか', "I understand. ...But for life, I want the ending decided first. Like marriage"], c: 1 },
      { s: 'light', t: ['先に読みます。安心したいので', "I do. It calms my nerves"], r: ['…そういうところは、合わないかもしれません', "...We might not match on that"] },
      { s: 'probe', min: 3, c: 1, t: ['読まないです。ひよりさんは、先が見えないと不安なほうですか？', "I don't. Do you get anxious when you can't see what's coming?"], r: ['はい。だから、付き合う前に結婚の時期を決めておきたいんです', "Yes. That's why I want to set a wedding date before we start dating"] },
    ] },
    { her: ['この本、主人公が親にあいさつに行く場面で泣いてしまいました', "I cried at the part where the main character goes to meet her partner's parents"], o: [
      { s: 'empathy', t: ['そういう場面、じんわりきますよね', "Scenes like that really get to you"], r: ['はい。…うちの両親にも、そろそろ紹介できる人がほしいです', "Yes. ...I'd like someone to introduce to my parents soon, too"], c: 1 },
      { s: 'praise', t: ['本で泣けるの、すてきな感性ですね', "Crying over a book. That's a lovely sensitivity"], r: ['ありがとうございます。…母にも「早く会わせて」と言われていて', "Thank you. ...My mother keeps saying, \"Let me meet him soon\""], c: 1 },
      { s: 'lewd', t: ['泣いてるところ、近くで見てみたいな', "I'd like to see you crying up close"], r: ['…そういう目的の方だったんですね。ブロックします', "...So that's what you're after. I'm blocking you"] },
    ] },
    { her: ['もし一緒にカフェに行ったら、隣に座りますか？向かいに座りますか？', "If we went to a cafe together, would you sit next to me or across from me?"], q: 1, o: [
      { s: 'polite', t: ['最初は向かいかな。顔を見て話したいので', "Across, at first. I'd like to see your face when we talk"], r: ['うれしい。…じゃあ2回目からは隣ですね。手帳も並べて', "I'm glad. ...Then from the second time, next to each other. Planners side by side"], c: 1 },
      { s: 'light', t: ['カウンターで横並び。店員さんの目の前で', "Side by side at the counter. Right in front of the staff"], r: ['…店員さんの前は、恥ずかしいです', "...In front of the staff is embarrassing"] },
      { s: 'probe', min: 4, c: 1, t: ['向かいです。元彼さんとは、どっちでした？', "Across. Which was it with your ex?"], r: ['隣でした。…だから向かいがいいです。思い出さなくてすむので', "Next to each other. ...So across is better. Then I won't remember"] },
    ] },
    { her: ['今日の本、読み終わりました。次はあなたのおすすめを読みたいです', "I finished today's book. Next I'd like to read something you recommend"], o: [
      { s: 'polite', t: ['じゃあ短編集を送ります。一話15分くらいで読めるので', "Then I'll send you a short story collection. Each one takes about fifteen minutes"], r: ['ありがとうございます。…感想、毎晩電話で話しませんか', "Thank you. ...Shall we talk about it on the phone every night?"], c: 1 },
      { s: 'long', t: ['おすすめはたくさんあって、まず旅行記で、次に料理のエッセイで、あと学生のときに読んで人生が変わった長編があって、それが…', "I have so many. First a travel memoir, then a food essay, and there's a novel I read in college that changed my life, and it's..."], r: ['全部読みます。…結婚したら、本棚もひとつにしましょう', "I'll read them all. ...Once we're married, let's merge our bookshelves"], c: 1 },
      { s: 'empathy', t: ['同じ本を読むと、話がもっと合いそうですね', "Reading the same books would give us even more to talk about"], r: ['はい。…これって、もう付き合ってるみたいですね', "Yes. ...It's like we're already dating, isn't it"], c: 1 },
    ] },
  ] },
  { topic: ['京都の暮らし', 'Life in Kyoto'], beats: [
    { her: ['京都は今、紅葉がちょうど見ごろです。プロフの写真も、近くの公園で撮りました', "The autumn leaves in Kyoto are at their peak. My profile photo was taken at a park nearby"], o: [
      { s: 'polite', t: ['ベンチの写真ですね。紅葉がきれいでした', "The one on the bench. The leaves were beautiful"], r: ['ありがとうございます。…あのベンチ、元彼とよく座っていた所なんです', "Thank you. ...That bench is where my ex and I used to sit"], c: 1 },
      { s: 'praise', t: ['あの写真の笑顔、すごく自然でいいですね', "Your smile in that photo is so natural"], r: ['ありがとうございます。友達に撮ってもらいました', "Thank you. A friend took it for me"] },
      { s: 'light', t: ['紅葉の時期って、人のほうが多そう', "Bet there are more people than leaves this time of year"], r: ['…地元の人しか来ない公園です', "...Only locals go to that park"] },
    ] },
    { her: ['京都には来たことありますか？', "Have you ever been to Kyoto?"], q: 1, o: [
      { s: 'polite', t: ['修学旅行と、大人になってから一回です', "On a school trip, and once as an adult"], r: ['そうなんですね。…次は、うちの実家の近くも案内させてください', "I see. ...Next time, let me show you around near my parents' place"], c: 1 },
      { s: 'light', t: ['八つ橋の味しか覚えてないです', "All I remember is the yatsuhashi"], r: ['…お土産の話ではなくて', "...I wasn't asking about souvenirs"] },
      { s: 'long', t: ['学生のときに友達4人で来て、自転車を借りてお寺を回って、途中で雨に降られて、全員びしょぬれで…', "Four of us came in college, rented bikes to see the temples, got caught in the rain halfway, all of us soaked..."], r: ['いい思い出ですね。…私も、思い出の場所はたくさんあるんです。元彼との', "What a nice memory. ...I have lots of memory spots too. With my ex"], c: 1 },
    ] },
    { her: ['実家も京都なので、生まれてからずっとここです', "My family's in Kyoto too, so I've lived here my whole life"], o: [
      { s: 'empathy', t: ['ずっと同じ街って、落ち着きますよね', "Living in the same city all your life must feel settled"], r: ['はい。…結婚しても、実家の近くに住みたいです', "Yes. ...Even after marriage, I want to live near my parents"], c: 1 },
      { s: 'polite', t: ['ご実家はどのあたりなんですか？', "Whereabouts is your family home?"], r: ['ここから電車で20分です。…両親、週末ならいつでも空いています', "Twenty minutes by train. ...My parents are free any weekend"], c: 1 },
      { s: 'probe', min: 2, c: 1, t: ['今は一人暮らしなんですか？', "Do you live on your own now?"], r: ['はい。でも毎週日曜は実家でご飯です。…いずれ、あなたも', "Yes. But every Sunday I eat at my parents'. ...Someday, you too"] },
    ] },
    { her: ['すみません、母から電話でした', "Sorry, that was my mother calling"], pause: 1, o: [
      { s: 'polite', t: ['大丈夫ですよ。お母さんと仲いいんですね', "No problem. You're close with your mom"], r: ['はい。…今、あなたのことを話しました', "Yes. ...I just told her about you"], c: 1 },
      { s: 'light', t: ['お母さん、俺のこと聞いてきました？', "Did your mom ask about me?"], r: ['…冗談ですよね。でも、聞かれました。名前と年収を', "...You're joking, right? But she did. Your name and your income"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['お母さんには、アプリのことも話してるんですか？', "Does your mom know about the app?"], r: ['全部話しています。半年で12人と会ったことも', "I tell her everything. Even that I've met twelve people in six months"] },
    ] },
    { her: ['京都って雨が多いんです。雨の日は窓のそばで、ずっと外を見ています', "It rains a lot in Kyoto. On rainy days I stand by the window and just look outside"], o: [
      { s: 'empathy', t: ['雨の音って落ち着きますよね', "The sound of rain is calming"], r: ['はい。…やっぱり、あなたは元彼と違う', "Yes. ...I knew it. You're not like my ex"], c: 1 },
      { s: 'praise', t: ['窓辺の写真、雰囲気ありました', "Your photo by the window had such a mood"], r: ['ありがとうございます。あれは、別れた日に撮った写真なんです', "Thank you. I took that one the day we broke up"], c: 1 },
      { s: 'lewd', t: ['雨の日は、家で一緒にごろごろしたいですね', "On rainy days I'd love to just lounge around at your place together"], r: ['…家ですか。そういう方とは、お話しできません', "...At my place? I can't talk with someone like that"] },
    ] },
    { her: ['住むなら、京都と大阪どちらがいいですか？', "If you had to live in Kyoto or Osaka, which would you pick?"], q: 1, o: [
      { s: 'polite', t: ['京都もいいですね。静かな所に住みたいです', "Kyoto sounds nice. I'd like somewhere quiet"], r: ['うれしい。…新居は、うちの実家から歩ける所にしましょうね', "I'm so glad. ...Let's make our new home walking distance from my parents"], c: 1 },
      { s: 'light', t: ['間をとって、県境に住みます', "I'd split the difference and live on the border"], r: ['…真剣に聞いています', "...I'm asking seriously"] },
      { s: 'probe', min: 3, c: 1, t: ['まだ決めてないです。ひよりさんは、もう決めてるんですか？', "Haven't decided. Have you already decided?"], r: ['はい。駅から徒歩8分の2LDKです。物件も3つ見ました', "Yes. A two-bedroom eight minutes from the station. I've already viewed three"] },
    ] },
    { her: ['京都のお寺で、縁結びのお守りを毎年買っています', "Every year I buy a love charm at a temple in Kyoto"], o: [
      { s: 'empathy', t: ['毎年って、本気さが伝わります', "Every year. That shows how serious you are"], r: ['はい。…今年のお守り、あなたの分も買いました', "Yes. ...This year I bought one for you too"], c: 1 },
      { s: 'light', t: ['お守り、もう何個たまってます？', "How many charms have piled up by now?"], r: ['…7個です。笑うところではないです', "...Seven. That's not funny"] },
      { s: 'probe', min: 3, c: 1, t: ['去年のお守りは、効きました？', "Did last year's charm work?"], r: ['効きませんでした。去年の人は、3回目で連絡が途絶えました', "It didn't. Last year's guy stopped replying after the third date"] },
    ] },
    { her: ['来月、親戚の集まりがあるんです。…来てくれませんか？', "There's a family gathering next month. ...Would you come?"], q: 1, o: [
      { s: 'polite', t: ['さすがにまだ早いと思います。もう少し話してからで', "I think it's a bit too soon. Let's talk more first"], r: ['…そうですよね。じゃあ再来月にします', "...You're right. I'll make it the month after, then"], c: 1 },
      { s: 'light', t: ['親戚の前で、何て紹介されるんですか', "What would you introduce me as, in front of everyone?"], r: ['婚約者、です。…冗談ではないです', "My fiancé. ...I'm not joking"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['行く前に、ご両親がどんな方か聞いてもいいですか？', "Before I say yes, can I ask what your parents are like?"], r: ['父は無口で、母は早く孫の顔が見たいそうです。…私は3人ほしいです', "Dad is quiet, and Mom wants grandkids soon. ...I'd like three"] },
    ] },
    { her: ['京都で一番好きなのは、夜の川沿いを歩くことです。…いつか一緒に歩けたら', "My favorite thing in Kyoto is walking along the river at night. ...I hope we can walk it together someday"], o: [
      { s: 'polite', t: ['いいですね。紅葉の時期に歩いてみたいです', "That sounds nice. I'd love to walk it while the leaves are out"], r: ['うれしい。これって、もう付き合ってるってことですよね', "I'm happy. So this means we're dating now, right?"], c: 1 },
      { s: 'empathy', t: ['川の音を聞きながら歩くの、気持ちよさそうです', "Walking to the sound of the river sounds wonderful"], r: ['はい。…元彼は、一度も一緒に歩いてくれなかったんです', "Yes. ...My ex never once walked it with me"], c: 1 },
      { s: 'praise', t: ['ひよりさんと歩けたら、どこでも楽しそうです', "Anywhere would be fun if I were walking with you"], r: ['ありがとうございます。…そう言ってくれた人と、結婚したいです', "Thank you. ...I want to marry the person who says that"], c: 1 },
    ] },
  ] },
  { topic: ['定時の事務', 'The nine-to-five office job'], beats: [
    { her: ['今日も定時で上がれました。事務なので、毎日17時半には終わるんです', "I got out on time again today. It's office work, so I'm done by 5:30 every day"], o: [
      { s: 'polite', t: ['お疲れさまです。定時で帰れるの、いいですね', "Good work today. Leaving on time sounds great"], r: ['はい。結婚しても、子どもができても続けられます', "Yes. I can keep doing it after marriage, even after kids"], c: 1 },
      { s: 'light', t: ['17時半上がり、もはや夕方の自由人', "Off at 5:30? You're a free spirit of the evening"], r: ['…自由人ではないです', "...I'm not a free spirit"] },
      { s: 'empathy', t: ['毎日決まった時間に終われると、生活が整いますよね', "Finishing at the same time every day keeps life in order"], r: ['はい。…やっぱり、あなたは元彼と違う。わかってくれる', "Yes. ...I knew it. You're not like my ex. You understand"], c: 1 },
    ] },
    { her: ['事務って地味ですけど、私は好きです。あなたは、外に出るお仕事ですか？', "Office work is plain, but I like it. Is your job more out-and-about?"], q: 1, o: [
      { s: 'polite', t: ['はい、メーカーの営業で外回りが多いです', "Yes, I do sales for a manufacturer, so I'm on the road a lot"], r: ['営業…出張が多いなら、出張先から毎晩電話してほしいです', "Sales... if you travel a lot, I'd want you to call me every night from the road"], c: 1 },
      { s: 'light', t: ['いえ、一日中会社の電話番です', "Nope, I'm the office phone guy all day"], r: ['…ちゃんと教えてください', "...Please tell me properly"] },
      { s: 'long', t: ['外です。営業で、毎日いろんな会社を回ってて、朝は8時に出て、昼はだいたい車の中で食べて、夜は報告書を書いて…', "Out. Sales. I visit companies all day, leave at 8, usually eat lunch in the car, write reports at night..."], r: ['大変ですね。…毎日遅い仕事だと、結婚したら少し心配です', "That's tough. ...A job with late nights every day worries me a little, for after we marry"], c: 1 },
    ] },
    { her: ['職場は女性ばかりで、今月だけで2人が寿退社しました', "My office is all women, and two of them quit to get married just this month"], o: [
      { s: 'empathy', t: ['続くと、気持ちが焦りますよね', "When that keeps happening, it makes you anxious"], r: ['はい。…次は自分の番だと思っているんです', "Yes. ...I'm sure I'm next"], c: 1 },
      { s: 'praise', t: ['ひよりさんにも、すぐ声がかかりそう', "Someone's bound to ask you soon"], r: ['ありがとうございます。…あなたが声をかけてくれたら、うれしいです', "Thank you. ...I'd be happy if it were you"], c: 1 },
      { s: 'probe', min: 2, c: 1, t: ['職場の人に、アプリのこと話してます？', "Do people at work know you're on the app?"], r: ['話しています。来年の春には辞めますって、もう言ってしまいました', "They do. I've already told them I'll be leaving next spring"] },
    ] },
    { her: ['同僚の結婚式で受付を頼まれました。ご祝儀を数えるのは、事務なので得意なんです', "A coworker asked me to run reception at her wedding. Counting gift money is my specialty, being a clerk"], o: [
      { s: 'light', t: ['数えるプロ、心強い', "A professional counter. Very reassuring"], r: ['…ありがとうございます', "...Thank you"] },
      { s: 'polite', t: ['受付って緊張しますね。いつなんですか？', "Reception sounds nerve-racking. When is it?"], r: ['来月です。…二次会がパートナー同伴なので、その日は空けておいてください', "Next month. ...The after-party is plus-one, so please keep that day free"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['結婚式に出ると、ひよりさんも焦ったりします？', "Do weddings make you feel rushed too?"], r: ['焦ります。式場の資料、もう5冊持っています', "They do. I already have five wedding venue brochures"] },
    ] },
    { her: ['すみません、上司に呼ばれていました。来年度の有休の希望を出していて', "Sorry, my boss called me in. I was submitting my vacation requests for next year"], pause: 1, o: [
      { s: 'polite', t: ['もう来年度の分を出すんですね。計画的です', "Already next year's? You plan ahead"], r: ['はい。…新婚旅行の分、2週間取っておきました', "Yes. ...I've set aside two weeks for the honeymoon"], c: 1 },
      { s: 'empathy', t: ['先に出しておくと、予定が立てやすいですよね', "Getting it in early makes planning easier"], r: ['はい。…あなたの有休も、合わせてもらえたらうれしいです', "Yes. ...I'd love it if you matched your vacation days to mine"], c: 1 },
      { s: 'lewd', t: ['有休とって、ふたりでどこか泊まりに行きましょうよ', "Let's take some days off and go stay somewhere, just us"], r: ['…泊まり、ですか。そういう目的なら、もう結構です', "...Stay overnight? If that's what you want, we're done"] },
    ] },
    { her: ['お仕事、転勤はありますか？', "Does your job involve transfers?"], q: 1, o: [
      { s: 'polite', t: ['たぶん、数年に一回あります', "Probably once every few years"], r: ['…そうですか。そのときは、私も京都を出る覚悟をしておきます', "...I see. Then I'll prepare myself to leave Kyoto too"], c: 1 },
      { s: 'light', t: ['転勤より、席替えのほうが多いです', "Seat changes happen more than transfers"], r: ['…まじめに聞いています', "...I'm asking seriously"] },
      { s: 'probe', min: 3, c: 1, t: ['あります。どうして気になるんですか？', "There are. Why do you ask?"], r: ['元彼が、転勤を理由に離れていったので。…あなたは、そうならないと信じています', "My ex used a transfer as his excuse to leave. ...I believe you won't be like that"] },
    ] },
    { her: ['お昼は毎日お弁当です。…将来、二人分作るのが夢なんです', "I bring a packed lunch every day. ...My dream is to make two someday"], o: [
      { s: 'praise', t: ['毎日お弁当作れるの、すごいです', "Making lunch every day is impressive"], r: ['ありがとうございます。…明日から、練習であなたの分も作りますね', "Thank you. ...Starting tomorrow, I'll make yours too, for practice"], c: 1 },
      { s: 'empathy', t: ['毎朝作るの大変なのに、えらいですね', "Making it every morning is hard work. That's admirable"], r: ['ありがとうございます。…元彼は、いつも残していました', "Thank you. ...My ex always left half of it"], c: 1 },
      { s: 'light', t: ['中身、毎日同じだったりします？', "Is it the same thing every day?"], r: ['…卵焼きは毎日入っています。それが何か', "...There's rolled omelet every day. Is that a problem?"] },
    ] },
    { her: ['仕事帰りに、本屋で結婚情報誌を立ち読みしてきました', "On my way home from work, I stopped to browse a bridal magazine at the bookstore"], o: [
      { s: 'light', t: ['仕事帰りに読むには重いやつですね', "That's some heavy reading for the commute"], r: ['…重いですか。私には軽い読み物です', "...Heavy? It's light reading for me"] },
      { s: 'polite', t: ['結婚情報誌って、どんなことが載ってるんですか？', "What's in a bridal magazine, anyway?"], r: ['式場と、両家の顔合わせの段取りです。…顔合わせは、春がいいそうです', "Venues, and how to plan the families' first meeting. ...Apparently spring is best for that"], c: 1 },
      { s: 'probe', min: 3, c: 1, t: ['結婚の準備、もう始めてるんですか？', "Have you already started preparing for a wedding?"], r: ['はい。あとは相手だけです', "Yes. All that's left is the groom"] },
    ] },
    { her: ['毎晩、仕事が終わったら電話してもいいですか？17時半から', "Can I call you every night after work? Starting at 5:30"], q: 1, o: [
      { s: 'polite', t: ['毎晩は難しいかもしれないけど、週に何回かなら', "Every night might be hard, but a few times a week works"], r: ['…週に何回か、ですか。じゃあ月曜から金曜で', "...A few times a week. Then Monday to Friday"], c: 1 },
      { s: 'empathy', t: ['いいですよ。仕事終わりに声を聞くと、ほっとしますよね', "Sure. Hearing a voice after work is a relief"], r: ['はい。…じゃあ今日から毎晩ですね。もう付き合ってるみたい', "Yes. ...Then every night starting today. It's like we're already dating"], c: 1 },
      { s: 'long', t: ['いいですよ。ただ俺、仕事終わりはだいたい電車の中で、乗り換えが2回あって、家に着くのが19時くらいで、そこからご飯を作って…', "Sure. Though after work I'm usually on the train, with two transfers, I don't get home till about 7, then I cook dinner..."], r: ['では電車の中でも。…17時半ちょうどにかけますね', "Then from the train is fine. ...I'll call at exactly 5:30"], c: 1 },
    ] },
  ] },
]
