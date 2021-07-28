import React, { useRef, useState, useMemo, useEffect } from 'react';
import { palette, contrast } from '../colors';

const defaultView = { x: 200, y: 100 };

function interpolateXY(point, domain, range, bounds, padding, delta) {
  const dx = domain.min !== domain.max ? (bounds.x * (point.x - domain.min)) / (domain.max - domain.min) : 0;
  const spread = Math.abs((range.max - range.min) / range.min);
  const deltaCompression = bounds.y * (1 - (spread / delta));
  const fitCompression = bounds.y * 0.1;
  const minCompression = (padding ?? 0) * 2;
  const compression = Math.max(deltaCompression, fitCompression, minCompression);
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
        x: (-set[0].dx + (coefficient * set[1].dx) + set[2].dx) / coefficient,
        y: (-set[0].dy + (coefficient * set[1].dy) + set[2].dy) / coefficient,
      },
      {
        x: (set[1].dx + (coefficient * set[2].dx) - set[3].dx) / coefficient,
        y: (set[1].dy + (coefficient * set[2].dy) - set[3].dy) / coefficient,
      },
      {
        x: set[2].dx,
        y: set[2].dy,
      },
    ];

    bezierPoints.push(bezier);
  }

  return [`M${points[0].dx} ${points[0].dy}`]
    .concat(bezierPoints.map(([a, b, c]) => `C${a.x} ${a.y}, ${b.x} ${b.y}, ${c.x} ${c.y}`))
    .join(' ');
}

function linearPath([first, ...points]) {
  return [`M${first.dx} ${first.dy}`]
    .concat(points.map((point) => `L${point.dx} ${point.dy}`))
    .join(' ');
}

export function Graph({
  view = defaultView,
  data = [],
  grid = [],
  delta = 0,
  bezier = 0,
  stroke = 2.5,
  tint = palette.tint,
  background = palette.background,
  gradient,
  reactive,
  labelX,
  labelY,
  onQuery,
}) {
  const graph = useRef(null);
  const [position, setPosition] = useState(null);
  const id = useMemo(() => Math.random().toString(36).substr(2, 5), []);
  const foreground = contrast(background);

  const padding = (() => {
    switch (reactive) {
      case 'point+x':
      case 'point+y':
        return 28;

      case 'point+xy':
        return 44;

      default:
        return 0;
    }
  })();

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
      .map((point) => ({
        ...point,
        ...interpolateXY(point, domain, range, view, padding, delta),
      }));

    const path = bezier < 6 ? linearPath(points) : cubicBezierPath(points, bezier);

    return { domain, range, points, path };
  }, [data, view, delta, padding, bezier]);

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
        if (x >= points[i].dx && x <= points[i + 1].dx) {
          const mid = (points[i].dx + points[i + 1].dx) / 2;

          return setPosition({ ...points[x < mid ? i : i + 1] });
        }
      }

      setPosition(null);
    }

    if (reactive && graph?.current) {
      const { current } = graph;

      current.addEventListener("mousemove", updateGraphPosition, false);

      return () => {
        current.removeEventListener("mousemove", updateGraphPosition, false);
      };
    }
  }, [reactive, view, points]);

  const gridFactory = ({ label, value }) => {
    const { dy } = interpolateXY({ x: 0, y: value }, domain, range, view, padding, delta);
    const text = label ?? labelY?.(value) ?? `${value}`

    const textStyle = {
      fontSize: '12px',
      userSelect: 'none',
    };

    return (
      <g key={value}>
        <text x={view.x - 8} y={dy - 8} fill={foreground} opacity="0.4" textAnchor="end" style={textStyle}>{text}</text>
        <line x1="0" x2={view.x} y1={dy} y2={dy} stroke={`url(#gl-grid-${id})`} strokeWidth="0.25" strokeDasharray="2.5" />
      </g>
    );
  };

  const buildPointAxis = ({ x, y, dx }) => {
    const textStyle = {
      fontSize: '12.5px',
      fontWeight: '500',
      userSelect: 'none',
    };

    const subtextStyle = {
      fontSize: '10px',
      fontWeight: '500',
      userSelect: 'none',
    };

    switch (reactive) {
      case 'point+x':
        return (
          <>
            <text x={dx} y="16" fill={foreground} textAnchor="middle" style={textStyle}>{labelX?.(x) ?? `${x}`}</text>
            <line x1={dx} x2={dx} y1={padding} y2={view.y} stroke={foreground} strokeWidth="0.5" strokeDasharray="2.5" />
          </>
        );

      case 'point+y':
        return (
          <>
            <text x={dx} y="16" fill={foreground} textAnchor="middle" style={textStyle}>{labelY?.(y) ?? `${y}`}</text>
            <line x1={dx} x2={dx} y1={padding} y2={view.y} stroke={foreground} strokeWidth="0.5" strokeDasharray="2.5" />
          </>
        );

      case 'point+xy':
        return (
          <>
            <text x={dx} y="16" fill={foreground} textAnchor="middle" style={textStyle}>{labelY?.(y) ?? `${y}`}</text>
            <text x={dx} y="32" fill={foreground} textAnchor="middle" style={subtextStyle}>{labelX?.(x) ?? `${x}`}</text>
            <line x1={dx} x2={dx} y1={padding} y2={view.y} stroke={foreground} strokeWidth="0.5" strokeDasharray="2.5" />
          </>
        );

      default:
        return null;
    };
  };

  return (
    <svg ref={graph} className="gl-graph" viewBox={`0 0 ${view.x} ${view.y}`} xmlns="http://www.w3.org/2000/svg" version="1.1" onMouseLeave={() => setPosition(null)} height="100%" width="100%">
      <defs>
        <linearGradient id={`gl-grid-${id}`} x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={background} stopOpacity="0" />
          <stop offset="75%" stopColor={foreground} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`gl-area-${id}`} x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse">
          <stop offset="40%" stopColor={tint} stopOpacity="0.1" />
          <stop offset="80%" stopColor={tint} stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid.map(gridFactory)}
      {gradient && <path d={`${path} V${view.y} H0 Z`} strokeWidth="0" fill={`url(#gl-area-${id})`} />}
      <path d={path} stroke={tint} strokeWidth={stroke} fill="transparent" />
      {reactive && position && (
        <g>
          {buildPointAxis(position)}
          <circle cx={position.dx} cy={position.dy} r={stroke * 3.25} stroke={background} fill={tint}>
            <animate attributeName="stroke-width" dur="1450ms" values={`${stroke}; ${stroke * 1.75}; ${stroke}`} repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  );
}
