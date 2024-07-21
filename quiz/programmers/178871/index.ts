// https://school.programmers.co.kr/learn/courses/30/lessons/178871

// 자바스크립트의 Object 객체는 자료구조의 해시테이블과 비슷하다고 봤던 것 같다. (소팅 관련해서 깃 레포 업데이트 놓치지 말고 해야지.) 그렇게 해서 각 위치를 얻어낼 수 있는 방식이 신기했다. 채찍피티, 대단해.

// original Solving Way
// Problem: calling이 많아지거나, players의 수가 많아지게 될 경우 돌아야 하는 배열이 많아져 시간 복잡도가 기하급수적으로 늘어나는 문제가 생겼다. 문제 채점 시 시간 초과(ㅠㅠ)로 정답을 확인할 수 있는 문제가 있었다.
const move = (input: string[], targetPlayer: string) => {
  if (!input.includes(targetPlayer)) {
    return input;
  }

  const playerIndex = input.indexOf(targetPlayer);
  const beforePlayer = input[playerIndex - 1];

  input[playerIndex] = beforePlayer;
  input[playerIndex - 1] = targetPlayer;

  return input;
};

const getSolution = (players: string[], callings: string[]) => {
  let answer = players;
  let callingIndex = 0;

  while (callingIndex < callings.length) {
    const targetPlayerName = callings[callingIndex];

    move(answer, targetPlayerName);

    callingIndex += 1;
  }

  return answer;
};

// How To Improve?
// 나의 사랑, 너의 사랑 채찍피티.. 답 말고 힌트만 달랬더니 답까지 줬다.
// 우선 힌트를 보면서 왜 그렇게 수정해야하는지 확인했고, 답을 한 번 찬찬히 읽어보면서 어떤 이점이 가져와지는지 코드를 통해 직접 확인했다.
// 처음에 array.slice를 왜 해야하는지 이해할 수 없어서 다시 물어봤는데, 불변성의 법칙을 지켜주기 위함이라고 했다. 스프레드 연산자를 써도 무관한 거 아닌가?
// 채찍피티 답변은.. 뭘 써도 비슷하다 였다. ES6 환경을 지원하지 않는 경우에 slice를 사용하면 똑같은 결과를 받을 수 있고, 성능 자체는 큰 차이가 나지 않는다고 했다. 큰 배열이 아닌 이상에야.
// 그럼 큰 배열에선? 어떤 차이가 발생할 수 있는가에 대해 물어봤는데.. slice의 경우에 주어진 배열의 일부 혹은 전체를 복사하여 새로운 배열을 반환하고, 내부적으로 배열의 각 요소를 순회하며 새로운 배열에 복사하는 방식을 쓰고 있다고 했다.
// 스프레드 연산자의 경우 배열의 모든 요소를 개별 요소로 펼치고, 새로운 배열에 복사하는 방식을 사용한다고 했다. ES6 문법으로 최신 자바스크립트 엔진에서 최적화되어있다고 한다.
// 배열의 크기가 클 경우 slice 메서드가 스프레드 연산자에 비해 약간 더 빠를 수 있다고 한다. (좀 더 단순한 복사 작업을 수행하기 때문에!!) 근데 최신 엔진 안에서는 스프레드 연산자의 최적화도 잘 되어있어 큰 차이가 발생하지 않을 것 같다고 한다. 결국.. 비슷하다네 ㅠ

type Table = Record<string, number>;

const move2 = (positions: Table, input: string[], targetPlayer: string) => {
  const playerIndex = positions[targetPlayer];

  const beforePlayer = input[playerIndex - 1];

  input[playerIndex] = beforePlayer;
  input[playerIndex - 1] = targetPlayer;

  positions[targetPlayer] = playerIndex - 1;
  positions[beforePlayer] = playerIndex;
};

const getSolution2 = (players: string[], callings: string[]) => {
  let answer = players.slice();
  let positions: Table = {};
  // positions 객체를 만듦으로써 플레이어의 위치를 O(1) 시간 내에 찾을 수 있도록 한다
  // positions 객체와 answer 배열을 만들면 각 이동이 O(1) 시간 내에 처리되도록 할 수 있다.
  // 각 순서를 파악하기 위해 배열을 빙빙 돌 필요가 없겠구나!!!!!! 짱이다 대박 꼭 배열을 돌 필요가 없구나 와 대박

  for (let i = 0; i < players.length; i++) {
    const player = players[i];

    positions[player] = i;
  }

  for (const targetPlayerName of callings) {
    move2(positions, answer, targetPlayerName);
  }

  return answer;
};
