import React from 'react';
import "./Graph.css";

function interpolateXY(point, domain, range, frameX, frameY, spread) {
  const dx = domain.min !== domain.max
    ? (frameX * (point.x - domain.min)) / (domain.max - domain.min)
    : 0;

  const delta = Math.abs((range.max - range.min) / range.min);
  const compression = delta < spread ? frameY * (1 - (delta / spread)) : frameY * 0.05;
  let dy = frameY - (compression / 2) - (((frameY - compression) * (point.y - range.min)) / (range.max - range.min));

  if (!isFinite(dy)) {
    dy = frameY / 2;
  }

  return { dx, dy };
}

function cubicBezier(points) {
  const bezierPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const set = [
      { ...points[Math.max(i - 1, 0)] },
      { ...points[i] },
      { ...points[i + 1] },
      { ...points[Math.min(i + 2, points.length - 1)] },
    ];

    const bezier = [
      {
        x: (-set[0].x + (6 * set[1].x) + set[2].x) / 6,
        y: (-set[0].y + (6 * set[1].y) + set[2].y) / 6,
      },
      {
        x: (set[1].x + (6 * set[2].x) - set[3].x) / 6,
        y: (set[1].y + (6 * set[2].y) - set[3].y) / 6,
      },
      { ...set[2] }
    ];

    bezierPoints.push(bezier);
  }

  return bezierPoints;
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

  const points = data
    .sort(({x: ax}, {x: bx}) => ax - bx)
    .map((point) => {
      const { dx: x, dy: y } = interpolateXY(point, domain, range, frameX, frameY, spread);

      return { x, y };
    });

  const path = [`M${points[0].x} ${points[0].y}`].concat(
    cubicBezier(points).map(([a, b, c]) => `C${a.x} ${a.y}, ${b.x} ${b.y}, ${c.x} ${c.y}`)
  ).join(' ');

  return (
    <svg className="graph" viewBox={`0 0 ${frameX} ${frameY}`} xmlns="http://www.w3.org/2000/svg">
      <path d={path} stroke="#006aff" strokeWidth="1" fill="transparent" />
    </svg>
  );
}