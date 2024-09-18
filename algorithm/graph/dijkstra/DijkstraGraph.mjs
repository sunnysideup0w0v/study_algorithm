export class City {
  constructor(name) {
    this.name = name;
    this.adjacent_cities = {};
  }


  addAdjacentCity(city, distance) {
    this.adjacent_cities[city.name] = distance;
  }


  removeAdjacentCity(city) {
    delete this.adjacent_cities[city.name];
  }
}

class Dijkstra {
  constructor() {
    this.all_cities = {};
  }

  registerCity(city) {
    this.all_cities[city.name] = city;
  }

  shortestPath(start_city, end_city) {
    let visited_cities = {};
    let unvisited_cities = {};
    let shortest_path_table = {};

    for (let city_name in this.all_cities) {
      unvisited_cities[city_name] = this.all_cities[city_name]
    }

    if (unvisited_cities[start_city.name] == null) {
      console.log("추ㄹ발 도시가 등록되어 있지 않습니다.")
      return null;
    }

    for (let city_name in unvisited_cities) {
      shortest_path_table[city_name] = Infinity;
    }

    shortest_path_table[start_city.name] = 0;

    while (Object.keys(unvisited_cities).length > 0) {
      let closest_city_name = null;

      for (let city_name in unvisited_cities) {
        if (closest_city_name == null | shortest_path_table[city_name] < shortest_path_table[closest_city_name]
        ) {
          closest_city_name = city_name
        }

        // 순회하고나면 closest_city_name에는 가장 가까운 도시 이름이 저장됨
      }

      visited_cities[closest_city_name] = unvisited_cities[closest_city_name];
      delete unvisited_cities[closest_city_name];

      // 방문한 도시의 인접 도시들을 순회
      for (let adjacent_city_name in visited_cities[closest_city_name].adjacent_cities) {
        // 이미 방문한 인접 도시일 경우, 다음 for문을 실행한다.
        if (unvisited_cities[adjacent_city_name] == null) {
          continue;
        }

        let distance_from_start_city = shortest_path_table[closest_city_name]; // 출발 도시에서 현재 도시까지의 거리
        let distance_to_adjacent_city = visited_cities[closest_city_name].adjacent_cities[adjacent_city_name]; // 현재 도시에서 인접 도시까지의 거리
        let distance = distance_from_start_city + distance_to_adjacent_city;

        // 테이블에 기재되어있는
        if (shortest_path_table[adjacent_city_name] > distance) {
          shortest_path_table[adjacent_city_name] = distance;
        }
      }
    }

    // console.log(shortest_path_table)
    console.log(shortest_path_table[end_city.name]);
  }
}

let dijkstra = new Dijkstra();

let seoul = new City('서울');
let wonju = new City('원주');
let gangneung = new City('강릉');
let daejeon = new City('대전');
let jeonju = new City('전주');
let daegu = new City('대구');

dijkstra.registerCity(seoul);
dijkstra.registerCity(wonju);
dijkstra.registerCity(gangneung);
dijkstra.registerCity(daejeon);
dijkstra.registerCity(jeonju);
dijkstra.registerCity(daegu);

seoul.addAdjacentCity(wonju, 87);
seoul.addAdjacentCity(gangneung, 165);
seoul.addAdjacentCity(daejeon, 140);
seoul.addAdjacentCity(jeonju, 187);

wonju.addAdjacentCity(seoul, 87);
wonju.addAdjacentCity(gangneung, 95);
wonju.addAdjacentCity(daejeon, 118);
wonju.addAdjacentCity(daegu, 178);

gangneung.addAdjacentCity(seoul, 165);
gangneung.addAdjacentCity(wonju, 95);
gangneung.addAdjacentCity(daegu, 212);

daejeon.addAdjacentCity(seoul, 140);
daejeon.addAdjacentCity(wonju, 118);
daejeon.addAdjacentCity(jeonju, 56);
daejeon.addAdjacentCity(daegu, 122);

jeonju.addAdjacentCity(seoul, 187);
jeonju.addAdjacentCity(daejeon, 56);
jeonju.addAdjacentCity(daegu, 130);

daegu.addAdjacentCity(wonju, 178);
daegu.addAdjacentCity(gangneung, 212);
daegu.addAdjacentCity(daejeon, 122);
daegu.addAdjacentCity(jeonju, 130);

dijkstra.shortestPath(seoul, daegu)
