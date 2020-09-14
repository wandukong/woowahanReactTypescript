import { createStore } from "./redux.mjs";

const INCREMENT = 'increment'
const RESET = 'reset'


// reducer : 상태를 바꿔주는 함수
function reducer(state = {}, action) { // state = {} : count 없을 때를 대비해 빈 객체로 기본값 설정.
    if (action.type === INCREMENT) {
        return {
            ...state, // 복사본 반환 
            count: state.count ? state.count + 1 : 1, // state안에 count가 있더라도 해당 count로 overite 되어 복사본으로 반환
        }
    } else if (action.type === RESET) {
        return {
            ...state,
            count: action.resetCount,
        }
    }
}



function update() { // 바꼈다고 통지해주는 함수  (publish)
    console.log(store.getState())
}

function actionCreator(type, data) {
    return {
        ...data,
        type: type, // 뒤에 것이 overwrite 되게 ...은 앞으로 나오게 한다.
    }
}

function increment() {
    store.dispatch(actionCreator(INCREMENT));
}

function reset(n) {
    store.dispatch(actionCreator(RESET, { resetCount: n }));
}


const store = createStore(reducer);

// 객체가 변경됨 -> 변경된걸 알고싶으면, 구독(subscribe)하면 
// 구독한 함수를 호출해서 변경될 때마다 알려줄게(publish)
store.subscribe(update);


increment();
increment();
increment();
increment();
increment();
reset(0);
increment();