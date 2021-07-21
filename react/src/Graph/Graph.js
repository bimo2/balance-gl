import React from 'react';
import "./Graph.css";

function interpolateXY(point, domain, range, frameX, frameY, spread) {
  const dx = domain.min !== domain.max ?
    (frameX * (point.x - domain.min)) / (domain.max - domain.min)
    : 0;

  const delta = Math.abs((range.max - range.min) / range.min);
  const compression = delta < spread ? frameY * (1 - (delta / spread)) : 0;
  let dy = frameY - (compression / 2) - (((frameY - compression) * (point.y - range.min)) / (range.max - range.min));

  if (!isFinite(dy)) {
    dy = frameY / 2;
  }

  return { dx, dy };
}

export function Graph({ data = [], frameX = 100, frameY = 100, spread = 0 }) {
  const { ys, xs } = data.reduce((set, { x, y }) => ({
    xs: [...set.xs, x],
    ys: [...set.ys, y],
  }), { xs: [], ys: [] });

  const domain = {
    min: Math.min(...xs),
    max: Math.max(...xs),
  };

  const range = {
    min: Math.min(...ys),
    max: Math.max(...ys),
  };

  const path = data
    .sort(({x: ax}, {x: bx}) => ax - bx)
    .map((point, index) => {
      const { dx, dy } = interpolateXY(point, domain, range, frameX, frameY, spread);

      return index < 1 ? `M${dx} ${dy}` : `L${dx} ${dy}`;
    })
    .join(' ');

  return (
    <svg className="graph" viewBox={`0 0 ${frameX} ${frameY}`} xmlns="http://www.w3.org/2000/svg">
      <path d={path} stroke="#006aff" strokeWidth="1" fill="transparent" />
    </svg>
  );
}
