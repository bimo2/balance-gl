import React from 'react';
import "./Graph.css";

export function Graph() {
  return (
    <svg className="graph" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <title>graph-id</title>
      <path d="M0 50 L20 80 L40 60 L70 70 L100 40" stroke="black" strokeWidth="1" fill="transparent" />
    </svg>
  );
}
