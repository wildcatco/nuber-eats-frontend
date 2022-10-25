import { ApolloProvider } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { createMockClient } from 'mock-apollo-client';
import { UserRole } from '../../gql/graphql';
import { CREATE_ACCOUNT_MUTATION } from '../../query/users';
import { render, screen, waitFor } from '../../test-utils';
import CreateAccount from '../create-account';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');

  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe('CreateAccount', () => {
  const mockedClient = createMockClient();
  const mockedCreateAccountResponse = jest.fn();

  const renderCreateAccount = () =>
    render(
      <ApolloProvider client={mockedClient}>
        <CreateAccount />
      </ApolloProvider>
    );

  const expectErrorMessage = (errorMessage: string) => {
    const errorMessageEl = screen.getByText(errorMessage);
    expect(errorMessageEl).toBeInTheDocument();
  };

  it('renders OK', async () => {
    renderCreateAccount();

    await waitFor(() => {
      expect(document.title).toBe('Create Account | Nuber Eats');
    });
  });

  it('renders validation errors', async () => {
    renderCreateAccount();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(emailInput, 'wrong@mail');

    await waitFor(() => {
      expectErrorMessage('Please enter a valid email');
    });

    userEvent.clear(emailInput);

    await waitFor(() => {
      expectErrorMessage('Email is required');
    });

    userEvent.type(emailInput, 'test@mail.com');
    userEvent.type(passwordInput, '1234');
    userEvent.clear(passwordInput);

    await waitFor(() => {
      expectErrorMessage('Password is required');
    });
  });

  it('submits mutation with form values', async () => {
    mockedCreateAccountResponse.mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: 'mutation-error',
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedCreateAccountResponse
    );

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderCreateAccount();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button');

    const formData = {
      email: 'test@mail.com',
      password: '1234',
      role: UserRole.Client,
    };

    userEvent.type(emailInput, formData.email);
    userEvent.type(passwordInput, formData.password);

    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    userEvent.click(button);

    await waitFor(() => {
      expect(mockedCreateAccountResponse).toBeCalledTimes(1);
    });

    expect(mockedCreateAccountResponse).toBeCalledWith({
      createAccountInput: {
        ...formData,
      },
    });

    expect(window.alert).toBeCalledWith('Account Created! Log in now!');
    expect(mockPush).toBeCalledWith('/');

    expectErrorMessage('mutation-error');
  });
});
