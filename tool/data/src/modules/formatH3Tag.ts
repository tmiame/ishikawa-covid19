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

  const refs = args.reduce<{ id: number; text: string }[]>((acc, str) => {
    const match = findContactRelations(str);

    return !match ? acc : [...acc, ...match];
  }, []);

  return {
    id,
    name,
    refs,
  };
}
