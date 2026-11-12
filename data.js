// 文言とデータ（日英）。女の子10人＋レア1人。手がかりの出典は ideas/matchapp-sagi.md
// g: 1=良い返し 0=ふつう -1=悪い返し。flag: 'instant'=その場で会う話になる / 'leave'=マッチ解除
const TYPES = {
  atari: ['当たり', 'Keeper'],
  sagi: ['写真詐欺', 'Photo fraud'],
  park: ['夜のテーマパーク', 'Night theme park'],
  heavy: ['すぐ重たくなる', 'Way too heavy'],
  baka: ['話が通じない', 'No signal'],
  kireru: ['即キレ', 'Short fuse'],
  choro: ['誰にでも会う', 'Meets anyone'],
  gyosha: ['勧誘の業者', 'Recruiter'],
  concafe: ['お店の営業', 'Sales pitch'],
  mukashi: ['昔の写真', 'Old photos'],
}
const GIRLS = [
  {
    id: 'a', full: true, fastLine: ['返信はやいですね笑 ', 'Wow, fast reply lol. '], type: 'atari', name: ['みのり', 'Minori'], age: 27, h: 156, body: ['普通', 'Average'], job: ['図書館司書', 'Librarian'], area: ['大阪', 'Osaka'], drink: ['ときどき', 'Sometimes'], smoke: ['吸わない', 'No'], likes: 23,
    tags: [['パン屋めぐり', 'Bakeries'], ['散歩', 'Walks'], ['読書', 'Books'], ['自炊', 'Cooking']],
    intro: ['図書館で働いています。休みの日は近所の公園を散歩して、パン屋さんを開拓しています。人に撮ってもらった写真しかなくて、ちょっと変な顔です。まずはメッセージで話せたらうれしいです。', 'I work at a library. On days off I walk in the park and hunt for new bakeries. All my photos were taken by friends, so my face looks a bit goofy. Happy to chat first.'],
    photos: ['a1', 'a2', 'a3'], meet: 'am', spd: [6000, 9000], tooFast: 2500, pat: 90,
    place: ['土曜 12:00 駅の裏のパン屋の前', 'Sat 12:00, the bakery behind the station'],
    date2: { scene: ['2回目は、みのりが行きたがっていた古本市', 'Date two: the used-book fair Minori wanted to visit'], o: [
      { t: ['前に言ってた作家の棚、先に探しておいた', 'I found the shelf for that author you mentioned'], g: 1, r: ['覚えててくれたんですか…うれしい', 'You remembered? That makes me happy'] },
      { t: ['帰りにうち寄ってく？', 'Want to stop by my place after?'], g: -1, r: ['…今日は帰ります', '...I\'ll head home today'] },
      { t: ['本ってスマホで読めば良くない？', 'Can\'t you just read on your phone?'], g: -1, r: ['そう…ですね', 'I... guess'] },
    ], ok: ['帰りに「次はどこ行きます？」と向こうから聞かれた。', 'On the way home she asked, "Where to next?"'], ng: ['その夜「今日はありがとうございました」とだけ来て、それきりだった。', 'That night: "Thanks for today." Then nothing, ever.'] },
    end: ['クリームパンを半分こした。次の約束は向こうから来た。', 'We split a cream bun. She asked for the next date.'],
    clues: [['人に撮ってもらった写真と、全身の写真がそろっていた', 'Photos taken by others, plus a full-body shot'], ['いいね23。地味な写真だと少ないだけ', 'Only 23 likes. Plain photos just get fewer'], ['自己紹介が具体的で、質問を返してくれた', 'A specific bio, and she asked questions back']],
  },
  {
    id: 'b', type: 'atari', name: ['さき', 'Saki'], age: 29, h: 160, body: ['普通', 'Average'], job: ['看護師', 'Nurse'], area: ['大阪', 'Osaka'], drink: ['飲む', 'Yes'], smoke: ['吸わない', 'No'], likes: 286, full: true,
    tags: [['ラーメン', 'Ramen'], ['海', 'The sea'], ['映画', 'Movies'], ['夜勤明け', 'Night shifts']],
    intro: ['看護師をしています。夜勤明けのラーメンが生きがいです。休みが不規則なので、返信がゆっくりな時があります。ごめんなさい。', 'I\'m a nurse. Ramen after a night shift keeps me alive. My days off are irregular, so sometimes I reply slowly. Sorry in advance.'],
    photos: ['b1', 'b2', 'b3'], meet: 'bm', spd: [12000, 16000], pat: 90,
    place: ['日曜 12:30 ラーメン屋の前', 'Sun 12:30, outside the ramen shop'],
    date2: { scene: ['2回目は夜勤明けのお昼。さきは少し眠そう', 'Date two: lunch after her night shift. Saki looks sleepy'], o: [
      { t: ['眠かったら短めにしよう。ラーメンだけ食べて解散でもいいよ', 'If you\'re sleepy, let\'s keep it short. Just ramen and go home'], g: 1, r: ['やさしい…次は私がお店探します', 'So kind... I\'ll find the place next time'] },
      { t: ['せっかくだし夜まで遊ぼうよ', 'Let\'s hang out till night, since we\'re here'], g: -1, r: ['ごめん、帰って寝たい', 'Sorry, I need to go sleep'] },
      { t: ['看護師って給料いいの？', 'Do nurses get paid well?'], g: -1, r: ['…そこ？', '...That\'s your question?'] },
    ], ok: ['3回目の店は、さきが予約していた。', 'For date three, Saki booked the place.'], ng: ['「シフトが合わなくて」が3回続いた。', '"My shifts don\'t line up" came three times in a row.'] },
    end: ['味噌ラーメンを二人とも無言で完食した。帰りに「また行こ」と言われた。', 'We both finished the miso ramen in silence. On the way out: "Let\'s come again."'],
    clues: [['目線の高さの自撮りと全身の写真。加工の跡がない', 'Eye-level selfie and a full-body shot, no filter'], ['いいね286。人気でも、写真は素直だった', '286 likes. Popular, but the photos were honest'], ['返信が遅れる理由を先に書いていた', 'She explained her slow replies up front']],
  },
  {
    id: 'c', full: true, fastLine: ['お、はやい…笑 ', 'Oh, that was quick... lol. '], type: 'atari', rare: true, name: ['なつ', 'Natsu'], age: 31, h: 163, body: ['普通', 'Average'], job: ['動物病院', 'Vet clinic'], area: ['兵庫', 'Hyogo'], drink: ['ときどき', 'Sometimes'], smoke: ['吸わない', 'No'], likes: 9,
    tags: [['犬', 'Dogs'], ['キャンプ', 'Camping'], ['焚き火', 'Campfires'], ['ラーメン', 'Ramen']],
    intro: ['動物病院で働いています。顔はほぼ犬に隠れてますが、2枚目が全身です（3枚目は犬だけです）。ゆっくり仲良くなれる人がいいです。', 'I work at a vet clinic. My face is mostly hidden by my dog, but photo 2 is full body (photo 3 is just the dog). Looking for someone to get to know slowly.'],
    photos: ['c1', 'c2', 'c3'], meet: 'cm', spd: [7000, 10000], tooFast: 2500, pat: 90,
    place: ['土曜 9:00 川沿いの散歩道', 'Sat 9:00, the riverside path'],
    date2: { scene: ['2回目は、こむぎも一緒にドッグカフェ', 'Date two: a dog cafe, Komugi included'], o: [
      { t: ['こむぎ用のおやつ、持ってきた', 'I brought treats for Komugi'], g: 1, r: ['え！こむぎ、よかったね', 'What! Komugi, lucky you'] },
      { t: ['犬は店の外につないでおけば？', 'Can\'t we tie the dog outside?'], g: -1, r: ['…ここドッグカフェだよ', '...This is a dog cafe'] },
      { t: ['次は犬抜きで会おうよ', 'Next time, no dog'], g: -1, r: ['こむぎ抜きは無いかな', 'Komugi is non-negotiable'] },
    ], ok: ['こむぎの散歩当番が、週に1回まわってきた。', 'I got a weekly turn on Komugi\'s walk.'], ng: ['こむぎにだけ、また会いたいと言われた。', 'Only Komugi wanted to see me again.'] },
    end: ['こむぎに気に入られた。飼い主にも、たぶん気に入られた。', 'Komugi liked me. I think the owner did too.'],
    clues: [['顔は隠れていても、全身の写真があった', 'Face hidden, but there was a full-body shot'], ['いいね9。隠すと選ばれにくいだけ', 'Only 9 likes. Hiding just gets fewer picks'], ['隠している理由を自分で書いていた', 'She explained why in her bio']],
  },
  {
    id: 'd', type: 'sagi', name: ['りな', 'Rina'], age: 26, h: 157, body: ['普通', 'Average'], job: ['アパレル販売', 'Apparel sales'], area: ['大阪', 'Osaka'], drink: ['飲む', 'Yes'], smoke: ['吸わない', 'No'], likes: 842,
    tags: [['カフェ', 'Cafes'], ['自撮り', 'Selfies'], ['ショッピング', 'Shopping'], ['韓国', 'K-culture']],
    intro: ['アパレルで働いてます。仲良くなったら写真ふやします。ノリがいい人すき。', 'I work in apparel. More photos once we\'re close. I like fun people.'],
    photos: ['d1', 'd2', 'd3'], meet: 'dm', spd: [4000, 7000], pat: 90,
    place: ['金曜 20:00 駅の改札（暗めの居酒屋へ）', 'Fri 20:00, station gate (then a dim izakaya)'],
    end: ['改札で写真の人を探して、本人を3回見逃した。声をかけてきたのは向こうだった。', 'I searched the gate for the girl in the photos and walked past her three times. She found me.'],
    clues: [['顔は細いのに、手首と腕が太い', 'Slim face, but thick wrists and arms'], ['全部が上からの自撮り。全身の写真が無い', 'Every photo shot from above. No full body'], ['顔の横だけ、ドア枠とタイルの線が曲がっていた', 'The door frame and tiles bent only next to her face'], ['全身の写真を聞くと「会えばわかる」。昼と通話は断る', 'Asked for a full-body pic: "you\'ll see." No daytime, no camera']],
  },
  {
    id: 'e', type: 'park', name: ['まりあ', 'Maria'], age: 24, h: 152, body: ['普通', 'Average'], job: ['歯科助手', 'Dental assistant'], area: ['大阪', 'Osaka'], drink: ['ときどき', 'Sometimes'], smoke: ['ときどき', 'Sometimes'], likes: 156,
    tags: [['テーマパーク', 'Theme parks'], ['ぬいぐるみ', 'Plushies'], ['夜景', 'Night views'], ['年パス', 'Annual pass']],
    intro: ['夢の国が好きです。年パス持ってます。寂しがりなので、毎日連絡くれる人がいいな。ずっと一緒にいてくれる人を探してます。', 'I love the dream kingdom and have an annual pass. I get lonely, so I want someone who messages every day. Looking for someone who\'ll stay with me forever.'],
    photos: ['e1', 'e2', 'e3'], meet: 'em', spd: [1500, 2500], pat: 90,
    place: ['今夜 23:30 駅の出口（今から）', 'Tonight 23:30, station exit (right now)'],
    end: ['会って10分で「付き合ってるよね？」と聞かれた。帰りの電車で着信が14件。', 'Ten minutes in: "We\'re dating, right?" On the train home: 14 missed calls.'],
    clues: [['顔の写真が1枚もない。夜のテーマパークの後ろ姿だけ', 'Not one face photo. Only her back at a night theme park'], ['自己紹介に「毎日連絡」「ずっと一緒」', '"Message every day" and "forever" in the bio'], ['2通目で元彼の話。深夜に「今から会いたい」', 'Her ex in message two. "Meet me now" at midnight']],
  },
  {
    id: 'f', type: 'heavy', name: ['ひより', 'Hiyori'], age: 28, h: 158, body: ['やや細め', 'Slim'], job: ['事務', 'Office clerk'], area: ['京都', 'Kyoto'], drink: ['飲まない', 'No'], smoke: ['吸わない', 'No'], likes: 98,
    tags: [['カフェ', 'Cafes'], ['読書', 'Books'], ['結婚', 'Marriage'], ['誠実', 'Sincerity']],
    intro: ['本気で結婚相手を探しています。遊び目的の方、既婚者の方はすぐブロックします。過去に傷ついたことがあるので、誠実な人がいいです。カフェで本を読むのが好きです。', 'I\'m seriously looking for a husband. Players and married men will be blocked. I\'ve been hurt before, so I need someone sincere. I like reading in cafes.'],
    photos: ['f1', 'f2', 'f3'], meet: 'fm', spd: [1500, 2500], pat: 90,
    place: ['日曜 14:00 静かなカフェ', 'Sun 14:00, a quiet cafe'],
    end: ['カフェで手帳を開かれ、来年の予定を全部埋められた。', 'She opened her planner at the cafe and filled in all of next year.'],
    clues: [['1通目から結婚の話', 'Marriage in message one'], ['自己紹介が「ブロックします」から始まる', 'Her bio opens with who she\'ll block'], ['どの話題も元彼か将来の話に戻る', 'Every topic loops back to her ex or the future']],
  },
  {
    id: 'g', type: 'baka', name: ['きらら', 'Kirara'], age: 25, h: 155, body: ['普通', 'Average'], job: ['フリーター', 'Part-timer'], area: ['大阪', 'Osaka'], drink: ['めっちゃ飲む', 'A lot'], smoke: ['ときどき', 'Sometimes'], likes: 210,
    tags: [['飲み', 'Drinking'], ['カラオケ', 'Karaoke'], ['ノリ', 'Vibes'], ['パフェ', 'Parfaits']],
    intro: ['よろしくでーす！のりで生きてます笑 趣味わ飲み。飲み友ぼしゅーしてます', 'heyyy! living on vibes lol. hobbie is drinking. looking for drinkin buddies'],
    photos: ['g1', 'g2', 'g3'], meet: 'gm', spd: [5000, 12000], pat: 90,
    place: ['土曜 19:00 どこかの駅（当日きめる）', 'Sat 19:00, some station (TBD on the day)'],
    end: ['待ち合わせの駅がちがった。隣の県のホームから「そっちが間違ってる」と写真が届いた。', 'Wrong station. A photo arrived from a platform in the next prefecture: "ur the one whos wrong."'],
    clues: [['1枚目が集合写真で、どれが本人か分からない', 'Group photo first, no idea which one she is'], ['自己紹介の誤字と「飲み友ぼしゅー」', 'Typos and "looking for drinkin buddies"'], ['会う駅を当日決めようとした', 'Wanted to pick the station on the day']],
  },
  {
    id: 'h', type: 'kireru', name: ['あやね', 'Ayane'], age: 27, h: 162, body: ['やや細め', 'Slim'], job: ['美容部員', 'Beauty counter'], area: ['大阪', 'Osaka'], drink: ['飲む', 'Yes'], smoke: ['吸わない', 'No'], likes: 330,
    tags: [['コスメ', 'Cosmetics'], ['ネイル', 'Nails'], ['韓国ドラマ', 'K-dramas'], ['カフェ', 'Cafes']],
    intro: ['美容部員です。既読無視する人、返信遅い人はムリです。マメな人がいいです。マスク外すのは会ってから。', 'Beauty counter staff. People who leave me on read or reply slowly: no. I want someone attentive. Mask comes off when we meet.'],
    photos: ['h1', 'h2', 'h3'], meet: 'hm', spd: [8000, 12000], pat: 10, angry: true,
    place: ['金曜 18:00 ちょうど 駅前の広場', 'Fri 18:00 sharp, station square'],
    end: ['18時00分40秒に着いたら、もういなかった。「40秒遅い」とだけ届いた。', 'I arrived at 18:00:40. She was gone. One message: "40 seconds late."'],
    timeout: ['は？既読無視？もういい。', 'Seriously? Left on read? Forget it.'],
    clues: [['全部の写真でマスクか手で口元を隠していた', 'Mask or hand over her mouth in every photo'], ['自己紹介が「ムリです」から始まる', 'Her bio opens with what she can\'t stand'], ['返信が少し遅れただけでキレる', 'Snaps at a slightly slow reply']],
  },
  {
    id: 'i', type: 'choro', name: ['みゆ', 'Miyu'], age: 25, h: 154, body: ['普通', 'Average'], job: ['受付', 'Receptionist'], area: ['大阪', 'Osaka'], drink: ['飲む', 'Yes'], smoke: ['吸わない', 'No'], likes: 1180,
    tags: [['カフェ', 'Cafes'], ['写真', 'Photos'], ['美容', 'Beauty'], ['夜ふかし', 'Night owl']],
    intro: ['たくさんのいいねありがとうございます！褒めてくれる人すき。ノリで会えます', 'Thanks for all the likes!! I love people who compliment me. Down to meet on a whim'],
    photos: ['i1', 'i2', 'i3'], meet: 'im', spd: [1200, 2000], pat: 90,
    place: ['今夜 20:00 駅前のカフェ', 'Tonight 20:00, cafe by the station'],
    end: ['40分で「次の予定ある」と帰った。改札の向こうで、別の男が手を振っていた。', 'Forty minutes in: "I have another plan." Past the gate, another guy was waving.'],
    clues: [['いいね1180。自己紹介に「たくさんのいいねありがとう」', '1,180 likes and "thanks for all the likes"'], ['褒めた瞬間に会う話になった', 'One compliment and she wanted to meet'], ['返事が短い。いいねが多い子ほど雑', 'Short replies. More likes, less effort']],
  },
  {
    id: 'j', type: 'gyosha', name: ['えりか', 'Erika'], age: 29, h: 165, body: ['スリム', 'Slender'], job: ['経営者・自由業', 'Self-employed'], area: ['東京・大阪', 'Tokyo / Osaka'], drink: ['ときどき', 'Sometimes'], smoke: ['吸わない', 'No'], likes: 2460,
    tags: [['投資', 'Investing'], ['自己成長', 'Self-growth'], ['海外旅行', 'Travel'], ['ラウンジ', 'Lounges']],
    intro: ['自由な働き方をしています。お金の勉強をしていて、人生を変えたい人と出会いたいです。前向きな人が好き。', 'I work freely. I study money, and want to meet people who want to change their lives. I like positive people.'],
    photos: ['j1', 'j2', 'j3'], meet: 'jm', spd: [1200, 2000], pat: 90,
    place: ['土曜 15:00 駅前のチェーンのカフェ', 'Sat 15:00, chain cafe by the station'],
    end: ['隣に「尊敬してる人」が座っていた。2時間後、手元に月3万円の積立のパンフレットが残った。', 'Her "mentor" sat right next to her. Two hours later I was holding a brochure for a 30,000-yen-a-month plan.'],
    clues: [['写真がプロの撮影みたいに完璧すぎる', 'Photos too perfect, like a pro shoot'], ['職業が自由業、タグに投資と自己成長', 'Self-employed, tags: investing, self-growth'], ['2通目でLINEへ。「会ってほしい人がいる」', 'LINE by message two. "Someone I want you to meet"']],
  },
  {
    id: 'k', full: true, type: 'concafe', name: ['ここな', 'Kokona'], age: 24, h: 156, body: ['普通', 'Average'], job: ['接客業', 'Hospitality'], area: ['大阪', 'Osaka'], drink: ['飲む', 'Yes'], smoke: ['吸わない', 'No'], likes: 640,
    tags: [['話すの好き', 'Love talking'], ['甘いもの', 'Sweets'], ['アニメ', 'Anime'], ['夜型', 'Night owl']],
    intro: ['接客の仕事をしてます。人と話すのが大好き！どんな話でも楽しめるタイプです。甘いものに目がないです', 'I work in hospitality. I love talking to people and enjoy any topic! Can\'t resist sweets'],
    photos: ['k1', 'k2', 'k3'], meet: 'km', spd: [1500, 2500], pat: 90,
    place: ['土曜 19:00 駅から3分のお店（場所は向こうが指定）', 'Sat 19:00, a place 3 min from the station (her pick)'],
    end: ['「おかえりなさいませ」と迎えられた。会計は伝票のとおり。', '"Welcome home!" The bill speaks for itself.'],
    bill: [[['セット料金 60分', 'Set charge, 60 min'], 1500], [['ドリンク ×2', 'Drinks x2'], 1800], [['ここなへのドリンク ×3', 'Drinks for Kokona x3'], 3000], [['ここなのチェキ', 'Photo with Kokona'], 1200], [['延長 30分', 'Extension, 30 min'], 1000]],
    clues: [['どの返事にも同じ温度でノリノリだった', 'Same excitement no matter what I sent'], ['会う場所を向こうが決めた', 'She picked the meeting place'], ['仕事を聞くと「わたし目当てで来る人もいる」、休みもシフト', 'Asked about work: "people come just to see me," shifts even on days off']],
  },
  {
    id: 'l', type: 'mukashi', name: ['ゆか', 'Yuka'], age: 30, h: 158, body: ['普通', 'Average'], job: ['営業事務', 'Sales admin'], area: ['大阪', 'Osaka'], drink: ['飲む', 'Yes'], smoke: ['吸わない', 'No'], likes: 410,
    tags: [['タピオカ', 'Bubble tea'], ['海', 'The sea'], ['カフェ', 'Cafes'], ['韓国コスメ', 'K-beauty']],
    intro: ['営業事務をしてます。写真は最近のです（ほぼ変わってないです笑）。カフェ巡りとタピオカが好き。写真より実物の方がいいってよく言われます', 'I do sales admin. These photos are recent (I basically haven\'t changed lol). I love cafe hopping and bubble tea. People say I look better in person'],
    photos: ['l1', 'l2', 'l3'], meet: 'lm', spd: [5000, 8000], pat: 90,
    place: ['金曜 19:30 駅の東口', 'Fri 19:30, station east exit'],
    end: ['東口に来たのは、5年ぶん時間がたったゆかだった。写真の日付は、ちゃんと右下に書いてあった。', 'The Yuka at the east exit was five years further along. The date was right there in the corner of the photo.'],
    clues: [['1枚目の右下の日付が「2021」', 'Photo 1 is stamped "2021" in the corner'], ['3枚とも季節も髪型もばらばら（夏・冬・桜）', 'Every photo has a different season and hairstyle'], ['ホームボタンのある古いスマホ、流行っていたころのタピオカ', 'An old home-button phone and peak-era bubble tea'], ['「いつの写真？」に「ちょっと前」', '"When were these taken?" "A little while ago"']],
  },
]

