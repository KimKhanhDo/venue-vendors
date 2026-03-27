import LogInForm from '@/components/Auth/LogInForm';

const LogInPage = () => {
  return (
    <>
      {/* Card */}
      <div className="shadow-soft border-border grid w-full max-w-4xl overflow-hidden rounded-3xl border bg-white/80 backdrop-blur-md md:grid-cols-2">
        <LogInForm />
      </div>
    </>
  );
};

export default LogInPage;
