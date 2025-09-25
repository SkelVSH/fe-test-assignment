import { AMOUNT_REGEX } from '@/const';
import { useRates } from '@/providers/RatesContext';
import { getUserInput, setUserInput } from '@/services/userInput';
import { useState } from 'react';

export const Converter = () => {
  const { getRate, currenciesList } = useRates();
  const cachedData = getUserInput();
  const [pair, setPair] = useState({
    base: cachedData?.base || currenciesList[0]?.key,
    target: cachedData?.target || currenciesList[1]?.key,
  });
  const [amount, setAmount] = useState('');

  const handleChangePair = (base: string, target: string) => {
    setPair({
      base,
      target,
    });

    setUserInput({
      amount: amount ?? '',
      base: base,
      target: target,
    });
  };

  const handleChangeAmount = (amount: string) => {
    if (amount === '' || AMOUNT_REGEX.test(amount)) {
      setAmount(amount);
      setUserInput({
        amount: amount ?? '',
        base: pair.base,
        target: pair.target,
      });
    }
  };

  const rate = getRate(pair.base, pair.target)?.toFixed(6) ?? '';
  const inversedRate = getRate(pair.target, pair.base)?.toFixed(6) ?? '';
  const conversionResult = amount
    ? (Number(amount) * Number(rate)).toFixed(2)
    : '';

  return <div>Converter</div>;
};
