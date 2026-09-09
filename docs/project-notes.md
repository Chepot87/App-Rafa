# Notas del proyecto

## Alcance de esta revisión

- Rama de trabajo: `app-rafa-v2`.
- Separación de datos y comportamiento; CSS e imagen de marca reorganizados.
- Identificadores de vocabulario y soporte opcional para ilustraciones con emoji de reserva.
- Mezcla Fisher–Yates, identificación por ID y exclusiones conservadoras de categorías relacionadas.
- Protección contra contabilizar dos veces o avanzar sin responder.
- Partidas conservadas durante la navegación y reinicio explícito.
- Cancelación de lectura pendiente/activa, preferencia de voz española y errores en pantalla.
- Categorías operables con teclado, foco gestionado, anuncios de feedback, contraste mejorado y movimiento reducido.

## Antes de entregar al cliente

1. Probar en navegador de escritorio y móviles reales (Safari iOS y Chrome Android): Inicio, las 80 tarjetas, Quiz completo, Empareja completo, respuestas correctas e incorrectas, resultados, reinicios y regreso a una partida.
2. Verificar 320, 375, 768 y 1280 píxeles, orientación horizontal, zoom al 200 %, palabras largas, teclado, lector de pantalla y movimiento reducido. Confirmar que no hay desbordamientos y que el foco resulta comprensible.
3. Escuchar voz manual y automática; probar navegación rápida, desactivar lectura, cambiar de actividad y ocultar la página. Confirmar el acento preferido con la cliente.
4. Validar vocabulario, etiquetas e incompatibilidades con la terapeuta. Las reglas son conservadoras, no una taxonomía clínica validada. El tren se mantiene en las dos categorías, pero Vehículos y Juguetes no se enfrentan en una pregunta. También se excluyen otras relaciones amplias como Frutas/Comida y Animales/Naturaleza.
5. Aprobar estilo de ilustración y sustituir emojis gradualmente. Revisar etiquetas como Oso de juguete, Borrador y Marcador junto a las imágenes finales.
6. Optimizar el logo original (aproximadamente 2,1 MB) después de revisar visualmente el resultado. No se ha alterado su contenido.
7. Validar recursos y voz en el alojamiento final HTTPS y documentar su entrega.

## Límites de verificación

La política de seguridad del navegador de esta sesión bloqueó la apertura de la URL local `file:` durante la inspección inicial. No se intentó eludir ese bloqueo. Las pruebas automatizadas usan un DOM y una voz simulados: la validación visual, táctil y de audio real sigue pendiente. No considerar esta revisión una certificación de compatibilidad móvil ni una versión ya publicada.

No se han generado ilustraciones, añadido cuentas, guardado datos de pacientes ni creado servicios backend. La persistencia entre recargas queda fuera de esta revisión.
