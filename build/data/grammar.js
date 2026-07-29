// ESbrain 语法库（25 条）
const GRAMMARS = [
  {
    id: "g001",
    title: "动词 ser 的现在时变位与自我介绍",
    lesson: "A1.1-L01",
    content: "<p><b>规则：</b>ser 是西语最常用的动词之一，表示身份、国籍、职业等“是”的意思，变位完全不规则，必须背熟。中文里“我是、你是”都用“是”，但西语每个人称有不同形式。职业前一般不加冠词：Soy piloto（我是飞行员）。</p><table><tr><th>人称</th><th>ser</th><th>中文</th></tr><tr><td>yo</td><td>soy</td><td>我是</td></tr><tr><td>tú</td><td>eres</td><td>你是</td></tr><tr><td>él / ella / usted</td><td>es</td><td>他/她/您是</td></tr><tr><td>nosotros / nosotras</td><td>somos</td><td>我们是</td></tr><tr><td>vosotros / vosotras</td><td>sois</td><td>你们是</td></tr><tr><td>ellos / ellas / ustedes</td><td>son</td><td>他们/您们是</td></tr></table><p><b>例句：</b></p><ul><li>Me llamo Wang Lei.<br>我叫王磊。</li><li>Soy de China.<br>我来自中国。</li><li>Soy piloto.<br>我是飞行员。（注意：职业前不加 un）</li><li>Somos pilotos.<br>我们是飞行员。</li></ul><p>常见错误：人称和变位对不上，如 ×Yo es piloto（应为 Soy piloto）；受英语影响在职业前加冠词，如 ×Soy un piloto（西语说 Soy piloto）。</p>"
  },
  {
    id: "g002",
    title: "名词的阴阳性：-o/-a 规律与常见例外",
    lesson: "A1.1-L02",
    content: "<p><b>规则：</b>西语名词分阴阳两性。大体规律：以 -o 结尾多为阳性（el libro 书），以 -a 结尾多为阴性（la mesa 桌子）。但有一批高频例外要死记：以 -ma 结尾的希腊词源词多为阳性（el problema 问题、el programa 节目、el tema 主题），还有 el día（天）、el mapa（地图）；la mano（手）是阴性，缩写词 la foto（照片）、la moto（摩托车）虽然以 -o 结尾也是阴性。记名词时最好连同冠词一起背：背 el problema，而不是 problema。</p><p><b>例句：</b></p><ul><li>El problema es difícil.<br>这个问题很难。（problema 是阳性）</li><li>La mano<br>手（阴性，不是 el mano）</li><li>El día está nublado.<br>今天阴天。（día 是阳性）</li><li>La foto es bonita.<br>这张照片很好看。</li></ul><p>常见错误：×la problema / ×el mano / ×el foto——这几条例外出现频率极高，务必单独记忆；另注意 el día 的 í 有重音符号。</p>"
  },
  {
    id: "g003",
    title: "定冠词 el/la/los/las 与不定冠词 un/una/unos/unas",
    lesson: "A1.1-L02",
    content: "<p><b>规则：</b>冠词要和后面的名词性数一致。定冠词（相当于英语 the，特指）：el（阳性单数）、la（阴性单数）、los（阳性复数）、las（阴性复数）。不定冠词（相当于 a/some，泛指）：un、una、unos、unas。中文没有冠词概念，中国学习者最容易漏掉冠词或搞错阴阳性。</p><table><tr><th></th><th>阳性单数</th><th>阴性单数</th><th>阳性复数</th><th>阴性复数</th></tr><tr><td>定冠词（这/那个）</td><td>el</td><td>la</td><td>los</td><td>las</td></tr><tr><td>不定冠词（一/一些）</td><td>un</td><td>una</td><td>unos</td><td>unas</td></tr></table><p><b>例句：</b></p><ul><li>El piloto está en el aeropuerto.<br>那位飞行员在机场。（特指，用 el）</li><li>Quiero un café.<br>我要一杯咖啡。（泛指，用 un）</li><li>La maleta es grande.<br>这个行李箱很大。</li><li>Compro unas frutas.<br>我买一些水果。</li></ul><p>常见错误：冠词与名词性数不配合，如 ×un mesa（mesa 阴性，应为 una mesa）、×los casas（应为 las casas）。</p>"
  },
  {
    id: "g004",
    title: "querer/poder 的现在时（词干元音变化 e→ie, o→ue 入门）",
    lesson: "A1.1-L03",
    content: "<p><b>规则：</b>querer（想、要）和 poder（能、可以）是最常用的两个情态动词，后面直接接不定式。它们的词干元音会发生变化：querer 是 e→ie，poder 是 o→ue。这类动词俗称“靴子动词”（boot verbs）：变化发生在 yo、tú、él/usted、ellos/ustedes 这几格，而 <b>nosotros 和 vosotros 不变词干</b>（想象变位表上一只靴子的形状）。</p><table><tr><th>人称</th><th>querer（想）</th><th>poder（能）</th></tr><tr><td>yo</td><td>quiero</td><td>puedo</td></tr><tr><td>tú</td><td>quieres</td><td>puedes</td></tr><tr><td>él / ella / usted</td><td>quiere</td><td>puede</td></tr><tr><td>nosotros</td><td>queremos</td><td>podemos</td></tr><tr><td>vosotros</td><td>queréis</td><td>podéis</td></tr><tr><td>ellos / ustedes</td><td>quieren</td><td>pueden</td></tr></table><p><b>例句：</b></p><ul><li>Quiero dormir.<br>我想睡觉。</li><li>¿Puedes ayudarme?<br>你能帮我吗？</li><li>Queremos comer tapas.<br>我们想吃小吃。</li><li>No puedo volar hoy.<br>我今天不能飞。</li></ul><p>常见错误：给 nosotros/vosotros 也变词干，如 ×quieremos / ×puedéis（应为 queremos / podéis——这两格不变）。</p>"
  },
  {
    id: "g005",
    title: "时间表达：¿Qué hora es? 与 Es la una / Son las dos",
    lesson: "A1.1-L04",
    content: "<p><b>规则：</b>问时间用 ¿Qué hora es?（几点了？）。回答时，只有“一点”用单数 Es la una，其余钟点都用复数 Son las dos / las tres...。分钟表达：y cuarto（一刻，15 分）、y media（半点）、menos cuarto（差一刻）。西班牙日常多用 menos cuarto 说“两点四十五”，而不是 dos cuarenta y cinco。</p><p><b>例句：</b></p><ul><li>—¿Qué hora es? —Es la una y media.<br>——几点了？——一点半。</li><li>Son las tres menos cuarto.<br>两点四十五分（差一刻三点）。</li><li>El vuelo sale a las ocho y cuarto.<br>航班八点一刻起飞。</li><li>Son las diez de la mañana.<br>上午十点。</li></ul><p>常见错误：“一点”误用复数，如 ×Son la una（应为 Es la una）；把 menos cuarto 理解反了：las tres menos cuarto 是两点四十五，不是三点十五。</p>"
  },
  {
    id: "g006",
    title: "hay（haber 无人称形式）表示\"有\"",
    lesson: "A1.1-L05",
    content: "<p><b>规则：</b>hay 是动词 haber 的无人称形式，表示“（某地）有”，相当于英语 there is / there are。<b>hay 永远不变</b>：后面接单数名词是“有一个”，接复数名词还是 hay，不变形。否定直接在前面加 no：no hay（没有）。</p><p><b>例句：</b></p><ul><li>Hay una farmacia cerca.<br>附近有一家药店。</li><li>No hay problema.<br>没问题。（口语高频句）</li><li>Hay dos bancos en esta calle.<br>这条街上有两家银行。（复数也用 hay）</li><li>—¿Hay wifi? —Sí, hay wifi gratis.<br>——有无线网络吗？——有，免费无线网。</li></ul><p>常见错误：把 hay 当普通动词变位，如 ×Han dos bancos（hay 不分单复数，永远是 hay）；或受英语影响说 ×Es un banco cerca（应为 Hay un banco cerca）。</p>"
  },
  {
    id: "g007",
    title: "否定句：动词前直接加 no",
    lesson: "A1.1-L06",
    content: "<p><b>规则：</b>西语否定句很简单：在变位动词<b>前面</b>直接加一个 no 就行。西语没有英语 do/does 那样的助动词，所以不要画蛇添足。一个句子里一般一个 no 就够（no... nada / no... nunca 这类双重否定是合法的，但入门阶段先掌握“动词前加 no”这一条）。</p><p><b>例句：</b></p><ul><li>No hablo inglés.<br>我不会说英语。</li><li>No tengo hermanos.<br>我没有兄弟姐妹。</li><li>Hoy no trabajo.<br>我今天不上班。</li><li>No entiendo.<br>我不明白。</li></ul><p>常见错误：受英语影响造出助动词，如 ×No do hablo inglés（西语没有 do，直接 No hablo inglés）；或把 no 放错位置，如 ×Hablo no inglés（no 必须在变位动词前）。</p>"
  },
  {
    id: "g008",
    title: "疑问句与疑问词 qué/cómo/dónde/cuándo/cuánto",
    lesson: "A1.1-L06",
    content: "<p><b>规则：</b>西语疑问句有两个书写标志：开头一个倒问号 ¿，结尾一个正问号 ?。疑问词作提问时<b>永远带重音符号</b>：qué（什么）、cómo（怎么）、dónde（哪里）、cuándo（什么时候）、cuánto（多少）、quién（谁）、por qué（为什么）。语调疑问句则只把陈述句语调上扬，词序不变；带疑问词的句子里主语常放在动词后面（主谓倒置）。</p><p><b>例句：</b></p><ul><li>¿Cómo te llamas?<br>你叫什么名字？</li><li>¿Dónde está el baño?<br>洗手间在哪里？（主语 el baño 放在动词后）</li><li>¿Cuándo sale el vuelo?<br>航班什么时候起飞？</li><li>¿Hablas español?<br>你说西班牙语吗？（语调疑问，词序不变）</li></ul><p>常见错误：漏写疑问词的重音，如 ×Como te llamas（como 不带重音是“像；我吃”的意思）；漏写开头的倒问号 ¿——西语书写中 ¿ 不可省略。</p>"
  },
  {
    id: "g009",
    title: "形容词的性数配合与位置（一般后置）",
    lesson: "A1.1-L07",
    content: "<p><b>规则：</b>形容词要与所修饰的名词性数一致：以 -o 结尾的形容词有 rojo/roja/rojos/rojas 四种形式。以 -e 或 -ista 结尾的形容词<b>阴阳同形</b>，只变单复数：inteligente/inteligentes，optimista/optimistas。位置方面，西语形容词一般放在名词<b>后面</b>，这与中文、英语相反，是中国学习者最不习惯的一点。</p><p><b>例句：</b></p><ul><li>un coche rojo / una casa roja / coches rojos<br>一辆红色的车 / 一座红色的房子 / 红色的车（复数）</li><li>un chico inteligente / una chica inteligente<br>一个聪明的男孩 / 一个聪明的女孩（-e 结尾不变性）</li><li>Mi piloto es un hombre muy optimista.<br>我的飞行员是个很乐观的人。</li></ul><p>常见错误：形容词不配合，如 ×una casa rojo（应为 roja）；把形容词放名词前，如 ×un rojo coche（一般为 un coche rojo，形容词后置）。</p>"
  },
  {
    id: "g010",
    title: "主有形容词 mi/tu/su/nuestro",
    lesson: "A1.1-L02",
    content: "<p><b>规则：</b>主有形容词（我的、你的……）放在名词前，<b>不与冠词叠用</b>。mi/tu/su 只有单复数变化：mi/mis、tu/tus、su/sus；nuestro（我们的）和 vuestro（你们的）有四种形式：nuestro/nuestra/nuestros/nuestras。注意主有形容词跟“所拥有的事物”性数配合，跟所有者无关：mi casa（casa 是阴性，但 mi 不变）。</p><table><tr><th>人称</th><th>单数</th><th>复数</th></tr><tr><td>我的</td><td>mi</td><td>mis</td></tr><tr><td>你的</td><td>tu</td><td>tus</td></tr><tr><td>他/她/您的</td><td>su</td><td>sus</td></tr><tr><td>我们的</td><td>nuestro / nuestra</td><td>nuestros / nuestras</td></tr><tr><td>你们的</td><td>vuestro / vuestra</td><td>vuestros / vuestras</td></tr><tr><td>他们/您们的</td><td>su</td><td>sus</td></tr></table><p><b>例句：</b></p><ul><li>Mi pasaporte está aquí.<br>我的护照在这儿。</li><li>Nuestra maleta es grande.<br>我们的行李箱很大。</li><li>¿Dónde están tus llaves?<br>你的钥匙在哪里？</li></ul><p>常见错误：与冠词叠用，如 ×el mi pasaporte / ×la mi casa（直接 Mi pasaporte / Mi casa）；nuestro 不配合阴性名词，如 ×nuestro casa（应为 nuestra casa）。</p>"
  },
  {
    id: "g011",
    title: "指示词 este/ese/aquel 及性数",
    lesson: "A1.1-L05",
    content: "<p><b>规则：</b>西语指示形容词有三个距离等级：este（这个，离说话人近）、ese（那个，离听话人近/中距离）、aquel（那个，双方都远）。每个都有性数四种形式。中性代词 esto/eso/aquello 只能单独使用（指抽象事物），不能修饰名词。</p><table><tr><th>距离</th><th>阳性单数</th><th>阴性单数</th><th>阳性复数</th><th>阴性复数</th></tr><tr><td>近（这个）</td><td>este</td><td>esta</td><td>estos</td><td>estas</td></tr><tr><td>中（那个）</td><td>ese</td><td>esa</td><td>esos</td><td>esas</td></tr><tr><td>远（那个）</td><td>aquel</td><td>aquella</td><td>aquellos</td><td>aquellas</td></tr></table><p><b>例句：</b></p><ul><li>Este asiento es el mío.<br>这个座位是我的。</li><li>Esa maleta es muy pesada.<br>那个箱子很重。</li><li>Aquella torre es muy alta.<br>（远处）那座塔很高。</li></ul><p>常见错误：用中性形式修饰名词，如 ×esto asiento（修饰名词要用 este，esto 只能单独用：¿Qué es esto? 这是什么？）；性数不配合，如 ×estas asientos。</p>"
  },
  {
    id: "g012",
    title: "数字 1–100、uno/una 性变化、veintiún 的重音",
    lesson: "A1.1-L06",
    content: "<p><b>规则：</b>1 有 uno/un/una 三种形式：单独数数为 uno，阳性名词前短尾为 un（un libro），阴性名词前为 una（una mesa）。21–29 连写成一个词：veintiuno、veintidós、veintitrés…veintinueve（注意 veintidós、veintitrés、veintiséis 有重音）。21 用于阳性名词前变为 veintiún（带重音）：veintiún años。100 单独用是 cien，后面跟名词也是 cien（cien pasajeros），但 101–199 用 ciento（ciento uno、ciento veinte）。整十：diez, veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa。</p><p><b>例句：</b></p><ul><li>Tengo veintiún años.<br>我二十一岁。</li><li>Hay cien pasajeros en el avión.<br>飞机上有一百名乘客。</li><li>El vuelo cuesta ciento veinte euros.<br>这趟航班票价一百二十欧。</li><li>una mesa para dos<br>一张两人桌</li></ul><p>常见错误：阳性名词前忘短尾加重音，如 ×veintiuno años（应为 veintiún años）；把 ciento 当 100 单独用，如 ×tengo ciento euros（应为 cien euros，ciento 只用于 101 以上）。</p>"
  },
  {
    id: "g013",
    title: "规则动词 -ar 现在时变位（hablar）",
    lesson: "A1.1-L07",
    content: "<p><b>规则：</b>以 -ar 结尾的动词是西语最大的一类。现在时变位方法：去掉词尾 -ar，按人称加 -o, -as, -a, -amos, -áis, -an。规律：yo 以 -o 结尾，tú 加 -s，第三人称与元音词尾一致；nosotros 是 -amos，vosotros 是 -áis（注意 á 上有重音）。</p><table><tr><th>人称</th><th>hablar（说）</th><th>词尾</th></tr><tr><td>yo</td><td>hablo</td><td>-o</td></tr><tr><td>tú</td><td>hablas</td><td>-as</td></tr><tr><td>él / ella / usted</td><td>habla</td><td>-a</td></tr><tr><td>nosotros</td><td>hablamos</td><td>-amos</td></tr><tr><td>vosotros</td><td>habláis</td><td>-áis</td></tr><tr><td>ellos / ustedes</td><td>hablan</td><td>-an</td></tr></table><p><b>例句：</b></p><ul><li>Hablo español un poco.<br>我会说一点西班牙语。</li><li>¿Hablas inglés?<br>你说英语吗？</li><li>Hablamos con el controlador aéreo.<br>我们和空中管制员通话。</li></ul><p>常见错误：vosotros 词尾漏重音，如 ×hablais（应为 habláis）；人称变位错位，如 ×yo hablas（应为 yo hablo）。</p>"
  },
  {
    id: "g014",
    title: "规则动词 -er/-ir 现在时变位（comer/vivir）",
    lesson: "A1.1-L08",
    content: "<p><b>规则：</b>-er 和 -ir 动词的现在时变位几乎一样，<b>只有 nosotros 和 vosotros 两格词尾不同</b>：-er 用 -emos/-éis，-ir 用 -imos/-ís。其余人称共用 -o, -es, -e, -en。记住这个差别，两类动词就一起拿下了。</p><table><tr><th>人称</th><th>comer（吃，-er）</th><th>vivir（住，-ir）</th></tr><tr><td>yo</td><td>como</td><td>vivo</td></tr><tr><td>tú</td><td>comes</td><td>vives</td></tr><tr><td>él / ella / usted</td><td>come</td><td>vive</td></tr><tr><td>nosotros</td><td>comemos</td><td>vivimos</td></tr><tr><td>vosotros</td><td>coméis</td><td>vivís</td></tr><tr><td>ellos / ustedes</td><td>comen</td><td>viven</td></tr></table><p><b>例句：</b></p><ul><li>Hoy como en casa.<br>今天我在家吃饭。</li><li>Vivimos en Madrid.<br>我们住在马德里。</li><li>¿Dónde vivís?<br>你们住在哪里？</li></ul><p>常见错误：混淆 -er/-ir 的 nosotros 词尾，想说“我们吃（现在）”却说成 ×comimos——comimos 是简单过去时“我们吃过了”，现在时是 comemos；-ir 动词误用 -er 词尾：×vivemos（应为 vivimos）。</p>"
  },
  {
    id: "g015",
    title: "主语代词与 tú/vosotros/usted/ustedes 的使用",
    lesson: "A1.1-L08",
    content: "<p><b>规则：</b>人称代词表：yo（我）、tú（你）、él/ella（他/她）、usted（您）、nosotros/nosotras（我们）、vosotros/vosotras（你们）、ellos/ellas（他们/她们）、ustedes（您们/你们）。“你”的礼貌程度：tú 用于熟人和日常，usted 用于正式场合（如机长对乘客、对长辈）——注意 <b>usted 的动词变位用第三人称</b>（usted tiene，不是 usted tienes）。<b>西班牙本土日常“你们”用 vosotros</b>（变位 -áis/-éis/-ís）；拉美不用 vosotros，一律用 ustedes（变位同第三人称复数）。由于变位已体现人称，主语代词常省略：Hablo español.（不说 Yo hablo 也完全自然）。</p><p><b>例句：</b></p><ul><li>¿De dónde sois?<br>你们是哪国人？（西班牙对朋友们，用 vosotros）</li><li>¿Cómo está usted?<br>您好吗？（usted 用第三人称变位 está）</li><li>Ellos son pilotos.<br>他们是飞行员。</li></ul><p>常见错误：在西班牙对朋友说 ×ustedes（那是拉美用法，西班牙日常说 vosotros）；usted 配错变位，如 ×¿Usted tienes pasaporte?（应为 ¿Usted tiene pasaporte?）。</p>"
  },
  {
    id: "g016",
    title: "gustar 型动词：me gusta / me gustan",
    lesson: "A1.1-L08",
    content: "<p><b>规则：</b>gustar 的字面意思是“使……高兴”，所以“我喜欢足球”西语说“足球使我高兴”：Me gusta el fútbol. 结构是：<b>间接宾语代词 me/te/le/nos/os/les + gusta（被喜欢的东西是单数或不定式）/ gustan（复数）</b>。真正的主语是被喜欢的东西，不是“我”，所以动词跟着它变。喜欢做某事：me gusta + 不定式（Me gusta volar. 我喜欢飞行）。</p><table><tr><th>谁喜欢</th><th>单数/不定式</th><th>复数</th></tr><tr><td>我</td><td>me gusta</td><td>me gustan</td></tr><tr><td>你</td><td>te gusta</td><td>te gustan</td></tr><tr><td>他/她/您</td><td>le gusta</td><td>le gustan</td></tr><tr><td>我们</td><td>nos gusta</td><td>nos gustan</td></tr><tr><td>你们</td><td>os gusta</td><td>os gustan</td></tr><tr><td>他们/您们</td><td>les gusta</td><td>les gustan</td></tr></table><p><b>例句：</b></p><ul><li>Me gusta el fútbol.<br>我喜欢足球。</li><li>Me gustan las tapas.<br>我喜欢（西班牙）小吃。（复数用 gustan）</li><li>¿Os gusta volar?<br>你们喜欢飞行吗？</li><li>No me gusta el café.<br>我不喜欢咖啡。</li><li>Me gusta esta canción.<br>我喜欢这首歌。</li></ul><p>常见错误：按中文思路说 ×Yo gusto el fútbol（应为 Me gusta el fútbol）；复数主语忘变 gustan：×Me gusta las tapas（应为 Me gustan las tapas）。</p>"
  },
  {
    id: "g017",
    title: "自反动词入门：llamarse/levantarse/acostarse",
    lesson: "A1.1-L09",
    content: "<p><b>规则：</b>自反动词表示动作落回自己身上，不定式带 -se（llamarse 自称、levantarse 起床、acostarse 睡觉）。变位时，自反代词 <b>me/te/se/nos/os/se 放在变位动词前面</b>，动词照常按人称变位。人称对应：yo→me，tú→te，él/usted→se，nosotros→nos，vosotros→os，ellos/ustedes→se。</p><table><tr><th>人称</th><th>llamarse（名叫）</th><th>levantarse（起床）</th></tr><tr><td>yo</td><td>me llamo</td><td>me levanto</td></tr><tr><td>tú</td><td>te llamas</td><td>te levantas</td></tr><tr><td>él / usted</td><td>se llama</td><td>se levanta</td></tr><tr><td>nosotros</td><td>nos llamamos</td><td>nos levantamos</td></tr><tr><td>vosotros</td><td>os llamáis</td><td>os levantáis</td></tr><tr><td>ellos / ustedes</td><td>se llaman</td><td>se levantan</td></tr></table><p><b>例句：</b></p><ul><li>Me llamo Carlos.<br>我叫卡洛斯。</li><li>Me levanto a las siete.<br>我七点起床。</li><li>Nos acostamos tarde.<br>我们很晚睡。</li></ul><p>常见错误：自反代词放错位置，如 ×Llamo me Carlos（应为 Me llamo Carlos，代词在变位动词前）；漏掉代词，如 ×Yo levanto a las siete（应为 Me levanto）。</p>"
  },
  {
    id: "g018",
    title: "tener que + 不定式\"必须\"；hay que",
    lesson: "A1.1-L10",
    content: "<p><b>规则：</b>tener que + 不定式表示“必须做某事”，相当于英语 have to。tener 是不规则动词（词干 e→ie，yo 还是 tengo）：tengo, tienes, tiene, tenemos, tenéis, tienen。hay que + 不定式是无人称表达，表示“（大家/按规定）得做某事”，不指明是谁。注意：tener que 后面直接接不定式，<b>不加 a</b>（这和 ir a 不同）。</p><p><b>例句：</b></p><ul><li>Tengo que trabajar mañana.<br>我明天必须工作。</li><li>Tenemos que llegar al aeropuerto a las seis.<br>我们必须六点到机场。</li><li>Hay que facturar la maleta.<br>得托运这件行李。（无人称，谁都得办）</li></ul><p>常见错误：在 que 后多加 a，如 ×Tengo que a trabajar（应为 Tengo que trabajar）；tener 变位忘变词干，如 ×yo teno（应为 tengo）。</p>"
  },
  {
    id: "g019",
    title: "ir a + 不定式：近将来时",
    lesson: "A1.1-L10",
    content: "<p><b>规则：</b>ir a + 不定式表示“打算/即将做某事”，相当于英语 be going to，是口语中最常用的将来表达。ir 的现在时完全不规则：voy, vas, va, vamos, vais, van。结构里的 a <b>不可省略</b>。</p><table><tr><th>人称</th><th>ir（去）</th></tr><tr><td>yo</td><td>voy</td></tr><tr><td>tú</td><td>vas</td></tr><tr><td>él / ella / usted</td><td>va</td></tr><tr><td>nosotros</td><td>vamos</td></tr><tr><td>vosotros</td><td>vais</td></tr><tr><td>ellos / ustedes</td><td>van</td></tr></table><p><b>例句：</b></p><ul><li>Voy a viajar a España.<br>我打算去西班牙旅行。</li><li>Vamos a despegar a las nueve.<br>我们九点起飞。</li><li>¿Vas a comer con nosotros?<br>你要和我们一起吃饭吗？</li></ul><p>常见错误：漏掉 a，如 ×Voy viajar a España（应为 Voy a viajar）；把 ir 当规则动词变位，如 ×yo iso / ×yo iro（应为 voy）。</p>"
  },
  {
    id: "g020",
    title: "estar + 副动词（gerundio）：现在进行时",
    lesson: "A1.1-L11",
    content: "<p><b>规则：</b>estar + 副动词（gerundio）表示“正在做某事”，相当于英语 be doing。副动词构成：-ar 动词换 -ando（hablar→hablando），-er/-ir 动词换 -iendo（comer→comiendo, vivir→viviendo）。estar 现在时：estoy, estás, está, estamos, estáis, están。这里必须用 estar，不能用 ser。</p><table><tr><th>人称</th><th>estar</th></tr><tr><td>yo</td><td>estoy</td></tr><tr><td>tú</td><td>estás</td></tr><tr><td>él / ella / usted</td><td>está</td></tr><tr><td>nosotros</td><td>estamos</td></tr><tr><td>vosotros</td><td>estáis</td></tr><tr><td>ellos / ustedes</td><td>están</td></tr></table><p><b>例句：</b></p><ul><li>Estoy trabajando ahora.<br>我现在正在工作。</li><li>¿Qué estás haciendo?<br>你在做什么？</li><li>Estamos esperando el vuelo.<br>我们正在等航班。</li></ul><p>常见错误：用 ser 代替 estar，如 ×Soy trabajando（应为 Estoy trabajando）；副动词词形错误，如 ×comendo / ×habiando（应为 comiendo / hablando）。</p>"
  },
  {
    id: "g021",
    title: "ser vs estar 入门：永久属性 vs 状态位置",
    lesson: "A1.1-L12",
    content: "<p><b>规则：</b>西语有两个“是”。入门口诀：<b>ser 管“是什么”（身份、职业、国籍、固有属性），estar 管“怎么样/在哪里”（临时状态、情绪、位置）</b>。同一个人，职业用 ser（Soy piloto），累了用 estar（Estoy cansado）；说某物在哪里，永远用 estar（El hotel está en Madrid），位置与“永久”无关。</p><p><b>例句：</b></p><ul><li>Soy piloto.<br>我是飞行员。（身份，用 ser）</li><li>Estoy cansado.<br>我累了。（状态，用 estar）</li><li>El hotel está en Madrid.<br>酒店在马德里。（位置，用 estar）</li><li>Ella es simpática, pero hoy está enfadada.<br>她人很随和，但今天生气了。（性格 ser / 此刻状态 estar）</li></ul><p>常见错误：位置用 ser，如 ×El hotel es en Madrid（应为 está）；状态用 ser，如 ×Soy cansado（应为 Estoy cansado——Soy cansado 字面上变成“我是个令人厌烦的东西”一类的误解，要注意区分）。</p>"
  },
  {
    id: "g022",
    title: "acabar de + 不定式：刚做完",
    lesson: "A1.2-L09",
    content: "<p><b>规则：</b>acabar de + 不定式表示“刚刚做完某事”，相当于英语 have just done。acabar 是规则 -ar 动词：acabo, acabas, acaba, acabamos, acabáis, acaban。注意 <b>de 不可省略</b>，acabar 单独使用（不带 de）是“结束”的意思。</p><p><b>例句：</b></p><ul><li>Acabo de llegar al hotel.<br>我刚到酒店。</li><li>Acabamos de comer.<br>我们刚吃完饭。</li><li>El avión acaba de aterrizar.<br>飞机刚降落。</li></ul><p>常见错误：漏掉 de，如 ×Acabo llegar（应为 Acabo de llegar）；把 acabar de 译成“结束做”——acabar de + 不定式只表示“刚做完”，“结束”是 acabar + 名词或 acabar por。</p>"
  },
  {
    id: "g023",
    title: "复合过去时 pretérito perfecto：he comido",
    lesson: "A1.2-L09",
    content: "<p><b>规则：</b>pretérito perfecto = haber 的现在时 + 过去分词。haber：he, has, ha, hemos, habéis, han。过去分词规则变化：-ar→-ado（hablado），-er/-ir→-ido（comido, vivido）。常见不规则分词要背：hacer→hecho, decir→dicho, poner→puesto, ver→visto, ir→ido, ser→sido。<b>重点：在西班牙本土口语中，“今天、这周、今年”等未完结时间段内发生的过去动作，几乎一律用 pretérito perfecto（Hoy he desayunado），这个用法比拉美多得多——拉美多用简单过去时。学西班牙西语，这个时态是日常对话的主力过去时，务必练熟。</b></p><table><tr><th>人称</th><th>haber + comido（吃了）</th></tr><tr><td>yo</td><td>he comido</td></tr><tr><td>tú</td><td>has comido</td></tr><tr><td>él / ella / usted</td><td>ha comido</td></tr><tr><td>nosotros</td><td>hemos comido</td></tr><tr><td>vosotros</td><td>habéis comido</td></tr><tr><td>ellos / ustedes</td><td>han comido</td></tr></table><p><b>例句：</b></p><ul><li>Hoy he desayunado en el hotel.<br>今天我在酒店吃了早饭。</li><li>¿Has estado en España?<br>你去过西班牙吗？</li><li>Esta semana hemos volado mucho.<br>这周我们飞了很多。</li><li>He visto la torre.<br>我见过那座塔。（visto 是 ver 的不规则分词）</li></ul><p>常见错误：把否定词插进 haber 和分词之间，如 ×He no comido（应为 No he comido，两者不可分开）；分词配合性数，如 ×He comida（过去分词在 perfecto 中永远以 -o 结尾，不变：He comido）。</p>"
  },
  {
    id: "g024",
    title: "简单过去时 pretérito indefinido 入门（规则动词 + ir/ser 不规则 fui）",
    lesson: "A1.2-L09",
    content: "<p><b>规则：</b>indefinido 表示在<b>已完结的过去时间</b>发生的动作（ayer 昨天、el año pasado 去年）。规则词尾：-ar 动词 -é, -aste, -ó, -amos, -asteis, -aron；-er/-ir 动词 -í, -iste, -ió, -imos, -isteis, -ieron。最常用的不规则：ir（去）和 ser（是）过去时<b>同形</b>：fui, fuiste, fue, fuimos, fuisteis, fueron，靠上下文区分。与 g023 的分工一句话：今天/这周等没过完的时间用 he comido；去年、昨天等已结束的时间用 comí / fui。</p><table><tr><th>人称</th><th>hablar（-ar）</th><th>comer（-er）</th><th>ir / ser</th></tr><tr><td>yo</td><td>hablé</td><td>comí</td><td>fui</td></tr><tr><td>tú</td><td>hablaste</td><td>comiste</td><td>fuiste</td></tr><tr><td>él / usted</td><td>habló</td><td>comió</td><td>fue</td></tr><tr><td>nosotros</td><td>hablamos</td><td>comimos</td><td>fuimos</td></tr><tr><td>vosotros</td><td>hablasteis</td><td>comisteis</td><td>fuisteis</td></tr><tr><td>ellos / ustedes</td><td>hablaron</td><td>comieron</td><td>fueron</td></tr></table><p><b>例句：</b></p><ul><li>El año pasado fui a Sevilla.<br>去年我去了塞维利亚。</li><li>Ayer hablé con el capitán.<br>昨天我和机长谈了话。</li><li>Comimos en un restaurante el sábado.<br>我们周六在一家餐馆吃了饭。</li></ul><p>常见错误：人称词尾重音错位，如 ×yo hablo 当过去时（habló 是“他说了”，重音在尾；yo 的过去时是 hablé）；不知道 ir 和 ser 过去时同为 fui，看到 Fue piloto 误译为“他去了飞行员”（此处 fue 是 ser：他当过飞行员）。</p>"
  },
  {
    id: "g025",
    title: "muy 与 mucho 的区别",
    lesson: "A1.1-L07",
    content: "<p><b>规则：</b>muy = “很、非常”，只修饰形容词或副词，<b>永远不变形</b>：muy bueno（很好）、muy rápido（很快）。mucho = “很多”，修饰名词或动词：修饰名词时是形容词，要<b>性数配合</b>（mucho trabajo 很多工作 / mucha gente 很多人 / muchos coches / muchas gracias）；修饰动词时是副词，不变形（trabaja mucho 他工作很多）。口诀：muy 配好坏，mucho 配多少。</p><p><b>例句：</b></p><ul><li>El avión es muy grande.<br>飞机很大。（muy + 形容词）</li><li>Hay mucho trabajo hoy.<br>今天工作很多。（mucho + 阳性名词）</li><li>Hay mucha gente en el aeropuerto.<br>机场人很多。（gente 阴性 → mucha）</li><li>Él trabaja mucho.<br>他工作很多。（修饰动词，不变形）</li></ul><p>常见错误：×muy gente（修饰名词要用 mucho，且 gente 阴性：mucha gente）；×mucho bueno（修饰形容词要用 muy：muy bueno）；mucho 修饰名词时忘配合：×mucho gracias（应为 muchas gracias，gracias 是阴性复数）。</p>"
  }
];
