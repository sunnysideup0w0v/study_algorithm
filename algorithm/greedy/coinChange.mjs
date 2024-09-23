/**
 * 탐욕 알고리즘의 예시로 거스름돈 문제를 풀어보자.
 * 
 * 한국의 동전들은 서로 배수 관계에 있기 때문에 탐욕 알고리즘을 사용할 수 있다.
 * 다른 나라의 동전들은 서로 배수 관계가 아닐 수 있기 때문에 탐욕 알고리즘을 사용할 경우, 정확한 최적해를 구하기 어려울 수 있다.
 */

class Coin {
  constructor(won) {
    this.won = won;
    this.count = 0;
  }
}

/**
 * 
 * @param {number} money 
 * @returns {Coin[]}
 */
function coinChange(money) {
  console.log(`거스름돈: ${money}원`);

  const coins = [
    new Coin(500),
    new Coin(100),
    new Coin(50),
    new Coin(10)
  ];

  for (let i = 0; i < coins.length; i++) {
    while (money >= coins[i].won) {
      money -= coins[i].won;
      coins[i].count++;
    }
  }

  console.log(coins);
  return coins;
}

coinChange(2380);