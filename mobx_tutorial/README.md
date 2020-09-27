## 우아한 테크러닝 React&Typescript 8회차 (2020.09.24) - React + Typescript example & Mobx

# Mobx

**Mobx**는 상태 관리 라이브러리이다.(Redux와 장단점을 져가며 사용하자.)  

```javascript
const store = observable({
  data: 1,
});
```
```javascript
const rootElement = document.getElementById('root');
autorun(() => {
  store.data++;
  render(<App data={store.data} />, rootElement)
});
```
**observable**로 객체를 만들었기 때문에,   
객체의 변경 사항을 추적해서 **autorun**에 등록된 함수를 실행해준다.   
observable로 등록한 객체들만 추적한다.   
(redux의 subscribe와 비슷하다.)   
 
```javascript
const weight = observable.box(82);
```
observabl은 primitive type들을 감싸주지 못한다.  
**observable.box()** 를 사용하여 감싼다.  


```javascrip
setInterval(() => {
  store.data++;
  store.counter += 2;
  weight.set(weight.get() - 1);
}, 1000);
```
```javascript
autorun(() => {
  console.log(weight.get())
  render(<App data={store.data} counter={store.counter} />, rootElement)
});
```
각 값들이 변경될 때마다 autorun이 실행된다. 그래서 weight가 3번씩 찍힌다.     
 
```javascript
const myAction = action(() => {
  store.data++;
  store.counter += 2;
  weight.set(weight.get() - 1);
});
```  
그래서, **action()** 이라는 논리적인 작업 단위를 묶어주는 helper를 제공한다.    
(redux의 dispatch+reducer의 방식과 비슷하다)   

<hr />

### @observable
```javascript
class Cart {
  @observable data = 1;
  @observable counter = 1;
}
```
observable()함수 대신, **@observable**을 사용할 수 있다.  
```json
"experimentalDecorators": true
```
**tsconfig.json**에 위를 추가해줘야 한다.  

<hr />

### @action
```javascript
class Cart {
  @action
  myAction = () => {
    this.data++;
    this.counter += 2;
  };
}
```
action()도 @action으로 대체할 수 있다.  
```javascript
cart.myAction();
```
함수안의 **this**때문에, **바인딩**을 해줘야한다.   
그래서 myAction을 일반함수대신 **화살표 함수**를 통하여 이 문제를 해결할 수 있다.  