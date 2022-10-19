/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n          fragment VerifiedUser on User {\n            verified\n          }\n        ": types.VerifiedUserFragmentDoc,
    "\n            fragment EditedUser on User {\n              verified\n              email\n            }\n          ": types.EditedUserFragmentDoc,
    "\n  query restaurantsPageQuery($input: RestaurantsInput!) {\n    categories {\n      ok\n      error\n      categories {\n        id\n        name\n        coverImg\n        slug\n        restaurantCount\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        id\n        name\n        coverImg\n        category {\n          name\n        }\n        address\n        isPromoted\n      }\n    }\n  }\n": types.RestaurantsPageQueryDocument,
    "\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n": types.MeDocument,
    "\n  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {\n    verifyEmail(input: $verifyEmailInput) {\n      ok\n      error\n    }\n  }\n": types.VerifyEmailDocument,
    "\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n": types.EditProfileDocument,
    "\n    mutation createAccount($createAccountInput: CreateAccountInput!) {\n      createAccount(input: $createAccountInput) {\n        ok\n        error\n      }\n    }\n  ": types.CreateAccountDocument,
    "\n    mutation login($loginInput: LoginInput!) {\n      login(input: $loginInput) {\n        ok\n        token\n        error\n      }\n    }\n  ": types.LoginDocument,
};

export function graphql(source: "\n          fragment VerifiedUser on User {\n            verified\n          }\n        "): (typeof documents)["\n          fragment VerifiedUser on User {\n            verified\n          }\n        "];
export function graphql(source: "\n            fragment EditedUser on User {\n              verified\n              email\n            }\n          "): (typeof documents)["\n            fragment EditedUser on User {\n              verified\n              email\n            }\n          "];
export function graphql(source: "\n  query restaurantsPageQuery($input: RestaurantsInput!) {\n    categories {\n      ok\n      error\n      categories {\n        id\n        name\n        coverImg\n        slug\n        restaurantCount\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        id\n        name\n        coverImg\n        category {\n          name\n        }\n        address\n        isPromoted\n      }\n    }\n  }\n"): (typeof documents)["\n  query restaurantsPageQuery($input: RestaurantsInput!) {\n    categories {\n      ok\n      error\n      categories {\n        id\n        name\n        coverImg\n        slug\n        restaurantCount\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        id\n        name\n        coverImg\n        category {\n          name\n        }\n        address\n        isPromoted\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"];
export function graphql(source: "\n  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {\n    verifyEmail(input: $verifyEmailInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {\n    verifyEmail(input: $verifyEmailInput) {\n      ok\n      error\n    }\n  }\n"];
export function graphql(source: "\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n"];
export function graphql(source: "\n    mutation createAccount($createAccountInput: CreateAccountInput!) {\n      createAccount(input: $createAccountInput) {\n        ok\n        error\n      }\n    }\n  "): (typeof documents)["\n    mutation createAccount($createAccountInput: CreateAccountInput!) {\n      createAccount(input: $createAccountInput) {\n        ok\n        error\n      }\n    }\n  "];
export function graphql(source: "\n    mutation login($loginInput: LoginInput!) {\n      login(input: $loginInput) {\n        ok\n        token\n        error\n      }\n    }\n  "): (typeof documents)["\n    mutation login($loginInput: LoginInput!) {\n      login(input: $loginInput) {\n        ok\n        token\n        error\n      }\n    }\n  "];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;