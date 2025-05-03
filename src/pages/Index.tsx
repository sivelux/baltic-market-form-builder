
import React from 'react';
import FormHeader from '@/components/FormHeader';
import MarketForm from '@/components/MarketForm';
import FormFooter from '@/components/FormFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-baltic-beige">
      <div className="container py-8">
        <FormHeader />
        <MarketForm mapPdfUrl="/mapa-jarmark-baltycki.pdf" />
        <FormFooter />
      </div>
    </div>
  );
};

export default Index;
