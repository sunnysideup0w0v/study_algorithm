export class WeightedVertex {
  constructor(value) {
    this.value = value;

    // 간선의 가중치를 저장해야 하기 때문에 인접 정점을 저장하는 배열 대신 객체를 사용한다.
    this.adjacent_vertices = {};
  }

  /**
   * 
   * @param {WeightedVertex} vertex
   * 인접 정점 테이블에 저장할 정점
   * @param {any} weight
   * 정점 간의 간선에 저장되는 값(간선의 가중치)
   * @returns {void}
   */
  addAdjacentVertex(vertex, weight) {
    this.adjacent_vertices[vertex.value] = weight;
  }

  /**
   * 
   * @param {WeightedVertex} vertex
   * 인접 정점 테이블에서 제거할 정점
   * @returns {void} 
   */
  removeAdjacentVertex(vertex) {
    delete this.adjacent_vertices[vertex.value];
  }
}

let seoul = new WeightedVertex('서울');
let wonju = new WeightedVertex('원주');
let gangneung = new WeightedVertex('강릉');
let daejeon = new WeightedVertex('대전');
let jeonju = new WeightedVertex('전주');
let daegu = new WeightedVertex('대구');

seoul.addAdjacentVertex(wonju, 87);
seoul.addAdjacentVertex(daejeon, 140);
seoul.addAdjacentVertex(jeonju, 187);

console.log("===== 서울에서 이동할 수 있는 지역 =====")
console.log(seoul.adjacent_vertices);

seoul.removeAdjacentVertex(jeonju);

console.log("===== 서울에서 이동할 수 있는 지역 =====")
console.log(seoul.adjacent_vertices);

