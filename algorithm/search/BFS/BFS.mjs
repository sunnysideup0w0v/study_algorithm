import { Vertex } from '../../../dataStructure/Graph/Graph.mjs';
import { Queue } from '../../../dataStructure/Queue.mjs';

// DFS = 재귀함수를 활용해 구현
// BFS = Queue, while문을 활용해 구현
function BFS(vertex) {
  let queue = new Queue();
  let visited_vertices = {};

  visited_vertices[vertex.value] = true;
  queue.enqueue(vertex);

  while (queue.isEmpty() == false) {
    let current_vertex = queue.dequeue().data;

    console.log(current_vertex.value);


    for (let adjacent of current_vertex.adjacent_vertices) {
      if (visited_vertices[adjacent.value]) {
        // 이미 방문한 정점인 경우
        continue;
      } else {
        // 방문하지 않은 정점일 경우
        visited_vertices[adjacent.value] = true;
        queue.enqueue(adjacent);
      }
    }
  }
}

let ben = new Vertex("Ben");
let ivy = new Vertex("Ivy");
let joy = new Vertex("Joy");
let jake = new Vertex("Jake");
let anna = new Vertex("Anna");
let david = new Vertex("David");
let elin = new Vertex("Elin");
let owen = new Vertex("Owen");

ben.addAdjacentVertex(ivy);
ben.addAdjacentVertex(jake);
ben.addAdjacentVertex(anna);
ben.addAdjacentVertex(david);

ivy.addAdjacentVertex(ben);
ivy.addAdjacentVertex(joy);

joy.addAdjacentVertex(ivy);
joy.addAdjacentVertex(jake);

jake.addAdjacentVertex(ben);
jake.addAdjacentVertex(joy);

anna.addAdjacentVertex(ben);

david.addAdjacentVertex(ben);
david.addAdjacentVertex(elin);

elin.addAdjacentVertex(david);
elin.addAdjacentVertex(owen);

owen.addAdjacentVertex(elin);

BFS(ben);