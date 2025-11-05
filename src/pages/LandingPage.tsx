import Header from '../components/Header';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import Differentials from '../components/Differentials';
import Demo from '../components/Demo';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Upload from '../components/Upload';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Differentials />
      <Demo />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Upload />
      <Footer />
    </div>
  );
}
