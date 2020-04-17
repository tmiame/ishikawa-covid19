import util from 'util';
import { promises as fs } from 'fs';
import { ConditionContent, ConditionList } from '../types';

const accessFile = async (filePath = ''): Promise<ConditionContent | null> => {
  try {
    await fs.access(filePath);
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
};

export const writeCondition = async (filePath = '', data: ConditionList) => {
  const file = await accessFile(filePath);

  if (!file) {
    const newData = {
      lastUpdateDateTime: data.date,
      items: [data],
    };

    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

    return;
  }

  const newData = {
    lastUpdateDateTime: data.date,
    items: [data, ...file.items],
  };

  const isNotUpdate = util.isDeepStrictEqual(file.items[0].list, data.list);

  if (isNotUpdate) {
    return 'No Update Page';
  }

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};
