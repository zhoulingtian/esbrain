// ESbrain 动词库：60 词 × 14 时态语式
// 数据只存例外（不规则覆盖），规则形式由下方变位引擎按词尾表生成。
// 本文件在 build/assemble.js 中求值，展开后的全量表随数据区写入 index.html；
// 运行时（skeleton.html）只读展开结果，不含引擎。

// ---------- 人称与词尾规则表（人工核对） ----------
const VPERSONS = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];
const VREFL_PRON = ['me', 'te', 'se', 'nos', 'os', 'se']; // 自反代词，按人称对齐

const VEND = {
  presente: {
    ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    ir: ['o', 'es', 'e', 'imos', 'ís', 'en'],
  },
  indefinido: {
    ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
  },
  imperfecto: {
    ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
    er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  },
  // 将来时 / 条件式：词尾直接加在不定式（或不规则词干）上
  futuro:      ['é', 'ás', 'á', 'emos', 'éis', 'án'],
  condicional: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  // 虚拟式现在时：-ar 换 e 类词尾，-er/-ir 换 a 类词尾，加在「yo 现在时去 -o」的词干上
  subj_pres: {
    ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
    er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
    ir: ['a', 'as', 'a', 'amos', 'áis', 'an'],
  },
  // 虚拟式未完成过去时（-ra 式）：第三人称复数 indefinido 去 -ron 后加下列词尾；
  // nosotros 格重音落在词干最后一个元音上（habláramos / fuéramos），由引擎补标。
  subj_imp: ['ra', 'ras', 'ra', 'ramos', 'rais', 'ran'],
  // 不规则 indefinido 两套词尾：-e 类（tuv-/sup-/hic-/dij-…）与无重音类（dar/ver）
  indef_irreg1: ['e', 'iste', 'o', 'imos', 'isteis', 'ieron'],
  indef_irreg2: ['i', 'iste', 'io', 'imos', 'isteis', 'ieron'],
};

// haber 现在时 / 未完成过去时，用于拼复合时态
const VHABER_PRES   = ['he', 'has', 'ha', 'hemos', 'habéis', 'han'];
const VHABER_IMPERF = ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'];

// ---------- 引擎辅助函数 ----------
// 词干变化：替换词干最后一个目标元音。e→ie（querer）、o→ue（poder）、
// e→i（pedir）、u→ue（jugar）、o→hue（oler）
const VSTEM_MAP = { e_ie: ['e', 'ie'], o_ue: ['o', 'ue'], e_i: ['e', 'i'], u_ue: ['u', 'ue'], o_hue: ['o', 'hue'] };
function vChangeStem(stem, type) {
  const [from, to] = VSTEM_MAP[type];
  const i = stem.lastIndexOf(from);
  if (i < 0) throw new Error('词干中找不到元音: ' + stem + ' / ' + type);
  return stem.slice(0, i) + to + stem.slice(i + from.length);
}
// -ir 词干变化动词在 indefinido 第三人称、虚拟式 nosotros/vosotros、动名词中的
// 次级变化：e→i（sentir→sint- / pedir→pid-）、o→u（dormir→durm-）
function vWeakStem(stem, type) {
  if (type === 'o_ue') { const i = stem.lastIndexOf('o'); return stem.slice(0, i) + 'u' + stem.slice(i + 1); }
  const i = stem.lastIndexOf('e');
  return stem.slice(0, i) + 'i' + stem.slice(i + 1);
}
// 后接 e/é 时的拼写保持：c→qu（buscar→busque/busqué）、g→gu（jugar→juegue/jugué）、z→c（empezar→empiece/empecé）
function vOrthoE(stem) {
  if (stem.endsWith('c')) return stem.slice(0, -1) + 'qu';
  if (stem.endsWith('g')) return stem.slice(0, -1) + 'gu';
  if (stem.endsWith('z')) return stem.slice(0, -1) + 'c';
  return stem;
}
// 给词干最后一个元音补重音（虚拟式未完成过去时 nosotros 格：habláramos、fuéramos）
const VACCENT = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
function vAccentLastVowel(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    if (VACCENT[s[i]]) return s.slice(0, i) + VACCENT[s[i]] + s.slice(i + 1);
  }
  return s;
}
// 解析不定式：剥自反后缀、取词干与词尾组（ar/er/ir）
function vParse(v) {
  const base = v.refl ? v.inf.slice(0, -2) : v.inf; // llamarse → llamar
  // oír 的词尾带重音（ír），用 endsWith 判断组别更稳
  const grp = base.endsWith('ar') ? 'ar' : base.endsWith('er') ? 'er' : 'ir';
  return { base, grp, stem: base.slice(0, -2) };
}
function vTable(forms, v) {
  // 组装 6 人称表；自反动词前置 me/te/se/nos/os/se
  const out = {};
  VPERSONS.forEach((p, i) => { out[p] = (v.refl && forms[i] !== '—' ? VREFL_PRON[i] + ' ' : '') + forms[i]; });
  return out;
}

