import React from 'react';
import ReactDOM from 'react-dom';
import { Graph } from './Graph';
import reportWebVitals from './reportWebVitals';
import './index.css';

const QUADRATIC = {
  label: 'Quadratic Graph',
  data: [
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 8 },
    { x: 4, y: 16 },
  ],
  frameX: 100,
  frameY: 100,
  spread: 25,
};

const CARTESIAN = {
  label: 'Cartesian Graph',
  data: [
    { x: -10, y: 1 },
    { x: 4, y: -8 },
    { x: 6, y: 9 },
    { x: -4, y: -12 },
    { x: 8, y: 16 },
  ],
  frameX: 100,
  frameY: 100,
  spread: 5,
  bezier: 0,
};

const BITCOIN = {
  label: 'Bitcoin Graph',
  data: [
    { x: 10000, y: 46000 },
    { x: 10001, y: 52000 },
    { x: 10002, y: 60000 },
    { x: 10003, y: 69000 },
    { x: 10004, y: 72000 },
    { x: 10005, y: 82000 },
    { x: 10006, y: 78000 },
    { x: 10007, y: 64000 },
    { x: 10008, y: 48000 },
    { x: 10009, y: 39000 },
    { x: 10010, y: 41000 },
    { x: 10011, y: 46000 },
    { x: 10012, y: 52000 },
    { x: 10013, y: 66000 },
    { x: 10014, y: 69000 },
    { x: 10015, y: 72000 },
    { x: 10016, y: 84000 },
    { x: 10017, y: 78000 },
    { x: 10018, y: 64000 },
    { x: 10019, y: 48000 },
    { x: 10020, y: 67000 },
    { x: 10021, y: 41000 },
    { x: 10022, y: 141000 },
  ],
  frameX: 250,
  frameY: 100,
  spread: 0.5,
  bezier: 8,
};

const CAD_USD = {
  label: 'CAD/USD Graph',
  data: [
    { x: 0, y: 0.7 },
    { x: 2, y: 0.728 },
    { x: 4, y: 0.7401 },
    { x: 6, y: 0.7099 },
    { x: 8, y: 0.7155 },
    { x: 10, y: 0.76 },
    { x: 12, y: 0.747 },
    { x: 14, y: 0.747 },
    { x: 16, y: 0.72 },
    { x: 18, y: 0.724 },
    { x: 20, y: 0.731 },
  ],
  frameX: 175,
  spread: 0.2,
  bezier: 12,
};

const BATTERY = {
  label: 'Battery Graph',
  data: [
    { x: 0.0028, y: 0.9999 },
    { x: 0.0042, y: 0.9604 },
    { x: 0.0055, y: 0.82 },
    { x: 0.006, y: 0.7402 },
    { x: 0.0066, y: 0.696 },
    { x: 0.007, y: 0.705 },
    { x: 0.0074, y: 0.77 },
    { x: 0.0078, y: 0.8602 },
    { x: 0.0082, y: 0.9203 },
    { x: 0.0086, y: 1 },
    { x: 0.009, y: 1 },
    { x: 0.01, y: 1 },
  ],
};

const WEATHER = {
  label: 'Weather Graph',
  data: [
    { x: 1, y: 10 },
    { x: 4, y: 10 },
    { x: 7, y: 10 },
    { x: 10, y: 10 },
  ],
  frameX: 500,
  frameY: 500,
};

function Playground() {
  const graphs = [QUADRATIC, CARTESIAN, BITCOIN, CAD_USD, BATTERY, WEATHER];

  return (
    <div className="playground">
      {graphs.map(({label, ...props}, index) => (
        <React.Fragment key={index}>
          <label>{label}</label>
          <div className={`ex-${index}`}>
            <Graph {...props} />
          </div>
        </React.Fragment>
      ))}
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
