export default function checkLabel(text: string) {
  const isLabel = text.match(/^[(|（][0-9][）|)]/);

  if (!isLabel) {
    return null;
  }

  if (text.includes('年代')) {
    return 'age';
  }

  if (text.includes('性別')) {
    return 'gender';
  }

  if (text.includes('居住地')) {
    return 'city';
  }

  if (text.includes('職業')) {
    return 'job';
  }

  if (text.includes('症状・経過')) {
    return 'symptoms';
  }

  return null;
}