// ---------- 变位引擎 ----------
// 动词记录字段（全部可选，只存例外）：
//   inf/zh/note/group  基本信息；refl 自反；stemChange 词干变化类型
//   yo      现在时 yo 覆盖（tengo/hago/salgo/conozco…）
//   pres    现在时整表覆盖（ser/ir/estar/haber/ver/oír）
//   imperf  未完成过去时整表覆盖（ser/ir/ver，仅有的三个不规则）
//   indef   indefinido 整表覆盖（ser/ir/oír/leer/creer/construir）
//   indefStem/indefE3/indefP3/indefEnd  不规则 indefinido 词干法（tuv-、hic-+hizo、dij-+dijeron…）
//   futStem 将来时/条件式不规则词干（tendr-/har-/dir-…）
//   subj    虚拟式现在时整表覆盖（ser/ir/estar/dar/haber/saber）
//   participio/gerundio  非人称形式覆盖（hecho/puesto/yendo/leyendo…）
//   impTu/impVos  命令式肯定 tú / vosotros 格覆盖（ten/ven/haz/di/pon/sal/sé/ve、oíd）
//   impAf   命令式肯定整表覆盖（自反动词，涉及重音移位，全部手写）
function expandVerb(v) {
  const { base, grp, stem } = vParse(v);
  const out = { inf: v.inf, zh: v.zh, group: v.group, note: v.note || '' };
  if (v.stemChange) out.stemChange = v.stemChange;
  if (v.refl) out.refl = true;

  // 现在时：词干变化只作用于 yo/tú/él/ellos 四格；-uir 动词（construir）这些人称补 y
  let pres;
  if (v.pres) pres = v.pres;
  else {
    const ends = VEND.presente[grp];
    const forms = VPERSONS.map((p, i) => {
      let s = stem;
      if ([0, 1, 2, 5].includes(i)) {
        if (v.stemChange) s = vChangeStem(stem, v.stemChange);
        else if (base.endsWith('uir')) s = stem + 'y';
      }
      let f = s + ends[i];
      if (i === 0 && v.yo) f = v.yo;
      return f;
    });
    pres = vTable(forms, v);
  }
  out.presente = pres;
  const presPlain = p => v.refl ? pres[p].split(' ')[1] : pres[p]; // 去自反代词的人称形式

  // 过去分词 / 动名词（单形式）
  const participio = v.participio || (stem + (grp === 'ar' ? 'ado' : 'ido'));
  let gerundio = v.gerundio;
  if (!gerundio) {
    let gs = stem;
    // -ir 词干变化动词的动名词：e→i（pidiendo/sintiendo）、o→u（durmiendo）
    if (grp === 'ir' && v.stemChange) gs = vWeakStem(stem, v.stemChange);
    gerundio = gs + (grp === 'ar' ? 'ando' : 'iendo');
  }
  out.participio = participio;
  out.gerundio = gerundio;

  // 复合时态 = haber + 过去分词
  out.perfecto = vTable(VHABER_PRES.map(h => h + ' ' + participio), v);
  out.pluscuamperfecto = vTable(VHABER_IMPERF.map(h => h + ' ' + participio), v);

  // indefinido：整表覆盖 > 不规则词干 > -ir 词干变化第三人称 > 规则
  if (v.indef) out.indefinido = v.indef;
  else {
    let forms;
    if (v.indefStem) {
      const ends = VEND[v.indefEnd === 'irreg2' ? 'indef_irreg2' : 'indef_irreg1'];
      forms = ends.map(e => v.indefStem + e);
      if (v.indefE3) forms[2] = v.indefE3; // hizo
      if (v.indefP3) forms[5] = v.indefP3; // dijeron/trajeron/condujeron（无 i）
    } else {
      const ends = VEND.indefinido[grp];
      forms = VPERSONS.map((p, i) => {
        let s = stem;
        // -ir 词干变化：第三人称单复数 e→i / o→u（sintió/durmió/pidió）
        if (grp === 'ir' && v.stemChange && (i === 2 || i === 5)) s = vWeakStem(stem, v.stemChange);
        if (i === 0 && grp === 'ar') s = vOrthoE(s); // busqué/jugué/empecé（仅 -ar 动词）
        return s + ends[i];
      });
    }
    out.indefinido = vTable(forms, v);
  }

  // 未完成过去时：仅 ser/ir/ver 不规则（整表覆盖）
  out.imperfecto = v.imperf || vTable(VEND.imperfecto[grp].map(e => stem + e), v);

  // 将来时 / 条件式：futStem 覆盖（tendr-/har-/dir-/podr-/pondr-/saldr-/vendr-/querr-/sabr-/habr-）
  const fstem = v.futStem || base;
  out.futuro = vTable(VEND.futuro.map(e => fstem + e), v);
  out.condicional = vTable(VEND.condicional.map(e => fstem + e), v);

  // 虚拟式现在时：整表覆盖 > 引擎（yo 现在时去 -o 作词干）
  if (v.subj) out.subj_pres = v.subj;
  else {
    const yoPlain = presPlain('yo');
    if (!yoPlain.endsWith('o')) throw new Error(v.inf + ' 的 yo 现在时不以 -o 结尾，需 subj 整表覆盖: ' + yoPlain);
    const yoStem = yoPlain.slice(0, -1);
    const ends = VEND.subj_pres[grp];
    // -ir 且 e_ie/o_ue 类（无 yo 覆盖的 sentir/dormir 型）：nosotros/vosotros 用次级词干 i/u
    const weak = grp === 'ir' && v.stemChange && !v.yo && v.stemChange !== 'e_i';
    const forms = VPERSONS.map((p, i) => {
      let s;
      if (i === 3 || i === 4) {
        if (weak) s = vWeakStem(stem, v.stemChange);          // sintamos / durmáis
        else if (v.stemChange && !v.yo && v.stemChange !== 'e_i') s = stem; // -ar/-er 类还原：queramos/podamos/juguemos
        else s = yoStem;                                       // tengamos/hagamos/pidamos
      } else {
        s = yoStem; // 全人称基于 yo 现在时词干：tenga/haga/quiera/pueda/pida
      }
      if (grp === 'ar') s = vOrthoE(s); // busque/juegue/empiece
      return s + ends[i];
    });
    out.subj_pres = vTable(forms, v);
  }
  const subjPlain = p => v.refl ? out.subj_pres[p].split(' ')[1] : out.subj_pres[p];

  // 虚拟式未完成过去时（-ra 式）：indefinido 第三人称复数去 -ron
  {
    const p3 = v.refl ? out.indefinido['ellos/ellas/ustedes'].split(' ')[1] : out.indefinido['ellos/ellas/ustedes'];
    if (!p3.endsWith('ron')) throw new Error(v.inf + ' indefinido 第三人称复数异常: ' + p3);
    const s = p3.slice(0, -3);
    const forms = VEND.subj_imp.map((e, i) => (i === 3 ? vAccentLastVowel(s) : s) + e);
    out.subj_imp = vTable(forms, v);
  }

  // 命令式肯定：tú=现在时第三人称单数（或覆盖），nosotros/usted/ustedes=虚拟式现在时，
  // vosotros=不定式去 r 加 d；自反动词因重音移位整表手写
  if (v.impAf) out.imp_af = v.impAf;
  else {
    out.imp_af = vTable([
      '—',
      v.impTu || presPlain('él/ella/usted'),
      subjPlain('él/ella/usted'),
      subjPlain('nosotros'),
      v.impVos || base.slice(0, -1) + 'd',
      subjPlain('ellos/ellas/ustedes'),
    ], v);
  }
  // 命令式否定 = no + 虚拟式现在时（含自反代词，如 no te sientes）
  out.imp_neg = {};
  VPERSONS.forEach(p => {
    out.imp_neg[p] = p === 'yo' ? '—' : 'no ' + out.subj_pres[p];
  });

  return out;
}

