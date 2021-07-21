import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

function Playground() {
  return (
    <div className="playground">
      <label>75px &#xD7; 75px</label>
      <div className="ex-1"></div>
      <label>200px &#xD7; 200px</label>
      <div className="ex-2"></div>
      <label>275px &#xD7; 100%</label>
      <div className="ex-3"></div>
      <label>225px &#xD7; 50%</label>
      <div className="ex-4"></div>
      <label>400px &#xD7; 20%</label>
      <div className="ex-5"></div>
      <label>100vh &#xD7; 100%</label>
      <div className="ex-6"></div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Playground />
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
