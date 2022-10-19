import { useApolloClient, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { graphql } from '../../gql';
import { VerifyEmailMutation } from '../../gql/graphql';
import { VERIFY_EMAIL_MUTATION } from '../../query/users';
import { useMe } from './../../hooks/useMe';

const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const onCompleted = (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User: ${userData.me.id}`,
        fragment: graphql(`
          fragment VerifiedUser on User {
            verified
          }
        `),
        data: {
          ' $fragmentName': 'VerifiedUserFragment',
          verified: true,
        },
      });

      history.push('/');
    }
  };

  const [verifyEmailMutation] = useMutation(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const code = window.location.href.split('code=')[1];

    verifyEmailMutation({
      variables: {
        verifyEmailInput: {
          code,
        },
      },
    });
  }, [verifyEmailMutation]);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Nuber Eats</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};

export default ConfirmEmail;
