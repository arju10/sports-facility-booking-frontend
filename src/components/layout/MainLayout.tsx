import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/components/ScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showFooter = true }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
