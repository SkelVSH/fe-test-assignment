import { RATES_CACHE_EXPIRATION } from '@/const';
import { useOnlineState } from '@/hooks/useOnlineState';
import { fetchRates, getCachedRates } from '@/services/rates';
import { CurrencyDetails, RatesResponse } from '@/types';
import { getCurrencyDetails } from '@/utils/getCurrencyDetails';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface RatesContextType {
  currenciesList: CurrencyDetails[];
  getRate: (base: string, target: string) => number | null;
  forceRefetch: () => void;
  isLoading: boolean;
  lastUpdateTS: number | null;
}

const RatesContext = createContext<RatesContextType | null>(null);

export const RatesProvider = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useOnlineState();
  const cache = getCachedRates();
  const [data, setData] = useState<RatesResponse | null>(cache?.data || null);
  const [lastUpdateTS, setLastUpdateTS] = useState<number | null>(
    cache?.timestamp || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const updateRates = useCallback(
    async (force?: boolean) => {
      if (isLoading) return;

      setIsLoading(true);
      const cachedRates = getCachedRates();
      try {
        if (!force) {
          const now = Date.now();

          if (
            (!isOnline && cachedRates) ||
            (cachedRates &&
              cachedRates.timestamp + RATES_CACHE_EXPIRATION > now)
          ) {
            setData(cachedRates.data);
            setLastUpdateTS(cachedRates.timestamp);
            return;
          }
        }
        const rates = await fetchRates();
        setData(rates);
        setLastUpdateTS(Date.now());
      } catch (e) {
        console.warn('Failed to fetch rates', e);
        if (cachedRates) {
          setData(cachedRates.data);
          setLastUpdateTS(cachedRates.timestamp);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isOnline, isLoading]
  );

  useEffect(() => {
    let intervalId: number;

    updateRates();

    intervalId = window.setInterval(() => {
      if (isOnline) updateRates();
    }, RATES_CACHE_EXPIRATION);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [updateRates, isOnline]);

  const currenciesList = useMemo(
    () => Object.keys(data?.rates || {}).map((key) => getCurrencyDetails(key)),
    [data]
  );

  const getRate = (base: string, target: string) =>
    data && data.rates[target] && data.rates[base]
      ? data.rates[target] / data.rates[base]
      : null;

  const forceRefetch = () => updateRates(true);

  const value = {
    currenciesList,
    getRate,
    forceRefetch,
    isLoading,
    lastUpdateTS,
  };

  return (
    <RatesContext.Provider value={value}>{children}</RatesContext.Provider>
  );
};

export const useRates = () => {
  const context = useContext(RatesContext);
  if (!context) throw new Error('useRates must be used within a RatesProvider');

  return context;
};
