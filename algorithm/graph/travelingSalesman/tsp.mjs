const costs = [
  [0, 2, 9, 0],
  [1, 0, 6, 4],
  [0, 7, 0, 8],
  [6, 3, 0, 0]
]; // 도시의 간선을 표현하는 2차원 배열

// 동적 프로그래밍을 사용하는 외판원 문제의 풀이법
const dp = Array.from(Array(costs.length), () => Array((1 << costs.length) - 1).fill(Infinity)); // dp 배열 초기화, << 연산자를 사용하여 각 방문 도시를 비트로 표현, Infinity로 초기화

function tsp(city, visited_cities) {
  if (visited_cities == (1 << costs.length) - 1) { // 모든 도시를 방문한 경우
    return costs[city][0]; // 마지막 도시에서 0번 도시로 가는 비용 반환
  }

  if (dp[city][visited_cities] !== Infinity) { // 이미 계산한 값이 있는 경우
    return dp[city][visited_cities]; // 저장된 값 반환
  } else {
    for (let i = 0; i < costs.length; i++) { // 모든 도시에 대해
      if ((visited_cities & (1 << i)) == 0 && costs[city][i] != 0) { // 방문한 도시가 아니면서 자기 자신이 아니라면
        dp[city][visited_cities] = Math.min(dp[city][visited_cities], costs[city][i] + tsp(i, visited_cities | (1 << i))); // 재귀적으로 함수를 호출하면서 최소 비용을 계산한다.
      }
    }

    return dp[city][visited_cities]; // 계산된 값을 반환한다.
  }
}

let minimumCost = tsp(0, 1); // 0번 도시에서 시작한다.
console.log(minimumCost); // 21

// 동적 프로그래밍을 사용하지 않는 외판원 문제의 풀이법
let min = Infinity;

function tsp_without_dp(city, visited_cities, unvisited_cities) {
  if (unvisited_cities.length == 0) return costs[city][0]; // 모든 도시를 방문한 경우 마지막 도시에서 시작 도시까지의 거리 비용을 반환한다.

  for (let i = 0; i < unvisited_cities.length; i++) {
    if (costs[city][unvisited_cities[i]] == 0) continue; // 자기 자신으로 가는 경우는 제외한다.

    visited_cities.push(unvisited_cities[i]); // 방문한 도시에 추가한다.
    let tempUnvisited_city = unvisited_cities.filter(uc => uc != unvisited_cities[i]); // 방문하지 않은 도시에서 방문한 도시를 제외한다.

    min = Math.min(min, tsp_without_dp(unvisited_cities[i], visited_cities, tempUnvisited_city) + costs[city][unvisited_cities[i]]); // 재귀적으로 함수를 호출하면서 최소 비용을 계산한다.
  }

  return min; // 계산된 값을 반환한다.
}

let minimumCost_without_dp = tsp_without_dp(0, [], [0, 1, 2, 3]);
console.log(minimumCost_without_dp); // 21