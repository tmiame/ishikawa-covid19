import checkStringJpDate from './checkStringJpDate';
import { findContactRelations } from './utils';

/**
 * 年代取得
 */
export function formatPTagAge(
  text: string,
): {
  age: number;
  note?: string[];
} {
  if (text.includes('乳児(1歳未満)')) {
    return {
      age: 0,
      note: ['乳児(1歳未満)'],
    };
  }

  const age = parseInt(text.replace(/^[(|（][0-9][）|)]年代[：|:]?/, '').replace(/[^0-9\\.]/, ''));

  if (!age) {
    throw new Error('Invaild p tag age format');
  }

  return { age };
}

/**
 * 性別取得
 */
export function formatPTagGender(text: string) {
  if (text.includes('男性')) {
    return 1;
  }

  if (text.includes('女性')) {
    return 2;
  }

  return 3;
}

/**
 * 性別取得
 */
export function formatPTagJob(text: string) {
  const job = text.replace(/^[(|（][0-9][)|）](\s)?職業[：|:]?/, '');

  if (!job) {
    throw new Error('Invaild p tag job format');
  }

  return { job };
}

/**
 * 居住地取得
 */
export function formatPTagCity(text: string) {
  const city = text.replace(/^[(|（][0-9][)|）](\s)?居住地[：|:]?/, '');

  if (!city) {
    throw new Error('Invaild p tag city format');
  }

  let cityName = city;

  if (city.match(/[市|町|村][)）]$/g)) {
    const shiChoSonMatch = city.match(/(?<=[(（]).*?(?=[)）])/) || [''];
    const [shiChoSonName] = shiChoSonMatch;

    switch (shiChoSonName) {
      case '珠洲市':
        cityName = 'suzu';
        break;
      case '輪島市':
        cityName = 'wajima';
        break;
      case '能登町':
        cityName = 'noto';
        break;
      case '穴水町':
        cityName = 'anamizu';
        break;
      case '七尾市':
        cityName = 'nanao';
        break;
      case '志賀町':
        cityName = 'shika';
        break;
      case '中能登町':
        cityName = 'nakanoto';
        break;
      case '羽咋市':
        cityName = 'hakui';
        break;
      case '宝達志水町':
        cityName = 'hodatsushimizu';
        break;
      case 'かほく市':
        cityName = 'kahoku';
        break;
      case '津幡町':
        cityName = 'tsubata';
        break;
      case '内灘町':
        cityName = 'uchinada';
        break;
      case '金沢市':
        cityName = 'kanazawa';
        break;
      case '野々市市':
        cityName = 'nonoichi';
        break;
      case '白山市':
        cityName = 'hakusan';
        break;
      case '川北町':
        cityName = 'kawakita';
        break;
      case '能美市':
        cityName = 'nomi';
        break;
      case '小松市':
        cityName = 'komatsu';
        break;
      case '加賀市':
        cityName = 'kaga';
        break;
      default:
        cityName = 'unknown';
        break;
    }

    return {
      city: cityName,
    };
  }

  if (city.includes('県外')) {
    return { city: 'kengai', note: `公式データの居住地：${cityName}` };
  }

  return { city: 'unknown', note: `公式データの居住地：${cityName}` };
}

/**
 * 症状・経過欄 - 日付 or テキスト
 */
export function formatPTagSymptomsItems(text: string) {
  text = text.replace(/^[(|（][0-9][)|）](\s)?症状・経過[：|:]?/, '');
  const breakLines = text.split('<br>').filter((i) => i);

  return breakLines.map((line) => {
    const date = checkStringJpDate(line);
    const refs = findContactRelations(line);

    if (date) {
      return {
        type: 'date',
        text: date,
        refs: refs ?? [],
      };
    }

    return {
      type: 'text',
      text: line,
      refs: refs ?? [],
    };
  });
}