const T = {
  ja: {
    title: 'マチアプ写真詐欺を見抜け', sub: '盛った写真の中から、本物を探す', start: 'アプリを開く', how: '遊び方', lang: 'English',
    loading: 'プロフを読み込み中', likesLeft: n => `いいね あと${n}`, batt: '電池',
    pass: '見送り', like: 'いいね', loupe: '拡大',
    profAge: (a, h) => `${a}歳 ${h}cm`, lbl: { body: '体型', job: '職業', area: '住まい', drink: 'お酒', smoke: 'タバコ', likes: 'いいね' },
    noLikes: 'いいねを使い切った。残りは予想だけ',
    battDead: '電池が切れた',
    matched: 'マッチしました', toChat: 'トークへ', chatH: 'トーク', chatSub: n => `${n}人とやり取り中`, waitHint: '返事を待っています', mineHint: '返事をする', noMatch: '誰ともマッチしていない',
    typing: '入力中', read: '既読', timeoutQ: '？', left: 'マッチが解除されました',
    meetQ: n => `${n}と会う？`, meetYes: '会う', meetNo: '会わない', declined: 'お誘いは無かった',
    meetHead: '待ち合わせ', photoWas: 'プロフの写真', realWas: '来た人', next: '次へ',
    bill: '伝票', billTotal: '合計',
    date2Go: '2回目のデートへ', date2Head: '2回目のデート', d2ok: '続いた', d2ng: 'フラれた', rD2: '2回目も会った',
    rTitle: '反省会ノート', rScore: '点', rMet: '会った', rAvoid: '会う前に断った', rBad: '', 
    ranks: ['今夜も独り', '見る目が育ち中', 'まあまあ慎重', '写真を疑える人', 'マチアプの探偵'],
    yourPred: '予想', none: 'なし', save: '画像を保存', post: 'Xでポスト', again: 'もう一回', toTitle: 'タイトルへ',
    clueHead: '答え合わせ', close: '閉じる',
    tut: ['写真は左右をタップで切り替え', '拡大で手首や背景を確かめる', 'いいねは4回まで'],
    howH: '遊び方',
    howBody: [
      '女の子は11人。写真とプロフを見て、会ってみたい子にいいね。盛った写真や、業者もまじっている。',
      'いいねは4回まで。いいねした子とは同時にトークできる。相手の返事はすぐには来ない。',
      '返事は3択。休み・仕事・前の恋人・最近の写真などを聞いて、本性を探る。早すぎる質問や質問攻めは引かれる。気になった一言は、吹き出しを押すとメモできる。顔を押すとプロフとメモを見返せる。',
      'デートに誘うか、誘われるのを待つ。日時がかぶったらリスケを頼める。会ったあと、2回目も会うかを決める。',
      '行動しだいで結末が変わる。写真は盛ってある。手首・背景・撮った角度・全身の有無を見る。',
    ],
    credit: '通知音: Gravity Sound (CC BY 4.0)',
    postText: (s, r, e) => `マチアプのエンディング「${e}」、${s}点「${r}」でした。盛った写真の中から本性を探れ`,
    tags: '#マチアプ写真詐欺を見抜け #バカゲー',
    you: 'あなた',
  },
  en: {
    title: 'Dating App Photo Fraud', sub: 'Find the real one among the edited photos', start: 'Open the app', how: 'How to play', lang: '日本語',
    loading: 'Loading profiles', likesLeft: n => `${n} likes left`, batt: 'Battery',
    pass: 'Pass', like: 'Like', loupe: 'Zoom',
    profAge: (a, h) => `${a} / ${h}cm`, lbl: { body: 'Body', job: 'Job', area: 'Lives', drink: 'Drinks', smoke: 'Smokes', likes: 'Likes' },
    noLikes: 'Out of likes. Just guess the rest',
    battDead: 'Battery died',
    matched: 'It\'s a match', toChat: 'Chats', chatH: 'Chats', chatSub: n => `talking to ${n}`, waitHint: 'Waiting for her reply', mineHint: 'Your turn', noMatch: 'No matches',
    typing: 'typing', read: 'Read', timeoutQ: '?', left: 'She unmatched you',
    meetQ: n => `Meet ${n}?`, meetYes: 'Meet', meetNo: 'Skip', declined: 'No invite came',
    meetHead: 'Meeting', photoWas: 'Profile photo', realWas: 'Who showed up', next: 'Next',
    bill: 'Bill', billTotal: 'Total',
    date2Go: 'Second date', date2Head: 'Second date', d2ok: 'Still on', d2ng: 'Dumped', rD2: 'Second dates',
    rTitle: 'Debrief notebook', rScore: 'pts', rMet: 'Met', rAvoid: 'Turned down', rBad: '', 
    ranks: ['Alone again', 'Learning to look', 'Fairly careful', 'Photo skeptic', 'Dating app detective'],
    yourPred: 'Guess', none: 'none', save: 'Save image', post: 'Post on X', again: 'Again', toTitle: 'Title',
    clueHead: 'The tells', close: 'Close',
    tut: ['Tap left/right to flip photos', 'Zoom in on wrists and backgrounds', 'Only 4 likes'],
    howH: 'How to play',
    howBody: [
      'Eleven women. Study the photos and profiles and like the ones you want to meet. Some photos are edited, and some profiles are fronts.',
      'Only 4 likes. Chat with all your matches at once. Replies take time.',
      'Pick from 3 replies. Ask about days off, work, exes, recent photos to find out who she really is. Asking too early or too much puts people off. Tap a message to save it as a note. Tap her face to review her profile and notes.',
      'Ask her out or wait to be asked. If dates clash, you can reschedule. After meeting, decide whether to see her again.',
      'Your actions decide the ending. Photos are edited: check wrists, backgrounds, camera angles, full-body shots.',
    ],
    credit: 'Notification sounds: Gravity Sound (CC BY 4.0)',
    postText: (s, r, e) => `Ending: "${e}". ${s} pts, "${r}" on Dating App Photo Fraud. Find who she really is behind the edited photos`,
    tags: '#bakage',
    you: 'You',
  },
}

