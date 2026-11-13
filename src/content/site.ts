import type { SiteContent } from '../lib/types.ts';

// Contenido ficticio. Cambia mode a 'live' solo después de configurar los datos reales.
export const site: SiteContent = {
  mode: 'demo',
  name: 'DISTRITO',
  descriptor: 'BARBER STUDIO',
  locale: 'es-MX',
  currency: 'MXN',
  activeBranchId: 'principal',
  copy: {
    eyebrow: 'ESTILO PROPIO. ACTITUD URBANA.',
    headline: ['TU ESTILO.', 'BIEN HECHO.'],
    introduction:
      'Un corte que va contigo. Una barba con carácter. El detalle que hace la diferencia en tu día.',
    requestIntro: 'Hola, quiero solicitar una cita',
  },
  branches: [
    {
      id: 'principal',
      name: 'Sucursal de ejemplo',
      timeZone: 'America/Mexico_City',
      address: 'Tu calle y número, tu colonia',
      locality: 'Tu ciudad, México',
      reference: 'La dirección se personaliza para cada barbería.',
      // Sin número ni ubicación reales: en demo se muestra una vista previa del contacto.
      weekly: {
        0: [],
        1: [{ start: '10:00', end: '20:00' }],
        2: [
          { start: '10:00', end: '14:00' },
          { start: '16:00', end: '20:00' },
        ],
        3: [{ start: '10:00', end: '20:00' }],
        4: [{ start: '10:00', end: '20:00' }],
        5: [{ start: '10:00', end: '20:00' }],
        6: [{ start: '10:00', end: '18:00' }],
      },
      exceptions: {},
    },
  ],
  barbers: [],
  categories: [
    { id: 'cortes', name: 'Cortes' },
    { id: 'barba', name: 'Barba' },
    { id: 'detalles', name: 'Detalles' },
  ],
  services: [
    {
      id: 'corte',
      category: 'cortes',
      name: 'Corte clásico',
      description:
        'Líneas limpias, proporción y un acabado que va con tu estilo.',
      price: { kind: 'fixed', amount: 200 },
      duration: 40,
    },
    {
      id: 'fade',
      category: 'cortes',
      name: 'Fade & estilo',
      description: 'Degradado preciso, de menos a más. Tú eliges hasta dónde.',
      price: { kind: 'from', amount: 250 },
      duration: 50,
    },
    {
      id: 'combo',
      category: 'cortes',
      name: 'Corte + barba',
      description:
        'El look completo. Corte, perfilado y atención a cada detalle.',
      price: { kind: 'fixed', amount: 350 },
      duration: 60,
    },
    {
      id: 'barba',
      category: 'barba',
      name: 'Diseño de barba',
      description: 'Forma, definición y un perfilado que se nota.',
      price: { kind: 'fixed', amount: 150 },
      duration: 30,
    },
    {
      id: 'cejas',
      category: 'detalles',
      name: 'Perfilado de cejas',
      description: 'Ese pequeño ajuste que termina de definir tu expresión.',
      price: { kind: 'fixed', amount: 60 },
      duration: 10,
    },
    {
      id: 'especial',
      category: 'detalles',
      name: 'Tu corte, tus reglas',
      description:
        'Diseños y detalles especiales. Cuéntanos qué tienes en mente.',
      price: { kind: 'consult' },
    },
  ],
};
