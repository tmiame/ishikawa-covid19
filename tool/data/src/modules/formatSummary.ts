import { parseNumber } from './utils';

type Contents = string[];

export const formatSummary = (contents: Contents) => {
  return contents
    .map((text) => text.replace(/\s+/g, ''))
    .filter((text) => text)
    .slice(3)
    .reduce<string[][]>(
      (acc, current, currentIndex) => {
        if (!acc[0].length) {
          acc[0] = [current];
          return acc;
        }
        if (currentIndex % 4 === 0) {
          acc = [...acc, [current]];
        } else {
          acc[acc.length - 1] = [...acc[acc.length - 1], current];
        }
        return acc;
      },
      [[]],
    )
    .map((split) => ({
      name: split[0],
      total: parseNumber(split[1]),
      hospitalized: parseNumber(split[2]),
      discharged: parseNumber(split[3]),
    }));
};
