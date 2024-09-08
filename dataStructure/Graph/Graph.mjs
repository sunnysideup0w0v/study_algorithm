class Vertex {
  constructor(value) {
    this.value = value;
    this.adjacent_vertices = [];
  }

  addAdjacentVertex(vertex) {
    this.adjacent_vertices.push(vertex);
  }

  removeAdjacentVertex(vertex) {
    for (let i = 0; i < this.adjacent_vertices.length; i++) {
      if (this.adjacent_vertices[i] == vertex) {
        this.adjacent_vertices.splice(i--, 1);
      }
    }
  }
}

export { Vertex };

// let jake = new Vertex('Jake');
// let ben = new Vertex('Ben');
// let joy = new Vertex('Joy');
// let ivy = new Vertex('Ivy');
// let elin = new Vertex('Elin');
// let anna = new Vertex('Anna');
// let david = new Vertex('David');

// jake.addAdjacentVertex(ben);
// ben.addAdjacentVertex(jake);
// joy.addAdjacentVertex(ben);
// joy.addAdjacentVertex(ivy);
// ivy.addAdjacentVertex(joy);
// ivy.addAdjacentVertex(ben);
// elin.addAdjacentVertex(ivy);
// elin.addAdjacentVertex(anna);
// anna.addAdjacentVertex(ben);
// anna.addAdjacentVertex(david);
// anna.addAdjacentVertex(elin);
// david.addAdjacentVertex(anna);

// console.log(anna.adjacent_vertices);
// anna.removeAdjacentVertex(david);
// console.log(anna.adjacent_vertices);
