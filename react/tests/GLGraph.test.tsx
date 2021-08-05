import { render, screen } from '@testing-library/react';
import { GLGraph } from 'GLGraph/GLGraph';

test('renders svg paths', async () => {
  render(<GLGraph view={{ x: 100, y: 100 }} data={[]} />);

  const path = await screen.findByText((_, element) => element?.tagName === 'path');

  expect(path).toBeInTheDocument();
  expect(path).toHaveAttribute('stroke', '#000');
  expect(path).toHaveAttribute('fill', 'transparent');
});
