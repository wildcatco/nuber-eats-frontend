import { ApolloProvider } from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../query/users';
import Login from '../login';

const mockedClient = createMockClient();
const mockedMutationResponse = jest.fn();

const renderLogin = (mockedClient: MockApolloClient) =>
  render(
    <Router>
      <HelmetProvider>
        <ApolloProvider client={mockedClient}>
          <Login />
        </ApolloProvider>
      </HelmetProvider>
    </Router>
  );

describe('Login', () => {
  it('renders OK', async () => {
    renderLogin(mockedClient);

    await waitFor(() => {
      expect(document.title).toBe('Login | Nuber Eats');
    });
  });

  it('displays email validation errors', async () => {
    renderLogin(mockedClient);

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'wrong@mail');

    expect(
      await screen.findByText('Please enter a valid email')
    ).toBeInTheDocument();

    userEvent.clear(emailInput);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('displays password required error', async () => {
    renderLogin(mockedClient);

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'test@mail.com');

    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'test');
    userEvent.clear(passwordInput);

    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('submits form and calls mutation', async () => {
    mockedMutationResponse.mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'token',
          error: null,
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

    renderLogin(mockedClient);

    const formData = {
      email: 'test@mail.com',
      password: '1234',
    };

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, formData.email);

    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, formData.password);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeEnabled();
    });

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedMutationResponse).toBeCalledTimes(1);
    });
    expect(mockedMutationResponse).toBeCalledWith({
      loginInput: {
        ...formData,
      },
    });
  });

  it('shows login mutation error', async () => {
    mockedMutationResponse.mockResolvedValue({
      data: {
        login: {
          ok: false,
          token: null,
          error: 'login failed',
        },
      },
    });

    renderLogin(mockedClient);

    const formData = {
      email: 'test@mail.com',
      password: '1234',
    };

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, formData.email);

    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, formData.password);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeEnabled();
    });

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    expect(await screen.findByText('login failed')).toBeInTheDocument();
  });
});
