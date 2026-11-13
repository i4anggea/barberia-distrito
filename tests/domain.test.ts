import assert from 'node:assert/strict';
import test from 'node:test';
import { site } from '../src/content/site.ts';
import {
  formatPrice,
  requestMessage,
  whatsappUrl,
} from '../src/lib/catalog.ts';
import { businessStatus } from '../src/lib/hours.ts';
import { validateSite } from '../src/lib/validation.ts';

const branch = site.branches[0];
const at = (iso: string) => new Date(iso);

test('la configuración demo es válida y carece de destinos reales', () => {
  assert.doesNotThrow(() => validateSite(site));
  assert.equal(site.mode, 'demo');
  assert.equal(branch.whatsapp, undefined);
  assert.equal(branch.mapsQuery, undefined);
});
test('apertura inclusiva y cierre exclusivo en hora de Ciudad de México', () => {
  assert.equal(businessStatus(branch, at('2026-10-26T15:59:00Z')).open, false);
  assert.equal(businessStatus(branch, at('2026-10-26T16:00:00Z')).open, true);
  assert.equal(businessStatus(branch, at('2026-10-27T02:00:00Z')).open, false);
});
test('respeta las pausas y la reapertura del martes', () => {
  assert.equal(businessStatus(branch, at('2026-10-27T19:59:00Z')).open, true);
  assert.equal(businessStatus(branch, at('2026-10-27T20:00:00Z')).open, false);
  assert.equal(businessStatus(branch, at('2026-10-27T22:00:00Z')).open, true);
});
test('las excepciones por fecha sustituyen los horarios semanales', () => {
  const special = { ...branch, exceptions: { '2026-10-26': [] } };
  assert.equal(businessStatus(special, at('2026-10-26T18:00:00Z')).open, false);
});
test('evalúa el día en la zona de la sucursal, no en UTC ni en la zona del visitante', () => {
  const status = businessStatus(branch, at('2026-10-27T00:30:00Z'));
  assert.equal(status.date, '2026-10-26');
  assert.equal(status.day, 1);
  assert.equal(status.open, true);
});
test('admite turnos que cruzan medianoche y respeta su hora final', () => {
  const overnight = {
    ...branch,
    weekly: { ...branch.weekly, 1: [{ start: '22:00', end: '02:00' }], 2: [] },
  };
  assert.equal(
    businessStatus(overnight, at('2026-10-27T05:00:00Z')).open,
    true,
  );
  assert.equal(
    businessStatus(overnight, at('2026-10-27T07:59:00Z')).open,
    true,
  );
  assert.equal(
    businessStatus(overnight, at('2026-10-27T08:00:00Z')).open,
    false,
  );
});
test('una excepción de cierre completo anula el tramo de ayer tras medianoche', () => {
  const overnight = {
    ...branch,
    weekly: { ...branch.weekly, 1: [{ start: '22:00', end: '02:00' }] },
    exceptions: { '2026-10-27': [] },
  };
  assert.equal(
    businessStatus(overnight, at('2026-10-27T07:00:00Z')).open,
    false,
  );
});
test('cambia correctamente de día en una zona con horario de verano', () => {
  const summer = { ...branch, timeZone: 'America/New_York' };
  assert.equal(businessStatus(summer, at('2026-07-13T14:00:00Z')).open, true);
  assert.equal(businessStatus(summer, at('2026-01-12T14:00:00Z')).open, false);
});
test('precios: fijo, desde y consulta; nunca redondea centavos a otro precio', () => {
  assert.equal(formatPrice({ kind: 'fixed', amount: 200 }), '$200');
  assert.equal(formatPrice({ kind: 'from', amount: 250 }), 'Desde $250');
  assert.equal(formatPrice({ kind: 'consult' }), 'Consultar');
  assert.equal(formatPrice({ kind: 'fixed', amount: 200.5 }), '$200.5');
  assert.throws(() => formatPrice({ kind: 'fixed', amount: -1 }));
});
test('la solicitud identifica servicio y sucursal y codifica caracteres especiales', () => {
  const message = requestMessage('Hola, quiero solicitar una cita', 'Centro', {
    name: 'Corte + barba & diseño',
  });
  assert.match(message, /Corte \+ barba & diseño en Centro/);
  const url = new URL(whatsappUrl('+525555555555', message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/525555555555');
  assert.equal(url.searchParams.get('text'), message);
  assert.throws(() => whatsappUrl('javascript:alert(1)', message));
});
test('el modo live exige contacto y ubicación antes de compilar', () => {
  assert.throws(
    () => validateSite({ ...site, mode: 'live' }),
    /WhatsApp y ubicación/,
  );
});
test('rechaza errores de configuración con impacto en precios y horarios', () => {
  const invalid = structuredClone(site);
  invalid.branches[0].weekly[1] = [{ start: '10:00', end: '10:00' }];
  assert.throws(() => validateSite(invalid), /turno/);
  invalid.branches[0].weekly[1] = [
    { start: '10:00', end: '15:00' },
    { start: '14:00', end: '20:00' },
  ];
  assert.throws(() => validateSite(invalid), /superpuestos/);
  invalid.branches[0].weekly[1] = [{ start: '25:00', end: '20:00' }];
  assert.throws(() => validateSite(invalid), /Hora inválida/);
});
test('rechaza barberos asignados a una sucursal inexistente', () => {
  assert.throws(
    () =>
      validateSite({
        ...site,
        barbers: [{ id: 'ejemplo', name: 'Ejemplo', branchIds: ['otra'] }],
      }),
    /barbero/,
  );
});
