const LESSON_CONTENT = {
  "B1.2-L07": {
    dialog: [
      { speaker: "A", es: "Buenos días. Acabo de llegar a Madrid y quisiera abrir una cuenta.", zh: "早上好。我刚到马德里，想开一个银行账户。" },
      { speaker: "B", es: "Claro. ¿Ya tiene el NIE? Hace falta presentarlo para cualquier trámite.", zh: "当然。您已经有外国人身份证号了吗？办任何手续都需要出示它。" },
      { speaker: "A", es: "Sí, me di cuenta de que sin él no podía hacer nada, así que lo pedí la semana pasada.", zh: "有的。我意识到没有它什么都办不了，所以上周就去申请了。" },
      { speaker: "B", es: "Muy bien. Tenga en cuenta que esta cuenta no tiene comisiones el primer año.", zh: "很好。请注意，这个账户第一年不收手续费。" },
      { speaker: "A", es: "Perfecto. Mi antiguo banco dejó de ofrecer este servicio y por eso me cambié.", zh: "太好了。我原来的银行停止提供这项服务了，所以我就换了银行。" },
      { speaker: "B", es: "Entiendo. ¿Quiere domiciliar la nómina o prefiere solo una cuenta de ahorro?", zh: "明白。您想绑定工资代发，还是只开一个储蓄账户？" },
      { speaker: "A", es: "De momento solo ahorro. Ya volveré para domiciliar la nómina cuando empiece a trabajar.", zh: "暂时只要储蓄。等我开始工作后，我会再来绑定工资代发。" },
      { speaker: "B", es: "De acuerdo. Firme aquí y la tarjeta le llegará a casa en una semana.", zh: "好的。请在这里签字，银行卡一周内会寄到您家。" }
    ],
    listening: {
      id: "B1.2-L07",
      text: "Lucía Fernández acaba de mudarse a Valencia y necesita abrir una cuenta en el Banco Mediterráneo de la calle Colón. Cuando llega a la ventanilla, se da cuenta de que ha dejado el pasaporte en casa. La empleada, la señora Martos, le explica que hace falta un documento de identidad y le pide que vuelva por la tarde. Lucía quiere dejar de pagar comisiones altas en su antiguo banco, por eso tiene muchas ganas de terminar el trámite hoy. A las cuatro vuelve a la oficina con el pasaporte y firma los papeles. La señora Martos le recuerda que tenga en cuenta que la tarjeta no se puede usar hasta la semana siguiente. Por fin, Lucía sale contenta: ha abierto su cuenta y además la empleada le cae muy bien.",
      questions: [
        { q: "¿Por qué Lucía no puede abrir la cuenta por la mañana?", options: ["Porque no tiene cita previa", "Porque ha dejado el pasaporte en casa", "Porque el banco está cerrado por la mañana"], answer: 1, tip: "Fíjate en lo que se da cuenta Lucía cuando llega a la ventanilla." },
        { q: "¿Por qué quiere Lucía cambiar de banco?", options: ["Porque quiere dejar de pagar comisiones altas", "Porque el Banco Mediterráneo le ofrece un regalo", "Porque su antiguo banco cerró su oficina"], answer: 0, tip: "Escucha lo que Lucía quiere dejar de pagar en su antiguo banco." },
        { q: "¿Qué le recuerda la señora Martos a Lucía antes de irse?", options: ["Que firme los papeles antes de las cuatro", "Que vuelva otro día con el pasaporte", "Que la tarjeta no se puede usar hasta la semana siguiente"], answer: 2, tip: "Busca la frase con tenga en cuenta cerca del final." }
      ]
    }
  },
  "B1.2-L08": {
    dialog: [
      { speaker: "A", es: "Gracias por venir. ¿Ha visto el gráfico que le enviamos por correo?", zh: "感谢您来面试。您看到我们邮件发给您的图表了吗？" },
      { speaker: "B", es: "Sí. La tabla muestra que las ventas aumentaron un quince por ciento en 2023.", zh: "看到了。表格显示 2023 年销售额增长了 15%。" },
      { speaker: "A", es: "Exacto. Sin embargo, la cifra descendió el año pasado. ¿Cómo lo explica?", zh: "没错。然而去年的数字下降了。您怎么解释？" },
      { speaker: "B", es: "Los datos reflejan una caída en el sector, pero nuestra empresa se mantuvo mejor que la media.", zh: "数据反映了整个行业的下滑，但我们公司保持得比行业平均水平好。" },
      { speaker: "A", es: "Interesante. ¿Qué porcentaje representan las ventas por internet en estos datos?", zh: "有意思。在这些数据里，线上销售占多大比例？" },
      { speaker: "B", es: "Según la estadística, alcanzan el cuarenta por ciento y la tendencia sigue al alza.", zh: "根据统计，线上销售已达到 40%，而且趋势继续上升。" },
      { speaker: "A", es: "Bien. ¿Qué propondría para disminuir los costes este año?", zh: "很好。今年您会提出什么方案来降低成本？" },
      { speaker: "B", es: "Analizaría el mercado y aumentaría la producción solo en los sectores con crecimiento estable.", zh: "我会分析市场，只在增长稳定的部门增加产量。" }
    ],
    listening: {
      id: "B1.2-L08",
      text: "Andrés Soto tuvo ayer una entrevista de trabajo en una empresa de logística de Sevilla. El director, el señor Guzmán, le mostró un gráfico con las ventas de los últimos tres años. Andrés explicó que la cifra aumentó en 2022 y alcanzó su punto más alto ese verano. Sin embargo, descendió mucho durante 2023 por la crisis del sector. Después señaló que los datos de este año muestran una recuperación lenta: las ventas por internet ya representan el treinta por ciento. El señor Guzmán le preguntó cómo disminuiría los costes sin despedir a nadie, y Andrés propuso revisar la tabla de gastos cada mes. Al final, el director le dijo que la estadística impresiona, pero que lo importante es la experiencia.",
      questions: [
        { q: "¿Qué pasó con la cifra de ventas entre 2022 y 2023?", options: ["Subió poco a poco durante los dos años", "Se mantuvo igual todo el tiempo", "Primero alcanzó su punto más alto y después descendió mucho"], answer: 2, tip: "Compara lo que pasó en 2022 con el sin embargo que habla de 2023." },
        { q: "¿Qué propuso Andrés para reducir los costes?", options: ["Revisar la tabla de gastos cada mes", "Despedir a los empleados nuevos", "Vender más productos por internet"], answer: 0, tip: "Busca la respuesta de Andrés a la pregunta del señor Guzmán." }
      ]
    }
  },
  "B1.2-L09": {
    dialog: [
      { speaker: "A", es: "Hola, ¿eres nueva en el grupo de voluntarios? Te he visto reciclar las botellas con mucho cuidado.", zh: "你好，你是志愿者小组的新成员吗？我看到你很认真地在回收瓶子。" },
      { speaker: "B", es: "Sí, es mi primer día. Me preocupa la contaminación de esta playa.", zh: "是的，这是我第一天来。我很担心这片海滩的污染。" },
      { speaker: "A", es: "A todos. El plástico es un problema grave para el medio ambiente y para nuestra salud.", zh: "大家都很担心。塑料对环境和我们的健康都是严重问题。" },
      { speaker: "B", es: "Por eso vine. Creo que todos podemos colaborar para que el barrio esté más limpio.", zh: "所以我来了。我认为每个人都可以出一份力，让社区变得更干净。" },
      { speaker: "A", es: "Totalmente. La convivencia mejora cuando hay respeto por los espacios comunes.", zh: "完全同意。当大家尊重公共空间时，共处就会更和谐。" },
      { speaker: "B", es: "¿La prensa ha hablado de esta actividad? Sería una buena noticia para el barrio.", zh: "媒体报道过这个活动吗？这对社区来说会是个好消息。" },
      { speaker: "A", es: "Sí, salió en la prensa local y en las redes sociales, y cada semana viene más gente.", zh: "报道过，上了当地报纸和社交网络，现在每周来的人越来越多。" },
      { speaker: "B", es: "Qué bien. La próxima vez traeré a mi hermano, que está buscando empleo y tiene tiempo libre.", zh: "太好了。下次我带我弟弟来，他正在找工作，有空闲时间。" }
    ],
    listening: {
      id: "B1.2-L09",
      text: "Carmen Ruiz organiza desde hace dos años un grupo de voluntarios en el barrio de La Latina, en Madrid. El sábado pasado, treinta personas colaboraron para limpiar el parque de la calle Toledo, donde la basura y el plástico dañaban el medio ambiente. Carmen dice que la convivencia en el barrio ha mejorado mucho porque los vecinos muestran más respeto por los espacios comunes. También han instalado contenedores nuevos para reciclar, para que los niños aprendan desde pequeños. La noticia salió en la prensa local y en las redes sociales, y ahora una empresa del barrio dona energía solar para el centro social. Sin embargo, Carmen explica que todavía falta gente para las tardes y pide que más vecinos participen, porque la salud del barrio depende de todos.",
      questions: [
        { q: "¿Qué hicieron los voluntarios el sábado pasado?", options: ["Limpiaron el parque de la calle Toledo", "Instalaron contenedores en el centro social", "Donaron energía solar al barrio"], answer: 0, tip: "Fíjate en la actividad que hicieron treinta personas en el parque." },
        { q: "¿Quién dona energía solar para el centro social?", options: ["El ayuntamiento de Madrid", "Una empresa del barrio", "El grupo de voluntarios de Carmen"], answer: 1, tip: "Escucha qué pasó después de que la noticia saliera en la prensa y las redes sociales." },
        { q: "¿Qué problema tiene todavía el grupo de Carmen?", options: ["No tiene contenedores para reciclar", "La prensa no quiere publicar la noticia", "Faltan voluntarios para las tardes"], answer: 2, tip: "Busca el sin embargo del final: lo que todavía falta en el grupo." }
      ]
    }
  },
  "B1.2-L10": {
    dialog: [
      { speaker: "A", es: "Buenos días, señor Álvarez. Quiero hablar de la fianza. Desde mi punto de vista, tiene que devolvérmela entera.", zh: "早上好，Álvarez 先生。我想谈谈押金的事。在我看来，您应该全额退还给我。" },
      { speaker: "B", es: "No estoy de acuerdo. La pared de la cocina está manchada y hay que pintarla.", zh: "我不同意。厨房的墙弄脏了，需要重新粉刷。" },
      { speaker: "A", es: "Esas manchas ya estaban cuando entré y puedo argumentarlo con fotos.", zh: "那些污渍我入住时就有了，我可以用照片来证明。" },
      { speaker: "B", es: "No estoy seguro. ¿Por qué no me lo dijo el primer mes?", zh: "我不确定。您为什么第一个月不告诉我？" },
      { speaker: "A", es: "Se lo escribí por correo en octubre. Estoy convencido de que usted lo recibió.", zh: "我十月份就写邮件告诉您了。我确信您收到了。" },
      { speaker: "B", es: "Mmm, es posible. Pero en mi opinión, la puerta del baño también está rota.", zh: "嗯，有可能。但在我看来，浴室的门也坏了。" },
      { speaker: "A", es: "Esa puerta ya cerraba mal cuando llegué. No pienso pagar la reparación.", zh: "我搬进来时那扇门就不好关了。我不打算付维修费。" },
      { speaker: "B", es: "De acuerdo, debatamos una solución: yo pinto la cocina y usted se queda con la mitad de la fianza.", zh: "好吧，我们商量个解决办法：我出钱粉刷厨房，押金退您一半。" }
    ],
    listening: {
      id: "B1.2-L10",
      text: "Miguel y su casera, la señora Pilar Domènech, tuvieron un fuerte desacuerdo en un piso de Gràcia, en Barcelona. Miguel quería recuperar la fianza de novecientos euros, pero la casera se oponía porque, en su opinión, el sofá estaba dañado. Miguel estaba convencido de que el sofá ya era viejo y argumentó que el contrato no exigía muebles nuevos. La discusión duró una hora y ninguno quería cambiar de postura. Finalmente, una vecina, Teresa, les ayudó a debatir con calma. Después de revisar las fotos del primer día, la casera aceptó que Miguel tenía razón en parte. Llegaron a un acuerdo: ella devolvía seiscientos euros y Miguel pagaba la limpieza final. Los dos salieron contentos porque defender las propias ideas con calma funciona mejor que gritar.",
      questions: [
        { q: "¿Por qué no quería la casera devolver toda la fianza?", options: ["Porque Miguel pagaba el alquiler tarde", "Porque en su opinión el sofá estaba dañado", "Porque quería vender el piso de Gràcia"], answer: 1, tip: "Escucha la razón que sigue a la expresión en su opinión." },
        { q: "¿Cómo terminaron el desacuerdo?", options: ["La casera devolvió los novecientos euros enteros", "Miguel pagó un sofá nuevo", "Miguel recuperó seiscientos euros y pagó la limpieza final"], answer: 2, tip: "Fíjate en el acuerdo final: cuánto devuelve ella y qué paga Miguel." }
      ]
    }
  },
  "B1.2-L11": {
    dialog: [
      { speaker: "A", es: "Buenos días. Tengo cita a las diez para la renovación de la residencia.", zh: "早上好。我预约了十点办理居留续期。" },
      { speaker: "B", es: "¿Su nombre, por favor? Necesito también su NIE y el empadronamiento.", zh: "请问您贵姓？我还需要您的外国人身份证和住家登记证明。" },
      { speaker: "A", es: "Aquí tiene todo. ¿Debo rellenar este impreso o el otro?", zh: "材料都在这儿。我该填这份表格还是另一份？" },
      { speaker: "B", es: "El modelo EX-00. Y le ruego que escriba con letra clara, porque el escrito va al registro.", zh: "EX-00 表格。另外请您书写工整，因为这份书面材料要归入档案。" },
      { speaker: "A", es: "Perdone, es que mi amigo me dijo: tú rellenas esto y ya está. Por eso pensé que era más fácil.", zh: "抱歉，我朋友跟我说过：你填这个就行了。所以我以为会更简单。" },
      { speaker: "B", es: "Entiendo, pero aquí prefiero que usemos un trato más formal. ¿Le parece bien?", zh: "理解，但在这里我希望我们用更正式的称呼方式。您看可以吗？" },
      { speaker: "A", es: "Por supuesto. Perdone el tono tan coloquial; estoy un poco nervioso.", zh: "当然可以。请原谅我这么口语化的语气，我有点紧张。" },
      { speaker: "B", es: "No se preocupe. Revise estos datos y firme al final, por favor.", zh: "没关系。请核对这些信息并在末尾签字。" }
    ],
    listening: {
      id: "B1.2-L11",
      text: "Javier Ortega fue ayer a la Oficina de Extranjería de Málaga para renovar su tarjeta de residencia. Javier habla muy bien el español coloquial, pero el funcionario, el señor Vidal, usaba un registro muy formal: le trató de usted durante toda la entrevista. Cuando Javier dijo vale, tío, el funcionario sonrió y le explicó que en un contexto oficial es mejor evitar ese tono. Javier tuvo que escribir un escrito a mano, y el señor Vidal le pidió frases completas, no expresiones orales como bueno o entonces. Al final, todo salió bien, pero Javier aprendió una lección importante: el tratamiento y el vocabulario cambian según el destinatario. En la calle habla con tuteo con sus amigos, pero en la oficina el lenguaje escrito y el respeto son lo primero.",
      questions: [
        { q: "¿Cuál de estas expresiones de Javier fue poco adecuada en la oficina?", options: ["Tratar de usted al funcionario", "Escribir el escrito a mano", "Decir vale, tío al funcionario"], answer: 2, tip: "Escucha la reacción del señor Vidal cuando Javier habla de forma muy coloquial." },
        { q: "¿Qué le pidió el señor Vidal para el escrito?", options: ["Que lo tradujera al inglés", "Que usara frases completas y no expresiones orales", "Que lo mandara por correo electrónico"], answer: 1, tip: "Fíjate en cómo debía escribir Javier el documento a mano." },
        { q: "¿Qué lección aprendió Javier al final?", options: ["Que el tratamiento y el vocabulario dependen del destinatario", "Que es mejor no hablar en las oficinas", "Que el tuteo siempre es incorrecto"], answer: 0, tip: "Busca la frase que resume lo que cambia según la persona que escucha." }
      ]
    }
  },
  "B1.2-L12": {
    dialog: [
      { speaker: "A", es: "Buenas tardes. Acabo de ver el anuncio y tengo muchas ganas de conocer el piso.", zh: "下午好。我刚看到广告，很想看看这套房子。" },
      { speaker: "B", es: "Bienvenido. Como verá, el salón es amplio y tiene mucha luz.", zh: "欢迎。您看，客厅很宽敞，采光也很好。" },
      { speaker: "A", es: "Me gusta. Si el precio es razonable, lo alquilaré. ¿Cuánto piden al mes?", zh: "我喜欢。如果价格合理，我就租下来。每月多少钱？" },
      { speaker: "B", es: "Ochocientos cincuenta euros. Tenga en cuenta que incluye los gastos de comunidad.", zh: "850 欧元。请注意，这包含了物业费。" },
      { speaker: "A", es: "Desde mi punto de vista, es un poco caro para este barrio, aunque la cocina está muy bien.", zh: "在我看来，对这个地段来说有点贵，不过厨房确实很好。" },
      { speaker: "B", es: "Puedo hablar con el dueño. Espero que lleguemos a un acuerdo.", zh: "我可以和房东谈谈。希望我们能达成一致。" },
      { speaker: "A", es: "Perfecto. Perdone mi español; llevo un año estudiando y mi meta es el B2.", zh: "太好了。请见谅我的西语；我学了一年，目标是考到 B2。" },
      { speaker: "B", es: "¡Habla muy bien! Con una buena revisión del nivel intermedio, pronto pasará al nivel avanzado.", zh: "您说得很好！把中级水平复习好，您很快就能进入高级水平。" }
    ],
    listening: {
      id: "B1.2-L12",
      text: "Ana Beltrán busca piso en Granada y ayer visitó uno en el barrio del Albaicín con la agente inmobiliaria, la señora Crespo. Ana acababa de terminar su revisión del nivel intermedio y quería practicar todo lo aprendido. Cuando la agente le dijo el precio, setecientos euros, Ana respondió que lo pensaría, porque desde su punto de vista era un poco caro. Después dijo que, si el dueño bajaba cincuenta euros, lo alquilaría ese mismo día. La señora Crespo se dio cuenta de que Ana hablaba con mucha seguridad y le preguntó por su nivel. Ana contestó que su objetivo es la certificación del B2, un nivel superior, donde aprenderá el subjuntivo imperfecto y el condicional perfecto. Al final, el dueño aceptó la rebaja y Ana firmó el contrato. Fue un buen día: encontró casa y practicó español de verdad.",
      questions: [
        { q: "Además de buscar casa, ¿por qué le interesaba a Ana la visita al piso?", options: ["Porque quería practicar lo aprendido en su revisión del nivel intermedio", "Porque la señora Crespo era su profesora de español", "Porque necesitaba presentar el contrato en el examen del B2"], answer: 0, tip: "Escucha lo que Ana acababa de terminar y lo que quería hacer durante la visita." },
        { q: "¿Cuánto pagará finalmente Ana por el piso?", options: ["Setecientos euros al mes", "Seiscientos cincuenta euros al mes", "Setecientos cincuenta euros al mes"], answer: 1, tip: "El precio era setecientos y el dueño aceptó la rebaja de cincuenta euros." }
      ]
    }
  }
};
