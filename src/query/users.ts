import { graphql } from './../gql/gql';

export const ME_QUERY = graphql(`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`);

export const VERIFY_EMAIL_MUTATION = graphql(`
  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`);

export const EDIT_PROFILE_MUTATION = graphql(`
  mutation editProfile($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`);

export const CREATE_ACCOUNT_MUTATION = graphql(
  `
    mutation createAccount($createAccountInput: CreateAccountInput!) {
      createAccount(input: $createAccountInput) {
        ok
        error
      }
    }
  `
);

export const LOGIN_MUTATION = graphql(
  `
    mutation login($loginInput: LoginInput!) {
      login(input: $loginInput) {
        ok
        token
        error
      }
    }
  `
);
