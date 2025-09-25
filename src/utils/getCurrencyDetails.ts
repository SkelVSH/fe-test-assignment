import { CurrencyDetails } from '@/types';

const DEFAULT_LOCALE = 'en-US';

export const getCurrencyDetails = (
  currency: string,
  locale: string = DEFAULT_LOCALE
): CurrencyDetails => ({
  symbol: new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })
    .formatToParts(0)
    .find((part) => part.type === 'currency')?.value,
  fullName: new Intl.DisplayNames([locale], { type: 'currency' }).of(currency),
  key: currency,
});
