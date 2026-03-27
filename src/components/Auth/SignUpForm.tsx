import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import signUpPhoto from '@/assets/images/placeholderSignUp-img.png';
import { ROUTES } from '@/constants';
import { signUpSchema, type SignUpFormValues } from '@/schemas/authSchema';

const SignUpForm = () => {
  // react hook form manage states & form's event
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  // TODO: implement logic in next stage
  const onSubmit = () => {};

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

            <h1 className="text-primary text-2xl font-medium">Create your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your info below to create your account
            </p>
          </div>

          {/* Role selector */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">I am a…</span>
            <div className="flex gap-6">
              <label
                htmlFor="role-hirer"
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input id="role-hirer" type="radio" value="hirer" {...register('role')} />
                Hirer
              </label>

              <label
                htmlFor="role-vendor"
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input id="role-vendor" type="radio" value="vendor" {...register('role')} />
                Vendor
              </label>
            </div>

            {errors.role && <p className="text-destructive text-sm">{errors.role.message}</p>}
          </div>

          {/*  First Name + Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-semibold">
                First Name
              </label>

              <input
                id="firstName"
                type="text"
                className="focus:border-secondary border-muted-foreground/30 w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
                {...register('firstName')}
              />

              {errors.firstName && (
                <p className="text-destructive text-sm">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-semibold">
                Last Name
              </label>

              <input
                id="lastName"
                type="text"
                className="focus:border-secondary border-muted-foreground/30 w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
                {...register('lastName')}
              />

              {errors.lastName && (
                <p className="text-destructive text-sm">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-3">
            <label htmlFor="username" className="block text-sm font-semibold">
              Username
            </label>

            <input
              id="username"
              type="text"
              className="focus:border-secondary border-muted-foreground/30 w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
              {...register('username')}
            />

            {errors.username && (
              <p className="text-destructive text-sm">{errors.username.message}</p>
            )}
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
            Create Account
          </button>
        </div>

        {/* Sign in link */}
        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Log In
          </Link>
        </div>
      </form>

      {/*  Right: Photo panel */}
      <div className="relative hidden md:block">
        <img
          src={signUpPhoto}
          alt="Venue Vendors – find your perfect event space"
          className="absolute top-1/2 -translate-y-1/2 object-cover"
        />
        {/* Purple tint overlay */}
        <div className="absolute inset-0 bg-purple-400/10" />
      </div>
    </>
  );
};
export default SignUpForm;
