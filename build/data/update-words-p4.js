const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'words-p4.js');

const src = fs.readFileSync(filePath, 'utf8');
const data = new Function('return (() => { ' + src + '; return { WORDS_P4A, WORDS_P4B, WORDS_A2_EXTRA }; })()')();

// ---------- helper: format a word entry to a single line ----------
const FIELD_ORDER = ['id','word','pos','gender','article','conj_group','ipa','zh','example','example_zh','lesson','stress','extra'];
function formatEntry(e) {
  const parts = [];
  for (const k of FIELD_ORDER) {
    if (!(k in e)) continue;
    const v = e[k];
    if (typeof v === 'string') {
      const q = v.includes("'") && !v.includes('"') ? '"' : "'";
      parts.push(`${k}: ${q}${v}${q}`);
    } else if (typeof v === 'boolean' || typeof v === 'number') {
      parts.push(`${k}: ${v}`);
    }
  }
  return '{ ' + parts.join(', ') + ' }';
}

function formatArray(name, arr, comment) {
  let s = '';
  if (comment) s += '\n' + comment + '\n';
  s += `const ${name} = [\n`;
  for (const e of arr) s += formatEntry(e) + ',\n';
  s += '];\n';
  return s;
}

// ---------- 1. WORDS_B1_EXTRA: 24 lessons × 5 words, ids w2501-w2620 ----------
const b1ExtraByLesson = {
  "B1.1-L01": [
    { word: "anhelo", pos: "n", gender: "m", article: "el", ipa: "/aˈŋelo/", zh: "渴望", example: "Mi anhelo es que encuentres la felicidad.", example_zh: "我渴望你能找到幸福。", stress: 2 },
    { word: "aspirar", pos: "v", conj_group: 1, ipa: "/aspiˈɾaɾ/", zh: "渴望；吸气", example: "Aspiro a que todo salga bien.", example_zh: "我盼望一切顺利。", stress: 2 },
    { word: "lamentar", pos: "v", conj_group: 1, ipa: "/lamenˈtaɾ/", zh: "遗憾", example: "Lamento que no puedas acompañarnos.", example_zh: "很遗憾你不能陪我们。", stress: 2 },
    { word: "exigente", pos: "adj", ipa: "/eksiˈxente/", zh: "苛求的", example: "Es un jefe exigente pero justo.", example_zh: "他是个苛刻但公正的老板。", stress: 2 },
    { word: "voluntad", pos: "n", gender: "f", article: "la", ipa: "/bolunˈtað/", zh: "意愿；意志", example: "Es importante que tengas voluntad de aprender.", example_zh: "重要的是你有学习的意愿。", stress: 2 },
  ],
  "B1.1-L02": [
    { word: "inexistente", pos: "adj", ipa: "/ineksisˈtente/", zh: "不存在的", example: "No acepto una excusa inexistente.", example_zh: "我不接受一个不存在的借口。", stress: 2 },
    { word: "idóneo", pos: "adj", ipa: "/iˈðoneo/", zh: "合适的", example: "Busco un candidato idóneo para el puesto.", example_zh: "我在找一个合适的职位候选人。", stress: 2 },
    { word: "disponible", pos: "adj", ipa: "/disponiˈβle/", zh: "可用的；有空的", example: "Necesito una habitación que esté disponible.", example_zh: "我需要一间可用的房间。", stress: 2 },
    { word: "adecuado", pos: "adj", ipa: "/aðeˈkwaðo/", zh: "适当的", example: "Busco una solución adecuada al problema.", example_zh: "我在找一个适合问题的解决方案。", stress: 2 },
    { word: "inadecuado", pos: "adj", ipa: "/inaðeˈkwaðo/", zh: "不适当的", example: "Este comentario es inadecuado.", example_zh: "这条评论不合适。", stress: 2 },
  ],
  "B1.1-L03": [
    { word: "posteriormente", pos: "adv", ipa: "/posteɾjoɾˈmente/", zh: "随后", example: "Posteriormente, te enviaré los detalles.", example_zh: "稍后我会把详情发给你。", stress: 2 },
    { word: "inmediatamente", pos: "adv", ipa: "/inmeðjataˈmente/", zh: "立即", example: "Te llamaré inmediatamente después de llegar.", example_zh: "我到了之后马上给你打电话。", stress: 2 },
    { word: "breve", pos: "adj", ipa: "/ˈbɾeβe/", zh: "短暂的", example: "La espera será breve.", example_zh: "等待会很短。", stress: 2 },
    { word: "plazo", pos: "n", gender: "m", article: "el", ipa: "/ˈplaθo/", zh: "期限", example: "El plazo vence cuando termine el mes.", example_zh: "期限在月底到期。", stress: 2 },
    { word: "prontitud", pos: "n", gender: "f", article: "la", ipa: "/pɾontiˈtuð/", zh: "迅速", example: "Agradezco tu prontitud en responder.", example_zh: "感谢你迅速回复。", stress: 2 },
  ],
  "B1.1-L04": [
    { word: "propósito", pos: "n", gender: "m", article: "el", ipa: "/pɾoˈposito/", zh: "意图", example: "Mi propósito es que entiendas la lección.", example_zh: "我的意图是让你理解这一课。", stress: 2 },
    { word: "aun", pos: "adv", ipa: "/ˈaun/", zh: "甚至", example: "Aun en caso de lluvia, saldremos.", example_zh: "即使下雨，我们也要出去。", stress: 2 },
    { word: "pese a que", pos: "conj", ipa: "/ˈpese a ke/", zh: "尽管", example: "Pese a que esté cansado, trabajará.", example_zh: "尽管很累，他还是会工作。" },
    { word: "impedimento", pos: "n", gender: "m", article: "el", ipa: "/impeðiˈmento/", zh: "障碍", example: "No hay impedimento que nos detenga.", example_zh: "没有能阻止我们的障碍。", stress: 2 },
    { word: "obtener", pos: "v", conj_group: 2, ipa: "/obteˈneɾ/", zh: "获得", example: "Trabajo duro para obtener buenos resultados.", example_zh: "我努力工作以取得好结果。", stress: 2 },
  ],
  "B1.1-L05": [
    { word: "cortés", pos: "adj", ipa: "/koɾˈtes/", zh: "有礼貌的", example: "Sería más cortés si lo pidiera de otra forma.", example_zh: "如果换一种方式请求会更有礼貌。", stress: 2 },
    { word: "atención", pos: "n", gender: "f", article: "la", ipa: "/atenˈθjon/", zh: "注意；服务", example: "¿Me podría prestar atención un momento?", example_zh: "您能注意我一下吗？", stress: 1 },
    { word: "molestar", pos: "v", conj_group: 1, ipa: "/moleˈstaɾ/", zh: "打扰", example: "¿Le molestaría abrir la ventana?", example_zh: "您介意打开窗户吗？", stress: 2 },
    { word: "importaría", pos: "v", conj_group: 1, ipa: "/impoɾtaˈɾia/", zh: "会介意", example: "¿Importaría que me sentara aquí?", example_zh: "我坐在这里您会介意吗？", stress: 2 },
    { word: "disculpar", pos: "v", conj_group: 1, ipa: "/diskulˈpaɾ/", zh: "原谅", example: "¿Podría disculpar la interrupción?", example_zh: "您能原谅我的打扰吗？", stress: 2 },
  ],
  "B1.1-L06": [
    { word: "condicionado", pos: "adj", ipa: "/kondiθjoˈnaðo/", zh: "有条件的", example: "El acuerdo está condicionado al pago.", example_zh: "协议以付款为条件。", stress: 2 },
    { word: "dependencia", pos: "n", gender: "f", article: "la", ipa: "/depenˈdenθja/", zh: "依赖", example: "Si estudias, reducirás la dependencia del diccionario.", example_zh: "如果你学习，就会减少对词典的依赖。", stress: 2 },
    { word: "antecedente", pos: "n", gender: "m", article: "el", ipa: "/anteˈθedente/", zh: "先例", example: "Si hay un antecedente, actuaremos con cuidado.", example_zh: "如果有先例，我们会谨慎行事。", stress: 2 },
    { word: "previsible", pos: "adj", ipa: "/pɾeβiˈsiβle/", zh: "可预见的", example: "Si sigue así, el resultado es previsible.", example_zh: "如果继续这样，结果是可预见的。", stress: 2 },
    { word: "concreto", pos: "adj", ipa: "/konˈkɾeto/", zh: "具体的", example: "Dame un ejemplo concreto si quieres que entienda.", example_zh: "如果你想让我理解，给我具体例子。", stress: 2 },
  ],
  "B1.1-L07": [
    { word: "precedente", pos: "n", gender: "m", article: "el", ipa: "/pɾeˈθedente/", zh: "前例", example: "No había precedente de tal situación.", example_zh: "此前没有这种情况的先例。", stress: 2 },
    { word: "transcurrir", pos: "v", conj_group: 2, ipa: "/tɾanskurˈɾiɾ/", zh: "流逝", example: "Había transcurrido mucho tiempo.", example_zh: "已经过去了很长时间。", stress: 2 },
    { word: "recuerdo", pos: "n", gender: "m", article: "el", ipa: "/reˈkweɾðo/", zh: "回忆", example: "Tengo buenos recuerdos de lo que había vivido.", example_zh: "我对过去的生活有美好的回忆。", stress: 2 },
    { word: "permanecer", pos: "v", conj_group: 2, ipa: "/peɾmaneˈθeɾ/", zh: "保持；停留", example: "Había permanecido en silencio durante horas.", example_zh: "他已经保持沉默好几个小时了。", stress: 2 },
    { word: "evolución", pos: "n", gender: "f", article: "la", ipa: "/eβoluˈθjon/", zh: "演变", example: "La evolución del proyecto había sido positiva.", example_zh: "项目的演变一直是积极的。", stress: 1 },
  ],
  "B1.1-L08": [
    { word: "material", pos: "n", gender: "m", article: "el", ipa: "/mateˈɾjal/", zh: "材料", example: "Se vende material escolar en esa tienda.", example_zh: "那家店出售学习材料。", stress: 2 },
    { word: "usado", pos: "adj", ipa: "/uˈsaðo/", zh: "二手的；用过的", example: "Se venden libros usados a buen precio.", example_zh: "二手书以优惠价格出售。", stress: 2 },
    { word: "estropear", pos: "v", conj_group: 1, ipa: "/estɾopeˈaɾ/", zh: "弄坏", example: "Se me estropeó la lavadora.", example_zh: "我的洗衣机坏了。", stress: 2 },
    { word: "averiarse", pos: "v", conj_group: 1, ipa: "/aβeˈɾjaɾse/", zh: "出故障", example: "Se me averió el coche en la carretera.", example_zh: "我的车在高速上坏了。", stress: 2 },
    { word: "mancha", pos: "n", gender: "f", article: "la", ipa: "/ˈmanʃa/", zh: "污渍", example: "Se me hizo una mancha en la camisa.", example_zh: "我的衬衫上弄了一块污渍。", stress: 2 },
  ],
  "B1.1-L09": [
    { word: "cuyo", pos: "pron", ipa: "/ˈkuʝo/", zh: " whose", example: "Es el autor cuyo libro he leído.", example_zh: "他就是我读过的那本书的作者。", stress: 2 },
    { word: "prestigioso", pos: "adj", ipa: "/pɾestiˈxjoso/", zh: "有声望的", example: "Conozco una universidad prestigiosa en la que estudiar.", example_zh: "我知道一所有声望可以就读的大学。", stress: 2 },
    { word: "cotidiano", pos: "adj", ipa: "/kotiˈðjano/", zh: "日常的", example: "Son situaciones del cotidiano que todos conocemos.", example_zh: "这些都是我们熟悉的日常情境。", stress: 2 },
    { word: "entorno", pos: "n", gender: "m", article: "el", ipa: "/enˈtoɾno/", zh: "环境", example: "Busco un entorno en el que vivir tranquilo.", example_zh: "我想找一个可以安静生活的环境。", stress: 2 },
    { word: "referente", pos: "n", gender: "m", article: "el", ipa: "/refeˈɾente/", zh: "参照", example: "Es un referente al que todos admiramos.", example_zh: "他是我们所有人都钦佩的参照。", stress: 2 },
  ],
  "B1.1-L10": [
    { word: "declarar", pos: "v", conj_group: 1, ipa: "/deklaˈɾaɾ/", zh: "声明", example: "Dijo que declararía la verdad.", example_zh: "他说他会声明真相。", stress: 2 },
    { word: "aseverar", pos: "v", conj_group: 1, ipa: "/aseβeˈɾaɾ/", zh: "断言", example: "Aseveró que no había visto nada.", example_zh: "他断言自己什么都没看见。", stress: 2 },
    { word: "preguntón", pos: "adj", ipa: "/pɾeɣunˈton/", zh: "爱打听的", example: "Me dijo que no fuera tan preguntón.", example_zh: "他让我别那么爱打听。", stress: 2 },
    { word: "confidencial", pos: "adj", ipa: "/konfiðenˈθjal/", zh: "机密的", example: "Me pidió que mantuviera el asunto confidencial.", example_zh: "他让我把这件事保密。", stress: 2 },
    { word: "testigo", pos: "n", gender: "m", article: "el", ipa: "/tesˈtiɣo/", zh: "证人", example: "Dijeron que el testigo había llegado tarde.", example_zh: "他们说证人迟到了。", stress: 2 },
  ],
  "B1.1-L11": [
    { word: "en primer lugar", pos: "adv", ipa: "/en pɾiˈmeɾ luˈɣaɾ/", zh: "首先", example: "En primer lugar, quiero agradecerles.", example_zh: "首先，我想感谢大家。" },
    { word: "por otra parte", pos: "adv", ipa: "/poɾ ˈotɾa ˈpaɾte/", zh: "另一方面", example: "Por otra parte, el coste es elevado.", example_zh: "另一方面，成本很高。" },
    { word: "en conclusión", pos: "adv", ipa: "/en konkluˈsjon/", zh: "总之", example: "En conclusión, es un plan viable.", example_zh: "总之，这是一个可行的计划。", stress: 1 },
    { word: "coherente", pos: "adj", ipa: "/ko eˈɾente/", zh: "连贯的", example: "Es importante que tu argumento sea coherente.", example_zh: "重要的是你的论点要连贯。", stress: 2 },
    { word: "sustentar", pos: "v", conj_group: 1, ipa: "/sustenˈtaɾ/", zh: "支撑；论证", example: "Necesito datos que sustenten mi opinión.", example_zh: "我需要数据来支撑我的观点。", stress: 2 },
  ],
  "B1.1-L12": [
    { word: "repaso", pos: "n", gender: "m", article: "el", ipa: "/reˈpaso/", zh: "复习", example: "Haremos un repaso de todo lo estudiado.", example_zh: "我们把学过的全部复习一遍。", stress: 2 },
    { word: "consolidar", pos: "v", conj_group: 1, ipa: "/konsoliˈðaɾ/", zh: "巩固", example: "Es el momento de consolidar lo aprendido.", example_zh: "是时候巩固所学内容了。", stress: 2 },
    { word: "dominio", pos: "n", gender: "m", article: "el", ipa: "/doˈminjo/", zh: "掌握", example: "Su dominio del español es notable.", example_zh: "他的西语掌握程度很突出。", stress: 2 },
    { word: "aplicar", pos: "v", conj_group: 1, ipa: "/apliˈkaɾ/", zh: "应用", example: "Quiero aplicar todo lo aprendido.", example_zh: "我想应用所学的一切。", stress: 2 },
    { word: "evaluación", pos: "n", gender: "f", article: "la", ipa: "/eβalwaˈθjon/", zh: "评估", example: "La evaluación servirá para medir el progreso.", example_zh: "评估将用于衡量进步。", stress: 1 },
  ],
  "B1.2-L01": [
    { word: "conmover", pos: "v", conj_group: 2, ipa: "/kommoˈβeɾ/", zh: "感动", example: "Me conmueve que recuerdes mi cumpleaños.", example_zh: "你记得我的生日让我很感动。", stress: 2 },
    { word: "indignar", pos: "v", conj_group: 1, ipa: "/inðiɣˈnaɾ/", zh: "使愤慨", example: "Me indigna que no respeten las normas.", example_zh: "他们不守规矩让我愤慨。", stress: 2 },
    { word: "entusiasmar", pos: "v", conj_group: 1, ipa: "/entusjasˈmaɾ/", zh: "使兴奋", example: "Me entusiasma que vengas conmigo.", example_zh: "你和我一起来让我很兴奋。", stress: 2 },
    { word: "tranquilizar", pos: "v", conj_group: 1, ipa: "/tɾankiliˈθaɾ/", zh: "使安心", example: "Me tranquiliza saber que estás bien.", example_zh: "知道你很好让我安心。", stress: 2 },
    { word: "desilusión", pos: "n", gender: "f", article: "la", ipa: "/desiluˈsjon/", zh: "幻灭", example: "Fue una desilusión que cancelaran el concierto.", example_zh: "他们取消音乐会让人失望。", stress: 1 },
  ],
  "B1.2-L02": [
    { word: "equiparable", pos: "adj", ipa: "/ekipaˈɾaβle/", zh: "可比拟的", example: "No hay nada equiparable a este paisaje.", example_zh: "没有什么可与这片风景比拟。", stress: 2 },
    { word: "destacado", pos: "adj", ipa: "/destaˈkaðo/", zh: "杰出的", example: "Es el resultado más destacado que haya visto.", example_zh: "这是我见过的最突出的结果。", stress: 2 },
    { word: "insuperable", pos: "adj", ipa: "/insupeˈɾaβle/", zh: "无法超越的", example: "No hay barrera insuperable.", example_zh: "没有不可逾越的障碍。", stress: 2 },
    { word: "notable", pos: "adj", ipa: "/noˈtaβle/", zh: "显著的", example: "Es una diferencia notable entre ambos.", example_zh: "两者之间差异显著。", stress: 2 },
    { word: "considerable", pos: "adj", ipa: "/konsiðeˈɾaβle/", zh: "相当大的", example: "Hay una mejora considerable.", example_zh: "有相当大的进步。", stress: 2 },
  ],
  "B1.2-L03": [
    { word: "gesto", pos: "n", gender: "m", article: "el", ipa: "/ˈxesto/", zh: "手势", example: "Me saludó haciendo un gesto amable.", example_zh: "他友好地做了个手势向我打招呼。", stress: 2 },
    { word: "suspirar", pos: "v", conj_group: 1, ipa: "/suspiˈɾaɾ/", zh: "叹气", example: "Se quedó suspirando por la ventana.", example_zh: "他站在窗边叹气。", stress: 2 },
    { word: "murmurar", pos: "v", conj_group: 1, ipa: "/muɾmuˈɾaɾ/", zh: "低语", example: "Me respondió murmurando entre dientes.", example_zh: "他低声咕哝着回答我。", stress: 2 },
    { word: "cruzar", pos: "v", conj_group: 1, ipa: "/kɾuˈθaɾ/", zh: "穿过", example: "Cruzó la calle corriendo.", example_zh: "他跑着穿过街道。", stress: 2 },
    { word: "trepar", pos: "v", conj_group: 1, ipa: "/tɾeˈpaɾ/", zh: "攀爬", example: "Los niños subieron trepando al árbol.", example_zh: "孩子们爬上树。", stress: 2 },
  ],
  "B1.2-L04": [
    { word: "atreverse", pos: "v", conj_group: 2, ipa: "/atɾeˈβeɾse/", zh: "敢于", example: "No se atreve a decir la verdad.", example_zh: "他不敢说出真相。", stress: 2 },
    { word: "arrepentirse", pos: "v", conj_group: 3, ipa: "/aɾepenˈtiɾse/", zh: "后悔", example: "Se arrepiente de haber dicho eso.", example_zh: "他后悔说了那样的话。", stress: 2 },
    { word: "acostumbrarse", pos: "v", conj_group: 1, ipa: "/akostumˈbɾaɾse/", zh: "习惯", example: "Me estoy acostumbrando a levantarme temprano.", example_zh: "我正在习惯早起。", stress: 2 },
    { word: "jactarse", pos: "v", conj_group: 1, ipa: "/xakˈtaɾse/", zh: "吹嘘", example: "No le gusta jactarse de sus logros.", example_zh: "他不喜欢吹嘘自己的成就。", stress: 2 },
    { word: "quejarse", pos: "v", conj_group: 1, ipa: "/keˈxaɾse/", zh: "抱怨", example: "Se queja de tener tanto trabajo.", example_zh: "他抱怨工作太多。", stress: 2 },
  ],
  "B1.2-L05": [
    { word: "regalo", pos: "n", gender: "m", article: "el", ipa: "/reˈɣalo/", zh: "礼物", example: "Se lo compré como regalo.", example_zh: "我买来作为礼物给他。", stress: 2 },
    { word: "sobrino", pos: "n", gender: "m", article: "el", ipa: "/soˈβɾino/", zh: "侄子；外甥", example: "Se lo di a mi sobrino.", example_zh: "我把它给了我侄子。", stress: 2 },
    { word: "sobrina", pos: "n", gender: "f", article: "la", ipa: "/soˈβɾina/", zh: "侄女；外甥女", example: "Se lo conté a mi sobrina.", example_zh: "我把它告诉了我侄女。", stress: 2 },
    { word: "mensaje", pos: "n", gender: "m", article: "el", ipa: "/menˈsaxe/", zh: "消息", example: "Se lo escribí en un mensaje.", example_zh: "我把它写在一条消息里。", stress: 2 },
    { word: "paquete", pos: "n", gender: "m", article: "el", ipa: "/paˈkete/", zh: "包裹", example: "Se lo envié en un paquete pequeño.", example_zh: "我把它装在一个小包裹里寄给他。", stress: 2 },
  ],
  "B1.2-L06": [
    { word: "esencia", pos: "n", gender: "f", article: "la", ipa: "/eˈsenθja/", zh: "本质", example: "La esencia del problema es la falta de diálogo.", example_zh: "问题的本质是缺乏对话。", stress: 2 },
    { word: "complejidad", pos: "n", gender: "f", article: "la", ipa: "/komplexiˈðað/", zh: "复杂性", example: "No subestimes la complejidad del tema.", example_zh: "不要低估这个话题的复杂性。", stress: 1 },
    { word: "simplicidad", pos: "n", gender: "f", article: "la", ipa: "/simpliˈθiðað/", zh: "简单", example: "Valoro la simplicidad de su propuesta.", example_zh: "我欣赏他提议的简洁。", stress: 1 },
    { word: "significado", pos: "n", gender: "m", article: "el", ipa: "/siɣnifiˈkaðo/", zh: "含义", example: "El significado de esta palabra es amplio.", example_zh: "这个词的含义很广。", stress: 2 },
    { word: "concepto", pos: "n", gender: "m", article: "el", ipa: "/konˈθepto/", zh: "概念", example: "Es un concepto difícil de definir.", example_zh: "这是一个难以定义的概念。", stress: 2 },
  ],
  "B1.2-L07": [
    { word: "darse por vencido", pos: "phrase", ipa: "/ˈdaɾse poɾ benˈθiðo/", zh: "认输", example: "No te des por vencido aunque sea difícil.", example_zh: "即使困难也不要认输。", stress: 2 },
    { word: "echar de menos", pos: "phrase", ipa: "/eˈʃaɾ de ˈmenos/", zh: "想念", example: "Te echo de menos cuando no estás.", example_zh: "你不在的时候我想你。", stress: 2 },
    { word: "hacer caso", pos: "phrase", ipa: "/ˈaθeɾ ˈkaso/", zh: "理睬", example: "No me hace caso cuando le hablo.", example_zh: "我跟他说话时他不理睬我。", stress: 2 },
    { word: "tomar en serio", pos: "phrase", ipa: "/toˈmaɾ en ˈseɾjo/", zh: "认真对待", example: "Tómate en serio tus estudios.", example_zh: "认真对待你的学习。", stress: 2 },
    { word: "perder los papeles", pos: "phrase", ipa: "/peɾˈðeɾ los paˈpeles/", zh: "失态", example: "Perdió los papeles durante la discusión.", example_zh: "他在争论中失态了。", stress: 2 },
  ],
  "B1.2-L08": [
    { word: "gráfico", pos: "n", gender: "m", article: "el", ipa: "/ˈɣɾafiko/", zh: "图表", example: "El gráfico muestra una tendencia al alza.", example_zh: "图表显示上升趋势。", stress: 2 },
    { word: "tabla", pos: "n", gender: "f", article: "la", ipa: "/ˈtaβla/", zh: "表格", example: "La tabla compara los datos de ambos años.", example_zh: "表格比较了两年的数据。", stress: 2 },
    { word: "porcentaje", pos: "n", gender: "m", article: "el", ipa: "/poɾθenˈtaxe/", zh: "百分比", example: "El porcentaje de éxito es alto.", example_zh: "成功率很高。", stress: 2 },
    { word: "disminución", pos: "n", gender: "f", article: "la", ipa: "/disminuˈθjon/", zh: "减少", example: "Se observa una disminución gradual.", example_zh: "观察到逐渐减少。", stress: 1 },
    { word: "estabilidad", pos: "n", gender: "f", article: "la", ipa: "/estiβiliˈðað/", zh: "稳定", example: "La estabilidad económica es clave.", example_zh: "经济稳定是关键。", stress: 1 },
  ],
  "B1.2-L09": [
    { word: "ciudadanía", pos: "n", gender: "f", article: "la", ipa: "/θjuðaðaˈnia/", zh: "公民身份", example: "La ciudadanía implica derechos y deberes.", example_zh: "公民身份意味着权利与义务。", stress: 2 },
    { word: "convivencia", pos: "n", gender: "f", article: "la", ipa: "/konβiˈβenθja/", zh: "共处", example: "La convivencia en la ciudad requiere respeto.", example_zh: "城市共处需要尊重。", stress: 2 },
    { word: "marginación", pos: "n", gender: "f", article: "la", ipa: "/maɾɣinaˈθjon/", zh: "边缘化", example: "Luchamos contra la marginación social.", example_zh: "我们与社会边缘化作斗争。", stress: 1 },
    { word: "voluntariado", pos: "n", gender: "m", article: "el", ipa: "/boluntaˈɾjaðo/", zh: "志愿服务", example: "Hace voluntariado los fines de semana.", example_zh: "他周末做志愿服务。", stress: 2 },
    { word: "solidaridad", pos: "n", gender: "f", article: "la", ipa: "/solidaɾiˈðað/", zh: "团结", example: "La solidaridad es fundamental en crisis.", example_zh: "危机中团结至关重要。", stress: 1 },
  ],
  "B1.2-L10": [
    { word: "argumentar", pos: "v", conj_group: 1, ipa: "/aɾɣumenˈtaɾ/", zh: "论证", example: "Argumentó a favor de la propuesta con datos.", example_zh: "他用数据论证支持该提议。", stress: 2 },
    { word: "rebatir", pos: "v", conj_group: 3, ipa: "/reβaˈtiɾ/", zh: "反驳", example: "Rebió todos los argumentos contrarios.", example_zh: "他反驳了所有相反论点。", stress: 2 },
    { word: "persuadir", pos: "v", conj_group: 2, ipa: "/peɾswaˈðiɾ/", zh: "说服", example: "Logró persuadir a la audiencia.", example_zh: "他说服了听众。", stress: 2 },
    { word: "contraargumento", pos: "n", gender: "m", article: "el", ipa: "/kontɾa aɾɣuˈmento/", zh: "反论点", example: "No tiene un contraargumento sólido.", example_zh: "他没有有力的反论点。", stress: 2 },
    { word: "postura", pos: "n", gender: "f", article: "la", ipa: "/posˈtuɾa/", zh: "立场", example: "Su postura es clara y defendible.", example_zh: "他的立场明确且可辩护。", stress: 2 },
  ],
  "B1.2-L11": [
    { word: "coloquial", pos: "adj", ipa: "/koloˈkwjal/", zh: "口语的", example: "Esta expresión es muy coloquial.", example_zh: "这个表达很口语化。", stress: 2 },
    { word: "formalismo", pos: "n", gender: "m", article: "el", ipa: "/foɾmalˈismo/", zh: "拘泥形式", example: "Evita el excesivo formalismo en el correo.", example_zh: "邮件中避免过度拘泥形式。", stress: 2 },
    { word: "jerga", pos: "n", gender: "f", article: "la", ipa: "/ˈxeɾɣa/", zh: "行话", example: "No uses tanta jerga técnica.", example_zh: "不要说那么多技术行话。", stress: 2 },
    { word: "registro", pos: "n", gender: "m", article: "el", ipa: "/reˈxistɾo/", zh: "语体", example: "Elige el registro adecuado según el contexto.", example_zh: "根据语境选择合适的语体。", stress: 2 },
    { word: "matiz", pos: "n", gender: "m", article: "el", ipa: "/maˈtiθ/", zh: "细微差别", example: "Esta palabra tiene un matiz especial.", example_zh: "这个词有特别的细微差别。", stress: 2 },
  ],
  "B1.2-L12": [
    { word: "síntesis", pos: "n", gender: "f", article: "la", ipa: "/ˈsintesis/", zh: "综合", example: "Haremos una síntesis de todo el nivel B1.", example_zh: "我们将对B1全部内容做一个综合。", stress: 2 },
    { word: "proyección", pos: "n", gender: "f", article: "la", ipa: "/pɾoʝekˈθjon/", zh: "展望", example: "La proyección hacia B2 es emocionante.", example_zh: "向B2的展望令人期待。", stress: 1 },
    { word: "autonomía", pos: "n", gender: "f", article: "la", ipa: "/awtonoˈmia/", zh: "自主性", example: "Busco mayor autonomía en el aprendizaje.", example_zh: "我寻求学习上的更大自主性。", stress: 2 },
    { word: "reto", pos: "n", gender: "m", article: "el", ipa: "/ˈreto/", zh: "挑战", example: "El siguiente reto será alcanzar el nivel B2.", example_zh: "下一个挑战是达到B2水平。", stress: 2 },
    { word: "metas", pos: "n", gender: "f", article: "la", ipa: "/ˈmetas/", zh: "目标", example: "Es hora de fijar nuevas metas.", example_zh: "是时候设定新目标了。", stress: 2 },
  ],
};

// assign ids and lessons to B1 extra words
let b1IdCounter = 2501;
const WORDS_B1_EXTRA = [];
for (const lesson of Object.keys(b1ExtraByLesson)) {
  for (const base of b1ExtraByLesson[lesson]) {
    WORDS_B1_EXTRA.push({ ...base, id: `w${b1IdCounter}`, lesson, extra: true });
    b1IdCounter++;
  }
}
