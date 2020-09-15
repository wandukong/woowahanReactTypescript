/* @jsx createElement */
// -> component를 생성해주는 함수를 지정할 수 있다.  기본값 : React.creatElement 
//!  React를 만들자 (어떻게 돌아가는지 이해되게끔)

// const list = [
//     { title: 'React에 대해 알아봅시다.' },
//     { title: 'Redux에 대해 알아봅시다.' },
//     { title: 'TypeScript에 대해 알아봅시다.' },
// ]

// const rootElement = document.getElementById("root");

// function app() {
//     rootElement.innerHTML = `
//         <ul>
//             ${list.map(item => `<li>${item.title}</li>`).join("")}
//         </ul>
//     `;
// }

//? app함수의 innerHTML 속성을 이용하면 Real DOM에 직접 접근하고 있다.
//? 규모가 커지면 복잡해져, 사용하기 매우 힘들어 진다.
//? 이 부분을 해결하기 위해 Facebook에서 React라는 라이브러리를 개발하였다.
//? 다루기 쉬운 Virtual Dom(JSX)를 만들어서 JS와 Real DOM에 일관성있게 처리하게한다.


// import React from "react";
// import ReactDom from "react-dom"

// function StudyList() {
//     return (
//         <ul>
//             <li>React</li>
//             <li>Redux</li>
//             <li>Typescript</li>
//             <li>mobx</li>
//         </ul>
//     )
// }

// function App() {
//     return (
//         <div>
//             <h1>Hello?</h1>
//             <StudyList />
//         </div>
//     )
// }

// ReactDom.render(<App />, document.getElementById("root"));


//! 리액트 직접 구현


import React from "react";



function render(vdom, container) {
    container.appendChild(renderElement(vdom))
}

function renderElement(node) {

    if (typeof node === 'string') {            // 재귀함수를 이용해 node의 타입이 문자열이 될 때까지 반복해 생성하게 된다.
        return document.createTextNode(node);
    }

    const el = document.createElement(node.type);

    node.childeren.map(renderElement).forEach(element => {
        el.appendChild(element);
    });

    return el;
}

function createElement(type, props = {}, ...childeren) {

    if (typeof type === 'function') {                   // jsx 코드는 function으로 표현되기 때문에
        return type.apply(null, [props, ...childeren])
    }

    return { type, props, childeren };
}

function Row(props) {
    return <li>{props.label}</li>
}

function StudyList(props) {
    return (
        <ul>
            <Row label="React" />
            <Row label="Redux" />
            <Row label="Typescript" />
            <Row label="mobx" />
        </ul>
    );
}

function App() {
    return (
        <div>
            <h1>Hello?</h1>
            <StudyList />
        </div>
    )
}

//console.log(<App />)

render(<App />, document.getElementById("root"));
