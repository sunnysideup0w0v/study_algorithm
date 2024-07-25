// 이진탐색트리는 이미 작성한 이진트리 구조를 기반으로 확장
import { BinaryTree } from './BinaryTree.mjs';

class AVLTree {
  constructor(rootNode = null) {
    this.root = rootNode;
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

  getHeight(node) {
    if (node === null) return 0;

    return node.height
  }

  updateHeight(node) {
    const leftSubTreeHeight = this.getHeight(node.getLeftSubTree());
    const rightSubTreeHeight = this.getHeight(node.getRightSubTree());

    const nodeHeight = Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
    console.log('updateHeightNode >>> ', node, "\nnodeHeight >>> ", nodeHeight, "\n\n\n");

    node.height = nodeHeight;

  }

  getBalanceFactor(node) {
    const leftSubTreeHeight = this.getHeight(node.getLeftSubTree());
    const rightSubTreeHeight = this.getHeight(node.getRightSubTree());

    return leftSubTreeHeight - rightSubTreeHeight;
  }

  // single Left Rotation
  rotateLeft(node) {
    const childNode = node.getRightSubTree();

    // childeNode에 왼쪽 서브트리가 있을 경우
    node.setRightSubTree(childNode.getLeftSubTree());
    childNode.setLeftSubTree(node);

    // 높이 재계산
    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  // single Right Rotation
  rotateRight(node) {
    const childNode = node.getLeftSubTree();
    node.setLeftSubTree(childNode.getRightSubTree());
    childNode.setRightSubTree(node);

    // 높이 재계산
    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  rotation(targetNode, data) {
    const balanceFactor = this.getBalanceFactor(targetNode);
    let isRootNode = false;

    if (this.root === targetNode) {
      isRootNode = true;
    }

    if (balanceFactor < -1 && data > targetNode.getRightSubTree().getData()) {
      // LL 회전이 필요한 경우
      targetNode = this.rotateLeft(targetNode);
    } else if (balanceFactor > 1 && data < targetNode.getLeftSubTree().getData()) {
      // RR 회전이 필요한 경우
      targetNode = this.rotateRight(targetNode)
    } else if (balanceFactor < -1 && data < targetNode.getRightSubTree().getData()) {
      // LR 회전이 필요한 경우
      this.rotateLeft(targetNode.getLeftSubTree());
      targetNode = this.rotateLeft(targetNode);
    } else if (balanceFactor > 1 && data > targetNode.getLeftSubTree().getData()) {
      // RL 회전이 필요한 경우
      this.rotateRight(targetNode.getRightSubTree());
      targetNode = this.rotateRight(targetNode);
    }


    if (isRootNode) {
      this.root = targetNode;
    }

    return targetNode;
  }

  // 이거 이해가 잘 안됨
  getUnBalanceNode(targetRootNode, unBalanceNode = null) {
    if (targetRootNode.getLeftSubTree() === null && targetRootNode.getRightSubTree() === null) {
      unBalanceNode = targetRootNode;
      return unBalanceNode;
    }

    let balanceFactor = this.getBalanceFactor(targetRootNode);

    if (balanceFactor > 0) {
      unBalanceNode = this.getUnBalanceNode(targetRootNode.getLeftSubTree(), unBalanceNode);
    } else if (balanceFactor < 0) {
      unBalanceNode = this.getUnBalanceNode(targetRootNode.getRightSubTree(), unBalanceNode);
    } else {
      unBalanceNode = targetRootNode.getRightSubTree();
    }

    return unBalanceNode
  }

  removeHelper(deletingNode, data, parentNode) { }

  insert(targetRootNode, data) {
    // AVL 트리의 삽입은 재귀함수를 통해 진행됨 -> 재귀를 통해 데이터를 삽입하고, 각 노드의 높이를 업데이트하며, 균형을 맞추기 위한 회전을 수행합니다.
    if (targetRootNode === null) {
      targetRootNode = new BinaryTree(data);
    }

    if (this.root === null) {
      this.root = targetRootNode;
    } else if (targetRootNode.getData() === data) {
      return targetRootNode;
    } else if (data < targetRootNode.getData()) {
      targetRootNode.setLeftSubTree(this.insert(targetRootNode.getLeftSubTree(), data));
    } else if (data > targetRootNode.getData()) {
      targetRootNode.setRightSubTree(this.insert(targetRootNode.getRightSubTree(), data));
    }

    this.updateHeight(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, data);

    return targetRootNode;
  }

  remove(targetRootNode, data, parentNode = null) { }
}

const avlTree = new AVLTree();

avlTree.insert(null, 5);
avlTree.insert(avlTree.root, 7);
avlTree.insert(avlTree.root, 3);
avlTree.insert(avlTree.root, 10)

console.log('avlTree.search >>> ', avlTree.search(5))
console.log('avlTree.height >> ', avlTree.getHeight(avlTree.search(5)))