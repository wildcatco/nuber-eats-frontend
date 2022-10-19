import { useApolloClient, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { EditProfileMutation } from '../../gql/graphql';
import { EDIT_PROFILE_MUTATION } from '../../query/users';
import { graphql } from './../../gql/gql';
import { useMe } from './../../hooks/useMe';

interface EditProfileInput {
  email?: string;
  password?: string;
}

const EditProfile = () => {
  const client = useApolloClient();
  const { data: userData } = useMe();
  const onCompleted = (data: EditProfileMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (newEmail && prevEmail !== newEmail) {
        client.writeFragment({
          id: `User: ${id}`,
          fragment: graphql(`
            fragment EditedUser on User {
              verified
              email
            }
          `),
          data: {
            ' $fragmentName': 'EditedUserFragment',
            verified: false,
            email: newEmail,
          },
        });
      }
    }
  };
  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    { onCompleted }
  );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<EditProfileInput>({
    defaultValues: {
      email: userData?.me.email,
    },
    mode: 'onChange',
  });

  const onSubmit = () => {
    const { email, password } = getValues();

    editProfileMutation({
      variables: {
        editProfileInput: {
          email,
          ...(password !== '' && { password }),
        },
      },
    });
  };

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 w-full max-w-screen-sm mb-5"
      >
        <input
          {...register('email', {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          type="email"
          placeholder="Email"
        />
        {errors.email?.type === 'pattern' && (
          <FormError errorMessage="Please enter a valid email" />
        )}
        <input
          {...register('password', {
            minLength: {
              value: 8,
              message: 'Password must be more than 8 characters',
            },
          })}
          className="input"
          type="password"
          placeholder="Password"
        />
        {errors.password?.message && (
          <FormError errorMessage={errors.password.message} />
        )}
        <Button
          loading={loading}
          canClick={isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};

export default EditProfile;
