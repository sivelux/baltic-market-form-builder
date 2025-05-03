
import React from 'react';
import { Clock, Wrench, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EventScheduleSection = () => {
  return (
    <Card className="bg-baltic-beige/30 border-baltic-darkbeige mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Clock className="h-5 w-5 text-baltic-blue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg text-baltic-blue">Godziny wydarzenia:</h3>
              <ul className="mt-1 space-y-1">
                <li>Czwartek: 12:00–21:00</li>
                <li>Piątek i sobota: 10:00–21:00</li>
                <li>Niedziela: 10:00–16:00</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Wrench className="h-5 w-5 text-baltic-blue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Montaż stoisk:</h3>
              <p>31.07.2025 r., do godz. 11:00</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Trash2 className="h-5 w-5 text-baltic-blue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Demontaż stoisk:</h3>
              <p>03.08.2025 r., od godz. 16:00</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventScheduleSection;
