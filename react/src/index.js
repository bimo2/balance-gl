import React from 'react';
import ReactDOM from 'react-dom';
import { Graph } from './Graph';
import reportWebVitals from './reportWebVitals';
import './index.css';

const data = [
  [[0, 1], [1, 2], [2, 4], [3, 8], [4, 16]],
  [[-10, 10], [4, -10], [0, 0], [7, 6], [9, 4]],
  [[10000, 46000], [10004, 60000], [10007, 69000], [10014, 82000], [10021, 42500], [10026, 40000]],
  [[1, 0.84], [2, 0.95], [4, 0.97], [5, 0.87], [6, 1.01], [9, 0.96], [10, 0.99], [12, 1.04], [16, 1.01]],
  [[0.124, 0.3342], [0.132, 0.3856], [0.26, 0.4267], [0.4, 0.4], [0.422, 0.3691]],
  [[10, 10], [40, 10], [20, 10]],
];

function Playground() {
  return (
    <div className="playground">
      <label>75px &#xD7; 75px</label>
      <div className="ex-0">
        <Graph data={data[0]} frameX={100} frameY={100} spread={25} />
      </div>
      <label>200px &#xD7; 200px</label>
      <div className="ex-1">
        <Graph data={data[1]} spread={10.5} />
      </div>
      <label>275px &#xD7; 100%</label>
      <div className="ex-2">
        <Graph data={data[2]} frameX={250} frameY={100} />
      </div>
      <label>225px &#xD7; 50%</label>
      <div className="ex-3">
        <Graph data={data[3]} frameX={200} spread={0.5} />
      </div>
      <label>400px &#xD7; 20%</label>
      <div className="ex-4">
        <Graph data={data[4]} />
      </div>
      <label>100vh &#xD7; 100%</label>
      <div className="ex-5">
        <Graph data={data[5]} />
      </div>
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
