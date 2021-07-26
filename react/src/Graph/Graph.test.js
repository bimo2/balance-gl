import { render, screen } from '@testing-library/react';
import Graph from './Graph';

test('renders svg path', () => {
  render(<Graph />);

  const svgElement = screen.getByTitle(/gl-graph/i);

  expect(svgElement).toBeInTheDocument();
});
