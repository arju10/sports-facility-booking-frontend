import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedFacilities from '@/components/home/FeaturedFacilities';
import HowItWorks from '@/components/home/HowItWorks';
import StatsSection from '@/components/home/StatsSection';
import Testimonials from '@/components/home/Testimonials';

const Index: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedFacilities />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
    </MainLayout>
  );
};

export default Index;
