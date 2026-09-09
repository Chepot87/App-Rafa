# App Rafa

Aplicación web en español para practicar categorías semánticas y vocabulario con acompañamiento de un adulto. HTML, CSS y JavaScript, sin compilación ni backend.

## Uso local

Abre `index.html` en un navegador moderno. Para probar mediante HTTP, utiliza el servidor estático de tu editor desde la raíz del proyecto. No hace falta instalar dependencias de la aplicación.

- Inicio: 10 categorías con 8 palabras cada una.
- Tarjetas: anterior/siguiente, lectura manual y automática. Finalizar regresa a Inicio.
- Quiz: 10 preguntas para identificar el elemento que no pertenece.
- Empareja: 12 preguntas para elegir la categoría de una palabra.
- Las partidas se conservan al cambiar de actividad. Los botones Reiniciar y Jugar de nuevo comienzan otra partida. Recargar la página borra el progreso; no se guardan datos personales ni historiales.

## Estructura

```text
index.html
css/style.css
js/data.js
js/app.js
img/branding/logo.png
docs/project-notes.md
tests/app.test.cjs
```

Los scripts clásicos se cargan en orden: `data.js` y después `app.js`. Se mantienen los manejadores HTML existentes para evitar una migración innecesaria.

## Vocabulario e imágenes

Edita las categorías en `js/data.js`. Cada palabra tiene `id` único y estable, `word`, `emoji` e `image` (actualmente `null`). No cambies el identificador al modificar la etiqueta.

Cuando haya ilustraciones aprobadas, crea `img/categories/<categoria>/` y usa rutas relativas a `index.html`, por ejemplo `img/categories/animales/perro.webp`. Usa nombres en minúsculas, sin espacios ni acentos. Una imagen ausente o que no carga muestra el emoji. La palabra visible también sirve de etiqueta accesible.

`overlappingCategories` excluye combinaciones ambiguas de ambos juegos. Revisa estas reglas con la terapeuta al cambiar el contenido. Conserva al menos tres palabras por categoría y tres categorías de respuesta compatibles por categoría. El conjunto actual cumple esas condiciones.

## Voz y conexión

La voz utiliza la síntesis del navegador: prefiere `es-ES`, después otra voz española disponible y finalmente solicita español al sistema. La disponibilidad y pronunciación dependen del dispositivo; algunas voces pueden requerir conexión. La lectura automática se detiene al salir de las tarjetas, ocultar la página o desactivar la opción.

Google Fonts se carga por Internet. Si no está disponible, se usan las fuentes de reserva. La aplicación no garantiza funcionamiento completamente sin conexión.

## Comprobaciones

Con Node.js instalado, ejecuta `node --test tests/app.test.cjs`. Las pruebas no instalan paquetes y comprueban generación, puntuación, navegación lógica, voz simulada e imágenes de reserva. No sustituyen las pruebas visuales ni de voz real.

Consulta `docs/project-notes.md` para las comprobaciones pendientes antes de la entrega. Para publicar, sirve estos archivos en un alojamiento estático HTTPS; no se ha publicado ninguna versión desde esta revisión.
