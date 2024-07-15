import { BinaryTree } from './BinaryTree.mjs';

const tree1 = new BinaryTree(1);
const tree2 = new BinaryTree(2);
const tree3 = new BinaryTree(3);
const tree4 = new BinaryTree(4);
const tree5 = new BinaryTree(5);
const tree6 = new BinaryTree(6);
const tree7 = new BinaryTree(7);

tree1.setLeftSubTree(tree2);
tree1.setRightSubTree(tree3);
tree2.setLeftSubTree(tree4);
tree2.setRightSubTree(tree5);
tree3.setLeftSubTree(tree6);
tree3.setRightSubTree(tree7);

console.log('루트 노드의 오른쪽 자식 노드: ', tree1.getRightSubTree().getData());
console.log('루트 노드의 오른쪽 트리의 왼쪽 자식 노드:', tree1.getRightSubTree().getLeftSubTree().getData());


console.log("----- 전위순회 -----")
tree1.preOrderTraversal(tree1);

console.log("----- 중위순회 -----")
tree1.inOrderTraversal(tree1);

console.log("----- 후위순회 -----")
tree1.postOrderTraversal(tree1);