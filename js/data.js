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
  }
];

// Conservative exclusions; review with the therapist when vocabulary changes.
const overlappingCategories = [
 ['frutas','comida'], ['animales','comida'], ['animales','naturaleza'],
 ['frutas','naturaleza'], ['vehiculos','juguetes'], ['animales','juguetes'],
 ['escuela','juguetes'], ['frutas','colores']
];
