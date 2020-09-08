//! 함수 정의문
function foo() {
    return 0;
}



//! 함수 정의식
const bar = function bar() { };
const bar2 = function () { };  //함수가 값으로 취급할때는 이름을 생략할 수 있다.
bar();

(function () { })(); // 만들자마자 호출, 단 한번만 사용할 때 사용.



//! 함수를 매개변수 혹은 리턴값으로 사용
function foo2(x) {
    x();
    return function () { }; // 함수를 리턴할 수 있다.  
}
const y = foo(function () { }); // x로 함수를 매개변수로 보낼 수 있다. -> 콜백함수 

// 일급 함수 : 변수의 특성인 함수 인자로 전달 가능하며, 리턴 값으로 사용 가능
// 하이어오더함수(고차함수) :  두 가지이 조건 중 1개이상 만족하는 함수 : 1. 함수를 파라미터로 전달받는 함수 2. 함수를 리턴하는 함수



//! 재귀 호출에서의 함수
const foo4 = function foo4() { //  재귀함수를 할려면 이름을 붙여조야 한다.
    foo4()
}



//! 함수는 무조건 값을 반환한다(안할 때 undefined를 반환).
const foo5 = function (x) {

};
console.log(foo5());



//! ES6의 Fucntion
const bar3 = (x) => { }; // 화살표(에로우) 함수, 인자가 하나면 괄호 생략 가능
const bar4 = x => x * 2; // 한줄 함수, 한줄이면 return 안써줘도됨.



//! 식과 문의 차이 : 끝에 세미콜론의 유무
//? 식
// TODO 0; 1 + 10; foo(); // 삼항 연산자도 식
//? 문
// TODO 모든 조건문, 반복문
