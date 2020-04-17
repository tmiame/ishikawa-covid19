import { parseNumber } from './utils';

type Contents = string[];

export const formatConditionList = (contents: Contents) => {
  return (
    contents
      .map((text) => text.replace(/\s+/g, ''))
      .filter((text) => text)
      // テーブルのヘッダー('感染者', '退院', '死亡', '治療中')を削除
      .slice(4)
      .reduce<string[][]>((acc, current, currentIndex) => {
        if (!acc.length || currentIndex % 5 === 0) {
          acc = [...acc, [current]];
        } else {
          acc[acc.length - 1] = [...acc[acc.length - 1], current];
        }
        return acc;
      }, [])
      .map((split) => ({
        name: split[0],
        total: parseNumber(split[1]),
        discharged: parseNumber(split[2]),
        dead: parseNumber(split[3]),
        hospitalized: parseNumber(split[4]),
      }))
  );
};

export const formatCondition = (contents: Contents) => {
  const list = formatConditionList(contents);
  const { total, discharged, dead, hospitalized } = list.slice(-1)[0];

  return {
    total,
    discharged,
    dead,
    hospitalized,
    list,
  };
};
