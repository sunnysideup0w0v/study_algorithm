import { Stack } from './Stack.mjs';

let stack = new Stack();

console.log('>>> push() 실행');
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log('>>> pop() 실행')
console.log(stack.pop().data);

console.log('>>> peek() 실행');
console.log(stack.peek().data)

console.log(stack.isEmpty())