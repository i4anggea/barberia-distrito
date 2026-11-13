# Definición por fases

## Confirmado para este proyecto

- Crear una nueva plantilla independiente dentro de TRABAJO.
- Estética urbana y moderna.
- Definir requisitos paso a paso y fase a fase con el usuario.
- Proponer tipografías, paleta de colores y demás elementos del sistema visual.
- Git desde el inicio, siguiendo la preferencia previa del usuario.
- No incorporar la investigación comercial a Git.
- Sitio estático para barberías, reutilizable con repositorio independiente por cliente.
- Objetivo combinado: presentar servicios y precios, y facilitar solicitudes de cita por WhatsApp.
- Dirección visual B: urbano sobrio; carbón #131313, superficie #262626, texto #F2EEE7 y acento naranja #E8793E.
- Pareja tipográfica de la dirección elegida: Space Grotesk para titulares y Manrope para textos.

## Contexto previo, pendiente de ratificación para esta plantilla

- Preferencia previa por Astro ratificada en fase 5: Astro + TypeScript + CSS propio.
- Promociones: fuera de las secciones aprobadas para esta primera versión. Si se añaden posteriormente, definir sus reglas de vigencia. Los horarios ya tienen zona horaria de la barbería confirmada en fase 3.

## Fases propuestas

1. Propósito, continuidad del alcance y dirección visual.
2. Audiencia, tono de marca y sistema visual: tipografía, color, fotografías, composición y movimiento.
3. Secciones, contenido y recorridos de contacto o reserva.
4. Personalización por cliente y reglas funcionales.
5. Comparación y elección de stack, alojamiento e integraciones.
6. Criterios de aceptación, accesibilidad, rendimiento e implementación incremental.

Se cierra cada bloque con las respuestas del usuario antes de definir los requisitos dependientes. No implementar la landing mientras siga abierta su definición.

## Alternativas visuales consideradas; dirección B elegida

| Ruta                | Titulares / cuerpo            | Fondo / superficie / texto / acento   | Composición                                                              |
| ------------------- | ----------------------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| A. Urbano enérgico  | Barlow Condensed / Manrope    | #111111 / #242424 / #F5F2EA / #D4FF3F | Titulares grandes, fotografía de cortes, detalles gráficos de señalética |
| B. Urbano sobrio    | Space Grotesk / Manrope       | #131313 / #262626 / #F2EEE7 / #E8793E | Retícula editorial, fotografía de detalle, acento naranja controlado     |
| C. Urbano editorial | Manrope 800 / Manrope 400–500 | #F2EEE7 / #FFFFFF / #161616 / #244CFF | Base clara, tipografía protagonista, bloques negros y acentos azules     |

La dirección B fue elegida por el usuario; A y C quedan como alternativas descartadas en este bloque. Los usos de color, pesos y tamaños se concretarán en el sistema visual. El contraste de cada combinación concreta de texto, botón y estado se comprobará al definir los tokens. No se ha declarado conformidad WCAG ni validación visual de una interfaz.

Fuentes de referencia: https://fonts.google.com/specimen/Barlow+Condensed · https://fonts.google.com/specimen/Space+Grotesk · https://fonts.google.com/specimen/Manrope

## Verificación inicial

- PASS: carpeta nueva creada sin sobrescribir otra existente.
- PASS: Git inicializado; rama y diff inspeccionados antes de escribir los documentos.
- NOT_RUN: instalación, lint, pruebas y build; no existe código ni stack elegido.
- PASS: identidad local de Git configurada con el nombre y correo proporcionados por el usuario y comprobada mediante git config --local. Los commits se reportan con su hash después de ejecutarlos.
- NOT_RUN: despliegue; fase de definición local.

## Fase 1 — decisiones registradas

Respuestas: continuidad A; objetivo A + C; dirección visual B.

- Conservar sitio estático y repositorio independiente por cliente.
- Elección posterior registrada en fase 5: Astro + TypeScript + CSS propio.
- Mostrar catálogo y precios, y permitir solicitar una cita por WhatsApp.
- Propuesta de jerarquía coherente con este objetivo: CTA principal «Solicitar cita por WhatsApp» y secundario «Ver servicios y precios». El mensaje y los pasos de contacto se definirán en la fase funcional.
- Una solicitud por WhatsApp no equivale a una cita confirmada; las reglas de confirmación siguen abiertas.

## Fase 2 — bloque 1 confirmado

Respuestas: 1A; 2A + B; 3A.

