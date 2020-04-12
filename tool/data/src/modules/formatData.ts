import zenkakuToHankaku from './zenkakuToHankaku';
import checkLabel from './checkLabel';
import formatH2Tag from './formatH2Tag';
import formatH3Tag from './formatH3Tag';
import { formatPTagAge, formatPTagJob, formatPTagCity, formatPTagGender, formatPTagSymptomsItems } from './formatPTag';

type CaseItem = {
  id?: number;
  date?: string;
  datePublish?: string;
  age?: number;
  note?: string[];
  gender?: number;
  city?: string;
  job?: string;
  symptoms?: { type: string; text: string }[];
  contactRelation?: { id: number; text: string }[];
};

type DayItem = {
  date: string;
  list: CaseItem[];
};

export const formatData = (contents: { tagName: string; textContent: string }[]) => {
  const dayByDayData = contents.reduce<DayItem[]>((result, el) => {
    const text = zenkakuToHankaku(el.textContent);

    //
    // pタグ
    //
    if (el.tagName === 'P') {
      const caseDetail: CaseItem = {};
      const notes = [];
      const label = checkLabel(text);

      switch (label) {
        case 'age': {
          const { age, note } = formatPTagAge(text);
          caseDetail.age = age;
          if (note) {
            notes.push(note);
          }
          break;
        }
        case 'gender': {
          caseDetail.gender = formatPTagGender(text);
          break;
        }
        case 'city': {
          const { city, note } = formatPTagCity(text);
          caseDetail.city = city;
          if (note) {
            notes.push(note);
          }
          break;
        }
        case 'job': {
          const { job } = formatPTagJob(text);
          caseDetail.job = job;
          break;
        }
        default: {
          const currentList = result[result.length - 1].list;
          const lastSymptoms = currentList[currentList.length - 1].symptoms || [];
          const symptomsItems = formatPTagSymptomsItems(text);
          caseDetail.symptoms = [...lastSymptoms, ...symptomsItems];
          break;
        }
      }

      const currentList = result[result.length - 1].list;
      currentList[currentList.length - 1] = {
        ...currentList[currentList.length - 1],
        ...caseDetail,
      };
    }

    //
    // h2タグ
    //
    else if (el.tagName === 'H2') {
      result.push({
        date: formatH2Tag(text),
        list: [],
      });
    }

    //
    // h3タグ
    //
    else if (el.tagName === 'H3') {
      const { id } = formatH3Tag(text);
      result[result.length - 1].list.push({
        id,
      });
    }

    return result;
  }, []);

  const getDate = (listItem: CaseItem) => {
    const symptoms = listItem.symptoms || [];
    return [...symptoms].reverse().find((symptomsItem) => symptomsItem.type === 'date')?.text;
  };

  return dayByDayData.reduce<CaseItem[]>((acc, current) => {
    return [
      ...acc,
      ...current.list.map((listItem) => ({
        ...listItem,
        datePublish: current.date,
        date: getDate(listItem),
      })),
    ];
  }, []);
};
