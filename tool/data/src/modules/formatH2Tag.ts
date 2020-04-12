/**
 * 令和2年3月30日（県内10例目）
 * 令和2年3月30日(県内10例目)
 */

export default function formatH2Tag(text: string) {
  const dateFormat = text.match(/^(令和[0-9]年)((\d){1,2})月((\d){1,2})日/);

  if (!dateFormat) {
    throw new Error('Invaild h2 format');
  }

  const [warekiYear, month, day] = [dateFormat[1], dateFormat[3], dateFormat[4]];

  const year = parseInt(warekiYear.replace(/[^0-9\\.]/g, '')) + 2018;

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
