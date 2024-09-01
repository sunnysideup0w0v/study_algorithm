/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/92334
 */

interface TestCase {
  id_list: string[];
  report: string[];
  k: number;
  result: number[];
}

type Reported = string;
type Reporters = string[];
type ReportHash = Record<Reported, Reporters>;

// 이중으로 반복문을 걸어버리니 시간 초과로 에러가 발생해버렸다. 흑흑
const quiz_solution_with_timeout = (
  id_list: TestCase['id_list'],
  report: TestCase['report'],
  k: TestCase['k']
) => {
  const reported: ReportHash = report.reduce((acc, key) => {
    const [reporter, target] = key.split(' ');

    if (acc[target] && acc[target].includes(reporter)) return acc;

    return {
      ...acc,
      [target]: [...(acc[target] || []), reporter],
    };
  }, {} as ReportHash);

  const id_Hash = id_list.reduce((acc, id) => ({ ...acc, [id]: 0 }), {});

  Object.keys(reported).forEach((target) => {
    const reporters = reported[target];
    if (reporters.length >= k) {
      reporters.forEach((reporter) => (id_Hash[reporter] += 1));
    }
  });

  return Object.values(id_Hash);
};

// 1차 수정.
// 우선 최대한 이중 반복을 제거하고자 하였음..
const quiz_solution_before_check_others = (
  id_list: TestCase['id_list'],
  report: TestCase['report'],
  k: TestCase['k']
) => {
  const id_hash = id_list.reduce((acc, id) => ({ ...acc, [id]: 0 }), {});
  const report_hash = id_list.reduce((acc, id) => ({ ...acc, [id]: [] }), {});

  report.forEach((reported) => {
    const [reporter, target] = reported.split(' ');

    if (report_hash[target].includes(reporter)) return;
    report_hash[target] = [...report_hash[target], reporter];
  });

  for (let doc in report_hash) {
    if (report_hash[doc].length < k) delete report_hash[doc];
  }

  [...Object.values(report_hash)].flat().forEach((id) => id_hash[id]++);

  return Object.values(id_hash);
};

// 다른 사람의 풀이에서 new Set을 사용하는 걸 보고 미리 중복제거를 할 수 있겠구나! 하고 생각했는데..
// 생각해보니까 new Set도 결국 배열 순회를 한 번 하는 것 같아서 크게 시간차가 발생하진 않았다. ㅋㅋㅋㅋㅋ
const quiz_solution = (
  id_list: TestCase['id_list'],
  report: TestCase['report'],
  k: TestCase['k']
) => {
  const id_hash = id_list.reduce((acc, id) => ({ ...acc, [id]: 0 }), {});
  const report_hash = id_list.reduce((acc, id) => ({ ...acc, [id]: [] }), {});

  Array.from(new Set(report)).forEach((reported) => {
    const [reporter, target] = reported.split(' ');

    if (report_hash[target].includes(reporter)) return;
    report_hash[target] = [...report_hash[target], reporter];
  });

  for (let doc in report_hash) {
    if (report_hash[doc].length < k) delete report_hash[doc];
  }

  [...Object.values(report_hash)].flat().forEach((id) => id_hash[id]++);

  return Object.values(id_hash);
};

console.log(
  quiz_solution(
    ['muzi', 'frodo', 'apeach', 'neo'],
    ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'],
    2
  )
);
