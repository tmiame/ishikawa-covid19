import formatH3Tag from './formatH3Tag';

const cases: [
  string,
  {
    id: number;
    name: string;
    refs: {
      id: number;
      text: string;
    }[];
    notes: string[];
  },
][] = [
  ['感染者52', { id: 52, name: '感染者52', refs: [], notes: [] }],
  ['感染者2', { id: 2, name: '感染者2', refs: [], notes: [] }],
  [
    '感染者2 ※感染者150の同居者',
    {
      id: 2,
      name: '感染者2',
      notes: [],
      refs: [
        {
          id: 150,
          text: '150の同居者',
        },
      ],
    },
  ],
  [
    '感染者2 ※加賀東芝関係',
    {
      id: 2,
      name: '感染者2',
      refs: [],
      notes: ['加賀東芝関係'],
    },
  ],
];

describe('check <h3> tag', () => {
  test.each(cases)('given %p as arguments, returns %p', (test, expectedResult) => {
    const h3 = formatH3Tag(test);
    expect(h3).toEqual(expectedResult);
  });
});
