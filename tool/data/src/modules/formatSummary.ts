import { parseNumber } from './utils';

type Contents = string[];

export const formatConditionList = (contents: Contents) => {
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
      discharged: parseNumber(split[2]),
      hospitalized: parseNumber(split[3]),
    }));
};

export const formatCondition = (contents: Contents) => {
  const list = formatConditionList(contents);
  const lastItemIndex = list.length - 1;
  const { total, discharged, hospitalized } = list[lastItemIndex];

  return {
    total,
    hospitalized,
    discharged,
    list,
  };
};
