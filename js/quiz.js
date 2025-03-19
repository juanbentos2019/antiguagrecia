document.addEventListener("DOMContentLoaded", function() {
  // Variables globales del quiz
  let currentQuizQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let answersHistory = [];
  let currentSelection = null; // Almacena la opción seleccionada en la pregunta actual

  // Referencias a los elementos HTML
  const startContainer = document.getElementById("start-container");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");
  const startQuizBtn = document.getElementById("start-quiz");
  const nextBtn = document.getElementById("next-btn");
  const questionContainer = document.getElementById("question-container");
  const scoreText = document.getElementById("score-text");
  const retryQuizBtn = document.getElementById("retry-quiz");

  // Preguntas del quiz (55 preguntas divididas en 5 bloques de 11)
  const allQuestions = [
    // --- ORGANIZACIÓN SOCIAL Y POLÍTICA (11) ---
    {
      question: "¿Qué eran las polis en la Antigua Grecia?",
      options: [
        "Regiones unificadas bajo un solo rey",
        "Ciudades-estado con autonomía propia",
        "Colonias fenicias en territorio griego",
        "Áreas de culto exclusivo para sacerdotes"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cuál era la principal asamblea de gobierno en Atenas?",
      options: [
        "El Areópago",
        "La Asamblea (Ekklesía)",
        "La Gerusía",
        "La Heliea"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué grupo social estaba excluido de la ciudadanía ateniense?",
      options: [
        "Hombres libres mayores de 18 años",
        "Mujeres, esclavos y metecos",
        "Todos los habitantes de la ciudad",
        "Los filósofos y poetas"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué diferenciaba a Esparta de otras polis en lo político?",
      options: [
        "Su rígida formación militar y gobierno dual",
        "Su gobierno democrático pleno",
        "Su adoración exclusiva a Zeus",
        "Su rechazo total a la guerra"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué era el Ágora en la Antigua Grecia?",
      options: [
        "Un lugar para entrenar soldados",
        "La plaza principal de la polis para comercio y reuniones",
        "La fortaleza donde vivían los reyes",
        "La zona sagrada para el culto a Poseidón"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Por qué era relevante el debate en la política ateniense?",
      options: [
        "Porque solo hablaban los aristócratas",
        "Porque fomentaba la participación y el intercambio de ideas",
        "Porque era obligatorio para las mujeres",
        "No tenía relevancia, no se discutía nada"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué institución espartana supervisaba la educación y la conducta de sus ciudadanos?",
      options: [
        "La Ekklesía",
        "La Gerusía",
        "Los Éforos",
        "El Areópago"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué papel tenían las leyes en las polis griegas?",
      options: [
        "No existían leyes escritas",
        "Organizar la vida ciudadana y regular la justicia",
        "Eran dictadas únicamente por sacerdotes",
        "Se basaban en caprichos del gobernante"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué función cumplía el Consejo de los 500 (Boulé) en Atenas?",
      options: [
        "Elegir al rey vitalicio",
        "Preparar propuestas para la Asamblea",
        "Prohibir el comercio con otras polis",
        "Organizar rituales secretos"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué característica definía a un ciudadano ateniense?",
      options: [
        "Ser varón, libre y nacido en Atenas",
        "Ser meteco con permisos especiales",
        "Ser mayor de 30 años, aunque forastero",
        "Ser mujer con propiedades"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué buscaban los griegos con su organización política?",
      options: [
        "La participación ciudadana y el orden social",
        "Evitar todo tipo de debate",
        "La dominación total del Mediterráneo",
        "La abolición de cualquier forma de gobierno"
      ],
      correctAnswer: 0
    },
    // --- ECONOMÍA (11) ---
    {
      question: "¿Cuál era la base de la economía de la Antigua Grecia?",
      options: [
        "La agricultura y el comercio",
        "La explotación de minas de diamantes",
        "El turismo masivo",
        "La pesca en el Océano Atlántico"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué importancia tenía la moneda en las polis griegas?",
      options: [
        "No se usaba, siempre se hacía trueque",
        "Facilitaba las transacciones y establecía un valor común",
        "Era un objeto sagrado que no circulaba",
        "Se usaba solo para pagar a los soldados"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cuál era un producto agrícola destacado en Grecia?",
      options: [
        "La papa",
        "El olivo",
        "La caña de azúcar",
        "El cacao"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo influyó la geografía en la economía griega?",
      options: [
        "La costa y las islas favorecieron el comercio marítimo",
        "Solo había desiertos, por lo que se importaba todo",
        "Había oro en todas partes",
        "No había puertos naturales"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué hacían los artesanos para contribuir a la economía?",
      options: [
        "Elaboraban cerámica, tejidos y armas",
        "Solo trabajaban como agricultores",
        "Se dedicaban a la enseñanza de filosofía",
        "No existían artesanos en Grecia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué era importante la exportación de aceite de oliva?",
      options: [
        "No tenía relevancia en el comercio exterior",
        "Era un producto muy valorado en otras regiones",
        "Se usaba solo para encender lámparas en Atenas",
        "Era un recurso gratuito entregado por los dioses"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo se beneficiaban las polis del intercambio comercial?",
      options: [
        "Recibían productos que no podían producir y ganaban riquezas",
        "Perdían siempre al vender sus productos",
        "Evitaban la influencia cultural de otras regiones",
        "No realizaban comercio con nadie"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué tipo de mercado solía existir en el Ágora?",
      options: [
        "Uno de esclavos únicamente",
        "Un mercado abierto de alimentos, cerámica y textiles",
        "Un mercado clandestino",
        "No se permitía comerciar en el Ágora"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo contribuía la minería a la economía de Atenas?",
      options: [
        "Proporcionaba metales como la plata para acuñar monedas",
        "Solo se extraían piedras sin valor",
        "Estaba prohibida la minería",
        "No había minas en Grecia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué eran los metecos en el ámbito económico?",
      options: [
        "Forasteros que vivían y comerciaban en la polis",
        "Esclavos de la polis",
        "Sacerdotes dedicados a Zeus",
        "Antiguos guerreros sin derechos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cuál era la ventaja de tener rutas marítimas seguras?",
      options: [
        "Facilitaba la piratería",
        "Aseguraba el transporte de mercancías y el flujo comercial",
        "Dificultaba las exportaciones",
        "Solo servía para la pesca local"
      ],
      correctAnswer: 1
    },
    // --- RECURSOS NATURALES (11) ---
    {
      question: "¿Qué mineral extraían los atenienses en Laurión?",
      options: [
        "Diamantes",
        "Plata",
        "Petróleo",
        "Mármol"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Por qué eran valiosos los bosques en Grecia?",
      options: [
        "No existían bosques en Grecia",
        "Proporcionaban madera para construcciones y barcos",
        "Solo se usaban para la caza de leones",
        "No tenían valor económico"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo influía el clima mediterráneo en la agricultura?",
      options: [
        "Facilitaba el cultivo de vid y olivo",
        "Provocaba heladas constantes",
        "Imposibilitaba la siembra de cereales",
        "Llovía todo el año sin parar"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué recurso marino era importante para la dieta griega?",
      options: [
        "Los peces y mariscos del Mediterráneo",
        "Las ballenas del Atlántico",
        "Los cocodrilos del Nilo",
        "Los corales de la costa africana"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Para qué se utilizaban los ríos y manantiales en la Antigua Grecia?",
      options: [
        "Para regar cultivos y abastecer a la población",
        "Para desperdiciar agua",
        "Para alimentar animales exóticos",
        "No existía agua dulce en Grecia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué papel jugaba la tierra fértil en las llanuras griegas?",
      options: [
        "No había llanuras en Grecia",
        "Permitía sembrar cereales y otros alimentos",
        "Se dedicaba solo a la construcción de templos",
        "Era un territorio sagrado sin uso"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo aprovechaban los griegos las montañas?",
      options: [
        "Para cultivar arroz en las cimas",
        "Para extraer piedra y protegerse de invasiones",
        "No tenían montañas",
        "Se usaban solo para actos religiosos"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Por qué el mar era esencial para Grecia?",
      options: [
        "Facilitaba la comunicación, el comercio y la pesca",
        "No se usaba para nada",
        "Solo era una barrera natural",
        "Estaba prohibido navegar"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué recurso se obtenía de la ganadería en las zonas rurales?",
      options: [
        "Armas de hierro",
        "Leche, carne y lana",
        "Vino y aceite",
        "Esculturas de mármol"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo protegían los griegos sus bosques y manantiales?",
      options: [
        "Los incendiaban al final de cada verano",
        "Creían que estaban bajo protección divina y evitaban la sobreexplotación",
        "Solo los usaban para rituales de guerra",
        "No se permitía el acceso a nadie"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué hacían en caso de escasez de alimentos en su región?",
      options: [
        "Iniciaban guerras para robar cultivos",
        "Importaban granos de otras zonas mediante el comercio",
        "No tenían forma de conseguir comida extra",
        "Invocaban lluvias mágicas"
      ],
      correctAnswer: 1
    },
    // --- ACTIVIDADES ECONÓMICAS (11) ---
    {
      question: "¿Qué actividad era el pilar de la economía griega?",
      options: [
        
        "La cacería de animales salvajes",
        "La construcción de pirámides",
        "La agricultura",
        "La minería de uranio"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué productos obtenían de la agricultura?",
      options: [
        
        "Bananas y piñas",
        "Cereales, aceitunas, uvas y hortalizas",
        "Solo trigo",
        "Nada, el suelo era estéril"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué hacían los pescadores en las costas griegas?",
      options: [
        
        "Navegaban al Polo Norte",
        "Buscaban perlas para los sacerdotes",
        "Solo pescaban para la familia real",
        "Capturaban peces y comerciaban con ellos",
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué tipo de objetos fabricaban los artesanos griegos?",
      options: [
        "Cerámica, herramientas y armas",
        "Instrumentos electrónicos",
        "Carros voladores",
        "No existían artesanos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué era importante el comercio entre las distintas polis?",
      options: [
        "Permitía el intercambio de productos y el crecimiento económico",
        "Estaba prohibido el comercio interior",
        "Solo se usaba para regalar esclavos",
        "No había rutas marítimas ni terrestres"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué función tenía la minería en la actividad económica griega?",
      options: [
        
        "No era relevante",
        "Solo se minaban joyas para los templos",
        "Producía metales para acuñar monedas y fabricar armas",
        "Estaba dedicada a buscar tesoros mitológicos"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Cómo se transportaban los productos entre ciudades costeras?",
      options: [
        
        "En trenes subterráneos",
        "Principalmente en barcos de vela",
        "En caravanas de elefantes",
        "No se transportaban productos"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué actividades complementaban la agricultura en Grecia?",
      options: [
        "La cría de ganado y la elaboración de vino",
        "La enseñanza de filosofía",
        "La búsqueda de reliquias mágicas",
        "No existía ninguna otra actividad"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué rol tenían los mercados en la polis?",
      options: [
        "Servían para intercambiar bienes y socializar",
        "Estaban prohibidos para los ciudadanos",
        "Solo vendían esclavos",
        "Eran lugares secretos sin acceso"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cómo beneficiaba la diversidad de actividades económicas a la polis?",
      options: [
        
        "Generaba caos y competencia desleal",
        "No tenía ninguna ventaja",
        "Disminuía el comercio",
        "Evitaba depender de un solo producto y fomentaba el intercambio",
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué otro producto se elaboraba además del aceite de oliva?",
      options: [
        
        "Azúcar refinada",
        "Chocolate",
        "Especias de la India",
        "Vino a partir de uvas",
      ],
      correctAnswer: 3
    },
    // --- CULTURA Y RELIGIÓN (11) ---
    {
      question: "¿Quién era considerado el dios principal del Olimpo?",
      options: [
        "Zeus",
        "Hades",
        "Poseidón",
        "Hermes"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué diosa era protectora de la sabiduría y de la ciudad de Atenas?",
      options: [
        "Atenea",
        "Afrodita",
        "Hera",
        "Artemisa"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué importancia tenía el Partenón?",
      options: [
        
        "Funcionaba como granero",
        "Almacenaba armas de guerra",
        "Era un templo dedicado a la diosa Atenea",
        "Era la casa de los esclavos"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué enseñaban los mitos de dioses y héroes griegos?",
      options: [
        
        "Solo eran cuentos de terror",
        "Valores, virtudes y ejemplos de conducta",
        "No se transmitían a la gente",
        "Eran guías de estrategia militar"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué tipo de obras se presentaban en el teatro griego?",
      options: [
        "Tragedias y comedias",
        "Operetas en latín",
        "Batallas con animales",
        "No existía el teatro"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué eran importantes las fiestas religiosas en Grecia?",
      options: [
        
        "Se usaban solo para castigar a los criminales",
        "Eran restringidas a los extranjeros",
        "No se celebraban en la polis",
        "Unían a la comunidad y honraban a los dioses",
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué papel tuvo la filosofía en la cultura griega?",
      options: [
        
        "Fue prohibida por los gobernantes",
        "Se limitaba a la clase militar",
        "Promover el pensamiento crítico y el razonamiento",
        "No tuvo relevancia"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué instrumentos musicales eran comunes en Grecia?",
      options: [
        "La lira y la flauta",
        "El piano moderno",
        "El tambor africano",
        "La guitarra eléctrica"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cómo se relacionaba la religión con la vida diaria griega?",
      options: [
        "No existía relación alguna",
        "Solo los sacerdotes conocían a los dioses",
        "Estaba prohibido rendir culto en público",
        "Los dioses y diosas estaban presentes en rituales y celebraciones cotidianas",
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué enseñaban grandes pensadores como Sócrates, Platón y Aristóteles?",
      options: [
        "La importancia de la búsqueda de la verdad y el conocimiento",
        "La obediencia ciega al rey",
        "Las técnicas de pesca en el Egeo",
        "Nada, no dejaron escritos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué función tenía el Oráculo de Delfos?",
      options: [
        
        "Servir como almacén de granos",
        "Formar soldados espartanos",
        "Dar respuestas divinas y profecías",
        "Crear obras de teatro"
      ],
      correctAnswer: 2
    },
    // --- LEGADO (11) ---
    {
      question: "¿Qué idea política surgida en Atenas sigue siendo influyente hoy?",
      options: [
        
        "La tiranía",
        "La monarquía absoluta",
        "El totalitarismo",
        "La democracia",
      ],
      correctAnswer: 3
    },
    {
      question: "¿Cómo han influido los templos griegos en la arquitectura moderna?",
      options: [
        "Inspirando el uso de columnas y proporciones armoniosas",
        "Con rascacielos de cristal",
        "No tuvieron ninguna influencia",
        "Se limitaron a un estilo subterráneo"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué poemas épicos de Homero se consideran parte del legado literario griego?",
      options: [
        "La Ilíada y la Odisea",
        "El Poema de Gilgamesh y Beowulf",
        "El Quijote y la Eneida",
        "La República y Las Nubes"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué juegos se celebraban en Olimpia cada cuatro años?",
      options: [
        
        "La Copa del Mundo",
        "Los Juegos Olímpicos",
        "Las Panateneas",
        "Las carreras de carros en Roma"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo aportaron los griegos a las ciencias?",
      options: [
        "Desarrollaron la geometría, la astronomía y bases de la medicina",
        "Inventaron el teléfono y la radio",
        "No hicieron aportes científicos",
        "Se enfocaron solo en la magia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué influencia tuvo la filosofía griega en el pensamiento occidental?",
      options: [
        
        "No fue estudiada jamás",
        "Se aplicó solo en Esparta",
        "Fue rechazada en toda Europa",
        "Fundamentó la lógica, la ética y la política"
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué valoraban los griegos para construir una sociedad más justa?",
      options: [
        "La participación, el diálogo y la educación",
        "El silencio y el miedo",
        "El aislamiento total",
        "La obediencia sin cuestionar"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cómo influyó el arte griego en civilizaciones posteriores?",
      options: [
        "Se adoptaron principios de equilibrio y belleza en la escultura",
        "No hubo influencia alguna",
        "Generó rechazo total",
        "Solo se copió la cerámica"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué los Juegos Olímpicos antiguos son parte del legado cultural?",
      options: [
        
        "Eran luchas a muerte",
        "Fomentaban la competencia pacífica y la unidad entre polis",
        "Se realizaban cada mes",
        "Los organizaban los persas"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué enseñanza dejó la democracia ateniense para el mundo moderno?",
      options: [
        
        "Que solo un rey debe gobernar",
        "Que no se deben tener leyes",
        "La idea de que los ciudadanos pueden participar en las decisiones",
        "Que la libertad no es relevante"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Por qué se considera que el legado griego sigue vivo hoy?",
      options: [
        
        "Ya no existe ninguna otra cultura",
        "Los griegos no dejaron huella",
        "Se mantuvo todo en secreto hasta el siglo XX",
        "Sus ideas en política, arte y ciencia aún influyen en nuestra sociedad",
      ],
      correctAnswer: 3
    }
  ];

  // Manejo de bloques: cada bloque tiene 11 preguntas (5 bloques = 55 preguntas)
  function getQuizBlockIndex() {
    let index = parseInt(localStorage.getItem("quizBlockIndex"));
    if (isNaN(index)) {
      index = 0;
    }
    return index;
  }

  function updateQuizBlockIndex() {
    let index = getQuizBlockIndex();
    index = (index + 1) % 5; // 5 bloques (0 a 4)
    localStorage.setItem("quizBlockIndex", index);
  }

  // Iniciar el quiz
  function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    answersHistory = [];
    currentSelection = null;

    // Seleccionar el bloque de 11 preguntas según el índice actual
    const blockIndex = getQuizBlockIndex();
    currentQuizQuestions = allQuestions.slice(blockIndex * 11, blockIndex * 11 + 11);

    startContainer.style.display = "none";
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
  }

  // Mostrar la pregunta actual
  function showQuestion() {
    // Limpiar contenido previo y reiniciar la selección
    questionContainer.innerHTML = "";
    currentSelection = null;
    nextBtn.style.display = "block"; 

    // Obtener la pregunta actual
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];

    // Crear y mostrar el texto de la pregunta
    const questionEl = document.createElement("h3");
    questionEl.textContent = `Pregunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    questionContainer.appendChild(questionEl);

    // Crear y mostrar las opciones con eventos para seleccionar
    currentQuestion.options.forEach((option, index) => {
      const optionEl = document.createElement("div");
      optionEl.classList.add("option");
      optionEl.textContent = option;
      optionEl.addEventListener("click", () => selectOption(optionEl, index));
      questionContainer.appendChild(optionEl);
    });
  }

  // Seleccionar (o cambiar) la opción elegida
  function selectOption(selectedEl, selectedIndex) {
    // Quitar la clase "selected" de todas las opciones para mostrar solo la opción elegida
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"));
    // Marcar la opción actual y guardar la selección
    selectedEl.classList.add("selected");
    currentSelection = selectedIndex;
  }

  // Avanzar a la siguiente pregunta o mostrar resultados
  nextBtn.addEventListener("click", function() {
    // Verificar que se haya seleccionado una opción
    if (currentSelection === null) {
      alert("Por favor, selecciona una respuesta");
      return;
    }

    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const isCorrect = (currentSelection === currentQuestion.correctAnswer);

    // Guardar la respuesta en el historial
    answersHistory.push({
      question: currentQuestion.question,
      selected: currentSelection,
      selectedText: currentQuestion.options[currentSelection],
      correct: currentQuestion.correctAnswer,
      correctText: currentQuestion.options[currentQuestion.correctAnswer],
      isCorrect: isCorrect
    });

    if (isCorrect) {
      score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  // Mostrar resultados finales
  function showResult() {
    // Limpiar el contenedor de resultados para evitar duplicados
    resultContainer.innerHTML = "";
    
    // Crear título de resultados y el elemento para mostrar el puntaje
    const resultTitle = document.createElement("h2");
    resultTitle.textContent = "Resultado";
    resultContainer.appendChild(resultTitle);
    
    scoreText.textContent = `Obtuviste ${score} de ${currentQuizQuestions.length} puntos.`;
    resultContainer.appendChild(scoreText);

    // Crear listado de preguntas y respuestas
    const historyList = document.createElement("div");
    historyList.id = "history-list";
    historyList.style.marginTop = "20px";

    answersHistory.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.style.borderBottom = "1px solid #ddd";
      itemEl.style.padding = "10px 0";

      const icon = item.isCorrect ? "✔" : "✖";
      itemEl.innerHTML = `
        <strong>Pregunta ${index + 1}:</strong> ${item.question}<br>
        <em>Tu respuesta:</em> ${item.selectedText}<br>
        <em>Respuesta correcta:</em> ${item.correctText}
        <span style="color:${item.isCorrect ? 'green' : 'red'}; font-size:1.2em; margin-left:10px;">
          ${icon}
        </span>
      `;
      historyList.appendChild(itemEl);
    });

    resultContainer.appendChild(historyList);

    // Crear y mostrar el botón para el siguiente quiz
    retryQuizBtn.textContent = "Siguiente Quiz";
    retryQuizBtn.style.display = "block";
    resultContainer.appendChild(retryQuizBtn);

    // Ocultar el contenedor del quiz
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
  }

  // Al pulsar "Siguiente Quiz", se pasa al bloque siguiente y se reinicia el quiz
  retryQuizBtn.addEventListener("click", function() {
    updateQuizBlockIndex();
    startQuiz();
  });

  // Evento para iniciar el quiz
  startQuizBtn.addEventListener("click", startQuiz);
});
