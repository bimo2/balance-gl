import React from 'react';
import ReactDOM from 'react-dom';
import { Graph } from './Graph';
import reportWebVitals from './reportWebVitals';
import './index.css';

const QUADRATIC = {
  label: 'Quadratic Graph',
  view: { x: 100, y: 100 },
  data: [
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 8 },
    { x: 4, y: 16 },
  ],
  delta: 25,
  bezier: 6,
};

const CARTESIAN = {
  label: 'Cartesian Graph',
  data: [
    { x: -10, y: 1 },
    { x: 4, y: -8 },
    { x: 6, y: 4 },
    { x: -4, y: 4 },
    { x: 8, y: 10 },
  ],
  delta: 5,
  bezier: 0,
  gradient: true,
  reaction: true,
};

const BITCOIN = {
  label: 'Bitcoin Graph',
  view: { x: 600, y: 275 },
  data: [
    { x: 10000, y: 46000 },
    { x: 10001, y: 60000 },
    { x: 10002, y: 60000 },
    { x: 10003, y: 69000 },
    { x: 10004, y: 80000 },
    { x: 10005, y: 82000 },
    { x: 10006, y: 69000 },
    { x: 10007, y: 64000 },
    { x: 10008, y: 58000 },
    { x: 10009, y: 36000 },
    { x: 10010, y: 41000 },
    { x: 10011, y: 46000 },
    { x: 10012, y: 58000 },
    { x: 10013, y: 66000 },
    { x: 10014, y: 62000 },
    { x: 10015, y: 65000 },
    { x: 10016, y: 84000 },
    { x: 10017, y: 78000 },
    { x: 10018, y: 64000 },
    { x: 10019, y: 48000 },
    { x: 10020, y: 67000 },
    { x: 10021, y: 41000 },
    { x: 10022, y: 96000 },
  ],
  grid: [
    { label: '$45K', value: 45000 },
    { label: '$60K', value: 60000 },
    { label: '$75K', value: 75000 },
    { label: '$90K', value: 90000 },
  ],
  delta: 2.5,
  bezier: 8,
  tint: '#262c33',
  gradient: false,
  reaction: true,
};

const CAD_USD = {
  label: 'CAD/USD Graph',
  view: { x: 400, y: 200 },
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
  grid: [
    { value: 0.71 },
    { value: 0.725 },
  ],
  delta: 0.15,
  bezier: 12,
  tint: '#fff',
  background: '#262c33',
  gradient: true,
  reaction: true,
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
    { x: 0.0074, y: 0.75 },
    { x: 0.0078, y: 0.8602 },
    { x: 0.0082, y: 0.9203 },
    { x: 0.0086, y: 1 },
    { x: 0.009, y: 1 },
    { x: 0.01, y: 1 },
  ],
  stroke: 1.5,
  gradient: true,
};

const WEATHER = {
  label: 'Weather Graph',
  view: { x: 500, y: 500 },
  data: [
    { x: 1, y: 10 },
    { x: 4, y: 10 },
    { x: 7, y: 10 },
    { x: 10, y: 10 },
  ],
  gradient: true,
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

ReactDOM.render((
  <React.StrictMode>
    <Playground />
  </React.StrictMode>
), document.getElementById('app'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
