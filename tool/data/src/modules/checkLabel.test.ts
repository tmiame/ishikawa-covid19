import checkLabel from './checkLabel';

const cases: [string, string | null][] = [
  ['（1）年代　10代', 'age'],
  ['（1）年代 10代', 'age'],
  ['（1）年代：10代', 'age'],
  ['（1）年代:10代', 'age'],
  ['年代:10代', null],
];

describe('check p tag case age', () => {
  test.each(cases)('given %p as arguments, returns %p', (test, expectedResult) => {
    const result = checkLabel(test);
    expect(result).toBe(expectedResult);
  });
});
