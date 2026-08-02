// ESbrain 核心语音数据
const STAGES = {
  P0: { title: 'P0 发音入门', next: 'P1' },
  P1: { title: 'P1 A1.1 生存西语', next: 'P2' },
  P2: { title: 'P2 A1.2 提高西语', next: 'P3' },
  P3: { title: 'P3 A2.1 进阶西语', next: 'P3B' },
  P3B: { title: 'P3B A2.2 独立表达', next: 'P4' },
  P4: { title: 'P4 B1.1 独立表达', next: 'P5' },
  P5: { title: 'P5 B1.2 论述与互动', next: null }
};

const ALPHABET = [
  { letter: 'A', name: 'a', ipa: '/a/' },
  { letter: 'B', name: 'be', ipa: '/be/' },
  { letter: 'C', name: 'ce', ipa: '/θe/', ipa_la: '/se/' },
  { letter: 'D', name: 'de', ipa: '/de/' },
  { letter: 'E', name: 'e', ipa: '/e/' },
  { letter: 'F', name: 'efe', ipa: '/ˈefe/' },
  { letter: 'G', name: 'ge', ipa: '/xe/' },
  { letter: 'H', name: 'hache', ipa: '/ˈatʃe/' },
  { letter: 'I', name: 'i', ipa: '/i/' },
  { letter: 'J', name: 'jota', ipa: '/ˈxota/' },
  { letter: 'K', name: 'ka', ipa: '/ka/' },
  { letter: 'L', name: 'ele', ipa: '/ˈele/' },
  { letter: 'M', name: 'eme', ipa: '/ˈeme/' },
  { letter: 'N', name: 'ene', ipa: '/ˈene/' },
  { letter: 'Ñ', name: 'eñe', ipa: '/ˈeɲe/' },
  { letter: 'O', name: 'o', ipa: '/o/' },
  { letter: 'P', name: 'pe', ipa: '/pe/' },
  { letter: 'Q', name: 'cu', ipa: '/ku/' },
  { letter: 'R', name: 'ere', ipa: '/ˈeɾe/' },
  { letter: 'S', name: 'ese', ipa: '/ˈese/' },
  { letter: 'T', name: 'te', ipa: '/te/' },
  { letter: 'U', name: 'u', ipa: '/u/' },
  { letter: 'V', name: 'uve', ipa: '/ˈube/' },
  { letter: 'W', name: 'uve doble', ipa: '/ˈube ˈdoble/' },
  { letter: 'X', name: 'equis', ipa: '/ˈekis/' },
  { letter: 'Y', name: 'ye', ipa: '/ʝe/' },
  { letter: 'Z', name: 'zeta', ipa: '/ˈθeta/', ipa_la: '/ˈseta/' }
];

