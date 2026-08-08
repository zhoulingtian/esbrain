// B1.1-L01 ~ L06 听力与对话重写：真实场景、真实翻译、可提问的情节。
const LESSON_CONTENT = {
  "B1.1-L01": {
    dialog: [
      { speaker: "A", es: "Oye, Lucía, el sábado es mi cumpleaños. Quiero que vengas a cenar con nosotros.", zh: "嘿，露西娅，周六是我生日。我想让你来和我们一起吃晚饭。" },
      { speaker: "B", es: "¡Me alegro mucho de que me invites! Pero temo que mi madre no me dé permiso.", zh: "你邀请我，我太高兴了！但我担心我妈不会批准我去。" },
      { speaker: "A", es: "Dudo que se ponga tan seria. Pídele permiso con tiempo; es una cena tranquila en mi casa.", zh: "我不信她会那么较真。你提前向她请假；就是在我家的一顿安静晚餐。" },
      { speaker: "B", es: "Vale. Espero que no haya problema, porque mi mayor deseo es celebrarlo contigo.", zh: "好吧。我希望没问题，因为我最大的愿望就是和你一起庆祝。" },
      { speaker: "A", es: "No creo que te diga que no. Si quieres, hablo yo con ella.", zh: "我认为她不会拒绝你。如果你愿意，我去跟她说。" },
      { speaker: "B", es: "Mejor no. Necesito que me traten como una adulta; se lo pediré yo misma.", zh: "最好别。我需要他们把我当成年人对待；我亲自去求她。" },
      { speaker: "A", es: "Perfecto. Solo te pido que me confirmes antes del viernes.", zh: "好。我只求你在周五之前给我个准信。" },
      { speaker: "B", es: "Claro. Y si mi madre dice que sí, te ayudo a preparar la tarta.", zh: "当然。要是我妈同意了，我还帮你做蛋糕。" }
    ],
    listening: {
      id: "B1.1-L01",
      text: "El lunes por la mañana, en la cafetería de su instituto de Granada, Sofía invitó a su amiga Elena a una excursión a Sierra Nevada el próximo domingo. —Quiero que vengas conmigo y con mi primo Andrés —le dijo—. Espero que te guste caminar por la montaña. Elena se alegró mucho de la invitación, pero tenía un problema: los domingos cuida a su hermano pequeño mientras su madre trabaja. —Temo que mi madre no me dé permiso —respondió—. Dudo que quiera cambiar los planes de la familia. Sofía le propuso hablar con la madre esa misma tarde. —A tu madre le importa que salgas con amigas —le dijo—. Pídele permiso hoy; no creo que te diga que no. El martes, Elena llegó al instituto muy contenta: su madre aceptó, pero le puso una condición: volver a casa antes de las siete de la tarde.",
      questions: [
        { q: "¿Qué invitación le hizo Sofía a Elena en la cafetería?", options: ["Cenar en su casa para celebrar su cumpleaños", "Cuidar juntas al hermano pequeño de Elena", "Ir de excursión a Sierra Nevada el próximo domingo"], answer: 2, tip: "Sofía menciona la montaña y a su primo Andrés al lanzar la invitación." },
        { q: "¿Qué espera Sofía al invitar a Elena?", options: ["Que a Elena le guste caminar por la montaña", "Que Elena prepare la comida de la excursión", "Que la madre de Elena no trabaje ese domingo"], answer: 0, tip: "Está en la frase que empieza con espero que, justo después de la invitación." },
        { q: "¿Qué condición le puso la madre a Elena?", options: ["Llevar también a su hermano pequeño", "Volver a casa antes de las siete de la tarde", "Ir acompañada del primo de Sofía"], answer: 1, tip: "Aparece en la última frase, cuando Elena llega contenta el martes." }
      ]
    }
  },
  "B1.1-L02": {
    dialog: [
      { speaker: "A", es: "¿Qué tal la búsqueda de empleo, Diego? ¿Has encontrado algo?", zh: "迭戈，工作找得怎么样了？找到什么了吗？" },
      { speaker: "B", es: "Nada de momento. Busco algo que me motive de verdad, no cualquier cosa.", zh: "暂时什么都没有。我在找一份能真正激励我的工作，不是随便什么都行。" },
      { speaker: "A", es: "¿Has mirado en el portal de empleo del ayuntamiento?", zh: "你看过市政府的就业网站吗？" },
      { speaker: "B", es: "Sí, pero no encuentro a nadie que busque gente sin experiencia. No hay nada que encaje conmigo.", zh: "看了，但我找不到愿意招无经验者的雇主。没有适合我的职位。" },
      { speaker: "A", es: "¿Conoces a alguien que trabaje en el hotel nuevo de la calle Mayor? Dicen que necesitan camareros.", zh: "你认识在 Mayor 街那家新酒店上班的人吗？听说他们需要服务员。" },
      { speaker: "B", es: "No conozco a nadie allí, pero puedo llevar el currículum esta tarde.", zh: "那里我谁也不认识，但我今天下午可以去投简历。" },
      { speaker: "A", es: "Buena idea. Y si no hay nada allí, mi prima busca a alguien que cuide a sus hijos los fines de semana.", zh: "好主意。要是那里没机会，我表姐在找一个周末照看她孩子的人。" },
      { speaker: "B", es: "Perfecto. Quiero un puesto que tenga un horario definido, sea lo que sea.", zh: "太好了。不管是什么工作，我想要一份作息明确的职位。" }
    ],
    listening: {
      id: "B1.1-L02",
      text: "Carmen, una joven de veinticuatro años de Sevilla, lleva tres meses buscando trabajo. No busca cualquier cosa: quiere un empleo que le guste y que le deje tiempo para sus estudios de diseño. En abril fue a seis entrevistas, pero ninguna oferta le convencía. En una tienda de ropa le ofrecieron un horario indefinido, y ella prefiere algo definido. Además, casi nadie valoraba su experiencia como voluntaria en una ONG. La semana pasada, su amigo Luis le habló de la librería El Faro, en el barrio de Triana. Allí buscan a alguien que sepa inglés y que pueda trabajar los fines de semana. Carmen llevó su currículum el miércoles y el jueves tuvo una entrevista con la dueña, la señora Vega. El viernes la llamaron: empieza el lunes, con veinte horas semanales.",
      questions: [
        { q: "¿Qué clase de empleo busca Carmen?", options: ["Cualquier cosa, aunque no le guste", "Un empleo que le guste y le deje tiempo para estudiar", "Un puesto fijo de voluntaria en una ONG"], answer: 1, tip: "Lo explica al principio con una oración de relativo: que le guste y que le deje tiempo." },
        { q: "¿Qué pasó el viernes?", options: ["Carmen tuvo la entrevista con la señora Vega", "Luis le habló de la librería El Faro", "Llamaron a Carmen para decirle que empieza el lunes"], answer: 2, tip: "Ordena los días que se mencionan: miércoles, jueves y, por último, viernes." }
      ]
    }
  },
  "B1.1-L03": {
    dialog: [
      { speaker: "A", es: "Por fin tenemos vacaciones en agosto. ¿Planeamos el viaje a la costa?", zh: "我们八月终于有假期了。来规划一下海边之旅吧？" },
      { speaker: "B", es: "Sí. Yo reservaré el hotel en cuanto me paguen la nómina.", zh: "好。工资一发我就订酒店。" },
      { speaker: "A", es: "Perfecto. Te llamaré cuando saque los billetes de tren, ¿vale?", zh: "太好了。我买了火车票就给你打电话，行吗？" },
      { speaker: "B", es: "Vale. Y avísame tan pronto como sepas los horarios.", zh: "行。你一知道车次时刻就通知我。" },
      { speaker: "A", es: "Claro. No haremos las maletas hasta que terminemos los exámenes.", zh: "当然。我们考完试再收拾行李。" },
      { speaker: "B", es: "Buena idea. Después de que termine mi último examen, quiero descansar un día entero.", zh: "好主意。最后一门考完之后，我想先好好休息一整天。" },
      { speaker: "A", es: "Y cuando lleguemos a Valencia, iremos directos a la playa.", zh: "等我们到了瓦伦西亚，就直接去海滩。" },
      { speaker: "B", es: "Me encanta el plan. Es broma, pero no volvería hasta que acabara el verano... solo tenemos una semana.", zh: "这计划我太喜欢了。开玩笑说一句：我真想夏天结束才回来……可惜我们只有一周。" }
    ],
    listening: {
      id: "B1.1-L03",
      text: "Marta y su hermano Pablo viven en Madrid y este verano harán un viaje a Galicia con su abuela Rosa. El plan es salir el diez de julio, pero todavía no han comprado nada. Marta comprará los billetes de tren en cuanto cobre su sueldo, a finales de junio. Pablo reservará la casa rural de A Coruña tan pronto como Marta le confirme las fechas. La abuela Rosa, que tiene setenta años, les ha dicho que no hará la maleta hasta que vea los billetes con sus propios ojos. Todos quieren visitar la playa de las Catedrales cuando haga buen tiempo, porque el año pasado llovió tres días seguidos. Marta avisará a sus padres en cuanto lleguen a la estación. Y Pablo ha prometido que llamará a su novia todos los días después de que cene.",
      questions: [
        { q: "¿Cuándo comprará Marta los billetes de tren?", options: ["En cuanto cobre su sueldo, a finales de junio", "Tan pronto como Pablo reserve la casa rural", "Cuando lleguen a la estación de A Coruña"], answer: 0, tip: "Busca la frase con en cuanto; habla del sueldo de Marta." },
        { q: "¿Qué ha dicho la abuela Rosa sobre la maleta?", options: ["Que la hará tan pronto como llegue julio", "Que prefiere que Marta se la prepare", "Que no la hará hasta que vea los billetes con sus propios ojos"], answer: 2, tip: "La abuela pone su condición con hasta que." },
        { q: "¿Qué ha prometido Pablo?", options: ["Avisar a sus padres al llegar a Galicia", "Llamar a su novia todos los días después de cenar", "Reservar la casa rural antes de finales de junio"], answer: 1, tip: "Es la última frase del texto, con después de que." }
      ]
    }
  },
  "B1.1-L04": {
    dialog: [
      { speaker: "A", es: "¿Organizamos la fiesta del barrio en el parque, como el año pasado?", zh: "我们把社区联欢会还像去年一样办在公园里吗？" },
      { speaker: "B", es: "Sí, pero hay que prepararla bien para que venga más gente.", zh: "好，但得好好准备，好让更多人来。" },
      { speaker: "A", es: "Yo puedo hablar con el ayuntamiento para que nos dejen usar el quiosco.", zh: "我可以去跟市政府谈，让他们允许我们使用那个售货亭。" },
      { speaker: "B", es: "Genial. Y aunque llueva ese día, podemos celebrarla dentro del centro cívico.", zh: "太好了。而且就算那天下雨，我们也可以在市民中心里面办。" },
      { speaker: "A", es: "Cierto. No la cancelaremos a menos que haga muy mal tiempo.", zh: "没错。除非天气特别糟，否则我们不取消。" },
      { speaker: "B", es: "De acuerdo. Mi objetivo es que participe también la gente mayor del barrio.", zh: "同意。我的目标是让社区里的老年人也参与进来。" },
      { speaker: "A", es: "Entonces pondré carteles en el portal a fin de que todos se enteren.", zh: "那我就在楼道里贴海报，让大家都知道。" },
      { speaker: "B", es: "Perfecto. Con tal de que cada vecino traiga un plato, la comida está resuelta.", zh: "太好了。只要每位邻居带一道菜，吃的就解决了。" }
    ],
    listening: {
      id: "B1.1-L04",
      text: "La asociación de vecinos La Plazoleta, del barrio de San Isidro en Zaragoza, prepara un mercadillo solidario para el próximo sábado en la plaza del Carmen. El objetivo es recaudar dinero para comprar libros nuevos para la biblioteca del barrio, que cerró en marzo por una avería. Andrés, el presidente de la asociación, ha colgado carteles en las tiendas a fin de que todos los vecinos se enteren. —Aunque llueva, celebraremos el mercadillo dentro del centro cívico —explica—. No lo cancelaremos a menos que el ayuntamiento cierre el centro. Cada familia traerá objetos usados para que los niños aprendan a compartir, y la panadería del señor Fuentes donará cien bollos. Andrés confía en conseguir ochocientos euros; el año pasado lograron seiscientos cincuenta. Con tal de que participe medio barrio, dice, el propósito está casi cumplido.",
      questions: [
        { q: "¿Para qué quiere la asociación el dinero del mercadillo?", options: ["Para comprar libros nuevos para la biblioteca del barrio", "Para arreglar la avería del centro cívico", "Para pagar los cien bollos del señor Fuentes"], answer: 0, tip: "Se explica junto al objetivo, al principio del texto." },
        { q: "¿Qué harán si llueve el sábado?", options: ["Cancelarán el mercadillo", "Trasladarán el mercadillo a la panadería", "Celebrarán el mercadillo dentro del centro cívico"], answer: 2, tip: "Andrés lo dice con aunque; la cancelación solo ocurre si cierra el centro." }
      ]
    }
  },
  "B1.1-L05": {
    dialog: [
      { speaker: "A", es: "Perdone, camarero. Me gustaría hablar con usted un momento sobre mi pedido.", zh: "不好意思，服务员。我想和您谈一下我点的菜。" },
      { speaker: "B", es: "Claro, dígame. ¿Hay algún problema?", zh: "当然，您说。有什么问题吗？" },
      { speaker: "A", es: "Pedí el pescado a la plancha, pero está frío. ¿Podría calentarlo, por favor?", zh: "我点的是铁板鱼，但它是凉的。您能帮我热一下吗？" },
      { speaker: "B", es: "Lo siento mucho. Ahora mismo se lo cambio. ¿Querría otro plato mientras tanto?", zh: "非常抱歉。我马上给您换一份。这期间您想要别的菜吗？" },
      { speaker: "A", es: "No, gracias. Preferiría el mismo plato, pero caliente.", zh: "不用了，谢谢。我更想要原来那道菜，但要是热的。" },
      { speaker: "B", es: "Entendido. La sopa de su mujer, ¿también llegó fría?", zh: "明白了。您夫人的汤也是凉的吗？" },
      { speaker: "A", es: "Sí, y deberían revisar la cocina. Le pediría también un poco más de pan, por favor.", zh: "是的，你们应该检查一下厨房。另外我还想请您再拿点面包来。" },
      { speaker: "B", es: "Por supuesto. Les traeré la cuenta con un diez por ciento de descuento y el pan enseguida.", zh: "没问题。我马上拿面包来，账单给您打九折。" }
    ],
    listening: {
      id: "B1.1-L05",
      text: "El sábado pasado, Javier y su mujer Cristina celebraron su décimo aniversario de boda en el restaurante Casa Manolo, en el centro de Salamanca. Reservaron mesa para las nueve, pero les dieron una junto a la puerta de la cocina. —Querríamos una mesa más tranquila, si es posible —dijo Javier con mucha cortesía. El camarero Ramón les ofreció otra junto a la ventana, pero tardaron veinte minutos en moverla. Cuando llegó la comida, el solomillo de Javier estaba frío y muy hecho, aunque él lo había pedido poco hecho. —¿Podría cambiármelo, por favor? —preguntó. Ramón se disculpó y le trajo otro plato enseguida. Al final, Cristina le dijo al dueño: —Me gustaría volver, pero deberían atender mejor las mesas especiales. El dueño les invitó a dos cafés y les hizo un quince por ciento de descuento en la cuenta, que fue de sesenta euros.",
      questions: [
        { q: "¿Qué celebraban Javier y Cristina en Casa Manolo?", options: ["El cumpleaños de Cristina", "Su décimo aniversario de boda", "La jubilación del camarero Ramón"], answer: 1, tip: "Está en la primera frase del texto." },
        { q: "¿Qué le pidió Javier al camarero cuando llegó la comida?", options: ["Un plato nuevo, porque el solomillo estaba frío y muy hecho", "Otra mesa junto a la ventana", "La cuenta con el quince por ciento de descuento"], answer: 0, tip: "Es la petición con podría, justo después de describir el problema del plato." },
        { q: "¿Cómo terminó la cena?", options: ["Pagaron sesenta euros sin ningún descuento", "El dueño les ofreció otra mesa junto a la cocina", "El dueño les invitó a dos cafés y les hizo un descuento"], answer: 2, tip: "Fíjate en el final: dos cafés y un quince por ciento." }
      ]
    }
  },
  "B1.1-L06": {
    dialog: [
      { speaker: "A", es: "Llevas un mes yendo al gimnasio. ¿Notas algún cambio?", zh: "你去健身房一个月了。感觉到什么变化了吗？" },
      { speaker: "B", es: "Poco, la verdad. Si entreno tres veces por semana, ¿mejoraré de verdad?", zh: "说实话，没什么。如果我每周练三次，真的会有进步吗？" },
      { speaker: "A", es: "Seguro. Si sigues una rutina, verás resultados en dos meses.", zh: "肯定。如果你坚持一套训练计划，两个月就能看到效果。" },
      { speaker: "B", es: "¿Y si como lo mismo de siempre?", zh: "那要是我还照老样子吃呢？" },
      { speaker: "A", es: "Si no cambias la dieta, perderás peso más despacio. Si quieres, te paso la tabla de mi entrenador.", zh: "如果你不改饮食，减重会慢一些。如果你愿意，我把我教练的训练表发给你。" },
      { speaker: "B", es: "Vale. Y si me lesiono, ¿qué hago?", zh: "好。那如果我受伤了怎么办？" },
      { speaker: "A", es: "Si te duele algo, para y descansa. Si descansas bien, los músculos se recuperan.", zh: "如果哪里疼，就停下来休息。休息好了，肌肉才能恢复。" },
      { speaker: "B", es: "Tiene sentido. Si voy contigo los martes y jueves, me costará menos faltar.", zh: "有道理。如果我周二周四和你一起去，就不那么容易缺勤了。" }
    ],
    listening: {
      id: "B1.1-L06",
      text: "Tomás, un oficinista de treinta y cinco años de Murcia, pesaba noventa y dos kilos cuando el médico le dijo que tenía el colesterol alto. En enero se apuntó al gimnasio Vital, cerca de su casa, y pagó seis meses por adelantado. Su entrenadora, Nuria, le hizo un plan muy claro. —Si vienes tres veces por semana, perderás cinco kilos antes del verano —le dijo—. Y si caminas media hora al día, tu corazón funcionará mejor. Tomás le preguntó si podía comer chocolate. Nuria se rio: —Si comes chocolate todos los días, no perderás nada. Pero si lo dejas para el fin de semana, no pasará nada. En mayo, Tomás pesaba ochenta y seis kilos. —Si sigo así —dijo—, en septiembre estaré en mi peso ideal.",
      questions: [
        { q: "¿Por qué se apuntó Tomás al gimnasio?", options: ["Porque el médico le dijo que tenía el colesterol alto", "Porque el gimnasio Vital quedaba cerca de su casa", "Porque quería comer chocolate sin engordar"], answer: 0, tip: "La causa está en la primera frase; lo de la cercanía es solo un detalle." },
        { q: "Según Nuria, ¿qué pasará si Tomás entrena tres veces por semana?", options: ["Su corazón funcionará mejor", "Perderá cinco kilos antes del verano", "Podrá dejar de caminar a diario"], answer: 1, tip: "Es la primera promesa de la entrenadora; no la confundas con la de caminar media hora." }
      ]
    }
  }
};
