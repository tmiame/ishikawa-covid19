import util from 'util';
import { promises as fs } from 'fs';
import { CaseContent, CaseItem } from '../types';

const accessFile = async (filePath = ''): Promise<CaseContent | null> => {
  try {
    await fs.access(filePath);
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
};

export const writeCaseList = async (filePath = '', updateTime = '', data: CaseItem[]) => {
  const file = await accessFile(filePath);

  const newData = {
    lastUpdateDateTime: updateTime,
    items: data,
  };

  if (!file) {
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    return;
  }

  const isNotUpdate = util.isDeepStrictEqual(file.items[0], data);

  if (isNotUpdate) {
    return 'No Update List';
  }

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};
