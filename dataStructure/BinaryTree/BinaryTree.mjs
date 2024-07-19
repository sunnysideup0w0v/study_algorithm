// 연결 리스트로 구현된 이진 트리

class BinaryTree {
  constructor(data, leftSubTree = null, rightSubTree = null) {
    this.data = data;
    this.leftSubTree = leftSubTree;
    this.rightSubTree = rightSubTree;
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
}

export { BinaryTree };