import type { ReactNode } from 'react';
import { Viewport } from 'react-cosmos/fixture';
import './cosmos.css';

interface FixtureProps {
  height: number;
  width: number;
  background: string;
  children: ReactNode;
}

interface DecoratorProps {
  children: ReactNode
}

export function Fixture({ height, width, background, children }: FixtureProps) {
  return (
    <Viewport height={height} width={width}>
      <div style={{ background }}>{children}</div>
    </Viewport>
  );
}

export default function Decorator({ children }: DecoratorProps) {
  return <div className="cosmos_preview">{children}</div>;
}
