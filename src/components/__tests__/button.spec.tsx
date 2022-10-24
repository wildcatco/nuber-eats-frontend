import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('should render OK with props', () => {
    render(<Button canClick={true} loading={false} actionText="test" />);
    screen.getByText('test');
  });

  it('should display loading', () => {
    render(<Button canClick={true} loading={true} actionText="test" />);
    screen.getByText('Loading...');
  });

  it('should disable button', () => {
    render(<Button canClick={false} loading={true} actionText="test" />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
