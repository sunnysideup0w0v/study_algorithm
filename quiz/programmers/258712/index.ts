/**
 * Link: https://school.programmers.co.kr/learn/courses/30/lessons/258712
 */

function solution(friends: string[], gifts: string[]) {
  const giftLevelHash = friends.reduce(
    (acc, friend) => ({ ...acc, [friend]: 0 }),
    {} as Record<string, 0>
  );

  const giftHistory = friends.reduce(
    (acc, friend) => ({
      ...acc,
      [friend]: friends
        .filter((friendName) => friendName !== friend)
        .reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
    }),
    {}
  );

  gifts.forEach((gift) => {
    const [from, to] = gift.split(' ');

    giftLevelHash[from] += 1;
    giftLevelHash[to] -= 1;

    giftHistory[from][to] += 1;
  });

  // 누가 제일 많이 받을까?
  const predicted = friends.reduce((acc, friend) => {
    const getter = friend;

    const history = giftHistory[getter];
    let getCount = 0;

    for (let giver in history) {
      if (
        giftHistory[giver][getter] < history[giver] ||
        (giftHistory[giver][getter] === history[giver] &&
          giftLevelHash[getter] > giftLevelHash[giver])
      ) {
        getCount += 1;
      }
    }

    return [...acc, getCount];
  }, []);

  return Math.max(...predicted);
}

const case1 = {
  friends: ['muzi', 'ryan', 'frodo', 'neo'],
  gifts: [
    'muzi frodo',
    'muzi frodo',
    'ryan muzi',
    'ryan muzi',
    'ryan muzi',
    'frodo muzi',
    'frodo ryan',
    'neo muzi',
  ],
  result: 2,
};

const case2 = {
  friends: ['joy', 'brad', 'alessandro', 'conan', 'david'],
  gifts: [
    'alessandro brad',
    'alessandro joy',
    'alessandro conan',
    'david alessandro',
    'alessandro david',
  ],
  result: 4,
};

const case3 = {
  friends: ['a', 'b', 'c'],
  gifts: ['a b', 'b a', 'c a', 'a c', 'a c', 'c a'],
  result: 0,
};

console.log(solution(case1.friends, case1.gifts) === case1.result);
console.log(solution(case2.friends, case2.gifts) === case2.result);
console.log(solution(case3.friends, case3.gifts) === case3.result);
