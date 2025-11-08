import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
