import { findContactRelations } from './utils';

const casesAge: [string, {}[] | null][] = [
  ['4月11日(土曜日)', null],
  [
    '感染者1の同居者（濃厚接触者）として、石川県保健環境センターにおいて、PCR検査を実施したところ、陽性と判明',
    [{ id: 1, text: '1の同居者（濃厚接触者）' }],
  ],
  [
    '感染者2、3の同居者（濃厚接触者）として、石川県保健環境センターにおいて、PCR検査を実施したところ、陽性と判明',
    [
      { id: 2, text: '2の同居者（濃厚接触者）' },
      { id: 3, text: '3の同居者（濃厚接触者）' },
    ],
  ],
  ['感染者24の同居者', [{ id: 24, text: '24の同居者' }]],
  [
    '感染者1、2、3の職場の同僚',
    [
      { id: 1, text: '1の職場の同僚' },
      { id: 2, text: '2の職場の同僚' },
      { id: 3, text: '3の職場の同僚' },
    ],
  ],
  [
    '感染者40、50の家族親族',
    [
      { id: 40, text: '40の家族親族' },
      { id: 50, text: '50の家族親族' },
    ],
  ],
];

describe('感染者の関連性', () => {
  test.each(casesAge)('given %p as arguments, returns %p', (test, expectedResult) => {
    expect(findContactRelations(test)).toEqual(expectedResult || null);
  });
});
