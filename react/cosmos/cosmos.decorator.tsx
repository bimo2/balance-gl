import { Viewport } from 'react-cosmos/fixture';
import './cosmos.css';

export function Fixture({ height, width, background, children }) {
  return (
    <Viewport height={height} width={width}>
      <div style={{ background }}>{children}</div>
    </Viewport>
  );
}

export default function Decorator({ children }) {
  return <div className="cosmos_preview">{children}</div>;
}
