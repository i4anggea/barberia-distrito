export type Price =
  { kind: 'fixed' | 'from'; amount: number } | { kind: 'consult' };
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: Price;
  duration?: number;
}
export interface TimeInterval {
  start: string;
  end: string;
}
export interface Branch {
  id: string;
  name: string;
  timeZone: string;
  address: string;
  locality: string;
  reference?: string;
  whatsapp?: string;
  mapsQuery?: string;
  weekly: Record<number, TimeInterval[]>;
  exceptions: Record<string, TimeInterval[]>;
}
export interface Barber {
  id: string;
  name: string;
  branchIds: string[];
}
export interface SiteContent {
  mode: 'demo' | 'live';
  name: string;
  descriptor: string;
  logo?: { src: string; alt: string };
  locale: string;
  currency: string;
  activeBranchId: string;
  branches: Branch[];
  barbers: Barber[];
  categories: { id: string; name: string }[];
  services: Service[];
  copy: {
    eyebrow: string;
    headline: [string, string];
    introduction: string;
    requestIntro: string;
  };
}
