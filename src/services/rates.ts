import { LS_RATES_KEY } from '@/const';
import { RatesCache, RatesResponse } from '@/types';

function assertRatesResponse(obj: unknown): asserts obj is RatesResponse {
  if (
    typeof obj !== 'object' ||
    obj === null ||
    typeof (obj as RatesResponse).date !== 'string' ||
    typeof (obj as RatesResponse).base !== 'string' ||
    typeof (obj as RatesResponse).rates !== 'object'
  ) {
    throw new Error('Invalid RatesResponse');
  }
}

function assertRatesCache(obj: unknown): asserts obj is RatesCache {
  if (
    typeof obj !== 'object' ||
    obj === null ||
    typeof (obj as RatesCache).timestamp !== 'string'
  ) {
    throw new Error('Invalid RatesCache');
  }

  const data = (obj as RatesCache).data;
  if (data !== null) {
    assertRatesResponse(data);
  }
}

const setCachedRates = (rates: RatesResponse) => {
  localStorage.setItem(
    LS_RATES_KEY,
    JSON.stringify({
      data: rates,
      timestamp: Date.now().toString(),
    })
  );
};

export const getCachedRates = () => {
  const cachedData = localStorage.getItem(LS_RATES_KEY);
  if (!cachedData) return null;

  try {
    const parsedData = JSON.parse(cachedData);
    assertRatesCache(parsedData);
    return {
      ...parsedData,
      timestamp: Number(parsedData.timestamp),
    };
  } catch (e) {
    console.warn('Invalid cache', e);
    return null;
  }
};

const assertIsRatesResponse: (
  data: unknown
) => asserts data is RatesResponse = (data) => {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('rates' in data) ||
    typeof data.rates !== 'object'
  ) {
    throw new Error('Invalid rates data');
  }
};

export const fetchRates = async (): Promise<RatesResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl);

  if (!response.ok) throw new Error('Failed to fetch rates');

  const data = await response.json();

  assertIsRatesResponse(data);

  setCachedRates(data);
  return data;
};
