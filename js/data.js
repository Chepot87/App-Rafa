const categories = [
  {
    id: "animales",
    name: "Animales",
    emoji: "🐾",
    items: [
      { id: "animales-perro", word: "Perro", emoji: "🐶", image: null },
      { id: "animales-gato", word: "Gato", emoji: "🐱", image: null },
      { id: "animales-vaca", word: "Vaca", emoji: "🐮", image: null },
      { id: "animales-caballo", word: "Caballo", emoji: "🐴", image: null },
      { id: "animales-pajaro", word: "Pájaro", emoji: "🐦", image: null },
      { id: "animales-pez", word: "Pez", emoji: "🐟", image: null },
      { id: "animales-conejo", word: "Conejo", emoji: "🐰", image: null },
      { id: "animales-cerdo", word: "Cerdo", emoji: "🐷", image: null }
    ]
  },
  {
    id: "frutas",
    name: "Frutas",
    emoji: "🍓",
    items: [
      { id: "frutas-manzana", word: "Manzana", emoji: "🍎", image: null },
      { id: "frutas-banana", word: "Banana", emoji: "🍌", image: null },
      { id: "frutas-naranja", word: "Naranja", emoji: "🍊", image: null },
      { id: "frutas-fresa", word: "Fresa", emoji: "🍓", image: null },
      { id: "frutas-uvas", word: "Uvas", emoji: "🍇", image: null },
      { id: "frutas-pina", word: "Piña", emoji: "🍍", image: null },
      { id: "frutas-mango", word: "Mango", emoji: "🥭", image: null },
      { id: "frutas-melon", word: "Melón", emoji: "🍈", image: null }
    ]
  },
  {
    id: "ropa",
    name: "Ropa",
    emoji: "👕",
    items: [
      { id: "ropa-camisa", word: "Camisa", emoji: "👕", image: null },
      { id: "ropa-pantalon", word: "Pantalón", emoji: "👖", image: null },
      { id: "ropa-zapatos", word: "Zapatos", emoji: "👟", image: null },
      { id: "ropa-vestido", word: "Vestido", emoji: "👗", image: null },
      { id: "ropa-sombrero", word: "Sombrero", emoji: "🎩", image: null },
      { id: "ropa-calcetines", word: "Medias", emoji: "🧦", image: null },
      { id: "ropa-bufanda", word: "Bufanda", emoji: "🧣", image: null },
      { id: "ropa-guantes", word: "Guantes", emoji: "🧤", image: null }
    ]
  },
  {
    id: "vehiculos",
    name: "Vehículos",
    emoji: "🚗",
    items: [
      { id: "vehiculos-carro", word: "Carro", emoji: "🚗", image: null },
      { id: "vehiculos-autobus", word: "Autobús", emoji: "🚌", image: null },
      { id: "vehiculos-avion", word: "Avión", emoji: "✈️", image: null },
      { id: "vehiculos-barco", word: "Barco", emoji: "🚢", image: null },
      { id: "vehiculos-tren", word: "Tren", emoji: "🚂", image: null },
      { id: "vehiculos-bicicleta", word: "Bicicleta", emoji: "🚲", image: null },
      { id: "vehiculos-moto", word: "Moto", emoji: "🏍️", image: null },
      { id: "vehiculos-helicoptero", word: "Helicóptero", emoji: "🚁", image: null }
    ]
  },
  {
    id: "comida",
    name: "Comida",
    emoji: "🍕",
    items: [
      { id: "comida-pizza", word: "Pizza", emoji: "🍕", image: null },
      { id: "comida-arroz", word: "Arroz", emoji: "🍚", image: null },
      { id: "comida-pan", word: "Pan", emoji: "🍞", image: null },
      { id: "comida-pollo", word: "Pollo", emoji: "🍗", image: null },
      { id: "comida-huevo", word: "Huevo", emoji: "🥚", image: null },
      { id: "comida-queso", word: "Queso", emoji: "🧀", image: null },
      { id: "comida-sopa", word: "Sopa", emoji: "🍜", image: null },
      { id: "comida-tacos", word: "Tacos", emoji: "🌮", image: null }
    ]
  },
  {
    id: "cuerpo",
    name: "Cuerpo",
    emoji: "🧍",
    items: [
      { id: "cuerpo-cabeza", word: "Cabeza", emoji: "🙂", image: "img/categories/cuerpo/cabeza.png" },
      { id: "cuerpo-ojos", word: "Ojos", emoji: "👀", image: null },
      { id: "cuerpo-nariz", word: "Nariz", emoji: "👃", image: null },
      { id: "cuerpo-boca", word: "Boca", emoji: "👄", image: null },
      { id: "cuerpo-oreja", word: "Oreja", emoji: "👂", image: null },
      { id: "cuerpo-mano", word: "Mano", emoji: "✋", image: null },
      { id: "cuerpo-pie", word: "Pie", emoji: "🦶", image: null },
      { id: "cuerpo-dientes", word: "Dientes", emoji: "🦷", image: null }
    ]
  },
  {
    id: "colores",
    name: "Colores",
    emoji: "🎨",
    items: [
      { id: "colores-rojo", word: "Rojo", emoji: "🔴", image: null },
      { id: "colores-azul", word: "Azul", emoji: "🔵", image: null },
      { id: "colores-verde", word: "Verde", emoji: "🟢", image: null },
      { id: "colores-amarillo", word: "Amarillo", emoji: "🟡", image: null },
      { id: "colores-naranja", word: "Naranja", emoji: "🟠", image: null },
      { id: "colores-morado", word: "Morado", emoji: "🟣", image: null },
      { id: "colores-negro", word: "Negro", emoji: "⚫", image: null },
      { id: "colores-blanco", word: "Blanco", emoji: "⚪", image: null }
    ]
  },
  {
    id: "juguetes",
    name: "Juguetes",
    emoji: "🧸",
    items: [
      { id: "juguetes-pelota", word: "Pelota", emoji: "⚽", image: null },
      { id: "juguetes-muneca", word: "Muñeca", emoji: "🪆", image: null },
      { id: "juguetes-oso", word: "Oso", emoji: "🧸", image: null },
      { id: "juguetes-bloques", word: "Bloques", emoji: "🧱", image: null },
      { id: "juguetes-cometa", word: "Cometa", emoji: "🪁", image: null },
      { id: "juguetes-yoyo", word: "Yoyó", emoji: "🪀", image: null },
      { id: "juguetes-rompecabezas", word: "Rompecabezas", emoji: "🧩", image: null },
      { id: "juguetes-tren", word: "Tren", emoji: "🚂", image: null }
    ]
  },
  {
    id: "escuela",
    name: "Escuela",
    emoji: "✏️",
    items: [
      { id: "escuela-lapiz", word: "Lápiz", emoji: "✏️", image: null },
      { id: "escuela-libro", word: "Libro", emoji: "📚", image: null },
      { id: "escuela-mochila", word: "Mochila", emoji: "🎒", image: null },
      { id: "escuela-cuaderno", word: "Cuaderno", emoji: "📓", image: null },
      { id: "escuela-regla", word: "Regla", emoji: "📏", image: null },
      { id: "escuela-tijeras", word: "Tijeras", emoji: "✂️", image: null },
      { id: "escuela-borrador", word: "Borrador", emoji: "🧽", image: null },
      { id: "escuela-marcador", word: "Marcador", emoji: "🖍️", image: null }
    ]
  },
  {
    id: "naturaleza",
    name: "Naturaleza",
    emoji: "🌿",
    items: [
      { id: "naturaleza-arbol", word: "Árbol", emoji: "🌳", image: null },
      { id: "naturaleza-flor", word: "Flor", emoji: "🌸", image: null },
      { id: "naturaleza-sol", word: "Sol", emoji: "☀️", image: null },
      { id: "naturaleza-luna", word: "Luna", emoji: "🌙", image: null },
      { id: "naturaleza-lluvia", word: "Lluvia", emoji: "🌧️", image: null },
      { id: "naturaleza-nube", word: "Nube", emoji: "☁️", image: null },
      { id: "naturaleza-montana", word: "Montaña", emoji: "⛰️", image: null },
      { id: "naturaleza-rio", word: "Río", emoji: "🏞️", image: null }
    ]
  },
  {
    id: "lugares",
    name: "Lugares",
    emoji: "📍",
    items: [
      { id: "lugares-parque", word: "Parque", emoji: "🛝", image: "img/categories/lugares/parque.webp" },
      { id: "lugares-cine", word: "Cine", emoji: "🎬", image: "img/categories/lugares/cine-fixed.webp" },
      { id: "lugares-playa", word: "Playa", emoji: "🏖️", image: null },
      { id: "lugares-rio", word: "Río", emoji: "🏞️", image: null },
      { id: "lugares-hospital", word: "Hospital", emoji: "🏥", image: null },
      { id: "lugares-escuela", word: "Escuela", emoji: "🏫", image: null },
      { id: "lugares-aeropuerto", word: "Aeropuerto", emoji: "🛫", image: null },
      { id: "lugares-restaurante", word: "Restaurante", emoji: "🍽️", image: "img/categories/lugares/restaurante.webp" }
    ]
  }
];

