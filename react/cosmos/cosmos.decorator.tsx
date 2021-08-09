import type { ReactElement } from 'react';
import { Viewport } from 'react-cosmos/fixture';
import './cosmos.css';

interface FixtureProps {
  height: number;
  width: number;
  background: string;
  children: ReactElement;
}

interface DecoratorProps {
  children: ReactElement;
}

export function Fixture({ height, width, background, children }: FixtureProps): ReactElement {
  return (
    <Viewport height={height} width={width}>
      <div style={{ background }}>{children}</div>
    </Viewport>
  );
}

export default function Decorator({ children }: DecoratorProps): ReactElement {
  return <div className="cosmos_preview">{children}</div>;
}
