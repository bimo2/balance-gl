export interface GLPoint {
  x: number;
  y: number;
}

export interface GLInterpolation extends GLPoint {
  dx: number;
  dy: number;
}

export interface GLXAxis {
  label?: string;
  x: number;
}

export interface GLYAxis {
  label?: string;
  y: number;
}

export type GLAxis = GLXAxis | GLYAxis;
