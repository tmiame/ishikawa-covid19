export default function checkStringJpDate(text: string) {
  const dateFormat = text.match(/^((\d){1,2})月((\d){1,2})日/);

  if (!dateFormat) {
    return null;
  }

  const [month, day] = [dateFormat[1], dateFormat[3]];

  return `2020-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
