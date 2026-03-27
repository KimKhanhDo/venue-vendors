import SignUpForm from '@/components/Auth/SignUpForm';

function SignUpPage() {
  return (
    <>
      {/* Card */}
      <div className="shadow-soft border-border grid w-full max-w-5xl overflow-hidden rounded-3xl border bg-white/80 backdrop-blur-md md:grid-cols-2">
        <SignUpForm />
      </div>
    </>
  );
}

export default SignUpPage;
