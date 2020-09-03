// 비동기



// setTimeout(function (x) {
//     console.log('앗싸')
//     setTimeout(function (y) {
//         console.log("웃싸")
//     }, 2000)
// }, 1000); // 콜백함수


//! promise

const p1 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve('응답');
    }, 1000);
    //! resolve() // 성공시 호출하면 then 안에있는 함수가 실행된다
    //! reject() // 실패시 호출하면 catch 안에 있는 함수가 실행된다.

});

const p2 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve('응답2');
    }, 1000);
    //! resolve() // 성공시 호출하면 then 안에있는 함수가 실행된다
    //! reject() // 실패시 호출하면 catch 안에 있는 함수가 실행된다.

});

// p1
//     .then(p2)
//     .then(function (response) {
//         console.log(r);
//     })
//     .catch(function () {

//     });


const delay = ms => new Promise((resolve => setTimeout(resolve, ms)))



async function main() {
    console.log('1')
    await delay(2000)
    console.log('2')

}

main();