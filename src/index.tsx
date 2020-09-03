import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  title: string;
  color: string;
}

function App(props: AppProps) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.color}</h2>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App title="Hello React" color="blue" />
  </React.StrictMode>,
  document.getElementById('root')
);
