import { BinaryTree } from '../BinaryTree.mjs';

// 이진탐색트리는 이미 작성한 이진트리 구조를 기반으로 확장
class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  // 삽입
  insert(data) {
    if (this.root === null) {
      this.root = new BinaryTree(data);
      return this.root;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode !== null) {
      parentNode = currentNode;

      if (data < currentNode.getData()) {
        // 이진탐색트리에서 데이터가 부모 노드보다 작으면 왼쪽 서브트리로 이동
        currentNode = currentNode.getLeftSubTree();
      } else if (data > currentNode.getData()) {
        // 이진탐색트리에서 데이터가 부모 노드보다 크면 오른쪽 서브트리로 이동
        currentNode = currentNode.getRightSubTree();
      } else {
        // 중복된 데이터를 만날 경우 삽입을 위한 탐색을 멈추고 함수를 종료
        return
      }
    }

    // 새로운 노드 생성
    const newNode = new BinaryTree(data);

    // 새롭게 생성된 노드 삽입
    if (parentNode.getData() > data) {
      parentNode.setLeftSubTree(newNode);
    } else {
      parentNode.setRightSubTree(newNode);
    }

  }

  // 탐색
  search(data) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (data < currentNode.getData()) {
        currentNode = currentNode.getLeftSubTree();
      } else if (data > currentNode.getData()) {
        currentNode = currentNode.getRightSubTree();
      } else {
        break;
      }
    }

    return currentNode;
  }
}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(18);
binarySearchTree.insert(15);
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(12);
binarySearchTree.insert(11);
binarySearchTree.insert(31);
binarySearchTree.insert(27);
binarySearchTree.insert(24);
binarySearchTree.insert(20);
binarySearchTree.insert(33);
binarySearchTree.insert(35);
binarySearchTree.insert(37);

console.log('===== 중위순회 =====')
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);

console.log('===== 탐색(해당 값을 가진 노드가 있는 경우) =====')
console.log(binarySearchTree.search(20));

console.log('===== 탐색(해당 값을 가진 노드가 없는 경우) =====')
console.log(binarySearchTree.search(99));

