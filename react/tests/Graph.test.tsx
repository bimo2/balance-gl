import { render, screen } from '@testing-library/react';
import { Graph } from '../src/Graph/Graph';

test('renders svg path', async () => {
  render(<Graph />);

  const path = await screen.findByText((_, element) => element.tagName === 'path');

  expect(path).toBeInTheDocument();
  expect(path).toHaveAttribute('stroke', '#000');
  expect(path).toHaveAttribute('fill', 'transparent');
});
