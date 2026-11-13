# Propuesta de aceptación y secuencia de entrega

Estado: implementación de primera revisión local autorizada por el usuario. Los criterios definen el objetivo; los resultados efectivos están en VERIFICACION.md.

## Primera revisión local

- Inicio con identidad urbana sobria, texto junto a foto en escritorio y adaptación prioritaria a móvil.
- Catálogo ficticio de seis servicios, por categorías, con descripción, precio fijo/desde/consultar y duración opcional.
- Contacto de una sucursal con dirección, horarios, excepciones, zona horaria e indicador de apertura.
- Accesos a WhatsApp alternados: flotante al inicio y barra inferior al desplazarse, sin mostrarlos juntos ni tapar controles.
- Solicitud con servicio incluido en el mensaje; sin envío automático, selección múltiple o confirmación de disponibilidad.
- Demostración claramente identificada; no dirigir contactos a números inventados o a negocios de la investigación anterior. Documentar cómo probar la solicitud con un contacto configurado.

## Entrega completa, tras revisar la primera versión

- Completar galería y reseñas con los comportamientos acordados. La primera revisión no supone terminar toda la plantilla.
- Fotografías de banco con revisión de licencia, procedencia documentada y material reemplazable por cliente.
- Ocultar reseñas si no existen; no publicar testimonios inventados como reales.
- Contenido, marca y configuración separados de la presentación, con guía de personalización por cliente.
- Datos preparados para sucursales y barberos futuros; sin selector de sucursales, fichas de barberos ni panel administrativo en esta etapa.

## Verificaciones propuestas

- Ejecutar formato, tipado y build pertinentes al stack elegido.
- Revisar visualmente anchos de 360, 390, 768 y 1440 px; comprobar ausencia de desbordamiento horizontal y controles utilizables también a 320 px.
- Verificar navegación con teclado, foco visible, etiquetas, alternativas de imágenes y reducción de movimiento. Comprobar contraste de los colores realmente usados; no declarar conformidad WCAG sin una evaluación suficiente.
- Probar horarios en apertura/cierre, pausas, excepciones por fecha y cambio de día; incluir turnos que cruzan medianoche si el modelo los admite.
- Verificar que la zona horaria del visitante no altera el estado de apertura de la sucursal.
- Probar modalidades de precio, omisión de duración y construcción/codificación del mensaje de WhatsApp. No enviar mensajes reales como parte de pruebas automatizadas.
- Comprobar ampliación/cierre de galería y ocultación de reseñas en la entrega completa.
- Optimizar imágenes y cargar JavaScript solo para interacciones que lo necesitan; registrar mediciones disponibles sin inventar resultados.

## Control de versiones y publicación

- Commits locales selectivos con identidad del usuario; investigación comercial fuera de Git.
- Registrar resultados reales mediante PASS / FAIL / NOT_RUN / BLOCKED.
- Primera revisión local; hosting, dominio, publicación, push y cualquier servicio externo siguen pendientes de definición y autorización.