// Conservative exclusions; review with the therapist when vocabulary changes.
const overlappingCategories = [
 ['frutas','comida'], ['animales','comida'], ['animales','naturaleza'],
 ['frutas','naturaleza'], ['vehiculos','juguetes'], ['animales','juguetes'],
 ['escuela','juguetes'], ['frutas','colores'],
  ['lugares','naturaleza'], ['lugares','escuela']
];

// Initial expressive-language set. These are examples for adult cueing, not an
// exhaustive list of acceptable answers. Review wording with the therapist.
const expressiveProfiles = [
  { id: 'animales-perro', category: 'animal', attributes: ['tiene cuatro patas', 'tiene pelo', 'ladra'], function: 'puede acompañar y jugar con las personas', location: 'puede vivir en una casa', model: 'El perro es un animal con cuatro patas que puede vivir con las personas.' },
  { id: 'animales-gato', category: 'animal', attributes: ['tiene cuatro patas', 'tiene pelo', 'maúlla'], function: 'puede acompañar y jugar con las personas', location: 'puede vivir en una casa', model: 'El gato es un animal con pelo que maúlla.' },
  { id: 'animales-pajaro', category: 'animal', attributes: ['tiene plumas', 'tiene alas', 'tiene pico'], function: 'vuela y canta', location: 'puede vivir en un nido', model: 'El pájaro es un animal con alas y plumas que puede volar.' },

  { id: 'frutas-manzana', category: 'fruta', attributes: ['es redonda', 'puede ser roja o verde', 'es dulce'], function: 'se come', location: 'crece en un árbol', model: 'La manzana es una fruta redonda que se come.' },
  { id: 'frutas-banana', category: 'fruta', attributes: ['es larga', 'es amarilla cuando madura', 'tiene cáscara'], function: 'se come', location: 'crece en una planta', model: 'La banana es una fruta larga con cáscara.' },
  { id: 'frutas-fresa', category: 'fruta', attributes: ['es pequeña', 'es roja', 'tiene semillas por fuera'], function: 'se come', location: 'crece en una planta', model: 'La fresa es una fruta pequeña y roja.' },

  { id: 'ropa-camisa', category: 'ropa', attributes: ['tiene mangas', 'cubre el torso', 'puede tener botones'], function: 'se usa para vestir', location: 'se guarda en el clóset', model: 'La camisa es ropa que usamos en la parte de arriba del cuerpo.' },
  { id: 'ropa-zapatos', category: 'ropa', attributes: ['se usan en pares', 'cubren los pies', 'pueden tener cordones'], function: 'protegen los pies', location: 'se guardan en el clóset', model: 'Los zapatos protegen los pies cuando caminamos.' },
  { id: 'ropa-sombrero', category: 'ropa', attributes: ['se usa en la cabeza', 'puede tener ala', 'puede ser de muchos colores'], function: 'protege la cabeza del sol', location: 'se guarda con la ropa', model: 'El sombrero se usa en la cabeza y puede protegernos del sol.' },

  { id: 'vehiculos-carro', category: 'vehículo', attributes: ['tiene ruedas', 'tiene puertas', 'lleva pasajeros'], function: 'sirve para transportarnos', location: 'se mueve por la carretera', model: 'El carro es un vehículo con ruedas que nos transporta.' },
  { id: 'vehiculos-autobus', category: 'vehículo', attributes: ['es grande', 'tiene muchas sillas', 'lleva varias personas'], function: 'transporta grupos de personas', location: 'se mueve por la carretera', model: 'El autobús es un vehículo grande que lleva muchas personas.' },
  { id: 'vehiculos-bicicleta', category: 'vehículo', attributes: ['tiene dos ruedas', 'tiene pedales', 'tiene manubrio'], function: 'sirve para transportarnos y hacer ejercicio', location: 'se usa en caminos y ciclovías', model: 'La bicicleta tiene dos ruedas y se mueve cuando pedaleamos.' },

  { id: 'comida-pizza', category: 'comida', attributes: ['puede ser redonda', 'lleva queso', 'se corta en pedazos'], function: 'se come', location: 'se prepara en la cocina', model: 'La pizza es una comida que suele llevar queso y se corta en pedazos.' },
  { id: 'comida-pan', category: 'comida', attributes: ['es suave', 'puede tener corteza', 'se puede cortar'], function: 'se come solo o con otros alimentos', location: 'se prepara en una panadería o cocina', model: 'El pan es un alimento que podemos comer solo o con otros alimentos.' },
  { id: 'comida-sopa', category: 'comida', attributes: ['es líquida', 'se sirve caliente o fría', 'se come con cuchara'], function: 'se come', location: 'se prepara en una olla', model: 'La sopa es una comida líquida que comemos con cuchara.' },

  { id: 'cuerpo-ojos', category: 'parte del cuerpo', attributes: ['son dos', 'tienen párpados', 'pueden ser de distintos colores'], function: 'sirven para ver', location: 'están en la cara', model: 'Los ojos están en la cara y los usamos para ver.' },
  { id: 'cuerpo-mano', category: 'parte del cuerpo', attributes: ['tiene dedos', 'tiene palma', 'puede abrirse y cerrarse'], function: 'sirve para agarrar y tocar', location: 'está al final del brazo', model: 'La mano tiene dedos y nos ayuda a agarrar objetos.' },
  { id: 'cuerpo-dientes', category: 'parte del cuerpo', attributes: ['son duros', 'son varios', 'deben limpiarse'], function: 'sirven para morder y masticar', location: 'están dentro de la boca', model: 'Los dientes están en la boca y sirven para masticar.' },

  { id: 'juguetes-pelota', category: 'juguete', attributes: ['es redonda', 'puede rebotar', 'puede rodar'], function: 'sirve para jugar y practicar deportes', location: 'se usa en la casa o al aire libre', model: 'La pelota es un juguete redondo que puede rodar y rebotar.' },
  { id: 'juguetes-bloques', category: 'juguete', attributes: ['son piezas', 'se pueden apilar', 'tienen distintas formas'], function: 'sirven para construir y jugar', location: 'se usan en el piso o una mesa', model: 'Los bloques son piezas que podemos apilar para construir.' },
  { id: 'juguetes-rompecabezas', category: 'juguete', attributes: ['tiene varias piezas', 'forma una imagen', 'requiere buscar dónde encaja cada pieza'], function: 'sirve para jugar y resolver problemas', location: 'se arma en una mesa o el piso', model: 'El rompecabezas tiene piezas que unimos para formar una imagen.' },

  { id: 'escuela-lapiz', category: 'material escolar', attributes: ['es largo y delgado', 'tiene punta', 'se puede borrar'], function: 'sirve para escribir y dibujar', location: 'se usa en la escuela o en casa', model: 'El lápiz es un material escolar que sirve para escribir y dibujar.' },
  { id: 'escuela-libro', category: 'material escolar', attributes: ['tiene páginas', 'tiene una portada', 'puede tener palabras e imágenes'], function: 'sirve para leer y aprender', location: 'se encuentra en la escuela, biblioteca o casa', model: 'El libro tiene páginas y sirve para leer y aprender.' },
  { id: 'escuela-mochila', category: 'material escolar', attributes: ['tiene tirantes', 'puede tener bolsillos', 'se lleva en la espalda'], function: 'sirve para guardar y llevar materiales', location: 'se usa para ir a la escuela', model: 'La mochila sirve para llevar los materiales de la escuela.' },
  { id: 'lugares-parque', category: 'lugar', attributes: ['está al aire libre', 'puede tener árboles', 'puede tener columpios o juegos'], function: 'sirve para jugar, caminar y pasar tiempo afuera', location: 'puede estar en el vecindario o la ciudad', model: 'El parque es un lugar al aire libre donde podemos jugar y caminar.' },
  { id: 'lugares-playa', category: 'lugar', attributes: ['tiene arena', 'está junto al mar', 'tiene olas'], function: 'sirve para jugar, caminar y descansar', location: 'está a la orilla del mar', model: 'La playa es un lugar con arena al lado del mar.' },
  { id: 'lugares-hospital', category: 'lugar', attributes: ['tiene salas de atención', 'trabajan profesionales de la salud', 'atiende a personas que necesitan ayuda'], function: 'sirve para cuidar la salud de las personas', location: 'puede estar en una ciudad o comunidad', model: 'El hospital es un lugar donde ayudan a las personas a cuidar su salud.' }
];