- Público prioritario: adultos jóvenes y adultos, aproximadamente 20–45 años; equilibrio entre tendencias y cortes clásicos. No implica excluir otras edades.
- Tono: cercano y profesional, combinado con expresividad urbana. Criterio editorial propuesto: titulares con personalidad; información operativa clara, sin jerga que dificulte entender precios, horarios o contacto.
- Primera sección: texto a la izquierda y fotografía grande a la derecha, con acciones de WhatsApp y catálogo visibles. En móvil, conservar prioridad del mensaje y las acciones al adaptar la composición.
- Ejemplo de tono para evaluar, no texto definitivo: «Tu estilo. Bien hecho.» / «Conoce nuestros servicios y precios. Escríbenos por WhatsApp para solicitar tu cita».

## Fase 2 — bloque 2 confirmado

Respuestas: 1A; 2A; 3A.

- Fotografía a color natural y luz cuidada: cortes, barbas, personas y detalles del trabajo.
- Base oscura: fondo carbón #131313, superficies #262626, texto blanco cálido #F2EEE7; naranja #E8793E reservado para botones y detalles importantes.
- Movimiento sutil: transiciones de controles y apariciones breves al entrar en pantalla. Respetar prefers-reduced-motion y mantener el contenido accesible sin animación o JavaScript.
- Los contrastes de texto, botones y estados se comprobarán al implementar; no se consideran verificados todavía.

## Fase 2 — bloque 3 confirmado

Respuestas: 1A; 2A; 3A + B. Motivo: uso principalmente móvil.

- Titulares: frases destacadas cortas en mayúsculas; títulos informativos en escritura normal.
- Formas: esquinas ligeramente redondeadas, referencia de 6–8 px para botones, tarjetas y fotografías.
- Prioridad de diseño y verificación: móvil, manteniendo adaptación a tablet y escritorio.
- Incluir barra fija inferior para solicitar cita y botón flotante de WhatsApp. Comportamiento confirmado en fase 3: alternancia entre botón flotante al inicio y barra inferior al bajar; no mostrar ambos simultáneamente. Evitar tapar contenido, respetar zonas seguras y no interceptar controles.
- Rangos tipográficos propuestos para implementación: Space Grotesk 600–700 en titulares; Manrope 400–600 en textos y controles; texto base 16–18 px. Tamaños responsivos y legibilidad se verificarán al implementar.

## Fase 3 — bloque 1 confirmado

Respuestas: 1A; 2A; 3A.

- Primera versión: inicio, servicios y precios, galería, reseñas, horarios, ubicación y contacto.
- Catálogo móvil por categorías; cada servicio incluye nombre, descripción breve, precio y botón para solicitarlo.
- WhatsApp en móvil: botón flotante al inicio y barra fija inferior al bajar; nunca ambos simultáneamente. El umbral exacto de alternancia se concretará al implementar y verificar el recorrido.
- Equipo, promociones y preguntas frecuentes no forman parte de las secciones aprobadas para esta primera versión.

## Fase 3 — bloque 2 confirmado

Respuestas: 1A; 2A; 3A.

- Duración estimada opcional por servicio: mostrar solo cuando la barbería aporte el dato; ocultar el campo cuando falte.
- Admitir precio fijo, precio «desde» y «consultar», configurables por servicio. No interpretar datos ausentes como precio cero.
- Al solicitar un servicio, abrir WhatsApp con un mensaje predeterminado que lo identifique. La redacción exacta se definirá en la fase de personalización.
- El visitante acuerda fecha y hora en WhatsApp. No añadir formulario previo ni selección múltiple de servicios a esta primera versión.
- Abrir WhatsApp prepara el mensaje; no implica envío automático ni cita confirmada.

## Fase 3 — bloque 3 confirmado

Respuestas: 1A; 2A; 3A.

- Catálogo inicial ficticio y editable: corte, fade, barba, corte + barba, cejas y servicio especial. Identificar los precios como ejemplos.
- Galería móvil en cuadrícula de dos columnas, inicialmente unas seis fotografías; permitir ampliar al tocar. La ampliación debe poder cerrarse y operarse mediante teclado y lector de pantalla.
- En sitios de clientes, reseñas reales seleccionadas y añadidas manualmente, con fuente y enlace al perfil de Google. Ocultar la sección si no hay reseñas disponibles.
- La demostración no debe presentar testimonios ficticios como reales; cualquier ejemplo debe estar identificado como contenido de demostración. No importar automáticamente información de la investigación anterior.

## Fase 3 — bloque 4 confirmado

Respuestas: 1A; 2A; 3A.

