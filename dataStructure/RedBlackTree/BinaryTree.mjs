// 연결 리스트로 구현된 이진 트리

// 컬러 상수
const RED = false;
const BLACK = true;

class BinaryTree {
  constructor(data,) {
    this.data = data;
    this.leftSubTree = null;
    this.rightSubTree = null;

    // 부모 노드, 할아버지 노드를 쉽게 구하기 위해 부모 트리 추가
    this.parentTree = null;

    // RedBlack 트리에서 새롭게 생성되는 노드는 무조건 RED
    this.color = RED;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeftSubTree() {
    return this.leftSubTree;
  }

  setLeftSubTree(tree) {
    this.leftSubTree = tree;
  }

  getRightSubTree() {
    return this.rightSubTree
  }

  setRightSubTree(tree) {
    this.rightSubTree = tree;
  }

  removeLeftSubTree() {
    let deletingNode = this.leftSubTree;
    this.setLeftSubTree(null);

    return deletingNode
  }

  removeRightSubTree() {
    let deletingNode = this.rightSubTree;
    this.setRightSubTree(null);

    return deletingNode;
  }

  // 전위순회
  preOrderTraversal(tree) {
    if (tree == null) return;

    console.log(tree.data);
    this.preOrderTraversal(tree.getLeftSubTree());
    this.preOrderTraversal(tree.getRightSubTree());
  }

  // 중위순회
  inOrderTraversal(tree) {
    if (tree == null) return;

    this.inOrderTraversal(tree.getLeftSubTree());
    console.log(tree.data);
    this.inOrderTraversal(tree.getRightSubTree());
  }

  // 후위순회
  postOrderTraversal(tree) {
    if (tree == null) return;

    this.postOrderTraversal(tree.getLeftSubTree());
    this.postOrderTraversal(tree.getRightSubTree());
    console.log(tree.data);
  }

  // 부모 getter/setter
  getParentTree() {
    return this.parentTree;
  }

  setParentTree(tree) {
    this.parentTree = tree;
  }
}

export { BinaryTree, RED, BLACK };