function BinarySearch(arr, target, start, end) {
  // start가 end보다 커질 경우 찾고자 하는 값이 없음을 의미함.
  if (start > end) return null;

  // 중간 범위 구하기
  const mid = Math.floor((start + end) / 2);

  // 중간 값이 찾고자 하는 값과 같을 경우 중간 값 반환
  if (arr[mid] === target) return mid;

  // 중간 값이 찾고자 하는 값보다 클 경우 왼쪽 부분 탐색
  if (arr[mid] > target) return BinarySearch(arr, target, start, mid - 1);

  // 중간 값이 찾고자 하는 값보다 작을 경우 오른쪽 부분 탐색
  return BinarySearch(arr, target, mid + 1, end);
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 7;
const result = BinarySearch(arr, target, 0, arr.length - 1);
console.log(result);