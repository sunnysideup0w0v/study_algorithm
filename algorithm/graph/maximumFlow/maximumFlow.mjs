class City {
  constructor(name) {
    this.name = name;
    this.adjacent_cities = {};
  }

  addAdjacentCity(city, flowAndCapacity) {
    this.adjacent_cities[city.name] = flowAndCapacity;
    city.adjacent_cities[this.name] = { flow: 0, capacity: 0 }
  }

  removeAdjacentCity(city) {
    delete this.adjacent_cities[city.name];
  }
}

class MaximumFlow {
  constructor() {
    this.all_cities = {};
    this.paths = [];
  }

  registerCity(city) {
    this.all_cities[city.name] = city;
  }

  DFS(source, sink, visited_cities = {}) {
    if (source.name === sink.name) {
      return true;
    }

    visited_cities[source.name] = true;

    for (let adjacent in source.adjacent_cities) {
      let edge = source.adjacent_cities[adjacent]; // flow와 capacity를 저장하고 있음.
      if (visited_cities[adjacent]) {
        // 이미 방문한 도시일 경우 continue;를 사용하여 건너뛰고 또 다른 도시를 순회함.
        continue;
      } else if (edge.capacity - edge.flow > 0) {
        this.paths.push(source);

        // 재귀 호출로 sink까지 가는 경로가 있는 경우
        if (this.DFS(this.all_cities[adjacent], sink, visited_cities)) {
          return true;
        }
        // 그렇지 않은 경우 경로 제거
        this.paths.pop();
      }
    }

    // 모든 인접 도시를 순회했는데 source에서 sink로 가는 경로가 없는 경우 false를 리턴하며 함수를 종료한다.
    return false;
  }

  fordFulkerson(source, sink) {
    let total = 0; // 최대 유량

    while (this.DFS(source, sink)) {
      this.paths.push(sink);
      let currentPathFlow = Infinity;

      // 증가 경로의 도시를 반복하면서 최대 유량 계산
      for (let i = 0; i < this.paths.length - 1; i++) {
        let currentCity = this.paths[i];
        let nextCity = this.paths[i + 1];
        let edge = currentCity.adjacent_cities[nextCity.name];

        currentPathFlow = Math.min(currentPathFlow, edge.capacity - edge.flow);
      }

      // 다시 한 번 증가 경로의 도시를 반복하면서 조금 전에 구한 유량을 실제로 흘려보낸다
      for (let i = 0; i < this.paths.length - 1; i++) {
        let currentCity = this.paths[i];
        let nextCity = this.paths[i + 1];

        currentCity.adjacent_cities[nextCity.name].flow += currentPathFlow;
        nextCity.adjacent_cities[currentCity.name].flow -= currentPathFlow; // 역방향으로 물을 흘려보냄
      }

      total += currentPathFlow;
      this.paths = [];
    }

    console.log(total);
  }
}

let city1 = new City("City1");
let city2 = new City("City2");
let city3 = new City("City3");
let city4 = new City("City4");

let maximumFlow = new MaximumFlow();
maximumFlow.registerCity(city1);
maximumFlow.registerCity(city2);
maximumFlow.registerCity(city3);
maximumFlow.registerCity(city4);

city1.addAdjacentCity(city2, { flow: 0, capacity: 1 });
city1.addAdjacentCity(city3, { flow: 0, capacity: 2 });
city2.addAdjacentCity(city3, { flow: 0, capacity: 1 });
city2.addAdjacentCity(city4, { flow: 0, capacity: 2 });
city3.addAdjacentCity(city4, { flow: 0, capacity: 2 });

maximumFlow.fordFulkerson(city1, city4); // 3