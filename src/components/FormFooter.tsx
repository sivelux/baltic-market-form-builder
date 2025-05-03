
import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const FormFooter: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-8 bg-baltic-blue text-white rounded-b-lg">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-center pt-3">
          <div className="flex items-center gap-2">
            <p className="text-sm">&copy; Jarmark Bałtycki 2025</p>
            <Link to="/admin" className="text-white hover:text-baltic-orange transition-colors p-1">
              <LogIn size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FormFooter;
