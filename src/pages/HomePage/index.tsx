import HeroSection from './components/HeroSection';
import HowItWoksSection from './components/HowItWoksSection';
import BlogSection from './components/BlogSection';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works & Blog Section */}
      <div className="border-secondary/15 bg-gradient-pastel -mt-1.5 border-t-2">
        <HowItWoksSection />

        <div id="blogs">
          <BlogSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
