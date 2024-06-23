import { LinkedList } from './LinkedList.mjs';

let list = new LinkedList();

console.log('>>> insertAt() 5번 호출')
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
list.insertAt(3, 3);
list.insertAt(4, 4);
list.printAll()

console.log('>>> insertLast() 실행')
list.insertLast(5);
list.printAll();

console.log('>>> deleteAt() 실행')
list.deleteAt(2);
list.printAll();

console.log('>>> deleteLast() 실행')
list.deleteLast();
list.printAll();

console.log('>>> getNode() 실행')
console.log(list.getNodeAt(3).data)

console.log('>>> clear() 실행')
list.clear();
list.printAll();