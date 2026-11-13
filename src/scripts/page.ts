import type { Branch } from '../lib/types.ts';
import { businessStatus, formatIntervals } from '../lib/hours.ts';

const dialog = document.querySelector<HTMLDialogElement>('#demo-dialog');
const message = document.querySelector<HTMLElement>('[data-preview-message]');
let trigger: HTMLElement | null = null;
function openPreview(button: HTMLElement, text: string) {
  if (!dialog || !message) return;
  trigger = button;
  message.textContent = text;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
for (const button of document.querySelectorAll<HTMLButtonElement>(
  '[data-request]',
)) {
  button.addEventListener('click', () =>
    openPreview(button, button.dataset.message ?? ''),
  );
}
document
  .querySelector<HTMLButtonElement>('[data-demo-map]')
  ?.addEventListener('click', (event) => {
    openPreview(
      event.currentTarget as HTMLElement,
      'La ubicación se configura para cada cliente. En el sitio real, «Cómo llegar» abrirá su dirección en Google Maps.',
    );
  });
for (const button of document.querySelectorAll<HTMLButtonElement>(
  '[data-close-dialog]',
))
  button.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  trigger?.focus();
});
dialog?.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  )
    dialog.close();
});

const filters = document.querySelector<HTMLElement>('.filters');
if (filters) filters.hidden = false;
for (const button of document.querySelectorAll<HTMLButtonElement>(
  '[data-filter]',
)) {
  button.addEventListener('click', () => {
    for (const item of document.querySelectorAll<HTMLButtonElement>(
      '[data-filter]',
    ))
      item.setAttribute('aria-pressed', String(item === button));
    let count = 0;
    for (const group of document.querySelectorAll<HTMLElement>(
      '[data-service-group]',
    )) {
      group.hidden =
        button.dataset.filter !== 'all' &&
        button.dataset.filter !== group.dataset.serviceGroup;
      if (!group.hidden) count += group.querySelectorAll('.service-row').length;
    }
    const status = document.querySelector('[data-filter-status]');
    if (status) status.textContent = `Mostrando ${count} servicios`;
  });
}
const mobileMenu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
mobileMenu?.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    mobileMenu.open = false;
  }),
);
mobileMenu?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    mobileMenu.open = false;
    mobileMenu.querySelector('summary')?.focus();
  }
});

const mobile = matchMedia('(max-width: 767px)');
const heroActions = document.querySelector<HTMLElement>('[data-hero-actions]');
const mobileContact = document.querySelector<HTMLElement>(
  '[data-mobile-contact]',
);
const floating = document.querySelector<HTMLElement>('[data-floating]');
const bar = document.querySelector<HTMLElement>('[data-contact-bar]');
function updateContact() {
  if (!heroActions || !mobileContact || !floating || !bar) return;
  mobileContact.hidden = !mobile.matches;
  const pastHeroActions = heroActions.getBoundingClientRect().bottom < 80;
  // Revelar el nuevo control después de ocultar el anterior mantiene la exclusión mutua.
  if (pastHeroActions) {
    floating.hidden = true;
    bar.hidden = false;
  } else {
    bar.hidden = true;
    floating.hidden = false;
  }
}
if (heroActions)
  new IntersectionObserver(updateContact, {
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0,
  }).observe(heroActions);
mobile.addEventListener('change', updateContact);
updateContact();

const json = document.querySelector('#branch-data')?.textContent;
if (json) {
  const branch: Branch = JSON.parse(json);
  function updateHours() {
    const status = businessStatus(branch);
    const label = document.querySelector('[data-open-label]');
    if (label)
      label.textContent = status.open ? 'Abierto ahora' : 'Cerrado ahora';
    document
      .querySelector('[data-open-status]')
      ?.setAttribute('data-open', String(status.open));
    for (const row of document.querySelectorAll<HTMLElement>('[data-weekday]'))
      row.classList.toggle(
        'is-today',
        Number(row.dataset.weekday) === status.day,
      );
    const today = document.querySelector('[data-today-note]');
    if (today)
      today.textContent = Object.hasOwn(branch.exceptions, status.date)
        ? `Horario especial de hoy: ${formatIntervals(status.today)}.`
        : status.open
          ? `Cerramos a las ${status.closes}.`
          : 'Puedes escribirnos; responderemos durante nuestro horario.';
    const response = document.querySelector('[data-response-note]');
    if (response)
      response.textContent = status.open
        ? 'Escríbenos para acordar fecha y hora. Tu cita está sujeta a confirmación.'
        : 'Estamos fuera de horario. Escríbenos y responderemos durante nuestra atención. Tu cita está sujeta a confirmación.';
    const zone = document.querySelector('[data-zone-label]');
    if (zone) {
      zone.textContent = 'Hora local';
      zone.setAttribute('title', branch.timeZone);
    }
  }
  updateHours();
  setInterval(updateHours, 30_000);
}
