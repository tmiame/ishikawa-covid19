import { parseNumber, findContactRelations } from './utils';

export default function formatH3Tag(text: string) {
  const [name, ...args] = text.split('※').map((str) => str.trim());

  if (!name) {
    throw new Error('Invaild h3 format:name');
  }

  const id = parseNumber(name);

  if (!id) {
    throw new Error('Invaild h3 format:id');
  }

  // 関連者を取得
  // in > ※感染者150の同居者
  // in > [{ id: 150, text: '150の同居者' }]
  const refs = args.reduce<{ id: number; text: string }[]>((acc, str) => {
    const match = findContactRelations(str);
    return !match ? acc : [...acc, ...match];
  }, []);

  const notes = refs.length ? [] : [...args];

  return {
    id,
    name,
    refs,
    notes,
  };
}
