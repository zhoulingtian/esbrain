const LESSON_CONTENT = {
  "B1.1-L07": {
    dialog: [
      { speaker: "A", es: "Buenas tardes, he perdido mi vuelo a Madrid porque el metro ha tenido un retraso esta mañana.", zh: "下午好，我没赶上飞往马德里的航班，因为今早地铁晚点了。" },
      { speaker: "B", es: "Lo siento. ¿Había hecho el registro en línea antes de venir al aeropuerto?", zh: "很遗憾。您来机场之前在网上办过值机吗？" },
      { speaker: "A", es: "Sí, había facturado la maleta en la aplicación, pero al llegar ya habían cerrado la puerta de embarque.", zh: "办过，我在应用上托运了行李，但到的时候登机口已经关了。" },
      { speaker: "B", es: "Entiendo. He encontrado un asiento en el vuelo de las seis; es un cambio reciente del horario.", zh: "明白了。我在六点的航班上找到一个座位，这是航班时刻最近的调整。" },
      { speaker: "A", es: "¿Cuánto cuesta el cambio? En viajes anteriores nunca había pagado un suplemento.", zh: "改签要多少钱？以前的旅行中我从没付过附加费。" },
      { speaker: "B", es: "Son sesenta euros. Si prefiere un vuelo posterior, el de mañana por la mañana es gratis.", zh: "六十欧元。如果您想选之后的航班，明天上午那班是免费的。" },
      { speaker: "A", es: "Prefiero el de hoy. El pasado ya no se puede cambiar, pero mi reunión de esta noche sí.", zh: "我选今天的。过去已经无法改变，但今晚的会议我还赶得上。" },
      { speaker: "B", es: "De acuerdo. Ya he emitido su nuevo billete; el embarque es en la puerta doce.", zh: "好的。我已经出了您的新机票，在十二号登机口登机。" }
    ],
    listening: {
      id: "B1.1-L07",
      text: "Lucía llegó al aeropuerto de Barajas a las ocho, pero su vuelo a Lisboa había salido diez minutos antes. Ella había salido de casa con tiempo; sin embargo, el taxi había tenido un pinchazo en la autopista. En el mostrador, la empleada le explicó que el cambio costaba cincuenta euros y que, por un cambio reciente del horario, el vuelo posterior salía a las tres de la tarde. Lucía contó que nunca había perdido un avión; en sus viajes anteriores siempre había llegado con dos horas de adelanto. Como el retraso del taxi no era culpa de la aerolínea, no hubo compensación. Al final pagó el suplemento, comió algo en la terminal y a las cinco ya estaba en Lisboa. Dice que ha aprendido la lección: el pasado no se puede cambiar, pero sí la hora de salir de casa.",
      questions: [
        { q: "¿Por qué perdió Lucía su vuelo a Lisboa?", options: ["Porque el metro tuvo un retraso esa mañana", "Porque el taxi tuvo un pinchazo en la autopista", "Porque llegó al aeropuerto a las ocho y media"], answer: 1, tip: "注意她出了家门之后在路上发生了什么， pinchazo 是关键。" },
        { q: "¿Cuánto le costó a Lucía cambiar el billete?", options: ["Treinta euros", "Diez euros", "Cincuenta euros"], answer: 2, tip: "柜台员工说明改签费用时给了一个明确的数字，别和 diez minutos 混淆。" },
        { q: "¿Qué contó Lucía sobre sus viajes anteriores?", options: ["Que siempre había llegado con dos horas de adelanto", "Que nunca había viajado a Lisboa", "Que había perdido varios vuelos antes"], answer: 0, tip: "找转述句里 había llegado 这个过去完成时所承载的信息。" }
      ]
    }
  },
  "B1.1-L08": {
    dialog: [
      { speaker: "A", es: "Buenas, mi portátil no enciende. Se me cayó ayer de la mesa.", zh: "你好，我的笔记本开不了机了，昨天我不小心把它从桌上摔了。" },
      { speaker: "B", es: "A ver... En esta tienda se reparan ordenadores de todas las marcas, pero primero hay que hacer un diagnóstico.", zh: "我看看……本店维修各种品牌的电脑，不过得先做个检测。" },
      { speaker: "A", es: "¿Cuánto se tarda normalmente? Lo necesito para trabajar el lunes.", zh: "一般要花多久？我周一要用它工作。" },
      { speaker: "B", es: "Se tarda un día en el diagnóstico. Ah, casi se me olvida preguntarle: ¿tiene copia de seguridad de sus archivos?", zh: "检测要一天。对了，我差点忘了问您：文件有备份吗？" },
      { speaker: "A", es: "No, no tengo. La última vez que se estropeó se me borraron unas fotos y no quiero que pase otra vez.", zh: "没有。上次电脑坏的时候我丢了一些照片，不想再来一次。" },
      { speaker: "B", es: "Tranquilo. Aquí se guardan los datos del cliente antes de tocar nada; se trabaja con mucho cuidado.", zh: "放心。我们这里在动任何部件之前都会先保存客户数据，操作很小心。" },
      { speaker: "A", es: "Perfecto. Y si el daño es accidental, ¿lo cubre la garantía?", zh: "太好了。那如果是意外损坏，保修管吗？" },
      { speaker: "B", es: "El daño accidental no se cubre, pero el presupuesto es gratis. Le llamamos mañana con el resultado.", zh: "意外损坏不在保修范围内，但报价免费。明天我们打电话告诉您结果。" }
    ],
    listening: {
      id: "B1.1-L08",
      text: "Marcos llevó su ordenador a una pequeña tienda del barrio donde se venden y se reparan portátiles. En la puerta había un cartel: se habla español e inglés. Marcos le explicó al técnico, un hombre llamado Andrés, que se le había caído el equipo y que la pantalla no funcionaba. Andrés respondió que ese daño parecía accidental y que en la tienda se hacía un diagnóstico gratuito en veinticuatro horas. Se dice en el barrio que Andrés es el mejor técnico, y Marcos lo comprobó: al día siguiente le dijeron que solo se había roto un cable y que la reparación costaba treinta euros. Marcos se fue contento; ahora dice que allí se trabaja rápido y sin engaños.",
      questions: [
        { q: "¿Qué le pasó al ordenador de Marcos?", options: ["Se le mojó y la pantalla dejó de funcionar", "Se le cayó, pero solo se le borraron unos archivos", "Se le cayó y la pantalla no funcionaba"], answer: 2, tip: "注意 Marcos 向 Andrés 解释故障起因的那句：se le había caído。" },
        { q: "¿Qué le dijeron a Marcos al día siguiente?", options: ["Que había que cambiar toda la pantalla", "Que solo se había roto un cable", "Que el ordenador no tenía arreglo"], answer: 1, tip: "听第二天店里告知诊断结果的部分，关键是 se había roto 带出的信息。" }
      ]
    }
  },
  "B1.1-L09": {
    dialog: [
      { speaker: "A", es: "Buenas, busco un libro de historia cuyo autor es un profesor de esta universidad.", zh: "你好，我在找一本历史书，其作者是这所大学的一位教授。" },
      { speaker: "B", es: "¿Se refiere al que escribió Sánchez sobre la Guerra Civil? Está en la segunda planta.", zh: "您是指桑切斯写的那本关于内战的吗？在二楼。" },
      { speaker: "A", es: "Ese mismo. También necesito la novela de la que habla todo el mundo, la que ganó el premio Cervantes.", zh: "就是那本。我还需要大家都在谈论的那本小说，就是获塞万提斯奖的那本。" },
      { speaker: "B", es: "La que ganó el año pasado está prestada; lo que puedo hacer es reservarla a su nombre.", zh: "去年获奖的那本被借走了，我能做的是以您的名义预约。" },
      { speaker: "A", es: "Vale. Y otra cosa: ¿dónde están las salas en las que se puede estudiar en grupo?", zh: "好。还有一件事：可以小组学习的房间在哪里？" },
      { speaker: "B", es: "Las salas de trabajo, que pertenecen a la biblioteca central, están al fondo; hay que reservarlas en recepción.", zh: "自习室属于中央图书馆，在大厅尽头，需要在前台预约。" },
      { speaker: "A", es: "Lo que no entiendo es el horario: la web dice una cosa y el cartel de la puerta, otra.", zh: "我不明白的是开放时间：网站上写的一个时间，门口牌子写的另一个。" },
      { speaker: "B", es: "El cartel es antiguo; lo correcto es lo que aparece en la web. Cerramos a las nueve.", zh: "牌子是旧的，以网站上的为准。我们九点关门。" }
    ],
    listening: {
      id: "B1.1-L09",
      text: "Elena es una estudiante cuya tesis trata sobre escritores andaluces. El martes fue a la biblioteca de la Universidad de Granada para buscar una novela de un autor cuyo nombre no recordaba. La bibliotecaria, una mujer llamada Carmen, le explicó que el ejemplar el que ella buscaba pertenecía a otra facultad y que lo que podía hacer era pedirlo por préstamo entre bibliotecas. Elena también necesitaba un artículo cuyo autor había ganado un premio de investigación. Carmen lo encontró en una revista que solo estaba en papel. Lo que más le sorprendió a Elena fue que el préstamo llegó en solo dos días, y no en una semana como ella pensaba. Ahora tiene todos los materiales y puede empezar a escribir el capítulo final de su tesis.",
      questions: [
        { q: "¿Por qué fue Elena a la biblioteca el martes?", options: ["Para buscar una novela de un autor cuyo nombre no recordaba", "Para devolver unos libros a otra facultad", "Para consultar una revista que solo estaba en papel"], answer: 0, tip: "听她此行目的的那句：cuyo nombre no recordaba 是关键信息。" },
        { q: "¿Qué problema había con la novela que Elena buscaba?", options: ["Estaba prestada a otro estudiante", "Pertenecía a otra facultad", "Solo existía en versión digital"], answer: 1, tip: "注意 Carmen 解释馆藏归属的那句，el que 引导的从句说明了是哪本书。" },
        { q: "¿Qué es lo que más le sorprendió a Elena?", options: ["Que el artículo solo estaba en papel", "Que Carmen encontrara el artículo tan rápido", "Que el préstamo llegó en solo dos días"], answer: 2, tip: "找以 lo que 开头、表达她意外感受的那句，并对比她原本预计的一周。" }
      ]
    }
  },
  "B1.1-L10": {
    dialog: [
      { speaker: "A", es: "Buenos días, doctora. Vengo porque el médico de urgencias me dijo que tenía que hacerme unas pruebas.", zh: "早上好，医生。我来是因为急诊医生告诉我说我得做一些检查。" },
      { speaker: "B", es: "A ver su informe... Aquí escribió que el dolor de estómago empezó hace dos semanas. ¿Es correcto?", zh: "我看看您的病历……他写道胃疼是两周前开始的，对吗？" },
      { speaker: "A", es: "Sí. También me preguntó si tomaba algún medicamento y le respondí que solo unas vitaminas.", zh: "对。他还问我是否在吃什么药，我回答说只吃了些维生素。" },
      { speaker: "B", es: "¿Le explicó qué tipo de pruebas necesitaba?", zh: "他有没有解释您需要做哪类检查？" },
      { speaker: "A", es: "Me explicó que harían un análisis de sangre y añadió que tenía que venir en ayunas.", zh: "他解释说要做血液检查，还补充说我得空腹来。" },
      { speaker: "B", es: "Perfecto, veo que ha venido sin desayunar. ¿Le contó algo sobre los resultados?", zh: "很好，我看您没吃早饭。他跟您说过关于结果的事吗？" },
      { speaker: "A", es: "Me contó que los resultados llegarían en tres días y que me avisarían por mensaje.", zh: "他告诉我结果三天后出来，会通过短信通知我。" },
      { speaker: "B", es: "Exacto. Pues vamos con el análisis; después le diré cuándo tiene que volver a consulta.", zh: "没错。那我们就做血液检查，之后我再告诉您什么时候来复诊。" }
    ],
    listening: {
      id: "B1.1-L10",
      text: "El lunes, Javier fue a su centro de salud de Valencia porque le dolía la espalda desde hacía una semana. La doctora Molina le preguntó si trabajaba muchas horas sentado, y él le respondió que pasaba ocho horas delante del ordenador. Ella le explicó que el problema no era grave y que no necesitaba medicamentos fuertes. También le dijo que hiciera ejercicio tres veces por semana y añadió que una silla mejor le vendría bien. Javier le contó a su mujer que la doctora le había recomendado nadar. Al final, Javier siguió los consejos: empezó a nadar los martes y los jueves, y en dos semanas el dolor casi desapareció. Ahora cuenta a todos que la doctora Molina tenía razón.",
      questions: [
        { q: "¿Qué le preguntó la doctora Molina a Javier?", options: ["Si trabajaba muchas horas sentado", "Si nadaba con regularidad", "Si tomaba medicamentos fuertes"], answer: 0, tip: "注意问诊开头那句用 si 引导的转述问句；游泳和药物是后面提到的，不是她问的。" },
        { q: "¿Qué le dijo la doctora que hiciera Javier?", options: ["Que tenía que nadar todos los días", "Que no podía usar más el ordenador", "Que hiciera ejercicio tres veces por semana"], answer: 2, tip: "听医生嘱咐运动频率的那句转述：dijo que hiciera 后面跟着的次数是关键。" }
      ]
    }
  },
  "B1.1-L11": {
    dialog: [
      { speaker: "A", es: "¿Has leído la noticia de que el ayuntamiento va a cerrar la biblioteca del barrio los fines de semana?", zh: "你看到那条新闻了吗？市政府要取消我们社区图书馆的周末开放。" },
      { speaker: "B", es: "Sí, la he visto. En primer lugar, me parece una mala decisión, porque muchos estudiantes solo pueden ir el sábado.", zh: "看到了。首先，我觉得这是个糟糕的决定，因为很多只有周六能去。" },
      { speaker: "A", es: "Es verdad; sin embargo, el ayuntamiento dice que así ahorrará doscientos mil euros al año.", zh: "确实；不过市政府说这样每年能省二十万欧元。" },
      { speaker: "B", es: "Por otro lado, la biblioteca da trabajo a doce personas. ¿Qué pasará con ellas?", zh: "另一方面，图书馆雇着十二个人，她们怎么办？" },
      { speaker: "A", es: "En cuanto a los empleados, dice la noticia que los trasladarán a otras bibliotecas; además, abrirán una sala de estudio en el centro cívico.", zh: "至于员工，新闻说会把他们调去别的图书馆；此外，还会在市民中心开一间自习室。" },
      { speaker: "B", es: "Eso está bien, pero en cambio la sala del centro cívico solo tendrá cincuenta plazas; por lo tanto, no es suficiente.", zh: "那倒是不错，但市民中心的自习室只有五十个座位，因此还是不够。" },
      { speaker: "A", es: "Tienes razón. Es decir, ganamos una sala pequeña y perdemos una biblioteca completa.", zh: "有道理。也就是说，我们得到的是一个小自习室，失去的是一整座图书馆。" },
      { speaker: "B", es: "En conclusión, deberían buscar otra forma de ahorrar. Voy a firmar la petición en línea esta tarde.", zh: "总之，他们应该另找省钱的办法。今天下午我就去签网上请愿。" }
    ],
    listening: {
      id: "B1.1-L11",
      text: "En el programa de radio de esta mañana, dos vecinos de Sevilla han comentado la noticia de que el ayuntamiento quiere prohibir los coches en el centro histórico. Marta, una comerciante de la calle Sierpes, ha dicho que, en primer lugar, la medida puede reducir las ventas de las tiendas, porque muchos clientes llegan en coche. Sin embargo, Pablo, presidente de la asociación de vecinos, ha dado otro argumento: por otro lado, el centro estará más limpio y más tranquilo, y además habrá más turistas a pie. Marta ha respondido que el principal inconveniente es el aparcamiento; en cambio, Pablo cree que los nuevos parkings junto al río son la solución. En conclusión, los dos están de acuerdo en una cosa: por lo tanto, quieren que el ayuntamiento haga una prueba de seis meses antes de decidir.",
      questions: [
        { q: "¿Qué noticia comentan los dos vecinos en el programa?", options: ["El cierre de las tiendas de la calle Sierpes", "La prohibición de los coches en el centro histórico", "La construcción de nuevos parkings junto al río"], answer: 1, tip: "节目开头第一句就点明了讨论主题；停车场的选项是 Pablo 提的方案，不是新闻本身。" },
        { q: "¿Por qué le preocupa la medida a Marta?", options: ["Porque muchos clientes llegan a las tiendas en coche", "Porque vive lejos del centro histórico", "Porque los nuevos parkings serán muy caros"], answer: 0, tip: "注意 Marta 在 en primer lugar 后面给出的理由。" },
        { q: "¿En qué están de acuerdo Marta y Pablo al final?", options: ["En que la medida debe cancelarse ya", "En que el centro estará más tranquilo", "En que el ayuntamiento haga una prueba de seis meses"], answer: 2, tip: "找 en conclusión 之后两人共同提出的具体要求。" }
      ]
    }
  },
  "B1.1-L12": {
    dialog: [
      { speaker: "A", es: "Buenas, vengo a matricularme y no sé qué asignaturas elegir este trimestre.", zh: "你好，我来注册选课，不知道这学期该选哪些课。" },
      { speaker: "B", es: "Le recomiendo que coja Fonética; es un reto, pero le ayudará mucho con la pronunciación.", zh: "我建议您选语音学，虽然有挑战，但对您的发音帮助很大。" },
      { speaker: "A", es: "El trimestre pasado me costó mucho el subjuntivo; fue la mayor dificultad de este nivel.", zh: "上学期虚拟式让我吃了不少苦头，是这个级别最大的难点。" },
      { speaker: "B", es: "No se preocupe: aquí se repasa el subjuntivo en todas las clases de conversación.", zh: "别担心，我们这里所有会话课都会复习虚拟式。" },
      { speaker: "A", es: "Si hay plazas, me gustaría coger también Literatura, aunque sea difícil.", zh: "如果有名额的话，我还想选文学课，哪怕它难。" },
      { speaker: "B", es: "Quedan tres plazas. Eso sí, le aconsejo que no coja más de cuatro asignaturas; el año pasado muchos alumnos se agotaron en mayo.", zh: "还剩三个名额。不过我劝您不要超过四门课，去年五月份很多学生都累垮了。" },
      { speaker: "A", es: "De acuerdo. ¿Podría decirme cuándo empiezan las clases?", zh: "好的。您能告诉我什么时候开课吗？" },
      { speaker: "B", es: "El día quince. Tengo confianza en que este trimestre notará un gran avance; ya tiene el nivel para lograrlo.", zh: "十五号。我相信这学期您会有很大进步，您已经具备实现它的水平了。" }
    ],
    listening: {
      id: "B1.1-L12",
      text: "Andrea se matriculó el lunes en la Universidad de Salamanca para empezar su segundo trimestre de español. En secretaría le dijeron que solo quedaban dos plazas en el curso de conversación, así que tuvo que decidir rápido. Su profesora le dijo que era mejor no coger más de tres asignaturas. Andrea recordaba que el trimestre anterior el subjuntivo había sido su mayor dificultad, pero quería superar ese reto. Al final se inscribió en conversación y en cultura española. Si todo va bien, en junio hará el examen del nivel B1 completo. Dice que tiene confianza en aprobar porque ha practicado mucho y ya nota un avance real: ayer habló veinte minutos con una amiga de Sevilla sin usar el diccionario ni una sola vez.",
      questions: [
        { q: "¿Qué problema encontró Andrea en secretaría?", options: ["Que el curso de cultura española estaba cancelado", "Que solo quedaban dos plazas en el curso de conversación", "Que no podía matricularse hasta junio"], answer: 1, tip: "听秘书处用 le dijeron que 转述给她的名额消息。" },
        { q: "¿Por qué tiene Andrea confianza en aprobar el examen de junio?", options: ["Porque ha practicado mucho y ya nota un avance real", "Porque el examen de junio será más fácil que el anterior", "Porque su amiga de Sevilla le ayudará ese día"], answer: 0, tip: "找她把信心和练习、进步联系起来的那句，结尾二十分钟的对话是证据。" }
      ]
    }
  }
};
