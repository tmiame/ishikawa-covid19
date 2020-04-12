import formatH3Tag from './formatH3Tag';

const cases: [string, string | null][] = [
  ['感染者52', '感染者52'],
  ['感染者2 ※感染者1の同居者', '感染者2'],
  ['感染者2 ※感染者1、20の同居者', '感染者2'],
  ['感染者2 ※感染者1、2、3の同居者', '感染者2'],
];

describe('check <h3> tag', () => {
  test.each(cases)('given %p as arguments, returns %p', (test, expectedResult) => {
    const { name } = formatH3Tag(test);
    expect(name).toEqual(expectedResult);
  });
});
