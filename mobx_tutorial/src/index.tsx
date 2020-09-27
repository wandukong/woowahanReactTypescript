import React from 'react';
import { render } from 'react-dom';
import { observable, autorun, action } from 'mobx'
import App from './App';

class Cart {
  @observable data = 1;
  @observable counter = 1;

  @action
  myAction = () => {
    this.data++;
    this.counter += 2;
  };
}

const cart = new Cart();


autorun(() => {
  render(<App data={cart.data} counter={cart.counter} />, rootElement)
});

setInterval(() => {
  cart.myAction();
}, 1000);

const rootElement = document.getElementById('root');


// observable로 객체를 만들었기 때문에, 객체의 변경 사항을 추적해서,
// autorun에 등록된 함수를 실행해준다.
// rdux의 subscribe와 비슷하다. 하지만, mobx는 observable로 등록한 객체들만 추적한다. 

// 각 값들이 변경될 때마다 autorun이 실행된다.  


// observabl은 primitive 타입들을 감싸주지 못한다.
// observable.box()를 사용하여 감싼다.

// 각 값들이 변경될 때마다 autorun이 실행된다. 그래서 weight가 3번씩 찍힌다.     
// 그래서, **action()**이라는 논리적인 작업 단위를 묶어주는 helper를 제공한다.  
// (redux의 dispatch+reducer의 방식과 비슷하다)  
