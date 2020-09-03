export function createStore(reducer) {

    let state;
    const listeners = [];

    const getState = () => ({ ...state }); // 새로운 객체를 만들어 반환 => 복사본을 반환 -> spread 문법


    const dispatch = (action) => {  // 상태 변경을 하게끔 시키는 함수
        state = reducer(state, action);
        listeners.forEach(fn => fn());
    }

    const subscribe = fn => {
        listeners.push(fn);
    }

    return {
        getState,
        dispatch,
        subscribe,
    };
}