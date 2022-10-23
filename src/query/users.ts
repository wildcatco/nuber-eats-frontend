import { graphql } from '../gql';

export const ME_QUERY = graphql(/* GraphQL */ `
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`);

export const VERIFY_EMAIL_MUTATION = graphql(/* GraphQL */ `
  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`);

export const EDIT_PROFILE_MUTATION = graphql(/* GraphQL */ `
  mutation editProfile($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`);

export const CREATE_ACCOUNT_MUTATION = graphql(/* GraphQL */ `
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`);

export const LOGIN_MUTATION = graphql(/* GraphQL */ `
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`);
