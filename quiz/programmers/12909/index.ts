/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/12909
 */

/**
 * stack을 이용해 구현하면 좋을 것 같다
 */
function solution12909(s: string) {
  // ( 가 아닌 ) 로 시작하는 경우 애초에 짝이 맞을 수 없기 때문에 early-return 진행
  if (s.startsWith(')')) return false;

  let stack = [];
  let answer = true;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') stack.push(s[i]);
    else {
      let popped = stack.pop();
      if (!!popped) continue;
      else {
        answer = false;
        break;
      }
    }
  }

  if (stack.length > 0) return false;
  return answer;
}
