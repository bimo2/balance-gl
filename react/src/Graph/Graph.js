import React, { useRef, useState, useMemo, useEffect } from 'react';
import { contrast } from '../utils';

function interpolateXY(point, domain, range, bounds, delta) {
  const dx = domain.min !== domain.max ? (bounds.x * (point.x - domain.min)) / (domain.max - domain.min) : 0;
  const spread = Math.abs((range.max - range.min) / range.min);
  const compression = spread < delta ? bounds.y * (1 - (spread / delta)) : bounds.y * 0.08;
  let dy = bounds.y - (compression / 2) - (((bounds.y - compression) * (point.y - range.min)) / (range.max - range.min));

  if (!isFinite(dy)) {
    dy = bounds.y / 2;
  }

  return { dx, dy };
}

function cubicBezierPath(points, coefficient) {
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
        x: (-set[0].x + (coefficient * set[1].x) + set[2].x) / coefficient,
        y: (-set[0].y + (coefficient * set[1].y) + set[2].y) / coefficient,
      },
      {
        x: (set[1].x + (coefficient * set[2].x) - set[3].x) / coefficient,
        y: (set[1].y + (coefficient * set[2].y) - set[3].y) / coefficient,
      },
      { ...set[2] },
    ];

    bezierPoints.push(bezier);
  }

  return [`M${points[0].x} ${points[0].y}`]
    .concat(bezierPoints.map(([a, b, c]) => `C${a.x} ${a.y}, ${b.x} ${b.y}, ${c.x} ${c.y}`))
    .join(' ');
}

function linearPath([first, ...points]) {
  return [`M${first.x} ${first.y}`]
    .concat(points.map((point) => `L${point.x} ${point.y}`))
    .join(' ');
}

export function Graph({
  view = { x: 200, y: 100 },
  data = [],
  grid = [],
  delta = 0,
  bezier = 0,
  stroke = 2.5,
  tint = '#000',
  background = '#fff',
  gradient,
  reaction,
  labelX,
  labelY,
  onQuery,
}) {
  const graph = useRef(null);
  const [position, setPosition] = useState(null);
  const id = useMemo(() => Math.random().toString(36).substr(2, 5), []);

  const { domain, range, points, path } = useMemo(() => {
    const { xs, ys } = data.reduce((set, { x, y }) => ({
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
        const { dx: x, dy: y } = interpolateXY(point, domain, range, view, delta);

        return { x, y };
      });

    const path = bezier < 6 ? linearPath(points) : cubicBezierPath(points, bezier);

    return { domain, range, points, path };
  }, [data, view, delta, bezier]);

  useEffect(() => {
    const updateGraphPosition = ({ clientX, clientY }) => {
      const svgPoint = graph.current.createSVGPoint();

      svgPoint.x = clientX;
      svgPoint.y = clientY;

      const { x, y } = svgPoint.matrixTransform(graph.current.getScreenCTM().inverse());

      if (x < 0 || x > view.x || y < 0 || y > view.y) {
        return setPosition(null);
      }

      for (let i = 0; i < points.length - 1; i++) {
        if (x >= points[i].x && x <= points[i + 1].x) {
          const midX = (points[i].x + points[i + 1].x) / 2;

          return setPosition({ ...points[x < midX ? i : i + 1] });
        }
      }

      setPosition(null);
    }

    if (reaction && graph?.current) {
      const { current } = graph;

      current.addEventListener("mousemove", updateGraphPosition, false);

      return () => {
        current.removeEventListener("mousemove", updateGraphPosition, false);
      };
    }
  }, [reaction, view, points]);

  const gridColor = contrast(background) ? '#000' : '#fff';

  const GridLine = ({ label, value }) => {
    const { dy } = interpolateXY({ x: 0, y: value }, domain, range, view, delta);
    const text = label ?? labelY?.(value) ?? `${value}`;

    const textStyle = {
      fontSize: '0.75rem',
      opacity: '0.4',
    };

    return (
      <g>
        <text x={view.x - 8} y={dy - 8} fill={gridColor} textAnchor="end" style={textStyle}>{text}</text>
        <line x1="0" x2={view.x} y1={dy} y2={dy} stroke={`url(#gl-grid-${id})`} strokeWidth="0.25" strokeDasharray="2.5" />
      </g>
    );
  };

  return (
    <svg ref={graph} className="gl-graph" viewBox={`0 0 ${view.x} ${view.y}`} xmlns="http://www.w3.org/2000/svg" version="1.1" onMouseLeave={() => setPosition(null)} height="100%" width="100%">
      <defs>
        <linearGradient id={`gl-grid-${id}`} x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={background} stopOpacity="0" />
          <stop offset="100%" stopColor={gridColor} stopOpacity="1" />
        </linearGradient>
        {gradient && (
          <linearGradient id={`gl-area-${id}`} x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse">
            <stop offset="40%" stopColor={tint} stopOpacity="0.1" />
            <stop offset="80%" stopColor={tint} stopOpacity="0" />
          </linearGradient>
        )}
      </defs>
      {grid.map((props) => <GridLine {...props} />)}
      {gradient && <path d={`${path} V${view.y} H0 Z`} strokeWidth="0" fill={`url(#gl-area-${id})`} />}
      <path d={path} stroke={tint} strokeWidth={stroke} fill="transparent" />
      {reaction && position && (
        <circle cx={position.x} cy={position.y} r={stroke * 3.25} stroke={background} fill={tint}>
          <animate attributeName="stroke-width" dur="1450ms" values={`${stroke}; ${stroke * 1.75}; ${stroke}`} repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
