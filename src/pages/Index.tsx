
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LatestUpdates from '@/components/LatestUpdates';
import MandateMetrics from '@/components/MandateMetrics';
import WomenAdvocacy from '@/components/WomenAdvocacy';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <LatestUpdates />
      <MandateMetrics />
      <WomenAdvocacy />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
