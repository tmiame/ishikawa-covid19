import checkStringJpDate from './checkStringJpDate';

const cases: [string, string | null][] = [
  ['12月12日（土曜日）', '2020-12-12T00:00:00+09:00'],
  ['12月9日（土曜日）', '2020-12-09T00:00:00+09:00'],
  ['1月1日（土曜日）', '2020-01-01T00:00:00+09:00'],
  ['1月12日（土曜日）', '2020-01-12T00:00:00+09:00'],
  ['222月22日（土曜日）', null],
];

describe('check p tag case age', () => {
  test.each(cases)('given %p as arguments, returns %p', (test, expectedResult) => {
    const result = checkStringJpDate(test);
    expect(result).toBe(expectedResult);
  });
});
