/**
 * 문자열 sort 하는 부분을 틀려먹었었다. 진짜 바보같다.
 *
 * tsc 에서 .fill을 인식하지 못한다.
 */

/**
 *
 * @param arr 수정이 필요한 문자열
 * @param length 반환해야 하는 배열의 길이
 * @param fill 비어있는 배열에 채울 문자열
 */
const solution_241113_with_for_loop = (
  arr: string[],
  length: number,
  fill: string
) => {
  const sortedArr = arr.sort();
  const answer = [];

  for (let i = 0; i < length; i++) {
    sortedArr[i] ? answer.push(sortedArr[i]) : answer.push(fill);
  }

  return answer;
};

const solution_241113_with_fill = (
  arr: string[],
  length: number,
  fill: string
) => {
  const sortedArr = arr.sort();
  const answer = Array(length).fill(fill);

  for (let i = 0; i < sortedArr.length; i++) {
    answer[i] = sortedArr[i];
  }

  return answer;
};

console.log(
  'forLoop >>> ',
  solution_241113_with_for_loop(['jude', 'amy'], 6, '')
);

console.log('fill >>> ', solution_241113_with_fill(['jude', 'amy'], 6, ''));
