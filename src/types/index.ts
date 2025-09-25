export interface RatesResponse {
  date: string;
  base: string;
  rates: Record<string, number>;
}

export interface RatesCache {
  data: RatesResponse | null;
  timestamp: string;
}

export interface CurrencyDetails {
  symbol?: string;
  fullName?: string;
  key: string;
}
