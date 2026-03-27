import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import logInPhoto from '@/assets/images/placeholderLogIn-img.png';
import { ROUTES } from '@/constants';
import { logInSchema, type LogInFormValues } from '@/schemas/authSchema';
import { useAuth } from '@/contexts/AuthContext';

// zod handles checking input data

const LogInForm = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  // react hook form manage states & form's event
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormValues>({
    resolver: zodResolver(logInSchema),
  });

  // For testing data: email: 'hirer@test.com', password: 'Password123!'
  const onSubmit = (data: LogInFormValues) => {
    try {
      logIn(data);
      toast.success('Login successful!');
      navigate(ROUTES.HOME);
    } catch (error) {
      console.log(error);
      toast.error('Login failed');
    }
  };

  return (
    <>
      {/* Left: Form panel */}
      <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Link to={ROUTES.HOME} className="mx-auto block w-fit text-center">
              <img src="/logo.svg" alt="logo" />
            </Link>

            <h1 className="text-primary text-2xl font-medium">Welcome Back</h1>
            <p className="text-muted-foreground text-sm text-balance">Log in to your account</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>

            <input
              id="email"
              type="email"
              className="focus:border-secondary border-muted-foreground/30 w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
              {...register('email')}
            />

            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="focus:border-secondary border-muted-foreground/30 w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
              {...register('password')}
            />

            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-secondary shadow-soft w-full cursor-pointer rounded-2xl py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            disabled={isSubmitting}
          >
            Log In
          </button>
        </div>

        {/* Sign in link */}
        <div className="text-muted-foreground text-center text-sm">
          Don't have an account?{' '}
          <Link
            to={ROUTES.SIGNUP}
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Sign up here
          </Link>
        </div>
      </form>

      {/*  Right: Photo panel */}
      <div className="relative hidden md:block">
        <img
          src={logInPhoto}
          alt="Venue Vendors – find your perfect event space"
          className="absolute top-1/2 -translate-y-1/2 object-cover"
        />
        {/* Purple tint overlay */}
        <div className="absolute inset-0 bg-purple-400/10" />
      </div>
    </>
  );
};
export default LogInForm;
