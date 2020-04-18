import zenkakuToHankaku from './zenkakuToHankaku';
import checkLabel from './checkLabel';
import formatH2Tag from './formatH2Tag';
import formatH3Tag from './formatH3Tag';
import { formatPTagAge, formatPTagJob, formatPTagCity, formatPTagGender, formatPTagSymptomsItems } from './formatPTag';

type CaseItem = {
  id: number;
  date: string;
  dateTestPositive: string;
  note: string[];
  age?: number;
  gender?: number;
  city?: string;
  job?: string;
  symptoms: { type: string; text: string }[];
  refs?: { id: number; text: string }[];
};

type Contents = {
  tagName: string;
  textContent: string;
}[];

export const formatData = (contents: Contents) => {
  const publishGroup: string[] = [];
  const result: CaseItem[] = [];

  contents.forEach((row) => {
    const text = zenkakuToHankaku(row.textContent);

    switch (row.tagName) {
      case 'H2': {
        publishGroup.push(formatH2Tag(text));
        break;
      }
      case 'H3': {
        const date = publishGroup[publishGroup.length - 1];
        const { id, notes } = formatH3Tag(text);

        result.push({
          id,
          note: notes,
          date,
          dateTestPositive: date,
          symptoms: [],
        });
        break;
      }
      case 'P': {
        if (!result.length) {
          break;
        }
        const curentDayItem = result[result.length - 1];
        const label = checkLabel(text);
        switch (label) {
          case 'age': {
            const { age, note } = formatPTagAge(text);
            curentDayItem.age = age;
            if (note) {
              curentDayItem.note = [...curentDayItem.note, ...note];
            }
            break;
          }
          case 'gender': {
            curentDayItem.gender = formatPTagGender(text);
            break;
          }
          case 'city': {
            const { city, note } = formatPTagCity(text);
            curentDayItem.city = city;
            if (note) {
              curentDayItem.note = [...curentDayItem.note, note];
            }
            break;
          }
          case 'job': {
            const { job } = formatPTagJob(text);
            curentDayItem.job = job;
            break;
          }
          default: {
            const currentSymptoms = curentDayItem.symptoms ?? [];
            const symptomsItems = formatPTagSymptomsItems(text);
            curentDayItem.symptoms = [...currentSymptoms, ...symptomsItems];
            break;
          }
        }
        break;
      }

      default: {
        break;
      }
    }
  });

  // 症状欄の陽性判定日を取得する
  const getItemTestPositiveDate = (caseItem: CaseItem) => {
    const symptoms = caseItem.symptoms || [];
    return [...symptoms].reverse().find((symptomsItem) => symptomsItem.type === 'date')?.text;
  };

  return result.map((item) => {
    const itemDate = getItemTestPositiveDate(item);

    if (!itemDate) {
      throw new Error('Invaild CaseItem data');
    }

    return {
      ...item,
      dateTestPositive: getItemTestPositiveDate(item),
    };
  });
};
