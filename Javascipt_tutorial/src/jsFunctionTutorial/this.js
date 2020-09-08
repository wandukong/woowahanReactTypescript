//! this : 실행 문맥에 따라 결정
const person = {
    name: '양승완',
    getName() {
        return this.name
    }
}
console.log(person.getName()) // person이 호출자이기 때문에 this는 person.

const man = person.getName;
console.log(man()); // man() 을 실행하는 순간 호출자(주인)가 없기 때문에 전역 스코프(전역 객체)에 할당된다. this는 window 객체가 됨.-> ERROR



//! this를 고정하는 방법 : bind / apply / call
// GamepadButton.addEventListener('click', person.getName.bind(person)) // 바인드된 객체로 수행.
person.getName.call(person); // person 으로 고정 = apply, bind, call 비슷



//! 스코프와 클로저 
// 스코프 : 유효 범위, 어떤 변수들에 접근할 수 있는지 정의. {}
// 클로저 : 내부함수는 외부함수의 지역변수에 접근 할 수 있는데, 외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 내부함수가 외부함수의 변수에 접근 할 수 있는 기술
function foo(x) {
    return function bar() {
        return x
    }
}
const f = foo(10);
console.log(f()); // 10


const person2 = { age: 10 };
person2.age = 500; // 변경 가능, 자바스크립트는 막을 수 없다.


function makePerson() {
    let age = 10;
    return { // 클로저를 이용하여 보호
        getAge() {
            return age;
        },
        setAge(x) {
            age = x > 1 && x < 130 ? x : age;
        }
    }
}
let p = makePerson();
console.log(p.getAge());