# DISTRITO · Plantilla de barbería urbana

Primera versión local: inicio, servicios y contacto de una sucursal. Marca y contenido ficticios, identificados como demostración. Astro + TypeScript estricto + CSS propio; sin backend, base de datos, analítica ni panel administrativo.

## Iniciar

Requiere Node.js >= 22.23.4 y npm. Versiones exactas en package.json y package-lock.json.

```sh
npm ci --ignore-scripts
npm run dev -- --port 4322
```

Abrir http://127.0.0.1:4322/. Astro muestra el estado de su servidor local al iniciarse. Para consultarlo o detenerlo: `npm exec -- astro dev status` y `npm exec -- astro dev stop`. La escucha se limita a 127.0.0.1.

## Verificar

```sh
npm run format:check
npm run lint
npm run check
npm test
npm run build
```

`npm run preview -- --port 4323` permite revisar el resultado de producción después de compilar. Las pruebas de dominio no contactan a WhatsApp ni a otros servicios.

## Personalizar por cliente

- `src/content/site.ts`: marca, textos principales, catálogo, sucursales, horarios y contacto. El campo opcional `logo: { src: "/marca.svg", alt: "Nombre de la barbería" }` permite usar un archivo propio guardado en `public/`. Sustituir también `public/favicon.svg` al personalizar la marca.
- `src/styles/global.css`: variables de color, tipografía, espacios y componentes.
- `src/assets/`: fotografías; Astro genera imágenes WebP responsivas.
- `src/layouts/Layout.astro`: imports de familias tipográficas autoalojadas. Al cambiar familias, actualizar imports y variables conjuntamente.
- `src/components/` y `src/pages/index.astro`: presentación y composición.

Conservar un repositorio independiente por cliente. El arreglo de sucursales permite almacenar datos independientes, pero esta versión solo muestra `activeBranchId`. `barbers` prepara la relación con sucursales; no existe interfaz de equipo o agenda. Un panel de edición futuro requerirá definir autenticación, permisos y regeneración/publicación del sitio estático.

### Contacto de demostración y contacto real

En `mode: 'demo'`, los botones muestran una vista previa del mensaje y de la ubicación; no contienen teléfonos ficticios ni contactan negocios reales. No hay formulario de datos personales.

Para probar con un destino real elegido por el cliente, configurar `whatsapp` (código de país y número, sin espacios), `mapsQuery` (dirección o coordenadas públicas verificadas), dirección y datos reales de la sucursal, y cambiar `mode` a `'live'`. Por ejemplo, la forma del campo es `+<código-país><número>`: no copiar números de prueba. La compilación falla si falta el contacto o ubicación de una sucursal en modo real. Abrir WhatsApp prepara el texto; el visitante decide enviarlo y la barbería confirma la cita.

El modo demo añade noindex/nofollow y robots.txt bloquea indexación. En modo real, se permite indexación; antes de publicar, sustituir todo el contenido ficticio y ajustar metadatos, dominio y derechos de imagen. No se ha realizado publicación ni push.

### Horarios

`weekly`: claves 0 (domingo) a 6 (sábado), con arrays de intervalos `start`/`end` en formato HH:mm. Un array vacío indica cierre. Se admiten pausas y turnos que cruzan medianoche; inicio incluido y fin excluido. `exceptions`: fechas YYYY-MM-DD que reemplazan el horario de ese día. Una excepción de cierre completo prevalece sobre el tramo de ayer después de medianoche. Las horas se calculan en `timeZone` de la sucursal y se revisan cada 30 segundos en el navegador. Las excepciones del día se indican junto al horario.

### Catálogo

Precios: `{ kind: 'fixed', amount: 200 }`, `{ kind: 'from', amount: 250 }` o `{ kind: 'consult' }`. Importes no negativos en la moneda configurada; duración opcional en minutos. Si no existe duración, no se muestra. Las categorías se renderizan desde los datos; los filtros son una mejora progresiva y la lista completa está en el HTML.

## Alcance pendiente tras la primera revisión

Galería ampliable y reseñas reales manuales. Después, y con definición adicional: interfaz multisucursal, fichas de barberos y panel del dueño.

## Documentación

- [Requisitos acordados](docs/REQUISITOS.md).
- [Criterios y secuencia de aceptación](docs/CRITERIOS_ACEPTACION.md).
- [Fuentes y licencias visuales](docs/RECURSOS.md).
- [Verificación y limitaciones](docs/VERIFICACION.md).

Git usa la rama `codex/definicion` y la identidad local proporcionada por el usuario. La investigación comercial y los archivos de outputs quedan excluidos.
