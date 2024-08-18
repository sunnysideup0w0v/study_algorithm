// https://school.programmers.co.kr/learn/courses/30/lessons/250137

/**
 * [시전 시간, 초당 회복량, 추가 회복량]
 */
type BandAge = [number, number, number];

/**
 * [공격 시간, 피해량]
 */
type Attack = [number, number];

type Params = {
  bandage: BandAge;
  health: number;
  attacks: Attack[];
  result: number;
};

function solution(bandage: BandAge, health: number, attacks: number[][]) {
  const [bandageTime, recoverAmount, recoverBonusAmount] = bandage;

  const maxTime = Math.max(...attacks.map((pair) => pair[0]));
  const maxHealth = health;
  const attackHash = attacks.reduce(
    (acc, [attackAt, attackAmount]) => ({ ...acc, [attackAt]: attackAmount }),
    {}
  );

  let continuationCount = 0;

  const recover = (amount?: number) =>
    (health = Math.min(maxHealth, health + (amount || recoverAmount)));

  for (let i = 0; i < maxTime; i++) {
    const attack = attackHash[`${i + 1}`] || 0;

    if (attack > 0) {
      health -= attack;
      continuationCount = 0;
    } else {
      recover();
      continuationCount += 1;
    }

    if (continuationCount === bandageTime) {
      continuationCount = 0;
      recover(recoverBonusAmount);
    } else if (health <= 0) {
      break;
    }
  }

  if (health > 0) return health;
  return -1;
}

const test01: Params = {
  bandage: [5, 1, 5],
  health: 30,
  attacks: [
    [2, 10],
    [9, 15],
    [10, 5],
    [11, 5],
  ],
  result: 5,
};

const test02: Params = {
  bandage: [3, 2, 7],
  health: 20,
  attacks: [
    [1, 15],
    [5, 16],
    [8, 6],
  ],
  result: -1,
};

const test03: Params = {
  bandage: [4, 2, 7],
  health: 20,
  attacks: [
    [1, 15],
    [5, 16],
    [8, 6],
  ],
  result: -1,
};

const test04: Params = {
  bandage: [1, 1, 1],
  health: 5,
  attacks: [
    [1, 2],
    [3, 2],
  ],
  result: 3,
};

console.log(
  'test01 >>> ',
  solution(test01.bandage, test01.health, test01.attacks) === test01.result
);

console.log(
  'test02 >>> ',
  solution(test02.bandage, test02.health, test02.attacks) === test02.result
);

console.log(
  'test03 >>> ',
  solution(test03.bandage, test03.health, test03.attacks) === test03.result
);

console.log(
  'test04 >>> ',
  solution(test04.bandage, test04.health, test04.attacks) === test04.result
);
