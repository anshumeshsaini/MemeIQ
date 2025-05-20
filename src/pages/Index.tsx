
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TrendingMemes from '@/components/TrendingMemes';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <TrendingMemes />
      <Footer />
    </div>
  );
};

export default Index;
