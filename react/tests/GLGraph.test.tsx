import { render } from '@testing-library/react';
import { GLGraph } from 'GLGraph/GLGraph';

it('renders svg graph', () => {
  const { container } = render(
    <GLGraph
      view={{ x: 200, y: 100 }}
      data={[
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 8 },
        { x: 4, y: 16 },
      ]}
    />,
  );

  const [path] = container.querySelectorAll('path');

  expect(path).toBeInTheDocument();
  expect(path).toHaveAttribute('stroke', '#000');
  expect(path).toHaveAttribute('stroke-width', '2.5');
  expect(path).toHaveAttribute('fill', 'transparent');
});