- Horarios estructurados por día, con pausas y excepciones por fecha, e indicador «Abierto/Cerrado».
- Calcular apertura según la zona horaria configurada de la barbería, no la del dispositivo del visitante.
- Ubicación: dirección, referencia opcional y botón «Cómo llegar» que abre Google Maps. No incluir mapa incrustado en esta versión.
- Mantener WhatsApp activo fuera de horario, indicando que responderán durante el horario de atención; no prometer una respuesta inmediata ni confirmar automáticamente una cita.
- Precisar durante implementación límites de intervalos, turnos que cruzan medianoche y prioridad de excepciones; verificar los casos pertinentes.

## Fase 4 — bloque 1 confirmado

Respuestas: 1A con panel futuro; 2A; 3C con ampliación explícita a sucursales y barberos.

- Edición inicial mediante archivos por parte del desarrollador. No implementar panel administrativo en la primera etapa.
- Contemplar un panel futuro para que el dueño modifique el contenido. Separar datos/contenido de la presentación y validar los datos compartidos. La incorporación del panel, proveedor, autenticación, permisos y mecanismo de publicación se definirán antes de implementarlo.
- En un sitio estático, editar contenido en un panel no implica publicación instantánea por sí sola: el flujo de generación/publicación deberá definirse en esa etapa.
- Personalización por cliente: nombre, logo, textos, fotos, colores y familias tipográficas, conservando la estructura urbana acordada.
- Repositorio independiente por cliente; las sucursales de un cliente pueden pertenecer al mismo sitio.
- Contemplar múltiples sucursales, cada una con ubicación, horarios, excepciones, zona horaria y contacto propios. No asumir que comparten horarios ni teléfono.
- Contemplar varios barberos asociados a sucursales. El usuario aún no definió campos, presentación o selección para la solicitud.
- Alcance inicial resuelto en bloque 2: mostrar una sucursal y preparar los datos para múltiples; no mostrar barberos todavía.
- La sección de equipo sigue fuera de la primera versión; la ampliación contempla datos de barberos para después.

## Fase 4 — bloque 2 confirmado

Respuestas: 1A; 2C.

- Primera versión: mostrar una sucursal; preparar una estructura de datos que admita múltiples sucursales. La interfaz para mostrar o seleccionar varias se implementará después.
- Cada sucursal futura conservará ubicación, zona horaria, horarios, excepciones y contacto propios.
- Preparar los datos para barberos asociados a sucursales; no mostrar fichas de barberos ni selección, agenda o disponibilidad individual en esta primera versión. Los campos concretos se ampliarán al definir esa funcionalidad.
- El panel del dueño permanece fuera de esta etapa. No añadir backend, autenticación o gestor de contenido hasta elegir el alcance e integración futuros.

## Fase 5 — bloque 1 confirmado

Respuestas: 1A; 2A.

- Stack: Astro + TypeScript. Generación estática; interactividad puntual donde la requieren galería, navegación, horarios y acceso a WhatsApp.
- Estilos: CSS propio, con variables de diseño para colores, familias tipográficas, espacios y componentes.
- Las versiones se verificarán por compatibilidad y mantenimiento antes de instalar; no hay dependencias instaladas todavía.
- Mantener contenido y configuración separados de la presentación para facilitar reutilización por cliente y posible panel futuro. No añadir backend ni base de datos a esta etapa.
- Alternativas evaluadas: Eleventy y HTML + TypeScript con Vite; Tailwind como alternativa de estilos. No elegidas para esta versión.

## Fase 6 — bloque 1 confirmado

Respuestas: 1A; 2A; identidad de autor proporcionada posteriormente por el usuario.

- Fotografías de banco para la demostración, con licencia revisada y procedencia documentada; reemplazables por material de cada cliente. No importar fotografías de la investigación comercial anterior.
- Primera revisión local: inicio, servicios y contacto con recorrido funcional de solicitud por WhatsApp. Tras revisar esa primera versión, completar las demás secciones acordadas.
- Autoría local de Git configurada a solicitud del usuario como i4anggea, con su dirección noreply proporcionada. Configuración limitada a este repositorio; no supone autenticación ni vinculación a GitHub. No hay remoto configurado.
- Publicación externa pendiente de definición y autorización del destino.

## Cierre de definición confirmado

La propuesta final de criterios y alcance está en [CRITERIOS_ACEPTACION.md](CRITERIOS_ACEPTACION.md). El usuario autorizó «comienza la primera version local». Se inicia la entrega parcial de inicio, servicios y contacto; las demás secciones se completarán tras esa revisión.