// ---------- 动词数据（60 词，只存例外） ----------
const VERBS_RAW = [
  // ===== 核心不规则 =====
  {
    inf: 'ser', zh: '是（本质、身份）', group: 'irregular',
    note: '表示本质、身份、时间等永久性特征',
    pres: { 'yo': 'soy', 'tú': 'eres', 'él/ella/usted': 'es', 'nosotros': 'somos', 'vosotros': 'sois', 'ellos/ellas/ustedes': 'son' },
    imperf: { 'yo': 'era', 'tú': 'eras', 'él/ella/usted': 'era', 'nosotros': 'éramos', 'vosotros': 'erais', 'ellos/ellas/ustedes': 'eran' },
    indef: { 'yo': 'fui', 'tú': 'fuiste', 'él/ella/usted': 'fue', 'nosotros': 'fuimos', 'vosotros': 'fuisteis', 'ellos/ellas/ustedes': 'fueron' },
    subj: { 'yo': 'sea', 'tú': 'seas', 'él/ella/usted': 'sea', 'nosotros': 'seamos', 'vosotros': 'seáis', 'ellos/ellas/ustedes': 'sean' },
    impTu: 'sé',
  },
  {
    inf: 'estar', zh: '是（状态、位置）', group: 'irregular',
    note: '表示位置、状态等暂时性特征；现在时除 yo/nosotros 外都带重音',
    pres: { 'yo': 'estoy', 'tú': 'estás', 'él/ella/usted': 'está', 'nosotros': 'estamos', 'vosotros': 'estáis', 'ellos/ellas/ustedes': 'están' },
    indefStem: 'estuv',
    subj: { 'yo': 'esté', 'tú': 'estés', 'él/ella/usted': 'esté', 'nosotros': 'estemos', 'vosotros': 'estéis', 'ellos/ellas/ustedes': 'estén' },
  },
  {
    inf: 'tener', zh: '有；拥有', group: 'irregular', stemChange: 'e_ie', yo: 'tengo',
    note: '表示拥有；tener que + 动词原形 表示“必须做某事”',
    indefStem: 'tuv', futStem: 'tendr', impTu: 'ten',
  },
  {
    inf: 'haber', zh: '有（助动词）', group: 'irregular',
    note: '主要作复合时态的助动词；hay 是无人称形式，表示“有”',
    pres: { 'yo': 'he', 'tú': 'has', 'él/ella/usted': 'ha', 'nosotros': 'hemos', 'vosotros': 'habéis', 'ellos/ellas/ustedes': 'han' },
    indefStem: 'hub', futStem: 'habr',
    subj: { 'yo': 'haya', 'tú': 'hayas', 'él/ella/usted': 'haya', 'nosotros': 'hayamos', 'vosotros': 'hayáis', 'ellos/ellas/ustedes': 'hayan' },
    impTu: 'he',
  },
  {
    inf: 'ir', zh: '去', group: 'irregular',
    note: 'indefinido 与 ser 同形；ir a + 动词原形 表示“将要做某事”',
    pres: { 'yo': 'voy', 'tú': 'vas', 'él/ella/usted': 'va', 'nosotros': 'vamos', 'vosotros': 'vais', 'ellos/ellas/ustedes': 'van' },
    imperf: { 'yo': 'iba', 'tú': 'ibas', 'él/ella/usted': 'iba', 'nosotros': 'íbamos', 'vosotros': 'ibais', 'ellos/ellas/ustedes': 'iban' },
    indef: { 'yo': 'fui', 'tú': 'fuiste', 'él/ella/usted': 'fue', 'nosotros': 'fuimos', 'vosotros': 'fuisteis', 'ellos/ellas/ustedes': 'fueron' },
    subj: { 'yo': 'vaya', 'tú': 'vayas', 'él/ella/usted': 'vaya', 'nosotros': 'vayamos', 'vosotros': 'vayáis', 'ellos/ellas/ustedes': 'vayan' },
    participio: 'ido', gerundio: 'yendo', impTu: 've',
  },
  {
    inf: 'hacer', zh: '做', group: 'irregular', yo: 'hago',
    note: '表示“做”；也可用于天气表达，如 hace frío',
    indefStem: 'hic', indefE3: 'hizo', futStem: 'har', participio: 'hecho', impTu: 'haz',
  },
  {
    inf: 'poder', zh: '能够', group: 'irregular', stemChange: 'o_ue',
    note: '表示“能够”；o→ue 词干变化',
    indefStem: 'pud', futStem: 'podr', gerundio: 'pudiendo',
  },
  {
    inf: 'querer', zh: '想要；爱', group: 'irregular', stemChange: 'e_ie',
    note: '表示“想要”；e→ie 词干变化',
    indefStem: 'quis', futStem: 'querr',
  },
  {
    inf: 'decir', zh: '说', group: 'irregular', stemChange: 'e_i', yo: 'digo',
    note: '表示“说”；过去分词 dicho 不规则',
    indefStem: 'dij', indefP3: 'dijeron', futStem: 'dir', participio: 'dicho', impTu: 'di',
  },
  {
    inf: 'venir', zh: '来', group: 'irregular', stemChange: 'e_ie', yo: 'vengo',
    note: '表示“来”；与 tener 变化类似',
    indefStem: 'vin', futStem: 'vendr', gerundio: 'viniendo', impTu: 'ven',
  },
  {
    inf: 'poner', zh: '放；摆', group: 'irregular', yo: 'pongo',
    note: '表示“放”；过去分词 puesto 不规则',
    indefStem: 'pus', futStem: 'pondr', participio: 'puesto', impTu: 'pon',
  },
  {
    inf: 'dar', zh: '给', group: 'irregular', yo: 'doy',
    note: 'indefinido 按 -er 动词词尾变化且不带重音（di/diste/dio/dimos/disteis/dieron）；vosotros 现在时 dais 不带重音',
    pres: { 'yo': 'doy', 'tú': 'das', 'él/ella/usted': 'da', 'nosotros': 'damos', 'vosotros': 'dais', 'ellos/ellas/ustedes': 'dan' },
    indefStem: 'd', indefEnd: 'irreg2',
    subj: { 'yo': 'dé', 'tú': 'des', 'él/ella/usted': 'dé', 'nosotros': 'demos', 'vosotros': 'deis', 'ellos/ellas/ustedes': 'den' },
  },
  {
    inf: 'ver', zh: '看见', group: 'irregular', yo: 'veo',
    note: 'indefinido 全部不带重音符号：vi/viste/vio/vimos/visteis/vieron；imperfecto 不规则（veía）',
    pres: { 'yo': 'veo', 'tú': 'ves', 'él/ella/usted': 've', 'nosotros': 'vemos', 'vosotros': 'veis', 'ellos/ellas/ustedes': 'ven' },
    imperf: { 'yo': 'veía', 'tú': 'veías', 'él/ella/usted': 'veía', 'nosotros': 'veíamos', 'vosotros': 'veíais', 'ellos/ellas/ustedes': 'veían' },
    indefStem: 'v', indefEnd: 'irreg2', participio: 'visto',
  },
  {
    inf: 'saber', zh: '知道；会', group: 'irregular', yo: 'sé',
    note: '表示“知道（事实）/ 会（技能）”；yo 现在时 sé 带重音',
    indefStem: 'sup', futStem: 'sabr',
    subj: { 'yo': 'sepa', 'tú': 'sepas', 'él/ella/usted': 'sepa', 'nosotros': 'sepamos', 'vosotros': 'sepáis', 'ellos/ellas/ustedes': 'sepan' },
  },
  {
    inf: 'salir', zh: '出去；离开', group: 'irregular', yo: 'salgo',
    note: 'yo 现在时 salgo；将来时词干 saldr-',
    futStem: 'saldr', impTu: 'sal',
  },
  {
    inf: 'traer', zh: '带来', group: 'irregular', yo: 'traigo',
    note: 'indefinido 词干 traj-，第三人称复数 trajeron（无 i）',
    indefStem: 'traj', indefP3: 'trajeron', gerundio: 'trayendo', participio: 'traído',
  },
  {
    inf: 'conocer', zh: '认识；了解', group: 'irregular', yo: 'conozco',
    note: 'yo 现在时 conozco（-cer 动词 zc 变化），其余人称规则',
  },
  {
    inf: 'conducir', zh: '驾驶；带领', group: 'irregular', yo: 'conduzco',
    note: 'yo 现在时 conduzco；indefinido 词干 conduj-',
    indefStem: 'conduj', indefP3: 'condujeron',
  },
  {
    inf: 'oír', zh: '听见', group: 'irregular',
    note: '现在时与 indefinido 全表不规则；注意 oyes/oyó 的 y 变化',
    pres: { 'yo': 'oigo', 'tú': 'oyes', 'él/ella/usted': 'oye', 'nosotros': 'oímos', 'vosotros': 'oís', 'ellos/ellas/ustedes': 'oyen' },
    indef: { 'yo': 'oí', 'tú': 'oíste', 'él/ella/usted': 'oyó', 'nosotros': 'oímos', 'vosotros': 'oísteis', 'ellos/ellas/ustedes': 'oyeron' },
    gerundio: 'oyendo', participio: 'oído', impVos: 'oíd', futStem: 'oir',
  },
  {
    inf: 'construir', zh: '建造', group: 'irregular',
    note: '-uir 动词：yo/tú/él/ellos 词干补 y（construyo/construyes）',
    indef: { 'yo': 'construí', 'tú': 'construiste', 'él/ella/usted': 'construyó', 'nosotros': 'construimos', 'vosotros': 'construisteis', 'ellos/ellas/ustedes': 'construyeron' },
    gerundio: 'construyendo',
  },

  // ===== 规则 -ar =====
  { inf: 'hablar', zh: '说，讲', group: '-ar', note: '规则 -ar 动词' },
  { inf: 'gustar', zh: '喜欢', group: '-ar', note: '常用 me gusta / me gustan 结构，主语是让人喜欢的事物' },
  { inf: 'trabajar', zh: '工作', group: '-ar' },
  { inf: 'estudiar', zh: '学习', group: '-ar' },
  { inf: 'tomar', zh: '拿；喝；乘坐', group: '-ar' },
  { inf: 'comprar', zh: '买', group: '-ar' },
  { inf: 'buscar', zh: '寻找', group: '-ar', note: '后接 e 时 c→qu：busque、busqué' },
  { inf: 'escuchar', zh: '听', group: '-ar' },
  { inf: 'necesitar', zh: '需要', group: '-ar' },
  { inf: 'llevar', zh: '带；穿', group: '-ar' },

  // ===== 规则 -er / -ir =====
  { inf: 'comer', zh: '吃', group: '-er', note: '规则 -er 动词' },
  { inf: 'aprender', zh: '学习；学会', group: '-er' },
  {
    inf: 'leer', zh: '读', group: '-er',
    note: '第三人称 i→y：leyó/leyeron；分词 leído 带重音',
    indef: { 'yo': 'leí', 'tú': 'leíste', 'él/ella/usted': 'leyó', 'nosotros': 'leímos', 'vosotros': 'leísteis', 'ellos/ellas/ustedes': 'leyeron' },
    gerundio: 'leyendo', participio: 'leído',
  },
  {
    inf: 'creer', zh: '相信；认为', group: '-er',
    note: '与 leer 同类：creyó/creyeron、creído',
    indef: { 'yo': 'creí', 'tú': 'creíste', 'él/ella/usted': 'creyó', 'nosotros': 'creímos', 'vosotros': 'creísteis', 'ellos/ellas/ustedes': 'creyeron' },
    gerundio: 'creyendo', participio: 'creído',
  },
  { inf: 'vivir', zh: '生活，居住', group: '-ir', note: '规则 -ir 动词' },
  { inf: 'abrir', zh: '开；打开', group: '-ir', participio: 'abierto', note: '过去分词 abierto 不规则' },
  { inf: 'escribir', zh: '写', group: '-ir', participio: 'escrito', note: '过去分词 escrito 不规则' },
  { inf: 'subir', zh: '上；爬；提高', group: '-ir' },

  // ===== 词干变化 e→ie =====
  { inf: 'pensar', zh: '想；思考', group: '-ar', stemChange: 'e_ie' },
  { inf: 'cerrar', zh: '关', group: '-ar', stemChange: 'e_ie' },
  { inf: 'empezar', zh: '开始', group: '-ar', stemChange: 'e_ie', note: 'e→ie 词干变化；后接 e 时 z→c：empiece、empecé' },
  { inf: 'entender', zh: '理解', group: '-er', stemChange: 'e_ie' },
  { inf: 'perder', zh: '输；丢失', group: '-er', stemChange: 'e_ie' },
  { inf: 'preferir', zh: '更喜欢', group: '-ir', stemChange: 'e_ie', note: '-ir 类：虚拟式 nosotros/vosotros 与动名词变 i（prefiramos/prefiriendo）' },
  { inf: 'sentir', zh: '感觉；遗憾', group: '-ir', stemChange: 'e_ie', note: '-ir 类：sintió/sintamos/sintiendo 变 i' },
  { inf: 'sentarse', zh: '坐下', group: '-ar', stemChange: 'e_ie', refl: true,
    impAf: { 'yo': '—', 'tú': 'siéntate', 'él/ella/usted': 'siéntese', 'nosotros': 'sentémonos', 'vosotros': 'sentaos', 'ellos/ellas/ustedes': 'siéntense' },
    gerundio: 'sentándose', note: '自反动词；命令式注意重音移位（siéntate/sentémonos）' },

  // ===== 词干变化 o→ue / u→ue =====
  { inf: 'volver', zh: '回来；返回', group: '-er', stemChange: 'o_ue', participio: 'vuelto', note: '过去分词 vuelto 不规则' },
  { inf: 'encontrar', zh: '找到；遇见', group: '-ar', stemChange: 'o_ue' },
  { inf: 'recordar', zh: '记得', group: '-ar', stemChange: 'o_ue' },
  { inf: 'contar', zh: '数；讲述', group: '-ar', stemChange: 'o_ue' },
  { inf: 'dormir', zh: '睡觉', group: '-ir', stemChange: 'o_ue', note: '-ir 类：durmió/durmamos/durmiendo 变 u' },
  { inf: 'morir', zh: '死', group: '-ir', stemChange: 'o_ue', participio: 'muerto', note: '同 dormir：murió/muriendo；分词 muerto 不规则' },
  { inf: 'jugar', zh: '玩；游戏', group: '-ar', stemChange: 'u_ue', note: '唯一的 u→ue 词干变化动词；后接 e 时 g→gu：juegue、jugué' },

  // ===== 词干变化 e→i =====
  { inf: 'pedir', zh: '请求；点（餐）', group: '-ir', stemChange: 'e_i', note: 'e→i 类：虚拟式全人称基于词干 pid-（pidamos）' },
  { inf: 'servir', zh: '服务；端上', group: '-ir', stemChange: 'e_i' },
  { inf: 'seguir', zh: '跟随；继续', group: '-ir', stemChange: 'e_i', yo: 'sigo', note: 'yo 现在时 sigo；动名词 siguiendo' },
  { inf: 'repetir', zh: '重复', group: '-ir', stemChange: 'e_i' },
  { inf: 'vestirse', zh: '穿衣服', group: '-ir', stemChange: 'e_i', refl: true,
    impAf: { 'yo': '—', 'tú': 'vístete', 'él/ella/usted': 'vístase', 'nosotros': 'vistámonos', 'vosotros': 'vestíos', 'ellos/ellas/ustedes': 'vístanse' },
    gerundio: 'vistiéndose', note: '自反动词；e→i 词干变化' },

  // ===== 自反动词 =====
  { inf: 'llamarse', zh: '名叫', group: '-ar', refl: true,
    impAf: { 'yo': '—', 'tú': 'llámate', 'él/ella/usted': 'llámese', 'nosotros': 'llamémonos', 'vosotros': 'llamaos', 'ellos/ellas/ustedes': 'llámense' },
    gerundio: 'llamándose', note: '自反动词，表示“名叫”；所有人称需带自反代词 me/te/se/nos/os/se' },
  { inf: 'levantarse', zh: '起床；起身', group: '-ar', refl: true,
    impAf: { 'yo': '—', 'tú': 'levántate', 'él/ella/usted': 'levántese', 'nosotros': 'levantémonos', 'vosotros': 'levantaos', 'ellos/ellas/ustedes': 'levántense' },
    gerundio: 'levantándose', note: '自反动词，表示“起床、起身”' },
];

// ---------- 展开为全量表 ----------
const VERBS = VERBS_RAW.map(expandVerb);
