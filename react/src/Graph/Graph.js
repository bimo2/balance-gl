import React from 'react';
import "./Graph.css";

export function Graph({frameX = 100, frameY = 100, data = []}) {
  const {ys, xs} = data.reduce((set, [x, y]) => ({
    xs: [...set.xs, x],
    ys: [...set.ys, y],
  }), {xs: [], ys: []});

  const domain = {
    min: Math.min(...xs),
    max: Math.max(...xs),
  };

  const range = {
    min: Math.min(...ys),
    max: Math.max(...ys),
  };

  const scale = {
    x: frameX / (domain.max - domain.min),
    y: frameY / (range.max - range.min),
  };

  const path = data
    .sort(([ax], [bx]) => ax - bx)
    .map(([x, y], index) => {
      const dx = (x - domain.min) * scale.x;
      const dy = frameY - ((y - range.min) * scale.y);

      return index < 1 ? `M${dx} ${dy}` : `L${dx} ${dy}`;
    })
    .join(' ');

  return (
    <svg className="graph" viewBox={`0 0 ${frameX} ${frameY}`} xmlns="http://www.w3.org/2000/svg">
      <path d={path} stroke="#006aff" strokeWidth="1" fill="transparent" />
    </svg>
  );
}
