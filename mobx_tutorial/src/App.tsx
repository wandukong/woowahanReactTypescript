import React from 'react';
import { inject, observer } from 'mobx-react'

interface AppProps {
  data: number;
  counter: number;
}

@observer
function App(props: AppProps) {

  return (
    <div className="App">
      <h1>외부 데이터 : {props.data} vs {props.counter}</h1>
    </div>
  )
}

export default App;