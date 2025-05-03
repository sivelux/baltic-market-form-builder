
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download } from 'lucide-react';
import { FormData, generateCSV, downloadCSV } from '@/utils/formUtils';
import { toast } from '@/components/ui/sonner';

interface AdminSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  submissions: FormData[];
}

const AdminSearchBar: React.FC<AdminSearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  submissions 
}) => {
  // Handle downloading data as CSV with improved encoding
  const handleDownloadCSV = () => {
    try {
      const csv = generateCSV(submissions);
      downloadCSV(csv, `jarmark_baltycki_zgloszenia_${new Date().toLocaleDateString('pl-PL')}.csv`);
      toast.success('Plik CSV został wygenerowany pomyślnie.');
    } catch (error) {
      console.error('Error generating CSV:', error);
      toast.error('Wystąpił błąd podczas generowania pliku CSV.');
    }
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Szukaj zgłoszeń..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleDownloadCSV}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" /> CSV
        </Button>
      </div>
    </div>
  );
};

export default AdminSearchBar;
