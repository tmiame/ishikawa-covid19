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
  },
][] = [
  ['感染者52', { id: 52, name: '感染者52', refs: [] }],
  ['感染者2', { id: 2, name: '感染者2', refs: [] }],
  ['感染者2', { id: 2, name: '感染者2', refs: [] }],
  ['感染者2', { id: 2, name: '感染者2', refs: [] }],
];

describe('check <h3> tag', () => {
  test.each(cases)('given %p as arguments, returns %p', (test, expectedResult) => {
    const h3 = formatH3Tag(test);
    expect(h3).toEqual(expectedResult);
  });
});
