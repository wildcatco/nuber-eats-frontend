import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserRole } from '../../gql/graphql';
import { ME_QUERY } from '../../query/users';
import Header from '../header';

describe('Header', () => {
  it('renders verify banner', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: 'test@mail.com',
                  role: UserRole.Client,
                  verified: false,
                },
              },
            },
          },
        ]}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );

    expect(
      await screen.findByText('Please verify your email.')
    ).toBeInTheDocument();
  });

  it('renders without verify banner', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: 'test@mail.com',
                  role: UserRole.Client,
                  verified: true,
                },
              },
            },
          },
        ]}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Please verify your email.')
      ).not.toBeInTheDocument();
    });
  });
});
