//! Promise
const p = new Promise(function (resolve, reject) {

    setTimeout(() => {
        resolve("1");
    }, 1000);
});
//겉으로는 끊겨 있는 것처럼 보이지만, 연결되어 있다.
p.then(function (r) {
    console.log(r);
});


//! Generator
function* makeNumber() {
    let num = 1;
    while (true) {

        // yield 실행시 함수에서 잠깐 나와서, 해당 값을 보존한다.
        // return 실행시, 함수를 끝낸다. 값이 없어짐. undefined.

        const x = yield num++;
        console.log(x);
    }
}

const i = makeNumber(); // 실행될 준비만 해놓는다.

console.log(i.next());  // next() :  실행시킬 수 있는 함수 yield나 return이 나오기전까지 실행.
console.log(i.next());  // 객체를 리턴한다.(계속 실행가능 여부를 확인할 수 있는 done)

i.next();
i.next('x'); // 인자를 보내면 함수 안에서 사용 가능하다.


//!//!//!//!//!//!//!//!//!//!//!//!//!

const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));

// delay(3000).then(() => {
//     console.log('3초 뒤')
// });


function* main() {              // 함수 안에서는 마치 비동기적 상황도 동기적으로 푸는 것 처럼. 순서대로 진행되는 듯이.
    console.log("시작");
    yield delay(3000);
    console.log("3초 뒤")
}

const it = main();             // 함수 밖에서 함수 안쪽을 제어 하고
const { value } = it.next();  // {value: '', done: false} 구조분해할당  

if (value instanceof Promise) {
    value.then(() => {
        it.next();
    })
}

// -> 이러한 것이 바깥쪽에서 내부를 컨트롤 할 수 있게 되고, 이 컨셉을 이용하여 내부 비동기적인 여러가지 콜백함수를 이용하지 않고,
// 동기적인 코드처럼 기술할 수 있게 만든 것이 리덕스 saga -> 온통 generator로 개발한다.
// 제네레이터 함수를 일반화하여 어떤 한 코루틴의 구현체인데, 여기서 비동기를 동기처럼 나타낼 수 있다라는 것을 알게되었다.

//redux-saga
// 리액트/리덕스 애플리케이션의 사이드 이펙트, 예를 들면 데이터 fetching이나 브라우저 캐시에 접근하는 순수하지 않은 비동기 동작들을, 더 쉽고 좋게 만드는 것을 목적으로하는 라이브러리

async function main2() {
    console.log("시작");
    await delay(3000);
    console.log("3초 뒤")
}

main2();


// generator와 async 차이는
// async는 promise에 최적화 되어 있다.await 옆에 항상 Promise 객체가 와야 한다.
// generator는 좀 더 다양한 케이스에서 yield를 사용할 수 있다.

