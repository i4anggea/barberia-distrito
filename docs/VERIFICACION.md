# Verificación de la primera versión local

Fecha: 2026-10-26, America/Mexico_City. Estado: primera versión IMPLEMENTADA y revisada para su alcance local; auditoría integral de accesibilidad y medición de rendimiento pendientes. No es la entrega completa de galería y reseñas.

## Resultados ejecutados

| Comprobación                   | Estado | Método / resultado                                                                                                                                                                                                  |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Formato                        | PASS   | npm run format y npm run format:check; exit 0                                                                                                                                                                       |
| Tipos y plantillas Astro       | PASS   | npm run check; 0 errores, 0 warnings, 0 hints; exit 0                                                                                                                                                               |
| Lint TypeScript                | PASS   | npm run lint; exit 0. Astro se comprueba con astro check y su formateador                                                                                                                                           |
| Dominio                        | PASS   | npm test; 13 pruebas, 13 aprobadas, exit 0                                                                                                                                                                          |
| Build estático                 | PASS   | npm run build; página y robots.txt generados; ocho variantes WebP, exit 0                                                                                                                                           |
| Dependencias                   | PASS   | npm ls --depth=0 sin dependencias inválidas; npm audit --audit-level=high: 0 vulnerabilidades informadas por el registro, exit 0. No equivale a auditoría exhaustiva                                                |
| HTTP local                     | PASS   | curl -I http://127.0.0.1:4322/; 200 OK                                                                                                                                                                              |
| HTML generado                  | PASS   | Inspección local con Python HTMLParser: seis servicios, dos imágenes con alt y archivos presentes, sin IDs duplicados, JSON de sucursal válido, demo sin enlaces a teléfonos y robots de demo bloqueando indexación |
| Responsive                     | PASS   | Safari, revisión visual a 320, 360, 390, 768 y 1440 px; sin desbordes visibles en las vistas inspeccionadas. No es una prueba en dispositivos físicos                                                               |
| Filtro de servicios            | PASS   | Safari a 390 px: Detalles muestra dos servicios; indicador de filtro activo y anuncio accesible «Mostrando 2 servicios»                                                                                             |
| Solicitud demo                 | PASS   | Safari: solicitud de «Tu corte, tus reglas» identifica servicio y sucursal en el mensaje; sin destinos reales                                                                                                       |
| Diálogo y foco                 | PASS   | Apertura con foco en Cerrar, Escape cierra y devuelve el foco al disparador; fondo inerte mientras está abierto                                                                                                     |
| Menú móvil                     | PASS   | Safari: abrir menú y navegar a contacto cierra el menú                                                                                                                                                              |
| Accesos móviles                | PASS   | Inicio: un botón flotante. Al navegar a servicios: una barra inferior, sin flotante. Ocultos durante el diálogo                                                                                                     |
| Horario y fuera de atención    | PASS   | Pruebas de límites, pausas, excepciones, medianoche, zona y horario de verano. En Safari se observó el aviso fuera de horario y el contacto permaneció activo                                                       |
| Contraste de tokens            | PASS   | Cálculo sRGB: texto/fondo 16.07:1; texto secundario/fondo 7.94:1; secundario/superficie 6.47:1; naranja/fondo y texto oscuro/botón naranja 6.40:1                                                                   |
| Preferencia temporal de Safari | PASS   | Se activó Mostrar funciones para desarrolladores web para revisar responsive; restaurado a su valor original desactivado al finalizar                                                                               |

## Pruebas de dominio

Configuración demo sin destinos reales; apertura incluida/cierre excluido; pausa y reapertura; excepción por fecha; cambio de día según sucursal; turnos que cruzan medianoche; cierre excepcional que prevalece sobre ayer; zona con horario de verano; precio fijo/desde/consulta y centavos; codificación del mensaje; rechazo de contacto incompleto en live; horas inválidas y turnos superpuestos; referencias de barberos a sucursales existentes.

## Pendientes y límites

| Comprobación                                     | Estado  | Motivo                                                                                                                                           |
| ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| WhatsApp y Google Maps con cliente real          | NOT_RUN | No hay número/dirección reales aprobados en esta demo. Lógica de URL validada sin enviar mensajes; el modo live requiere ambos antes de compilar |
| Galería ampliable y reseñas                      | NOT_RUN | Etapa posterior a la primera revisión, según alcance aprobado                                                                                    |
| Panel, interfaz multisucursal y barberos         | NOT_RUN | Evoluciones futuras; esta versión muestra una sucursal                                                                                           |
| Emulación de prefers-reduced-motion              | NOT_RUN | Regla CSS revisada estáticamente; no se cambió la preferencia del sistema ni se ensayó su emulación                                              |
| Lector de pantalla y auditoría WCAG completa     | NOT_RUN | Se inspeccionó el árbol accesible y foco del diálogo, no una auditoría completa ni prueba con VoiceOver                                          |
| Lighthouse, red móvil y métricas de carga reales | NOT_RUN | No se ejecutó una herramienta de medición. Imágenes optimizadas y fuentes locales no prueban por sí solas un objetivo de rendimiento             |
| Producción, staging, hosting, dominio y push     | NOT_RUN | Solo se autorizó una versión local; no hay remoto configurado                                                                                    |

## Evidencia y continuidad

Captura móvil de Safari: outputs/revision-local/movil-safari.png, excluida de Git. El servidor local se deja disponible en http://127.0.0.1:4322/ para la revisión del usuario. La documentación explica cómo detenerlo.

No se reutilizó investigación comercial ni se enviaron mensajes a negocios. Las fotografías y fuentes autoalojadas tienen procedencia/licencia documentadas en RECURSOS.md. Los primeros fallos de importación de fuentes y tipos de Node se corrigieron y las comprobaciones afectadas se reejecutaron exitosamente. Se eligió ESLint mantenido tras la advertencia de fin de soporte de la rama inicial.