const PHONEMES = [
  { sym: 'a', ex: 'casa', note: '西语元音永远纯净短促不弱化，没有英语的双元音化' },
  { sym: 'e', ex: 'peso', note: '西语元音永远纯净短促，词尾也不弱化成"呃"' },
  { sym: 'i', ex: 'si', note: '西语元音永远纯净短促不弱化，没有法语的弱化现象' },
  { sym: 'o', ex: 'todo', note: '西语元音永远纯净短促，不会像英语那样滑成双元音' },
  { sym: 'u', ex: 'tu', note: '西语元音永远纯净短促不弱化，基本怎么写就怎么读' },
  { sym: 'p', ex: 'pero', note: '清辅音，双唇爆破，与英语 p 类似但送气更弱' },
  { sym: 'b', ex: 'bueno', note: 'b 与 v 同一音位；按位置可实现为 [b] 或 [β]' },
  { sym: 't', ex: 'todo', note: '清辅音，舌尖抵上齿，不送气' },
  { sym: 'd', ex: 'dar', note: '元音间软化为 /ð/，nada 接近英语 this 的 th' },
  { sym: 'k', ex: 'casa', note: '清辅音，舌根音；kilo、quilo 也读这个音' },
  { sym: 'g', ex: 'gato', note: '浊辅音，舌根音，类似汉语 g' },
  { sym: 'f', ex: 'flor', note: '清辅音，唇齿摩擦音，与英语 f 相同' },
  { sym: 's', ex: 'sol', note: '只读 /s/，与 z/ce/ci 的 /θ/ 严格区分，这是西班牙口音的招牌' },
  { sym: 'θ', ex: 'zapato', note: '咬舌音，像英语 think 的 th；c 在 e/i 前也读这个音，如 cena；拉美口音并入 /s/，知道对应关系即可' },
  { sym: 'x', ex: 'jamón', note: '喉擦音，像汉语 h 更重；g 在 e/i 前也读这个音，如 gente' },
  { sym: 'tʃ', ex: 'mucho', note: '破擦音，与英语 church 的 ch 相同' },
  { sym: 'ʝ', ex: 'yo', note: '字母 y 在 yo 等词中常读 /ʝ/；ll 在多数地区也合流为这个音' },
  { sym: 'ɾ', ex: 'pero', note: '单击颤音，舌尖弹一下' },
  { sym: 'r', ex: 'perro', note: '多击弹舌；词首 r 也读多击，如 rama' },
  { sym: 'm', ex: 'mamá', note: '浊辅音，双唇鼻音，与汉语 m 相同' },
  { sym: 'n', ex: 'no', note: '浊辅音，舌尖鼻音，与汉语 n 相同' },
  { sym: 'ɲ', ex: 'niño', note: '像 ni 快速连读' },
  { sym: 'l', ex: 'luna', note: '浊辅音，舌尖边音，与汉语 l 相同' },
  { sym: 'w', kind: 'glide', ex: 'huevo', note: '滑音 [w]：这里由 hu- 中的 u 形成，不是字母 w 的固定读法' },
  { sym: 'j', kind: 'glide', ex: 'bien', note: '滑音 [j]：这里由 i 形成，不是字母 y 的常规辅音读法' }
];

// ch、ll 是二合字母：现代西语字母表仍为 27 个字母，不将它们单列为字母。
const DIGRAPHS = [
  { letters: 'ch', ipa: '/tʃ/', ex: 'chico', note: '破擦音；不是独立字母。' },
  { letters: 'll', ipa: '/ʝ/（多数地区）', ex: 'llamo', note: '多数地区与 y 合流；部分地区保留 /ʎ/，阿根廷/乌拉圭常见 [ʃ]/[ʒ]；不是独立字母。' }
];

