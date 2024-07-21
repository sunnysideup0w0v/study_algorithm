/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/155652
 */

// a -> h
// z -> g
// s -> 입력 문자열
// skip -> 스킵 문자열
// index -> skip 인덱스에서 얼만큼 뒤에 있는 문자열로 가져올 것인지?

// 다시 풀어야 해 ㅠ_ㅜ
function solution(s: string, skip: string, index: number): string {
  const sAsciiArr = s.split('').map((el) => el.charCodeAt(0));
  const skipAsciiArr = skip.split('').map((el) => el.charCodeAt(0));
  const startAlphaCode = 'a'.charCodeAt(0);
  const lastAlphaCode = 'z'.charCodeAt(0);

  const getValidCode = (code: number) =>
    code > lastAlphaCode ? startAlphaCode + (code - lastAlphaCode - 1) : code;

  const getFormattedAsciiCode = (code: number, index: number) => {
    let returnValue = getValidCode(code + index);

    const skipCount = skipAsciiArr.filter(
      (el) => el >= code && (el <= returnValue || el <= code + index)
    ).length;

    if (skipCount <= 0) return returnValue;

    return getFormattedAsciiCode(returnValue, skipCount);
  };

  return String.fromCharCode(
    ...sAsciiArr.map((el) => getFormattedAsciiCode(el, index))
  );
}

console.log('answer >>> ', solution('aukks', 'wbqd', 5));

// q r s t u v w x y z a b
