import { formatPTagAge, formatPTagGender, formatPTagCity, formatPTagSymptomsItems } from './formatPTag';

const casesAge: [string, number | null][] = [
  ['(1)年代：90代', 90],
  ['(1)年代：90代', 90],
  ['(1)年代：90代', 90],
  ['(1)年代：90代', 90],
];

const casesGender: [string, number | null][] = [
  ['(1)性別：男性', 1],
  ['(2)性別：女性', 2],
  ['(1)年代：そのた', 3],
];

const casesCity: [string, string | null][] = [
  ['(3)居住地：石川県(金沢市)', 'kanazawa'],
  ['(3)居住地:石川県(金沢市)', 'kanazawa'],
  ['(3)居住地：石川県(内灘町)', 'uchinada'],
  ['(3)居住地 県外', 'kengai'],
  ['(3)居住地  石川県（金沢市保健所管内）', 'unknown'],
  ['(3)居住地  石川県', 'unknown'],
];

const casesSymptoms: [string, {} | null][] = [
  [
    '2月16日（日曜日）<br>38.3度の発熱、県内のA医療機関を受診',
    [
      {
        type: 'date',
        text: '2020-02-16T00:00:00+09:00',
      },
      {
        type: 'text',
        text: '38.3度の発熱、県内のA医療機関を受診',
      },
    ],
  ],
  [
    '（4）症状・経過<br>2月22日（土曜日）<br>感染者1の同居者（濃厚接触者）として、石川県保健環境センターにおいて、PCR検査を実施したところ、陽性と判明<br>発熱等の症状はない',
    [
      {
        type: 'date',
        text: '2020-02-22T00:00:00+09:00',
      },
      {
        type: 'text',
        text:
          '感染者1の同居者（濃厚接触者）として、石川県保健環境センターにおいて、PCR検査を実施したところ、陽性と判明',
      },
      {
        type: 'text',
        text: '発熱等の症状はない',
      },
    ],
  ],
];

describe('check <p> tag case age', () => {
  test.each(casesAge)('given %p as arguments, returns %p', (test, expectedResult) => {
    const { age } = formatPTagAge(test);
    expect(age).toEqual(expectedResult);
  });
});

describe('check <p> tag case gender', () => {
  test.each(casesGender)('given %p as arguments, returns %p', (test, expectedResult) => {
    const gender = formatPTagGender(test);
    expect(gender).toEqual(expectedResult);
  });
});

describe('check <p> tag case city', () => {
  test.each(casesCity)('given %p as arguments, returns %p', (test, expectedResult) => {
    const { city } = formatPTagCity(test);
    expect(city).toEqual(expectedResult);
  });
});

describe('check <p> tag case Symptoms', () => {
  test.each(casesSymptoms)('given %p as arguments, returns %p', (test, expectedResult) => {
    const symptomsItems = formatPTagSymptomsItems(test);
    expect(symptomsItems).toEqual(expectedResult);
  });
});
