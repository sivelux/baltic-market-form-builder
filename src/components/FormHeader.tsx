
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const FormHeader: React.FC = () => {
  return (
    <div className="w-full bg-baltic-blue py-4 mb-6 rounded-t-lg">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl text-white font-bold">
          Formularz zgłoszeniowy – Jarmark Bałtycki 2025
        </h1>
        <Link 
          to="/admin" 
          className="text-white hover:text-baltic-orange transition-colors"
          aria-label="Panel administracyjny"
        >
          <Lock size={24} />
        </Link>
      </div>
    </div>
  );
};

export default FormHeader;
