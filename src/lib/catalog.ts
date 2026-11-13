import type { Price, Service } from './types.ts';

export function formatPrice(
  price: Price,
  locale = 'es-MX',
  currency = 'MXN',
): string {
  if (price.kind === 'consult') return 'Consultar';
  if (!Number.isFinite(price.amount) || price.amount < 0)
    throw new Error('Precio inválido');
  const value = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price.amount);
  return price.kind === 'from' ? `Desde ${value}` : value;
}

export function requestMessage(
  intro: string,
  branchName: string,
  service?: Pick<Service, 'name'>,
): string {
  return `${intro}${service ? ` para ${service.name}` : ''} en ${branchName}. ¿Me ayudan a acordar fecha y hora? Gracias.`;
}

export function whatsappUrl(phone: string, message: string): string {
  if (!/^\+?[1-9]\d{7,14}$/.test(phone))
    throw new Error('WhatsApp debe incluir el código de país, sin espacios');
  return `https://wa.me/${phone.replace(/^\+/, '')}?text=${encodeURIComponent(message)}`;
}
