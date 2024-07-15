/**
 * 트리
 * - 계층적인 구조를 표현하는 자료구조
 * 
 * 서브트리
 * - 트리에서 어떤 노드를 기준으로 그 하위에 있는 트리
 * 
 * 노드
 *  - 트리의 구성 요소(각 데이터를 가지고 있음)
 * 
 * 트리의 높이와 레벨
 * - 높이 (Height)
 *  -> 루트 노드에서 가장 깊숙히 있는 노드까지의 거리
 * - 레벨 (Level)
 *  -> 루트 노드를 1번째 레벨로 하여 각 층마다 1씩 증가하는 번호
 * 
 * 이진트리
 * - 각 노드가 최대 두 개의 자식 노드를 가지는 트리
 * 
 * 이진트리의 종류
 * - 포화 이진 트리 (Full Binary Tree)
 *  -> 모든 레벨에 노드가 포화 상태로 차 있는 이진 트리
 * - 완전 이진 트리 (Complete Binary Tree)
 *  -> 마지막 레벨을 제외하고 모든 레벨이 완전히 차 있는 이진 트리
 *  -> 마지막 레벨의 노드들은 왼쪽부터 채워져 있어야 함
 * 
 * 
 * 이진트리의 순회: 이진트리의 순회는 재귀적으로 구현하는 것이 일반적이다
 * - 전위 순회 (Preorder Traversal): 루트 노드를 가장 먼저 방문하여 전위순회라고 함
 *   -> 루트 노드 -> 왼쪽 서브트리 -> 오른쪽 서브트리
 * - 중위 순회 (Inorder Traversal): 루트 노드를 중간에 방문하여 중위순회라고 함
 *  -> 왼쪽 서브트리 -> 루트 노드 -> 오른쪽 서브트리
 * - 후위 순회 (Postorder Traversal): 루트 노드를 가장 마지막에 방문하여 후위순회라고 함
 *   -> 왼쪽 서브트리 -> 오른쪽 서브트리 -> 루트 노드
 */


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