// エンディング（上から順に条件を見て、最初に合った1つに決まる）。{a}{o}{h} は名前に置き換える
const ENDS = [
  { id: 'clash', title: ['同じ日、同じ店', 'Same day, same place'], text: ['{a}との店に、{o}も来た。2人とも同じ時間を指定されていた。店員が、そっとおしぼりを3つ置いた。', '{o} walked into the same place as {a}. Both had been given the same time. The waiter quietly set down three hand towels.'], hint: ['かぶった約束を、そのままにする', 'Leave a double booking as is'] },
  { id: 'stalk', title: ['既読、見てたよ', 'I saw you read it'], text: ['{h}と会ったあとも、ほかの子に返信していた。既読の時間まで見られていた。朝までに通知が127件。最寄り駅の改札で、{h}が手を振っていた。', 'After meeting {h}, I kept replying to other girls. She tracked every "Read" timestamp. 127 notifications by morning. At my home station gate, {h} was waving.'], hint: ['重たい子と会ったあとの、自分の指', 'What your thumbs do after meeting the clingy one'] },
  { id: 'exposed', title: ['リスケの重ね着', 'Rescheduled to death'], text: ['リスケを頼むたびに、ずらした先がまたかぶった。2人から同じ日に「予定いっぱいなんだね」と届いた。', 'Every time I rescheduled, the new date clashed again. On the same day, both sent: "Busy, huh."'], hint: ['リスケを何度も頼む', 'Reschedule again and again'] },
  { id: 'futamata', title: ['同じ改札で', 'Same ticket gate'], text: ['{a}との3回目の待ち合わせ。同じ改札に、{o}も立っていた。二人とも、同じ文面のメッセージを受け取っていた。その夜、両方からブロックされた。', 'Third date with {a}. At the same ticket gate stood {o}. They had both received the exact same messages. That night, both blocked me.'], hint: ['続いている子がいるのに、ほかの子とも', 'Seeing someone, and still seeing others'] },
  { id: 'best', title: ['アプリを消した夜', 'The night I deleted the app'], text: ['{a}と4回目のデートの帰りに、アプリを消した。通知の鳴らない夜は、思ったより静かでいい。', 'Coming home from date four with {a}, I deleted the app. A night without notifications is quieter than I thought. In a good way.'], hint: ['会って楽しかった子とだけ、まっすぐ', 'Only the one you had fun with'] },
  { id: 'honest', title: ['写真より、本人', 'Better than her photos'], text: ['{d}は写真とは別人だった。でも話は一番合った。加工アプリの使い方を教わる約束をして、帰りの電車でずっと笑っていた。', '{d} looked nothing like her photos. But we clicked better than anyone. She promised to teach me her editing app, and I laughed the whole train ride home.'], hint: ['写真と違った子と、ちゃんと話してみる', 'Really talk to the one who didn\'t match her photos'] },
  { id: 'seminar', title: ['紹介する側へ', 'Now I\'m the recruiter'], text: ['えりかの「尊敬してる人」のセミナーに3回通った。気づけば、友達に「ちょっと会ってほしい人がいる」と送る下書きを書いていた。消した。', 'Three seminars with Erika\'s "mentor." I caught myself drafting "there\'s someone I want you to meet" to a friend. Deleted it.'], hint: ['完璧すぎる写真の子についていく', 'Follow the one with the too-perfect photos'] },
  { id: 'regular', title: ['スタンプカード3枚目', 'Third stamp card'], text: ['ここなのお店のスタンプカードが3枚目になった。マッチングアプリは、もう開いていない。', 'My stamp card at Kokona\'s place is on its third sheet. I don\'t open the dating app anymore.'], hint: ['場所を向こうが決めた子に、通い続ける', 'Keep going where she told you to go'] },
  { id: 'silent', title: ['通知が来ない', 'No notifications'], text: ['あやねにブロックされた夜から、アプリが静かになった。誰も怒っていない。誰も待っていない。', 'Since the night Ayane blocked me, the app has gone quiet. Nobody is angry. Nobody is waiting.'], hint: ['返事を待たせすぎる', 'Keep someone waiting too long'] },
  { id: 'sleep', title: ['アプリを消して寝る', 'Delete app, sleep'], text: ['誰とも会わなかった。アプリを消して、9時間寝た。朝の目覚めは悪くなかった。', 'I didn\'t meet anyone. Deleted the app and slept nine hours. Woke up feeling fine.'], hint: ['誰とも会わない', 'Meet no one'] },
  { id: 'again', title: ['ふりだし', 'Back to square one'], text: ['会ってはみた。何も続かなかった。日曜の夜、またスワイプしている。', 'I did meet people. Nothing stuck. Sunday night, swiping again.'], hint: ['会ったけど、何も続かない', 'Meet, but nothing sticks'] },
]
// 結果の見せ方（当たり外れとは言わない。何が起きたか）と、待ち合わせの曜日・リスケへの反応・2回目のデート
const EXTRA = {
  a: { tag: ['写真どおり', 'As pictured'], slot: 'sat-d' },
  b: { tag: ['写真どおり', 'As pictured'], slot: 'sun-d' },
  c: { tag: ['写真どおり', 'As pictured'], slot: 'sat-d' },
  d: { tag: ['写真と別人', 'Not as pictured'], slot: 'fri-n', date2: { scene: ['2回目は、りなが選んだ明るいカフェ', 'Date two: a bright cafe Rina picked'], o: [
      { t: ['加工アプリ、どうやって使ってるの？教えて', 'How do you use your editing app? Teach me'], g: 1, r: ['え、聞いてくれるの？笑 実はね…', 'Wait, you want to know? lol. So...'] },
      { t: ['やっぱり写真と違うよね', 'You really don\'t look like your photos'], g: -1, r: ['…知ってる', '...I know'] },
      { t: ['（ずっとスマホを見る）', '(stare at my phone the whole time)'], g: -1, r: ['…帰るね', '...I\'m going home'] },
    ], ok: ['加工の話で2時間笑った。写真より、話している本人の方がずっと楽しかった。', 'Two hours laughing about photo editing. The real her was way more fun than the photos.'], ng: ['店を出るまで、会話は戻らなかった。', 'The conversation never came back.'] } },
  e: { tag: ['カチューシャのまま', 'Headband on'], slot: 'now', sus: 1, date2: { scene: ['2回目は夜のテーマパーク。まりあは年パスを2枚持ってきた', 'Date two: the theme park at night. Maria brought two annual passes'], o: [
      { t: ['今日は閉園前に帰ろう。明日仕事だから', 'Let\'s leave before closing. I work tomorrow'], g: 1, r: ['…うん', '...okay'] },
      { t: ['ずっと一緒にいるよ', 'I\'ll be with you forever'], g: -1, r: ['ほんと？じゃあ来月の土日、全部ね', 'Really? Then every weekend next month'] },
      { t: ['実は、ほかの子とも会ってる', 'Actually, I\'m seeing other girls too'], g: -1, r: ['…', '...'] },
    ], ok: ['閉園前に帰れた。帰りの電車で着信が9件。', 'Made it out before closing. Nine missed calls on the train home.'], ng: ['年パスを渡された。来月の土日が全部埋まった。', 'She handed me an annual pass. Every weekend next month is booked.'] } },
  f: { tag: ['手帳持参', 'Planner in hand'], slot: 'sun-d', sus: 1, date2: { scene: ['2回目は、ひよりの両親との食事会だった', 'Date two turned out to be dinner with her parents'], o: [
      { t: ['まだ付き合ってもいないよね', 'We\'re not even dating yet'], g: 1, r: ['じゃあ今日からですね', 'Then starting today'] },
      { t: ['よろしくお願いします', 'Pleased to meet you all'], g: -1, r: ['（両親が深くうなずいた）', '(her parents nod deeply)'] },
      { t: ['（トイレに逃げる）', '(escape to the restroom)'], g: -1, r: ['（戻ると、席が詰めてあった）', '(when I return, they\'ve scooted closer)'] },
    ], ok: ['「今日から付き合う」と手帳に書かれた。', '"Dating, starting today" went into her planner.'], ng: ['式場の見学が来週に決まった。', 'A wedding venue tour is booked for next week.'] } },
  g: { tag: ['駅ちがい', 'Wrong station'], slot: 'sat-n', date2: { scene: ['2回目は、きららが「だいたいこの辺」と送ってきた駅', 'Date two: a station Kirara described as "around here"'], o: [
      { t: ['店だけでも先に決めよう', 'Let\'s at least pick the restaurant now'], g: 1, r: ['いいよ〜（決まった）', 'ok~ (decided)'] },
      { t: ['了解！', 'Got it!'], g: -1, r: ['たのしみ〜', 'cant wait~'] },
      { t: ['どこでもいいよ', 'Anywhere is fine'], g: -1, r: ['じゃあどこでも〜', 'then anywhere~'] },
    ], ok: ['店は決まった。きららは別の店に着いた。', 'The restaurant was decided. Kirara went to a different one.'], ng: ['2時間後、隣の県のホームから写真が届いた。', 'Two hours later, a photo from a platform in the next prefecture.'] } },
  h: { tag: ['時間に厳しい', 'Strict on time'], slot: 'fri-n', sus: 2, date2: { scene: ['2回目、待ち合わせは17:55。5分前集合', 'Date two: meet at 17:55. Five minutes early'], o: [
      { t: ['17:50に着いて待つ', 'Arrive at 17:50 and wait'], g: 1, r: ['早すぎ', 'Too early'] },
      { t: ['18:00ちょうどに着く', 'Arrive at exactly 18:00'], g: -1, r: ['5分前って言ったよね', 'I said five minutes early'] },
      { t: ['少し遅れるって連絡する', 'Text that I\'ll be a little late'], g: -1, r: ['（既読）', '(read)'] },
    ], ok: ['「早すぎ」と言われた。それでも、帰られなかった。', '"Too early," she said. But she didn\'t leave.'], ng: ['その日のうちにブロックされた。', 'Blocked the same day.'] } },
  i: { tag: ['次の予定あり', 'Next date booked'], slot: 'now', date2: { scene: ['2回目、みゆは「今日これで2件目」と言った', 'Date two: Miyu says "this is my second one today"'], o: [
      { t: ['次の予定まで、楽しもう', 'Let\'s enjoy it till your next one'], g: 1, r: ['え、やさしい〜', 'aww, so nice~'] },
      { t: ['今日は僕だけにしてよ', 'Just me today, please'], g: -1, r: ['重っ', 'heavy'] },
      { t: ['かわいい、好き', 'Cute. I love you'], g: -1, r: ['うれしい〜（別の人に返信しながら）', 'yay~ (replying to someone else)'] },
    ], ok: ['30分で次の予定へ向かった。見送る自分は、少しだけ大人だった。', 'She left for her next date in 30 minutes. Watching her go, I felt a little more grown up.'], ng: ['会話の途中で、次の男が店に入ってきた。', 'Mid-sentence, her next date walked into the cafe.'] } },
  j: { tag: ['勧誘', 'Recruiting'], slot: 'sat-d', date2: { scene: ['2回目は、えりかの「尊敬してる人」のセミナー', 'Date two: a seminar by Erika\'s "mentor"'], o: [
      { t: ['途中で帰ります', 'I\'m leaving early'], g: 1, r: ['もったいない…', 'What a waste...'] },
      { t: ['申込書を書く', 'Fill out the application'], g: -1, r: ['すごい！一緒に頑張ろう！', 'Amazing! Let\'s do this together!'] },
      { t: ['友達も誘ってみる', 'I\'ll invite my friends too'], g: -1, r: ['最高！紹介の仕方、教えるね', 'Perfect! I\'ll teach you how to refer people'] },
    ], ok: ['出口で「もったいない」と3回言われた。', '"What a waste," three times at the exit.'], ng: ['月3万円の積立が始まった。', 'A 30,000-yen monthly plan has begun.'] } },
  k: { tag: ['お店の営業', 'Shop sales'], slot: 'sat-n', date2: { scene: ['2回目も、ここなのお店。スタンプカードを渡された', 'Date two: Kokona\'s place again. She hands me a stamp card'], o: [
      { t: ['今日はドリンク1杯で帰る', 'One drink and I\'m out'], g: 1, r: ['えーやばい！また来てね〜！', 'Omg! Come again~!'] },
      { t: ['ここなにドリンクを入れる', 'Buy Kokona a drink'], g: -1, r: ['えーやばい！うれしい〜！', 'Omg! So happy~!'] },
      { t: ['チェキを撮る', 'Take a photo with her'], g: -1, r: ['えーやばい！ポーズどうする〜？', 'Omg! What pose~?'] },
    ], ok: ['伝票は3,400円。ここなは手を振って次の席へ行った。', 'The bill: 3,400 yen. Kokona waved and moved to the next table.'], ng: ['伝票は12,000円。スタンプが3つ押された。', 'The bill: 12,000 yen. Three stamps on the card.'] } },
  l: { tag: ['5年前の写真', 'Five-year-old photos'], slot: 'fri-n', date2: { scene: ['2回目は、ゆかが昔よく行ったという海', 'Date two: the beach Yuka used to visit'], o: [
      { t: ['今の写真、一緒に撮ろう', 'Let\'s take a photo of us, now'], g: 1, r: ['え、いいの？', 'Really? Sure'] },
      { t: ['昔の写真の方が好きかも', 'I kind of prefer your old photos'], g: -1, r: ['…そっか', '...I see'] },
      { t: ['タピオカの店、探そう', 'Let\'s find that bubble tea shop'], g: -1, r: ['…もう無いよ', '...it\'s gone'] },
    ], ok: ['撮った写真の方が、プロフの写真よりいい顔をしていた。', 'In the new photo she looked better than in any of her profile pictures.'], ng: ['帰りの電車は、ずっと無言だった。', 'A silent train ride home.'] } },
}
for (const g of GIRLS) Object.assign(g, EXTRA[g.id], g.date2 ? {} : (EXTRA[g.id].date2 ? { date2: EXTRA[g.id].date2 } : {}))
// リスケを頼まれた時の反応。sus の子は疑ってくる
const RESCHED = {
  ask: ['ごめん、その日ほかの予定が入っちゃって。日をずらせる？', 'Sorry, something came up that day. Could we move it?'],
  ok: ['了解です、また都合のいい日を教えてください', 'Sure, just let me know a good day'],
  sus: { e: ['もしかして、他に女いるの？', 'Wait. Is there another girl?'], f: ['…他に会う人がいるんですか？', '...Are you seeing someone else?'], h: ['は？他に女いるでしょ', 'Excuse me? There\'s another girl, isn\'t there'] },
  o: [
    { t: ['仕事が入った。来週の同じ時間はどう？', 'Work came up. Same time next week?'], res: 'keep', r: ['…わかった。来週ね', '...Okay. Next week'] },
    { t: ['いないよ、君だけだよ', 'There\'s no one else. Only you'], res: 'deep', r: ['ほんと？約束ね', 'Really? Promise'] },
    { t: ['なんでそんなこと聞くの？', 'Why would you ask that?'], res: 'cut', r: ['もういい', 'Forget it'] },
  ],
}
T.ja.endHead = 'エンディング'; T.en.endHead = 'Ending'
T.ja.toNote = '反省会ノートへ'; T.en.toNote = 'To the debrief'
T.ja.endList = (n, m) => `エンディング ${n}/${m}`; T.en.endList = (n, m) => `Endings ${n}/${m}`
T.ja.endUnseen = 'まだ見ていない'
T.ja.invite = 'デートに誘う'; T.en.invite = 'Ask her out'
T.ja.memo = 'メモ'; T.en.memo = 'Notes'
T.ja.heard = 'この一言が手がかりだった'; T.en.heard = 'These lines were the tells'
T.ja.memoed = '（メモ済み）'; T.en.memoed = ' (noted)'
T.ja.d2q = n => `${n}と、2回目も会う？`; T.en.d2q = n => `See ${n} again?`
T.ja.d2yes = '2回目も会う'; T.en.d2yes = 'See her again'; T.ja.d2no = 'もう会わない'; T.en.d2no = 'No more'
T.ja.clashQ = (y) => `その日は${y}とも約束している`; T.en.clashQ = y => `You already have a date with ${y} then`
T.ja.rsTo = n => `${n}にリスケを頼む`; T.en.rsTo = n => `Ask ${n} to reschedule`
T.ja.both = '両方と会う'; T.en.both = 'Meet both'
T.ja.clashTag = '修羅場'; T.en.clashTag = 'Showdown'
T.ja.clashText = (x, y) => `${y}との店に、${x}も来た。2人とも同じ時間を指定されていた。`; T.en.clashText = (x, y) => `${x} walked into the same place as ${y}. Both had been given the same time.`
T.ja.fizzle = 'やり取りが途切れた'; T.en.fizzle = 'The chat fizzled out'
T.ja.toRs = n => `（${n}へ）`; T.en.toRs = n => `(to ${n}) `; T.en.endUnseen = 'Not seen yet'
