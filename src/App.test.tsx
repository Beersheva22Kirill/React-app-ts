import { matrixSum, range } from './utils/numbers';

test ('sum of matrix', () => {
  expect(matrixSum([[1,1,1],[2,2,2],[3,3,3]])).toEqual(18);
})

test ("range test", () => {
  expect(range(1,3)).toEqual([1,2])
}) 
