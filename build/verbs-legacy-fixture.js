// ESbrain 动词变位速查（20 个）
module.exports = [
  {
    inf: "ser", group: "irregular",
    note: "表示本质、身份、时间等永久性特征",
    presente:   { "yo": "soy", "tú": "eres", "él/ella/usted": "es", "nosotros": "somos", "vosotros": "sois", "ellos/ellas/ustedes": "son" },
    perfecto:   { "yo": "he sido", "tú": "has sido", "él/ella/usted": "ha sido", "nosotros": "hemos sido", "vosotros": "habéis sido", "ellos/ellas/ustedes": "han sido" },
    indefinido: { "yo": "fui", "tú": "fuiste", "él/ella/usted": "fue", "nosotros": "fuimos", "vosotros": "fuisteis", "ellos/ellas/ustedes": "fueron" },
    futuro:     { "yo": "seré", "tú": "serás", "él/ella/usted": "será", "nosotros": "seremos", "vosotros": "seréis", "ellos/ellas/ustedes": "serán" },
    condicional:{ "yo": "sería", "tú": "serías", "él/ella/usted": "sería", "nosotros": "seríamos", "vosotros": "seríais", "ellos/ellas/ustedes": "serían" }
  },
  {
    inf: "estar", group: "irregular",
    note: "表示位置、状态等暂时性特征",
    presente:   { "yo": "estoy", "tú": "estás", "él/ella/usted": "está", "nosotros": "estamos", "vosotros": "estáis", "ellos/ellas/ustedes": "están" },
    perfecto:   { "yo": "he estado", "tú": "has estado", "él/ella/usted": "ha estado", "nosotros": "hemos estado", "vosotros": "habéis estado", "ellos/ellas/ustedes": "han estado" },
    indefinido: { "yo": "estuve", "tú": "estuviste", "él/ella/usted": "estuvo", "nosotros": "estuvimos", "vosotros": "estuvisteis", "ellos/ellas/ustedes": "estuvieron" },
    futuro:     { "yo": "estaré", "tú": "estarás", "él/ella/usted": "estará", "nosotros": "estaremos", "vosotros": "estaréis", "ellos/ellas/ustedes": "estarán" },
    condicional:{ "yo": "estaría", "tú": "estarías", "él/ella/usted": "estaría", "nosotros": "estaríamos", "vosotros": "estaríais", "ellos/ellas/ustedes": "estarían" }
  },
  {
    inf: "tener", group: "irregular",
    note: "表示拥有；tener que + 动词原形 表示“必须做某事”",
    presente:   { "yo": "tengo", "tú": "tienes", "él/ella/usted": "tiene", "nosotros": "tenemos", "vosotros": "tenéis", "ellos/ellas/ustedes": "tienen" },
    perfecto:   { "yo": "he tenido", "tú": "has tenido", "él/ella/usted": "ha tenido", "nosotros": "hemos tenido", "vosotros": "habéis tenido", "ellos/ellas/ustedes": "han tenido" },
    indefinido: { "yo": "tuve", "tú": "tuviste", "él/ella/usted": "tuvo", "nosotros": "tuvimos", "vosotros": "tuvisteis", "ellos/ellas/ustedes": "tuvieron" },
    futuro:     { "yo": "tendré", "tú": "tendrás", "él/ella/usted": "tendrá", "nosotros": "tendremos", "vosotros": "tendréis", "ellos/ellas/ustedes": "tendrán" },
    condicional:{ "yo": "tendría", "tú": "tendrías", "él/ella/usted": "tendría", "nosotros": "tendríamos", "vosotros": "tendríais", "ellos/ellas/ustedes": "tendrían" }
  },
  {
    inf: "haber", group: "irregular",
    note: "主要作复合时态的助动词；hay 是无人称形式，表示“有”",
    presente:   { "yo": "he", "tú": "has", "él/ella/usted": "ha", "nosotros": "hemos", "vosotros": "habéis", "ellos/ellas/ustedes": "han" },
    perfecto:   { "yo": "he habido", "tú": "has habido", "él/ella/usted": "ha habido", "nosotros": "hemos habido", "vosotros": "habéis habido", "ellos/ellas/ustedes": "han habido" },
    indefinido: { "yo": "hube", "tú": "hubiste", "él/ella/usted": "hubo", "nosotros": "hubimos", "vosotros": "hubisteis", "ellos/ellas/ustedes": "hubieron" },
    futuro:     { "yo": "habré", "tú": "habrás", "él/ella/usted": "habrá", "nosotros": "habremos", "vosotros": "habréis", "ellos/ellas/ustedes": "habrán" },
    condicional:{ "yo": "habría", "tú": "habrías", "él/ella/usted": "habría", "nosotros": "habríamos", "vosotros": "habríais", "ellos/ellas/ustedes": "habrían" }
  },
  {
    inf: "ir", group: "irregular",
    note: "indefinido 与 ser 同形；ir a + 动词原形 表示“将要做某事”",
    presente:   { "yo": "voy", "tú": "vas", "él/ella/usted": "va", "nosotros": "vamos", "vosotros": "vais", "ellos/ellas/ustedes": "van" },
    perfecto:   { "yo": "he ido", "tú": "has ido", "él/ella/usted": "ha ido", "nosotros": "hemos ido", "vosotros": "habéis ido", "ellos/ellas/ustedes": "han ido" },
    indefinido: { "yo": "fui", "tú": "fuiste", "él/ella/usted": "fue", "nosotros": "fuimos", "vosotros": "fuisteis", "ellos/ellas/ustedes": "fueron" },
    futuro:     { "yo": "iré", "tú": "irás", "él/ella/usted": "irá", "nosotros": "iremos", "vosotros": "iréis", "ellos/ellas/ustedes": "irán" },
    condicional:{ "yo": "iría", "tú": "irías", "él/ella/usted": "iría", "nosotros": "iríamos", "vosotros": "iríais", "ellos/ellas/ustedes": "irían" }
  },
  {
    inf: "hacer", group: "irregular",
    note: "表示“做”；也可用于天气表达，如 hace frío",
    presente:   { "yo": "hago", "tú": "haces", "él/ella/usted": "hace", "nosotros": "hacemos", "vosotros": "hacéis", "ellos/ellas/ustedes": "hacen" },
    perfecto:   { "yo": "he hecho", "tú": "has hecho", "él/ella/usted": "ha hecho", "nosotros": "hemos hecho", "vosotros": "habéis hecho", "ellos/ellas/ustedes": "han hecho" },
    indefinido: { "yo": "hice", "tú": "hiciste", "él/ella/usted": "hizo", "nosotros": "hicimos", "vosotros": "hicisteis", "ellos/ellas/ustedes": "hicieron" },
    futuro:     { "yo": "haré", "tú": "harás", "él/ella/usted": "hará", "nosotros": "haremos", "vosotros": "haréis", "ellos/ellas/ustedes": "harán" },
    condicional:{ "yo": "haría", "tú": "harías", "él/ella/usted": "haría", "nosotros": "haríamos", "vosotros": "haríais", "ellos/ellas/ustedes": "harían" }
  },
  {
    inf: "poder", group: "irregular",
    note: "表示“能够”；o→ue 词干变化",
    presente:   { "yo": "puedo", "tú": "puedes", "él/ella/usted": "puede", "nosotros": "podemos", "vosotros": "podéis", "ellos/ellas/ustedes": "pueden" },
    perfecto:   { "yo": "he podido", "tú": "has podido", "él/ella/usted": "ha podido", "nosotros": "hemos podido", "vosotros": "habéis podido", "ellos/ellas/ustedes": "han podido" },
    indefinido: { "yo": "pude", "tú": "pudiste", "él/ella/usted": "pudo", "nosotros": "pudimos", "vosotros": "pudisteis", "ellos/ellas/ustedes": "pudieron" },
    futuro:     { "yo": "podré", "tú": "podrás", "él/ella/usted": "podrá", "nosotros": "podremos", "vosotros": "podréis", "ellos/ellas/ustedes": "podrán" },
    condicional:{ "yo": "podría", "tú": "podrías", "él/ella/usted": "podría", "nosotros": "podríamos", "vosotros": "podríais", "ellos/ellas/ustedes": "podrían" }
  },
  {
    inf: "querer", group: "irregular",
    note: "表示“想要”；e→ie 词干变化",
    presente:   { "yo": "quiero", "tú": "quieres", "él/ella/usted": "quiere", "nosotros": "queremos", "vosotros": "queréis", "ellos/ellas/ustedes": "quieren" },
    perfecto:   { "yo": "he querido", "tú": "has querido", "él/ella/usted": "ha querido", "nosotros": "hemos querido", "vosotros": "habéis querido", "ellos/ellas/ustedes": "han querido" },
    indefinido: { "yo": "quise", "tú": "quisiste", "él/ella/usted": "quiso", "nosotros": "quisimos", "vosotros": "quisisteis", "ellos/ellas/ustedes": "quisieron" },
    futuro:     { "yo": "querré", "tú": "querrás", "él/ella/usted": "querrá", "nosotros": "querremos", "vosotros": "querréis", "ellos/ellas/ustedes": "querrán" },
    condicional:{ "yo": "querría", "tú": "querrías", "él/ella/usted": "querría", "nosotros": "querríamos", "vosotros": "querríais", "ellos/ellas/ustedes": "querrían" }
  },
  {
    inf: "decir", group: "irregular",
    note: "表示“说”；过去分词 dicho 不规则",
    presente:   { "yo": "digo", "tú": "dices", "él/ella/usted": "dice", "nosotros": "decimos", "vosotros": "decís", "ellos/ellas/ustedes": "dicen" },
    perfecto:   { "yo": "he dicho", "tú": "has dicho", "él/ella/usted": "ha dicho", "nosotros": "hemos dicho", "vosotros": "habéis dicho", "ellos/ellas/ustedes": "han dicho" },
    indefinido: { "yo": "dije", "tú": "dijiste", "él/ella/usted": "dijo", "nosotros": "dijimos", "vosotros": "dijisteis", "ellos/ellas/ustedes": "dijeron" },
    futuro:     { "yo": "diré", "tú": "dirás", "él/ella/usted": "dirá", "nosotros": "diremos", "vosotros": "diréis", "ellos/ellas/ustedes": "dirán" },
    condicional:{ "yo": "diría", "tú": "dirías", "él/ella/usted": "diría", "nosotros": "diríamos", "vosotros": "diríais", "ellos/ellas/ustedes": "dirían" }
  },
  {
    inf: "venir", group: "irregular",
    note: "表示“来”；与 tener 变化类似",
    presente:   { "yo": "vengo", "tú": "vienes", "él/ella/usted": "viene", "nosotros": "venimos", "vosotros": "venís", "ellos/ellas/ustedes": "vienen" },
    perfecto:   { "yo": "he venido", "tú": "has venido", "él/ella/usted": "ha venido", "nosotros": "hemos venido", "vosotros": "habéis venido", "ellos/ellas/ustedes": "han venido" },
    indefinido: { "yo": "vine", "tú": "viniste", "él/ella/usted": "vino", "nosotros": "vinimos", "vosotros": "vinisteis", "ellos/ellas/ustedes": "vinieron" },
    futuro:     { "yo": "vendré", "tú": "vendrás", "él/ella/usted": "vendrá", "nosotros": "vendremos", "vosotros": "vendréis", "ellos/ellas/ustedes": "vendrán" },
    condicional:{ "yo": "vendría", "tú": "vendrías", "él/ella/usted": "vendría", "nosotros": "vendríamos", "vosotros": "vendríais", "ellos/ellas/ustedes": "vendrían" }
  },
  {
    inf: "poner", group: "irregular",
    note: "表示“放”；过去分词 puesto 不规则",
    presente:   { "yo": "pongo", "tú": "pones", "él/ella/usted": "pone", "nosotros": "ponemos", "vosotros": "ponéis", "ellos/ellas/ustedes": "ponen" },
    perfecto:   { "yo": "he puesto", "tú": "has puesto", "él/ella/usted": "ha puesto", "nosotros": "hemos puesto", "vosotros": "habéis puesto", "ellos/ellas/ustedes": "han puesto" },
    indefinido: { "yo": "puse", "tú": "pusiste", "él/ella/usted": "puso", "nosotros": "pusimos", "vosotros": "pusisteis", "ellos/ellas/ustedes": "pusieron" },
    futuro:     { "yo": "pondré", "tú": "pondrás", "él/ella/usted": "pondrá", "nosotros": "pondremos", "vosotros": "pondréis", "ellos/ellas/ustedes": "pondrán" },
    condicional:{ "yo": "pondría", "tú": "pondrías", "él/ella/usted": "pondría", "nosotros": "pondríamos", "vosotros": "pondríais", "ellos/ellas/ustedes": "pondrían" }
  },
  {
    inf: "dar", group: "irregular",
    note: "indefinido 按 -er 动词词尾变化（di/diste/dio/dimos/disteis/dieron）",
    presente:   { "yo": "doy", "tú": "das", "él/ella/usted": "da", "nosotros": "damos", "vosotros": "dais", "ellos/ellas/ustedes": "dan" },
    perfecto:   { "yo": "he dado", "tú": "has dado", "él/ella/usted": "ha dado", "nosotros": "hemos dado", "vosotros": "habéis dado", "ellos/ellas/ustedes": "han dado" },
    indefinido: { "yo": "di", "tú": "diste", "él/ella/usted": "dio", "nosotros": "dimos", "vosotros": "disteis", "ellos/ellas/ustedes": "dieron" },
    futuro:     { "yo": "daré", "tú": "darás", "él/ella/usted": "dará", "nosotros": "daremos", "vosotros": "daréis", "ellos/ellas/ustedes": "darán" },
    condicional:{ "yo": "daría", "tú": "darías", "él/ella/usted": "daría", "nosotros": "daríamos", "vosotros": "daríais", "ellos/ellas/ustedes": "darían" }
  },
  {
    inf: "ver", group: "irregular",
    note: "indefinido 全部不带重音符号：vi/viste/vio/vimos/visteis/vieron",
    presente:   { "yo": "veo", "tú": "ves", "él/ella/usted": "ve", "nosotros": "vemos", "vosotros": "veis", "ellos/ellas/ustedes": "ven" },
    perfecto:   { "yo": "he visto", "tú": "has visto", "él/ella/usted": "ha visto", "nosotros": "hemos visto", "vosotros": "habéis visto", "ellos/ellas/ustedes": "han visto" },
    indefinido: { "yo": "vi", "tú": "viste", "él/ella/usted": "vio", "nosotros": "vimos", "vosotros": "visteis", "ellos/ellas/ustedes": "vieron" },
    futuro:     { "yo": "veré", "tú": "verás", "él/ella/usted": "verá", "nosotros": "veremos", "vosotros": "veréis", "ellos/ellas/ustedes": "verán" },
    condicional:{ "yo": "vería", "tú": "verías", "él/ella/usted": "vería", "nosotros": "veríamos", "vosotros": "veríais", "ellos/ellas/ustedes": "verían" }
  },
  {
    inf: "saber", group: "irregular",
    note: "表示“知道（事实）/ 会（技能）”；yo 现在时 sé 带重音",
    presente:   { "yo": "sé", "tú": "sabes", "él/ella/usted": "sabe", "nosotros": "sabemos", "vosotros": "sabéis", "ellos/ellas/ustedes": "saben" },
    perfecto:   { "yo": "he sabido", "tú": "has sabido", "él/ella/usted": "ha sabido", "nosotros": "hemos sabido", "vosotros": "habéis sabido", "ellos/ellas/ustedes": "han sabido" },
    indefinido: { "yo": "supe", "tú": "supiste", "él/ella/usted": "supo", "nosotros": "supimos", "vosotros": "supisteis", "ellos/ellas/ustedes": "supieron" },
    futuro:     { "yo": "sabré", "tú": "sabrás", "él/ella/usted": "sabrá", "nosotros": "sabremos", "vosotros": "sabréis", "ellos/ellas/ustedes": "sabrán" },
    condicional:{ "yo": "sabría", "tú": "sabrías", "él/ella/usted": "sabría", "nosotros": "sabríamos", "vosotros": "sabríais", "ellos/ellas/ustedes": "sabrían" }
  },
  {
    inf: "gustar", group: "-ar",
    note: "常用 me gusta / me gustan 结构，主语是让人喜欢的事物",
    presente:   { "yo": "gusto", "tú": "gustas", "él/ella/usted": "gusta", "nosotros": "gustamos", "vosotros": "gustáis", "ellos/ellas/ustedes": "gustan" },
    perfecto:   { "yo": "he gustado", "tú": "has gustado", "él/ella/usted": "ha gustado", "nosotros": "hemos gustado", "vosotros": "habéis gustado", "ellos/ellas/ustedes": "han gustado" },
    indefinido: { "yo": "gusté", "tú": "gustaste", "él/ella/usted": "gustó", "nosotros": "gustamos", "vosotros": "gustasteis", "ellos/ellas/ustedes": "gustaron" },
    futuro:     { "yo": "gustaré", "tú": "gustarás", "él/ella/usted": "gustará", "nosotros": "gustaremos", "vosotros": "gustaréis", "ellos/ellas/ustedes": "gustarán" },
    condicional:{ "yo": "gustaría", "tú": "gustarías", "él/ella/usted": "gustaría", "nosotros": "gustaríamos", "vosotros": "gustaríais", "ellos/ellas/ustedes": "gustarían" }
  },
  {
    inf: "hablar", group: "-ar",
    note: "规则 -ar 动词，表示“说话”",
    presente:   { "yo": "hablo", "tú": "hablas", "él/ella/usted": "habla", "nosotros": "hablamos", "vosotros": "habláis", "ellos/ellas/ustedes": "hablan" },
    perfecto:   { "yo": "he hablado", "tú": "has hablado", "él/ella/usted": "ha hablado", "nosotros": "hemos hablado", "vosotros": "habéis hablado", "ellos/ellas/ustedes": "han hablado" },
    indefinido: { "yo": "hablé", "tú": "hablaste", "él/ella/usted": "habló", "nosotros": "hablamos", "vosotros": "hablasteis", "ellos/ellas/ustedes": "hablaron" },
    futuro:     { "yo": "hablaré", "tú": "hablarás", "él/ella/usted": "hablará", "nosotros": "hablaremos", "vosotros": "hablaréis", "ellos/ellas/ustedes": "hablarán" },
    condicional:{ "yo": "hablaría", "tú": "hablarías", "él/ella/usted": "hablaría", "nosotros": "hablaríamos", "vosotros": "hablaríais", "ellos/ellas/ustedes": "hablarían" }
  },
  {
    inf: "comer", group: "-er",
    note: "规则 -er 动词，表示“吃”",
    presente:   { "yo": "como", "tú": "comes", "él/ella/usted": "come", "nosotros": "comemos", "vosotros": "coméis", "ellos/ellas/ustedes": "comen" },
    perfecto:   { "yo": "he comido", "tú": "has comido", "él/ella/usted": "ha comido", "nosotros": "hemos comido", "vosotros": "habéis comido", "ellos/ellas/ustedes": "han comido" },
    indefinido: { "yo": "comí", "tú": "comiste", "él/ella/usted": "comió", "nosotros": "comimos", "vosotros": "comisteis", "ellos/ellas/ustedes": "comieron" },
    futuro:     { "yo": "comeré", "tú": "comerás", "él/ella/usted": "comerá", "nosotros": "comeremos", "vosotros": "comeréis", "ellos/ellas/ustedes": "comerán" },
    condicional:{ "yo": "comería", "tú": "comerías", "él/ella/usted": "comería", "nosotros": "comeríamos", "vosotros": "comeríais", "ellos/ellas/ustedes": "comerían" }
  },
  {
    inf: "vivir", group: "-ir",
    note: "规则 -ir 动词，表示“居住、生活”",
    presente:   { "yo": "vivo", "tú": "vives", "él/ella/usted": "vive", "nosotros": "vivimos", "vosotros": "vivís", "ellos/ellas/ustedes": "viven" },
    perfecto:   { "yo": "he vivido", "tú": "has vivido", "él/ella/usted": "ha vivido", "nosotros": "hemos vivido", "vosotros": "habéis vivido", "ellos/ellas/ustedes": "han vivido" },
    indefinido: { "yo": "viví", "tú": "viviste", "él/ella/usted": "vivió", "nosotros": "vivimos", "vosotros": "vivisteis", "ellos/ellas/ustedes": "vivieron" },
    futuro:     { "yo": "viviré", "tú": "vivirás", "él/ella/usted": "vivirá", "nosotros": "viviremos", "vosotros": "viviréis", "ellos/ellas/ustedes": "vivirán" },
    condicional:{ "yo": "viviría", "tú": "vivirías", "él/ella/usted": "viviría", "nosotros": "viviríamos", "vosotros": "viviríais", "ellos/ellas/ustedes": "vivirían" }
  },
  {
    inf: "llamarse", group: "-ar",
    note: "自反动词，表示“名叫”；所有人称需带自反代词 me/te/se/nos/os/se",
    presente:   { "yo": "me llamo", "tú": "te llamas", "él/ella/usted": "se llama", "nosotros": "nos llamamos", "vosotros": "os llamáis", "ellos/ellas/ustedes": "se llaman" },
    perfecto:   { "yo": "me he llamado", "tú": "te has llamado", "él/ella/usted": "se ha llamado", "nosotros": "nos hemos llamado", "vosotros": "os habéis llamado", "ellos/ellas/ustedes": "se han llamado" },
    indefinido: { "yo": "me llamé", "tú": "te llamaste", "él/ella/usted": "se llamó", "nosotros": "nos llamamos", "vosotros": "os llamasteis", "ellos/ellas/ustedes": "se llamaron" },
    futuro:     { "yo": "me llamaré", "tú": "te llamarás", "él/ella/usted": "se llamará", "nosotros": "nos llamaremos", "vosotros": "os llamaréis", "ellos/ellas/ustedes": "se llamarán" },
    condicional:{ "yo": "me llamaría", "tú": "te llamarías", "él/ella/usted": "se llamaría", "nosotros": "nos llamaríamos", "vosotros": "os llamaríais", "ellos/ellas/ustedes": "se llamarían" }
  },
  {
    inf: "levantarse", group: "-ar",
    note: "自反动词，表示“起床、起身”；所有人称需带自反代词 me/te/se/nos/os/se",
    presente:   { "yo": "me levanto", "tú": "te levantas", "él/ella/usted": "se levanta", "nosotros": "nos levantamos", "vosotros": "os levantáis", "ellos/ellas/ustedes": "se levantan" },
    perfecto:   { "yo": "me he levantado", "tú": "te has levantado", "él/ella/usted": "se ha levantado", "nosotros": "nos hemos levantado", "vosotros": "os habéis levantado", "ellos/ellas/ustedes": "se han levantado" },
    indefinido: { "yo": "me levanté", "tú": "te levantaste", "él/ella/usted": "se levantó", "nosotros": "nos levantamos", "vosotros": "os levantasteis", "ellos/ellas/ustedes": "se levantaron" },
    futuro:     { "yo": "me levantaré", "tú": "te levantarás", "él/ella/usted": "se levantará", "nosotros": "nos levantaremos", "vosotros": "os levantaréis", "ellos/ellas/ustedes": "se levantarán" },
    condicional:{ "yo": "me levantaría", "tú": "te levantarías", "él/ella/usted": "se levantaría", "nosotros": "nos levantaríamos", "vosotros": "os levantaríais", "ellos/ellas/ustedes": "se levantarían" }
  }
];