// 拼读规则：core 为 8 条核心规则（发音页直接展示），其余收进「更多细节」折叠区
const RULES = [
  // —— 核心规则（8 条）——
  { core: true, title: 'c 与 z：distinción、seseo 与 ceceo', ex: 'casa / cena / zapato', note: '标准西班牙语通常是 distinción：c 在 e/i 前、z 在各位置读 /θ/，c 在 a/o/u 前读 /k/。拉美多为 seseo，c/z 并入 /s/；ceceo 是西班牙南部部分地区现象，不等同于标准本土口音。' },
  { core: true, title: 'll 与 y：yeísmo 与地区变体', ex: 'llamo, yo / y', note: '多数地区的 ll 与 y 在辅音位置合流为 /ʝ/；阿根廷/乌拉圭常见 [ʃ]/[ʒ]，少数地区保留 /ʎ/。单独的连词 y 读 /i/。' },
  { core: true, title: 'r 与 rr 的对立', ex: 'pero / perro', note: '单击 /ɾ/ vs 多击 /r/；词首 r 也读多击：rojo。西语发音第一道坎' },
  { core: true, title: 'h 永远不发音', ex: 'hola, ahora', note: 'hola 读 /ola/' },
  { core: true, title: 'g 与 j 的 /x/', ex: 'gato / gente / jamón', note: 'j 永远读 /x/（喉擦音，像汉语 h 更重）；g 在 a/o/u 前读 /g/，在 e/i 前也读 /x/' },
  { core: true, title: 'qu 与 gu 的 u 不发音', ex: 'quiero, guerra', note: 'que/qui = /ke/ /ki/；gue/gui 的 u 只是标记 g 读 /g/，真要读 u 加两点：pingüino' },
  { core: true, title: 'ñ 读 /ɲ/', ex: 'niño, español', note: '舌面鼻音，像 ni 快速连读' },
  { core: true, title: '重音规则（核心！）', ex: 'casa, canción, café', note: '元音或 n/s 结尾重音在倒数第二音节（CAsa, HABlan）；其他辅音结尾重音在末音节（espaÑOL, ciuDAD）；不符合的必须写重音符号（café, médico）。所以西语看到词就知道怎么读' },
  // —— 更多细节（默认折叠）——
  { title: '元音永远清晰不弱化', ex: 'casa, peso, todo', note: '五个元音短促干净，词尾也不吞。基本怎么写就怎么读' },
  { title: 'b 与 v 同一音位', ex: 'beber, vivir', note: '两者不按拼写区分读音；停顿后或 m/n 后多为 [b]，元音之间常为 [β]。听写靠记不靠听。' },
  { title: 'd 在元音间软化', ex: 'nada, todo', note: '接近英语 this 的 /ð/；词尾更弱：Madrid' },
  { title: 'ch 读 /tʃ/', ex: 'mucho, chico', note: '破擦音，与英语 church 的 ch 相同' },
  { title: '重音符号区分词义', ex: 'sí/si, tú/tu, él/el', note: 'sí（是）/si（如果）、tú（你）/tu（你的）、él（他）/el（冠词）' },
  { title: '二重元音一口气读', ex: 'bien, cuatro, gracias', note: 'ia/ie/io/ai/eu/au 滑着读完不拆开' },
  { title: '倒写问号感叹号', ex: '¿Cómo estás? ¡Hola!', note: '句首 ¿ ¡ 提前告知升调/加强语气' }
];

const UNLOCK_QUIZ = [
  {
    q: '西班牙语有几个元音？',
    options: ['6个', '5个', '7个'],
    a: 1
  },
  {
    q: 'h 在西语里怎么读？',
    options: ['不发音', '读 /h/ 像英语', '读 /x/ 像 j'],
    a: 0
  },
  {
    q: 'c 在 e/i 前（西班牙本土口音）读什么？',
    options: ['/s/ 丝音', '/k/ 清辅音', '/θ/ 咬舌音'],
    a: 2
  },
  {
    q: 'pero 和 perro 的区别是什么？',
    options: ['r 单击与 rr 多击弹舌', 'o 的发音长短不同', '重音位置不同'],
    a: 0
  },
  {
    q: 'gue 里的 u 发音吗？',
    options: ['发音，读 /we/', '不发音，只是标记 g 读 /g/', '发音，读 /u/'],
    a: 1
  },
  {
    q: '以元音结尾的词，重音一般落在哪？',
    options: ['倒数第一音节', '第一个音节', '倒数第二音节'],
    a: 2
  },
  {
    q: 'canción 的重音符号说明什么？',
    options: ['只是书写装饰', '不符合默认规则，重音在 ó', '表示字母要读长音'],
    a: 1
  },
  {
    q: 'ñ 读什么音？',
    options: ['/ɲ/', '/n/', '/nj/ 两个音分开'],
    a: 0
  },
  {
    q: 'b 和 v 的发音一样吗？',
    options: ['不一样，v 是唇齿音', '完全一样', '不一样，b 是浊音 v 是清音'],
    a: 1
  },
  {
    q: 'j 读什么音？',
    options: ['/j/ 像英语 yes', '/dʒ/ 像英语 job', '/x/ 喉擦音'],
    a: 2
  }
];
