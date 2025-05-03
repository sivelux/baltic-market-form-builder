
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, Download, FileDown } from 'lucide-react';
import { FormData, getSubmissions, generateCSV, generateExcel, downloadCSV, downloadExcel, generateEnhancedExcel, formFieldLabels } from '@/utils/formUtils';
import { toast } from '@/components/ui/sonner';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormData[]>([]);

  // Fetch the submissions when component mounts
  useEffect(() => {
    const data = getSubmissions();
    setSubmissions(data);
    setFilteredSubmissions(data);
  }, []);

  // Filter submissions based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSubmissions(submissions);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = submissions.filter((submission) => {
      return (
        submission.companyName.toLowerCase().includes(term) ||
        submission.contactPerson.toLowerCase().includes(term) ||
        submission.email.toLowerCase().includes(term) ||
        submission.nip.includes(term) ||
        submission.products.toLowerCase().includes(term)
      );
    });

    setFilteredSubmissions(filtered);
  }, [searchTerm, submissions]);

  // Format boolean or string values for display
  const formatValue = (value: any): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'boolean') return value ? 'TAK' : 'NIE';
    return value.toString();
  };

  // Handle downloading data as CSV
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

  // Handle downloading data as Excel
  const handleDownloadExcel = () => {
    try {
      // Use enhanced Excel with two worksheets
      const excelData = generateEnhancedExcel(submissions);
      downloadExcel(
        excelData, 
        `jarmark_baltycki_zgloszenia_${new Date().toLocaleDateString('pl-PL')}.xls`,
        true
      );
      toast.success('Plik Excel został wygenerowany pomyślnie.');
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.error('Wystąpił błąd podczas generowania pliku Excel.');
    }
  };

  // Get the column headers from the formFieldLabels
  const columnHeaders = Object.values(formFieldLabels);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-baltic-blue">Panel Administratora - Zgłoszenia</h1>

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
          <Button
            onClick={handleDownloadExcel}
            className="bg-baltic-blue hover:bg-baltic-orange text-white flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" /> Excel
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        {filteredSubmissions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {submissions.length === 0
              ? 'Brak zgłoszeń w bazie danych.'
              : 'Brak wyników dla podanego wyszukiwania.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Lista zgłoszeń: {filteredSubmissions.length}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Firma</TableHead>
                  <TableHead>Osoba kontaktowa</TableHead>
                  <TableHead>Email / Telefon</TableHead>
                  <TableHead>Kategoria</TableHead>
                  <TableHead>Lokalizacja</TableHead>
                  <TableHead className="w-32">Data zgłoszenia</TableHead>
                  <TableHead className="w-16">Szczegóły</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-semibold">
                        {submission.companyName}
                        <div className="text-xs text-gray-500">{submission.nip}</div>
                      </TableCell>
                      <TableCell>
                        {submission.contactPerson}
                        <div className="text-xs">
                          {submission.street}, {submission.postalCode} {submission.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        {submission.email}
                        <div className="text-xs">{submission.phone}</div>
                      </TableCell>
                      <TableCell className="max-w-48 truncate" title={submission.category}>
                        {submission.category}
                      </TableCell>
                      <TableCell className="max-w-48 truncate" title={submission.location1}>
                        {submission.location1}
                      </TableCell>
                      <TableCell className="text-xs">
                        {submission.submissionDateTime || 'Brak daty'}
                      </TableCell>
                      <TableCell>
                        <Accordion type="single" collapsible>
                          <AccordionItem value={`item-${index}`} className="border-none">
                            <AccordionTrigger className="py-0 hover:no-underline">
                              <span className="text-sm text-baltic-blue hover:text-baltic-orange">Rozwiń</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm py-2">
                                {/* Iterate through all fields with their Polish labels */}
                                {Object.entries(formFieldLabels).map(([key, label]) => {
                                  const value = submission[key as keyof FormData];
                                  const formattedValue = formatValue(value);
                                  
                                  // Skip if no value
                                  if (formattedValue === '') return null;
                                  
                                  // Make long text fields scrollable
                                  const isLongText = typeof formattedValue === 'string' && formattedValue.length > 100;
                                  
                                  return (
                                    <div key={key} className="mb-1">
                                      <div className="font-semibold text-baltic-blue">{label}:</div>
                                      {isLongText ? (
                                        <div className="max-h-24 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                                          {formattedValue}
                                        </div>
                                      ) : (
                                        <div>{formattedValue}</div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
