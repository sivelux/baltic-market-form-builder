
import React, { useState } from 'react';
import { FormData } from '@/utils/formUtils';
import { Info } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import './SubmissionCard.css';

interface AdminTableProps {
  displayedSubmissions: FormData[];
  filteredSubmissions: FormData[];
  currentPage: number;
  entriesPerPage: number;
  sortDirection: 'asc' | 'desc';
  toggleSortDirection: () => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  displayedSubmissions,
  filteredSubmissions,
  currentPage,
  entriesPerPage,
  sortDirection,
  toggleSortDirection
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCardFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      {filteredSubmissions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Brak wyników dla podanego wyszukiwania.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {displayedSubmissions.map((submission, index) => {
            const submissionId = `submission-${index}`;
            const isFlipped = flippedCards[submissionId] || false;
            
            return (
              <div 
                key={submissionId} 
                className={`submission-card-container ${isFlipped ? 'flipped' : ''}`}
              >
                {/* Front of Card */}
                <Card className={`submission-card submission-card-front shadow-md h-full`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-lg text-baltic-blue">
                        {submission.companyName}
                      </div>
                      <button
                        onClick={() => toggleCardFlip(submissionId)}
                        className="bg-baltic-blue text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-baltic-orange transition-colors"
                        aria-label="Więcej informacji"
                      >
                        <Info size={14} />
                      </button>
                    </div>

                    <div className="text-xs text-gray-500 mb-3">
                      {submission.submissionDateTime || 'Brak daty'}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-500">Osoba kontaktowa</div>
                        <div className="text-sm">{submission.firstName} {submission.lastName}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-semibold text-gray-500">Kontakt</div>
                        <div className="text-sm">{submission.email}</div>
                        <div className="text-sm">{submission.phone}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-semibold text-gray-500">Kategoria</div>
                        <div className="text-sm line-clamp-1">{submission.category}</div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-500">Lokalizacja</div>
                        <div className="text-sm line-clamp-1">{submission.location1}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-semibold text-gray-500">Asortyment</div>
                        <div className="text-sm line-clamp-2">{submission.products}</div>
                      </div>
                    </div>

                    <div className="mt-3 text-center text-xs text-gray-500">
                      Kliknij ikonę informacji, aby zobaczyć więcej szczegółów
                    </div>
                  </CardContent>
                </Card>

                {/* Back of Card */}
                <Card className={`submission-card submission-card-back shadow-md h-full`}>
                  <CardContent className="p-6 overflow-auto">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-lg text-baltic-blue">
                        Szczegóły zgłoszenia
                      </div>
                      <button
                        onClick={() => toggleCardFlip(submissionId)}
                        className="bg-baltic-orange text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-baltic-blue transition-colors"
                        aria-label="Powrót"
                      >
                        <Info size={14} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-500">NIP</div>
                        <div className="text-sm">{submission.nip}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-semibold text-gray-500">Adres</div>
                        <div className="text-sm">{submission.street}</div>
                        <div className="text-sm">{submission.postalCode} {submission.city}</div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-500">Lokalizacje alternatywne</div>
                        {submission.location2 && <div className="text-sm">{submission.location2}</div>}
                        {submission.location3 && <div className="text-sm">{submission.location3}</div>}
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-500">Pełny asortyment</div>
                        <div className="text-sm max-h-24 overflow-y-auto border border-gray-100 rounded p-2 bg-white whitespace-pre-wrap break-words">
                          {submission.products}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-semibold text-gray-500">Dodatkowe informacje</div>
                        {submission.comments && (
                          <div className="text-sm max-h-24 overflow-y-auto border border-gray-100 rounded p-2 bg-white whitespace-pre-wrap break-words">
                            {submission.comments}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminTable;