const expressiveComparePairs = [
  { ids: ['animales-perro', 'animales-gato'], same: 'Los dos son animales con cuatro patas y pelo.', different: 'El perro ladra y el gato maúlla.', model: 'El perro y el gato son animales, pero producen sonidos diferentes.' },
  { ids: ['frutas-manzana', 'frutas-banana'], same: 'Las dos son frutas que se comen.', different: 'La manzana es redonda y la banana es larga.', model: 'Las dos son frutas, pero tienen formas diferentes.' },
  { ids: ['ropa-camisa', 'ropa-zapatos'], same: 'Los dos son ropa que usamos en el cuerpo.', different: 'La camisa va en el torso y los zapatos van en los pies.', model: 'Los dos sirven para vestirnos, pero se usan en partes diferentes del cuerpo.' },
  { ids: ['vehiculos-carro', 'vehiculos-autobus'], same: 'Los dos son vehículos con ruedas que van por la carretera.', different: 'El autobús puede llevar más personas que el carro.', model: 'El carro y el autobús nos transportan, pero el autobús es más grande.' },
  { ids: ['comida-pizza', 'comida-sopa'], same: 'Las dos son comidas.', different: 'La pizza se puede agarrar y la sopa se come con cuchara.', model: 'Las dos son comidas, pero se comen de maneras diferentes.' },
  { ids: ['cuerpo-ojos', 'cuerpo-dientes'], same: 'Los dos son partes del cuerpo que debemos cuidar.', different: 'Los ojos sirven para ver y los dientes para masticar.', model: 'Los ojos y los dientes son partes del cuerpo, pero tienen funciones diferentes.' },
  { ids: ['juguetes-pelota', 'juguetes-bloques'], same: 'Los dos son juguetes.', different: 'La pelota rueda y los bloques se apilan.', model: 'Los dos sirven para jugar, pero hacemos cosas diferentes con cada uno.' },
  { ids: ['escuela-lapiz', 'escuela-libro'], same: 'Los dos son materiales que usamos para aprender.', different: 'Con el lápiz escribimos y el libro lo leemos.', model: 'Los dos se usan en la escuela, pero tienen funciones diferentes.' },
  { ids: ['lugares-parque', 'lugares-playa'], same: 'Los dos son lugares al aire libre donde podemos divertirnos.', different: 'El parque puede tener columpios y la playa tiene arena junto al mar.', model: 'El parque y la playa son lugares al aire libre, pero en la playa hay arena y mar.' }
];
