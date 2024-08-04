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

  insert(targetRootNode, data) {
    // AVL 트리의 삽입은 재귀함수를 통해 진행됨 -> 재귀를 통해 데이터를 삽입하고, 각 노드의 높이를 업데이트하며, 균형을 맞추기 위한 회전을 수행합니다.
    if (targetRootNode === null) {
      targetRootNode = new BinaryTree(data);
    }

    if (this.root === null) {
      this.root = targetRootNode;
    } else if (targetRootNode.getData() === data) {
      return targetRootNode;
    } else if (targetRootNode.getData() > data) {
      targetRootNode.setLeftSubTree(this.insert(targetRootNode.getLeftSubTree(), data));
    } else {
      targetRootNode.setRightSubTree(this.insert(targetRootNode.getRightSubTree(), data));
    }

    this.updateHeight(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, data);

    return targetRootNode;
  }

  remove(targetRootNode, data, parentNode = null) {
    // 재귀함수를 이용해 하향식 접근 
    if (targetRootNode.getData() > data && targetRootNode.getLeftSubTree() !== null) {
      console.log(targetRootNode, data, parentNode)

      targetRootNode.setLeftSubTree(this.remove(targetRootNode.getLeftSubTree(), data, targetRootNode));
    } else if (targetRootNode.getData() < data && targetRootNode.getRightSubTree() !== null) {
      console.log('data >>> ', data)

      targetRootNode.setRightSubTree(this.remove(targetRootNode.getRightSubTree(), data, targetRootNode));
    } else if (targetRootNode.getData() === data) {
      targetRootNode = this.removeHelper(targetRootNode, data, parentNode);

      // 루트 노드를 삭제하는 경우, remove 함수는 단 한번만 불리면서 기저 조건으로 함수를 종료하기 때문에 이 영역이 실행되지 않아서 높이 업데이트와 회전을 하지 못함.
      if (parentNode === null && targetRootNode !== null) {
        this.updateHeight(targetRootNode);
        let unbalanceNode = this.getUnBalanceNode(targetRootNode);
        targetRootNode = this.rotation(targetRootNode, unbalanceNode.getData());
      }

      return targetRootNode;
    }

    this.updateHeight(targetRootNode);
    let unbalanceNode = this.getUnBalanceNode(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, unbalanceNode.getData());

    return targetRootNode;
  }

  removeHelper(deletingNode, data, parentNode) {
    let fakeParentRootNode = new BinaryTree(0);

    fakeParentRootNode.setRightSubTree(this.root);

    if (parentNode == null) {
      parentNode = fakeParentRootNode;
    }

    let deletingNodeChild = null;

    if (deletingNode.getLeftSubTree() === null && deletingNode.getRightSubTree() === null) {
      // 삭제할 노드가 터미널 노드인 경우
      if (parentNode.getLeftSubTree() === deletingNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else if (deletingNode.getLeftSubTree() === null || deletingNode.getRightSubTree() === null) {
      // 삭제할 노드가 하나의 서브트리(혹은 자식 노드)를 가지고 있는 경우
      if (deletingNode.getLeftSubTree() !== null) {
        deletingNodeChild = deletingNode.getLeftSubTree();
      } else {
        deletingNodeChild = deletingNode.getRightSubTree();
      }

      if (parentNode.getLeftSubTree() === deletingNode) {
        parentNode.setLeftSubTree(deletingNodeChild);
      } else {
        parentNode.setRightSubTree(deletingNodeChild);
      }
    } else {
      // 삭제할 노드가 두 개의 서브트리(혹은 자식 노드)를 가지고 있는 경우
      let replacingNode = deletingNode.getLeftSubTree();
      let replacingNodeParent = deletingNode;

      while (replacingNode.getRightSubTree() !== null) {
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      let deletingNodeData = deletingNode.getData();
      deletingNode.setData(replacingNode.getData()); // 값 덮어씌우기

      // 대체할 노드가 해당 트리에서 가장 큰 값을 가지고 있기 때문에 대체할 오른쪽 서브트리는 존재하지 않음
      if (replacingNodeParent.getLeftSubTree() === replacingNode) {
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else {
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }
    }

    deletingNodeChild = deletingNode;

    // 루트 노드를 제거하는 경우
    if (fakeParentRootNode.getRightSubTree() === this.root) {
      this.root = fakeParentRootNode.getRightSubTree();
    }

    return deletingNodeChild;
  }
}

const avlTree = new AVLTree();

// console.log(" >>>>> insert ")

avlTree.insert(avlTree.root, 1);
avlTree.insert(avlTree.root, 2);
avlTree.insert(avlTree.root, 3);
avlTree.insert(avlTree.root, 4);
avlTree.insert(avlTree.root, 5);
avlTree.insert(avlTree.root, 6);
avlTree.insert(avlTree.root, 7);

// console.log(avlTree.root);
// avlTree.root.inOrderTraversal(avlTree.root);

console.log(' >>> remove ');
// avlTree.remove(avlTree.root, 2);
// avlTree.remove(avlTree.root, 3);
avlTree.remove(avlTree.root, 1);

// console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);

// console.log(" >>> search");
// console.log(avlTree.search(7))