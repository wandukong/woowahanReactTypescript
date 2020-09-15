## 우아한 테크러닝 React&Typescript 3회차 (2020.09.08) - React 구현 & Hooks


### React 컨셉

<img src="https://user-images.githubusercontent.com/47289479/93054446-4b807280-f6a4-11ea-943f-21307e05ece6.JPG"  width="300" height="200" />  

Dom Tree가 없었으면, 문자열을 그대로 JS에서 처리하라고 했었을 것이다.  
하지만, Dom Tree로 인해서 다루기 html을 쉬워짐.  

이와 비슷한 컨셉으로, React가 생김.  
<img src="https://user-images.githubusercontent.com/47289479/93054585-81255b80-f6a4-11ea-88a3-e83eff6b305e.JPG"  width="200" height="200" />  


```javascript
const list = [
    { title: 'React에 대해 알아봅시다.' },
    { title: 'Redux에 대해 알아봅시다.' },
    { title: 'TypeScript에 대해 알아봅시다.' },
]

const rootElement = document.getElementById("root");

function app() {
    rootElement.innerHTML = `
        <ul>
            ${list.map(item => `<li>${item.title}</li>`).join("")}
        </ul>
    `;
}
```

app함수의 innerHTML 속성을 이용하면 Real DOM에 직접 접근하고 있다.  
규모가 커지면 복잡해져, 사용하기 매우 힘들어 진다.  
이 부분을 해결하기 위해 Facebook에서 React라는 라이브러리를 개발하였다.  
다루기 쉬운 Virtual Dom(JSX)를 만들어서 JS와 Real DOM에 일관성있게 처리하게한다.  




### Hooks

```javascript
// h1 태그를 클릭할 시 count라는 상태가 1씩 증가하는 코드이다.
import React, { useState } from "react";

function App() {
    const [count, setCount] = useState(1);

    return (
        <div>
            <h1 onClick={() => setCounter(count + 1)}>상태 {count}</h1>
            <Hello />
        </div>
    );
}
```

초기값과, 해당값의 인덱스를 알고 있는 함수를 `훅 전역 배열`에 넣는다.
컴포넌트를 키로 해서, 컴포넌트가 생성된 순서대로, 인덱스를 해서 배열에 넣어 놓는다. 찾을 때도 그순서대로 찾는다.

컴포넌트가 만들어져있지 않을 때 최초로 호출하면, 초기값을 넣고,
그 이후에는 배열에 들어있는 값을 반환하여 준다.


Hook의 규칙 문서를 보면 최상위에서만 훅을 호출해야한다고 한다.(반복문, 조건문에서 사용x)
컴포넌트가 렌더링대로 순서대로 인덱스에 넣어놓기 때문에, 인덱스가 무너져서 엉떵한 훅이 나올 수 있기 때문이다.

즉, 리액트 컴포넌트를 인덱스로 잡는다.
그래서 리액트 컴포넌트가 아닌 일반 함수에서 훅을 호출할 수 없다.

리액트는 어떤 함수에서 어떤 훅이 호출되었는지 알고 있기 때문에, 
useState같이 데이터만 주는 훅도 만들수 있고,
useEffect같이 Life cycle도 가능한 것이다.(컴포넌트가 처음 호출? 업데이트? 내릴거야?)

