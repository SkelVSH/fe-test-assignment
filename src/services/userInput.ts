import { LS_PAIR_KEY } from '@/const';

interface UserInput {
  base: string;
  target: string;
  amount: string;
}

function assertUserInput(obj: unknown): asserts obj is UserInput {
  if (
    typeof obj !== 'object' ||
    obj === null ||
    !('base' in obj) ||
    typeof obj.base !== 'string' ||
    !('target' in obj) ||
    typeof obj.target !== 'string' ||
    !('amount' in obj) ||
    typeof obj.amount !== 'string'
  ) {
    throw new Error('Invalid UserInput');
  }
}

export const getUserInput = () => {
  const input = localStorage.getItem(LS_PAIR_KEY);
  if (!input) return null;

  try {
    const parsedInput = JSON.parse(input);
    assertUserInput(parsedInput);
    return parsedInput;
  } catch (e) {
    console.warn('Invalid input', e);
    return null;
  }
};

export const setUserInput = (input: UserInput) =>
  localStorage.setItem(LS_PAIR_KEY, JSON.stringify(input));
