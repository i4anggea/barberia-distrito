import type { SiteContent } from './types.ts';
import { minutes } from './hours.ts';
import { whatsappUrl } from './catalog.ts';

export function validateSite(site: SiteContent): void {
  const fail = (message: string): never => {
    throw new Error(`Configuración: ${message}`);
  };
  if (!site.name.trim()) fail('falta el nombre');
  if (site.logo && (!/^\/(?!\/)/.test(site.logo.src) || !site.logo.alt.trim()))
    fail('el logo debe ser un archivo local con texto alternativo');
  const ids = new Set<string>();
  for (const branch of site.branches) {
    if (ids.has(branch.id)) fail('sucursal duplicada');
    ids.add(branch.id);
    new Intl.DateTimeFormat('es', { timeZone: branch.timeZone });
    if (
      !branch.name.trim() ||
      !branch.address.trim() ||
      !branch.locality.trim()
    )
      fail('datos incompletos de sucursal');
    const schedules = [
      ...Object.values(branch.weekly),
      ...Object.values(branch.exceptions),
    ];
    for (const intervals of schedules) {
      const occupied: [number, number][] = [];
      for (const interval of intervals) {
        const start = minutes(interval.start),
          end = minutes(interval.end);
        if (start === end) fail('un turno no puede durar cero o 24 horas');
        const segments: [number, number][] =
          start < end
            ? [[start, end]]
            : [
                [start, 1440],
                [0, end],
              ];
        for (const [from, to] of segments) {
          if (occupied.some(([a, b]) => from < b && to > a))
            fail('turnos superpuestos');
          occupied.push([from, to]);
        }
      }
    }
    for (const date of Object.keys(branch.exceptions)) {
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) !== date
      )
        fail('fecha de excepción inválida');
    }
    if (site.mode === 'live') {
      if (!branch.whatsapp || !branch.mapsQuery?.trim())
        fail('WhatsApp y ubicación obligatorios en modo live');
      whatsappUrl(branch.whatsapp!, 'Validación local');
    }
  }
  if (!ids.has(site.activeBranchId)) fail('no existe la sucursal activa');
  const categories = new Set(site.categories.map((c) => c.id));
  if (categories.size !== site.categories.length) fail('categoría duplicada');
  const services = new Set<string>();
  for (const service of site.services) {
    if (services.has(service.id)) fail('servicio duplicado');
    services.add(service.id);
    if (
      !service.name.trim() ||
      !service.description.trim() ||
      !categories.has(service.category)
    )
      fail('servicio incompleto');
    if (
      service.price.kind !== 'consult' &&
      (!Number.isFinite(service.price.amount) || service.price.amount < 0)
    )
      fail('precio inválido');
    if (
      service.duration !== undefined &&
      (!Number.isFinite(service.duration) || service.duration <= 0)
    )
      fail('duración inválida');
  }
  for (const barber of site.barbers)
    if (barber.branchIds.some((id) => !ids.has(id)))
      fail('barbero con sucursal inexistente');
}
