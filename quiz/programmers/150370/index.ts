const addMonth = (date: string, months: number) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);

  return newDate;
};

export const solution = (
  today: string,
  terms: string[],
  privacies: string[]
) => {
  const answer = [];

  const termHash = terms.reduce((acc, cur) => {
    const [term, savePeriod] = cur.split(' ');
    return { ...acc, [term]: Number(savePeriod) };
  }, {});

  const todayDate = new Date(today.replace('.', '-'));

  privacies.forEach((privacy, index) => {
    const [privacyDate, privacyTerm] = privacy.split(' ');

    const dueDate = addMonth(
      privacyDate.replace('.', '-'),
      termHash[privacyTerm]
    );

    if (todayDate >= dueDate) answer.push(index + 1);
  });

  return answer;
};

const answer = solution(
  '2022.05.19',
  ['A 6', 'B 17', 'C 3'],
  ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C']
);

const answer2 = solution(
  '2020.01.01',
  ['Z 3', 'D 5'],
  [
    '2019.01.01 D',
    '2019.11.15 Z',
    '2019.08.02 D',
    '2019.07.01 D',
    '2018.12.28 Z',
  ]
);

console.log(answer);
console.log(answer2);
