//! new 생성자 - function
function foo() {
    this.name = "홍길동";
}

const y = new foo(); // new는 빈객체를 생성한다. -> foo 함수 안에 빈객체를 넣는다. 이것을 this라고 한다. // y에는 위에 함수에서 this 반환되어 들어간다.
console.log(y.name) // "홍길동"
console.log(new foo()) // new 연산자 없이 호출해도 된다. : new 함수를 강제할 수 없다.  


if (y instanceof foo) { // foo 함수가 만든 객체인지 확인
    console.log("TRUE")
}

// 객체면 안에 내가 원하는 객체 모양인지 검사하는게 어려운 일이다.
// 객체를 온전하게 만들 수 있는 하나의 인증된 함수를 만들고, instanceof 로 검사한다.


//! ES6 class
// 좀 더 명시적인 특징을 가진다.
class bar {
    constructor() { // 생성자: 명확하게 들어나 있다.(명시적)
        this.name = "홍길동"; // 객체를 찍어내는 구나.
    }
}
console.log(new bar()) // class는 new 연산자 없이 호출할 수없다. 