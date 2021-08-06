import { useRef, useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { palette, contrast } from 'colors';
import type { GLPoint, GLInterpolation, GLAxis } from 'types';
import type { CSSProperties } from 'react';

interface Space {
  magnitude?: number;
  min: number;
  max: number;
}

export interface GLGraphProps {
  view: GLPoint;
  data: GLPoint[];
  domain?: number;
  range?: number;
  grid?: GLAxis[];
  bezier?: number;
  stroke?: number;
  tint?: string;
  background?: string;
  gradient?: boolean;
  reactive?: 'point' | 'point+x' | 'point+y' | 'point+xy';
  labelX?: (x: number) => string;
  labelY?: (y: number) => string; 
}

function interpolateXY(
  point: GLPoint,
  domain: Space,
  range: Space,
  bounds: GLPoint,
  padding: number,
) {
  const pathX = Math.max(domain.magnitude ?? 0, domain.max - domain.min);
  let dx = (point.x - domain.min) * (bounds.x / pathX);

  if (!isFinite(dx)) {
    dx = 0;
  }

  const pathY = Math.max(range.magnitude ?? 0, range.max - range.min);
  const offsetY = (bounds.y * 0.05) + padding;
  const boundsY = (bounds.y * 0.9) - padding;
  const translateY = ((range.max + range.min) / 2) - (pathY / 2);
  let dy = boundsY + offsetY - ((point.y - translateY) * (boundsY / pathY));

  if (!isFinite(dy)) {
    dy = bounds.y / 2;
  }

  return { dx, dy };
}

function cubicBezierPath(points: GLInterpolation[], coefficient: number) {
  if (!points.length) {
    return;
  }

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

function linearPath([first, ...points]: GLInterpolation[]) {
  if (!first) {
    return;
  }

  return [`M${first.dx} ${first.dy}`]
    .concat(points.map((point) => `L${point.dx} ${point.dy}`))
    .join(' ');
}

export function GLGraph({
  view,
  data,
  domain: _domain,
  range: _range,
  grid = [],
  bezier = 0,
  stroke = 2.5,
  tint = palette.tint,
  background = palette.background,
  gradient,
  reactive,
  labelX,
  labelY,
}: GLGraphProps) {
  const graph = useRef<SVGSVGElement>(null);
  const label = useRef<SVGGElement>(null);
  const [position, setPosition] = useState<GLInterpolation | null>(null);
  const [alignment, setAlignment] = useState<'start' | 'middle' | 'end'>('middle');
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
    const { xs, ys } = data.reduce<{ xs: number[], ys: number[] }>((set, { x, y }) => ({
      xs: [...set.xs, x],
      ys: [...set.ys, y],
    }), { xs: [], ys: [] });

    const domain: Space = {
      magnitude: _domain,
      min: Math.min(...xs),
      max: Math.max(...xs),
    };

    const range: Space = {
      magnitude: _range, 
      min: Math.min(...ys),
      max: Math.max(...ys),
    };

    const points: GLInterpolation[] = data
      .sort(({x: ax}, {x: bx}) => ax - bx)
      .map((point) => ({
        ...point,
        ...interpolateXY(point, domain, range, view, padding),
      }));

    const path = bezier < 6 ? linearPath(points) : cubicBezierPath(points, bezier);

    return { domain, range, points, path };
  }, [data, _domain, _range, view, padding, bezier]);

  useEffect(() => {
    const updateGraphPosition = ({ clientX, clientY }: MouseEvent) => {
      if (!graph?.current) {
        return;
      }

      const svgPoint = graph.current.createSVGPoint();

      svgPoint.x = clientX;
      svgPoint.y = clientY;

      const { x, y } = svgPoint.matrixTransform(graph.current.getScreenCTM()?.inverse());

      if (x < 0 || x > view.x || y < 0 || y > view.y) {
        return setPosition(null);
      }

      for (let i = 0; i < points.length - 1; i++) {
        if (x >= points[i].dx && x <= points[i + 1].dx) {
          const mid = (points[i].dx + points[i + 1].dx) / 2;

          return setPosition(points[x < mid ? i : i + 1]);
        }
      }

      setPosition(null);
    }

    if (!reactive || !graph?.current) {
      return;
    }

    const { current } = graph;

    current.addEventListener("mousemove", updateGraphPosition, false);

    return () => {
      current.removeEventListener("mousemove", updateGraphPosition, false);
    };
  }, [reactive, view, points]);

  useLayoutEffect(() => {
    if (!label?.current || !position) {
      return;
    }

    const { x: x1, width } = label.current.getBBox();
    const x2 = x1 + width;

    if (width >= view.x) {
      return;
    }

    switch (alignment) {
      case 'middle':
        if (x1 < 0) {
          return setAlignment('start');
        }

        if (x2 > view.x) {
          return setAlignment('end');
        }

        break;

      case 'start':
        if (position.dx >= (width / 2)) {
          return setAlignment('middle');
        }

        break;

      case 'end':
        if ((view.x - position.dx) >= (width / 2)) {
          return setAlignment('middle');
        }

        break;

      default:
        break;
    }
  }, [position, alignment, view]);

  const gridFactory = (axis: GLAxis) => {
    if (!('y' in axis)) {
      return null;
    }

    const { label: text, y } = axis;
    const { dy } = interpolateXY({ x: 0, y }, domain, range, view, padding);

    const textStyle: CSSProperties = {
      fontSize: '12px',
      userSelect: 'none',
    };

    return (
      <g key={y}>
        <text x={view.x - 8} y={dy - 8} fill={foreground} opacity="0.4" textAnchor="end" style={textStyle}>{text ?? labelY?.(y) ?? `${y}`}</text>
        <line x1="0" x2={view.x} y1={dy} y2={dy} stroke={`url(#gl-grid-${id})`} strokeWidth="0.25" strokeDasharray="2.5" />
      </g>
    );
  };

  const buildPointAxis = ({ x, y, dx }: GLInterpolation) => {
    const textStyle: CSSProperties = {
      fontSize: '12.5px',
      fontWeight: 500,
      userSelect: 'none',
    };

    const subtextStyle: CSSProperties = {
      fontSize: '10px',
      fontWeight: 500,
      userSelect: 'none',
    };

    const anchor = (() => {
      switch (alignment) {
        case 'start':
          return 0;

        case 'end':
          return view.x;

        default:
          return dx;
      }
    })();

    switch (reactive) {
      case 'point+x':
        return (
          <>
            <g ref={label}>
              <text x={anchor} y="16" fill={foreground} textAnchor={alignment} style={textStyle}>{labelX?.(x) ?? `${x}`}</text>
            </g>
            <line x1={dx} x2={dx} y1={padding} y2={view.y} stroke={foreground} strokeWidth="0.5" strokeDasharray="2.5" />
          </>
        );

      case 'point+y':
        return (
          <>
            <g ref={label}>
              <text x={anchor} y="16" fill={foreground} textAnchor={alignment} style={textStyle}>{labelY?.(y) ?? `${y}`}</text>
            </g>
            <line x1={dx} x2={dx} y1={padding} y2={view.y} stroke={foreground} strokeWidth="0.5" strokeDasharray="2.5" />
          </>
        );

      case 'point+xy':
        return (
          <>
            <g ref={label}>
              <text x={anchor} y="16" fill={foreground} textAnchor={alignment} style={textStyle}>{labelY?.(y) ?? `${y}`}</text>
              <text x={anchor} y="32" fill={foreground} textAnchor={alignment} style={subtextStyle}>{labelX?.(x) ?? `${x}`}</text>
            </g>
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
