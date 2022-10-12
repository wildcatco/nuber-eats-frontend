import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form
          className="grid gap-3 mt-5 px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            required
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be more than 8 characters',
              },
            })}
            type="password"
            placeholder="Password"
            required
            className="input "
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
