import formatH2Tag from './formatH2Tag';

const cases: [string, string | null][] = [
  ['令和1年2月22日（県内2例目）', '2019-02-22'],
  ['令和2年2月22日（県内2例目）', '2020-02-22'],
  [
    '令和2年4月11日（県内93例目、94例目、95例目、96例目、97例目、98例目、99例目、100例目、101例目、102例目、103例目、104例目）',
    '2020-04-11',
  ],
];

describe('check <h2> tag', () => {
  test.each(cases)('given %p as arguments, returns %p', (test, expectedResult) => {
    const result = formatH2Tag(test);
    expect(result).toBe(expectedResult);
  });

  test('throws on h2', () => {
    expect(() => {
      formatH2Tag('222月22日（土曜日）');
    }).toThrowError(new Error('Invaild h2 format'));
  });
});
