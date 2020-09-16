## 우아한 테크러닝 React&Typescript 5회차 (2020.09.15) - Redux_middleware


### Redux_middleware

```javascript
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'inc':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return { ...state };
  }
}

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'inc' });
```

redux는 동기적으로 작동하게끔 되어 있다.  
redux가 제공하는 기본 동작은 동기적인 상태 업데이트를 지원한다.  
reducer가 순수함수를 함수여야 한다.  
순수함수 : 외부와 아무런 dependendcy 없이, 내부적으로 아무런 side effect 없이 작동하는 함수 input이 같으면 output도 똑같은 함수.  

순수하지 않은 대표적인 비동기적인 작업들을 어떻게 처리할거냐하는 의문!!  ex) API 호출.    

<hr />


```javascript
function add1(a, b) {
  return a + b;
}

function add2(a) {
  return function (b) {
    return a + b;
  }
}

console.log(add1(10, 20)); //30
console.log(add2(10)(20)); //30
```
커링은 사용자에게 인자와 인자사이에 개입할 수 있는 프로그래밍 기술이다.  

<hr />

### redux_middleware

side effect가 있는 비동기적인 작업은 리듀서 밖에서 해야하는 환경을 제공한다.  
흘러가는 데이터는 모든 미들웨어를 꽂힌 순서대로 흐른다. (순서에 dependency가 있다.)  
수정할 수 없는 리덕스의 중간 중간에 미들웨어를 끼어 넣어, 원하는 기능을 할 수 있게 한다.  


```javascript
const myMiddleware = store => dispatch => action => dispatch(action);

function yourMiddleware(store) { // myMiddleware랑 같음
    return function (dispatch) {
        return function (action) {
            dispatch(action);
        }
    }
}

function ourMiddleware(store, dispatch, action) {
  dispatch(action);
}

myMiddleware(store)(store.dispatch)({ type: 'inc' });
ourMiddleware(store, store.dispatch, { type: 'inc' });
```
**커링은 사용자에게 인자와 인자사이에 개입할 수 있게 해준다.**

```javascript
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("logger: ", action.type);
  if (action.type === "get user info") {
    api.call("주소").then((response) => {
      next({
        type: "response user info",
        data: response,
      });
    })
  } else {
    next(action);
  }
```
next가 호출을 안하면, reducer로 안넘어 간다.  
middleware에서 액션을 바꾸어 dispatch할 수 있다. reducer 입장에선 액션이 바뀐줄 모르고, 동기적으로 실행한 줄 안다.  
이러한 방식으로 비동기 작업들을 처리한다.  
store는  middleware에서 상태를 확인할 필요가 있을 경우 사용할 수 있다. ex) 로그인 여부 확인.   

<hr />

### 전체적인 설명 

<img src="https://user-images.githubusercontent.com/47289479/93374482-bd69df00-f891-11ea-828e-7f6b5cf86e3e.JPG"  width="300" height="200">

store는 객체이다.  
store에서 state를 가지고 component(UI)를 그린다.  
컴포넌트에서 reducer의 존재를 모르기 때문에 직접 호출하지 않고, action(객체)을 보낸다.  
실제로는 redux를 통해서 store의 dispatch(함수)로 action을 감싸서 reducer로 전달한다.  
educer(함수)가 return 값들로 state를 변경시킨다.  
component가 state가 바뀐 것을 알기 위해 subscribe를 해놓는다.  