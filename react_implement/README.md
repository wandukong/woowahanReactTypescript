## 우아한 테크러닝 React&Typescript 3회차 (2020.09.08)


### React 컨셉

<img src="https://user-images.githubusercontent.com/47289479/93054446-4b807280-f6a4-11ea-943f-21307e05ece6.JPG"  width="300" height="200" />  

#### Dom Tree가 없었으면, 문자열(<`H1>Hello</`h1>)을 그대로 JS에서 처리하라고 했었을 것이다. (처리 어려워짐)  
#### 하지만, Dom Tree로 인해서 다루기 html을 쉬워짐.  

#### 이와 비슷한 컨셉으로, React가 생김.  
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