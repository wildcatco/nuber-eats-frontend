import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Restaurant from '../restaurant';

describe('Restaurant', () => {
  it('renders OK with props', () => {
    const restaurantProps = {
      id: '1',
      coverImg: 'testImg',
      name: 'testName',
      categoryName: 'testCategory',
    };

    render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );

    screen.getByText(restaurantProps.name);
    screen.getByText(restaurantProps.categoryName);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/restaurants/${restaurantProps.id}`);
  });
});
