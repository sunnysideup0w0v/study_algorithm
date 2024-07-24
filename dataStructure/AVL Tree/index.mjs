// 이진탐색트리는 이미 작성한 이진트리 구조를 기반으로 확장
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

    node.height = Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
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
    // 재귀??
  }

  remove(targetRootNode, data, parentNode = null) { }
}
