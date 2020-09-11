import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");
const sessionList = [
  { id: 1, title: "1회차: Overview" },
  { id: 2, title: "2회차: Redux 만들기" },
  { id: 3, title: "3회차: React 만들기" },
  { id: 4, title: "4회차: 컴포넌트 디자인 및 비동기" }
];

// ReactDOM.render(
//   <React.StrictMode>
//     <App store={{ sessionList }} />
//   </React.StrictMode>,
//   rootElement
// );

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("1");
  }, 1000);
});

p.then(function (r) {
  // console.log(r);
});

function* makeNumber() {
  let num = 1;

  while (true) {
    const x = yield num++;
    console.log(x);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delay2 = ms => ms;

function* main() {
  console.log("시작");
  yield delay2(3000);
  console.log("3초 뒤입니다.");
}

async function main2() {
  console.log("시작");
  await delay(3000);
  console.log("3초 뒤입니다.");
}

main2();

const it = main();

const { value } = it.next();

if (value instanceof Promise) {
  value.then(() => {
    it.next();
  });
} else {
  setTimeout(() => {
    it.next();
  }, value)
}

delay(3000).then(() => {
  console.log("3초 뒤");
});