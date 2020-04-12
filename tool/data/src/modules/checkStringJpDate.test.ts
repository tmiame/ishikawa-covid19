import checkStringJpDate from './checkStringJpDate';

const cases: [string, string | null][] = [
  ['12月12日（土曜日）', '2020-12-12'],
  ['12月9日（土曜日）', '2020-12-09'],
  ['1月1日（土曜日）', '2020-01-01'],
  ['1月12日（土曜日）', '2020-01-12'],
  ['222月22日（土曜日）', null],
];

describe('check p tag case age', () => {
  test.each(cases)('given %p as arguments, returns %p', (test, expectedResult) => {
    const result = checkStringJpDate(test);
    expect(result).toBe(expectedResult);
  });
});
