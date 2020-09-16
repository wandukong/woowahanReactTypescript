## 우아한 테크러닝 React&Typescript 2회차 (2020.09.03) - javascript tutorial & redux 구현

### 리덕스

#### 세가지 원칙

①진실은 하나의 소스로부터   
애플리케이션의 모든 상태는 하나의 스토어 안에 하나의 객체 트리 구조로 저장된다.  
```javascript
console.log(store.getState());

{
  visibilityFilter: 'SHOW_ALL',
  todos: [{
    text: 'Consider using Redux',
    completed: true,
  }, {
    text: 'Keep all state in a single tree',
    completed: false
  }]
}
```
이를 통해 범용적인 애플리케이션을 만들기 쉽게 만들수 있다.  
서버로부터 가져온 상태는 시리얼라이즈되거나 수화되어 전달되며 클라이언트에서 추가적인 코딩 없이도 사용할 수 있다.  
또한, 하나의 상태 트리만을 가지고 있기 때문에 디버깅에도 용이하다.  
하나의 상태 트리만을 가지고 있기 때문에 이전에는 굉장히 구현하기 어려웠던 기능인 실행취소/다시실행(undo/redo)을 손쉽게 구현할 수 있다.  


②상태는 읽기 전용이다.  
상태를 변화시키는 유일한 방법은 무슨 일이 벌어지는지 지를 묘사하는 액션 객체를 전달하는 방법뿐이다.  
```javascript
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
```
이를 통해서 뷰나 네트워크 콜백에서 결코 상태를 직접 바꾸지 못 한다는 것을 보장할 수 있다.  
모든 상태 변화는 중앙에서 관리되며 모든 액션은 엄격한 순서에 의해 하나하나 실행되기 때문이다.  

③변화는 순수 함수로 작성되어야한다.  
액션에 의해 상태 트리가 어떻게 변화하는 지를 지정하기 위해 프로그래머는 순수 `리듀서`를 작성해야 한다.  
리듀서는 그저 이전 상태의 액션을 받아 다음 상태를 반환하는 순수 함수이다.  
**이전 상태를 변경하는 대신 새로운 상태 객체를 생성해서 반환**해야한다.  


#### 개념

①액션  
액션은 애플리케이션에서 스토어로 보내는 데이터 묶음이다. 스토어의 유일한 정보원.  
store.dispatch()를 통해 이들을 보낼 수 있다.  
액션은 자바스크립트 객체이다. 액션은 반드시 어떤 형태의 액션이 실행될지 나타내는 type속성을 가져야 한다.  

```javascript
const ADD_TODO = 'ADD_TODO'
```
```javascript
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

액션 생성자는 액션을 만드는 함수이다. 단지 액션을 반환한다.
```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

②리듀서  
리듀서는 이전 상태와 액션을 받아서 다음 상태를 반환하는 순수 함수
액션들을 보냈을 때 상태가 어떻게 변하는지 기술한다.
인수가 주어지면, 다음 상태를 **계산**만해서 반환하면 됩니다.
사이드 이펙트도 없어야 합니다. API 호출도 안됩니다. 변경도 안됩니다. 
```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return Object.assign({}, state, {
      visibilityFilter: action.filter
    });
  default:
    return state
  }
}
```
Object.assign()을 통해 복사본을 만들어서 반환한다.
Object.assign(state, { visibilityFilter: action.filter })이라고 써도 여전히 틀립니다: 첫번째 인수를 변경하기 때문에.
드시 첫번째 인수로 빈 객체를 전달해야 한다. 
ES7로 제안된 object spread syntax을 써서 { ...state, ...newState }로 작성할수도 있다.

default 케이스에 대해 이전의 state를 반환한다. 알 수 없는 액션에 대해서는 이전의 state를 반환하는것이 중요하다.

③스토어  
액션과 리듀서를 가져오는 객체이다. Redux 애플리케이션에서 단 하나의 스토어만 가질 수 있음을 알아두는것이 중요하다.
애플리케이션의 상태를 저장한다. getState()를 통해 상태에 접근한다.
dispatch(action)을 통해 상태를 수정할 수 있게 한다. subscriber(listener)를 통해 리스너를 등록한다.

```javascript
let store = createStore(todoApp, window.STATE_FROM_SERVER); // 첫번째 인자: 리듀서, 두번째 인자 : 초기 상태 지정
```

④데이터 흐름
4단계의 생명주기를 가진다.
1. store.dispatch(action)를 호출합니다.  
2. Redux 스토어가 여러분이 지정한 리듀서 함수들을 호출한다.  
3. 루트 리듀서가 각 리듀서의 출력을 합쳐서 하나의 상태 트리로 만든다.(선택사항)  
4. Redux 스토어가 루트 리듀서에 의해 반환된 상태 트리를 저장한다.  
