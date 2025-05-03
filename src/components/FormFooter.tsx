
import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const FormFooter: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-8 bg-baltic-blue text-white rounded-b-lg">
      <div className="container">
        <div className="mb-4">
          <h3 className="font-bold text-lg">Informacje organizacyjne</h3>
          <p>Termin wydarzenia: 31 lipca – 3 sierpnia 2025 r.</p>
          <p>Godziny otwarcia:</p>
          <ul className="ml-4 list-disc">
            <li>czwartek: 15:00–20:00</li>
            <li>piątek i sobota: 10:00–21:00</li>
            <li>niedziela: 10:00–19:00</li>
          </ul>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-3 border-t border-white/20">
          <div>
            <p>Montaż stoisk: 31.07.2025 r., do godz. 11:00</p>
            <p>Demontaż stoisk: 03.08.2025 r., od godz. 16:00</p>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
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
