
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Search, Download, FileDown, ArrowUpDown, DoorOpen } from 'lucide-react';
import { FormData, getSubmissions, generateCSV, generateExcel, downloadCSV, downloadExcel, generateEnhancedExcel, formFieldLabels } from '@/utils/formUtils';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormData[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedSubmissions, setDisplayedSubmissions] = useState<FormData[]>([]);
  const { logout } = useAuth();
  
  // Fetch the submissions when component mounts
  useEffect(() => {
    let data = getSubmissions();
    // Sort by submission date initially (newest first)
    data = sortSubmissionsByDate(data, 'desc');
    setSubmissions(data);
    setFilteredSubmissions(data);
  }, []);

  // Sort submissions by date
  const sortSubmissionsByDate = (data: FormData[], direction: 'asc' | 'desc') => {
    return [...data].sort((a, b) => {
      const dateA = a.submissionDateTime ? new Date(a.submissionDateTime).getTime() : 0;
      const dateB = b.submissionDateTime ? new Date(b.submissionDateTime).getTime() : 0;
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  // Handle sorting toggle
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    const sorted = sortSubmissionsByDate(filteredSubmissions, newDirection);
    setFilteredSubmissions(sorted);
  };

  // Filter submissions based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSubmissions(submissions);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = submissions.filter((submission) => {
        return (
          submission.companyName.toLowerCase().includes(term) ||
          submission.firstName.toLowerCase().includes(term) ||
          submission.lastName.toLowerCase().includes(term) ||
          submission.email.toLowerCase().includes(term) ||
          submission.nip.includes(term) ||
          submission.products.toLowerCase().includes(term)
        );
      });

      setFilteredSubmissions(filtered);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm, submissions]);

  // Paginate submissions
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredSubmissions.length / entriesPerPage)));
    
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    setDisplayedSubmissions(filteredSubmissions.slice(startIndex, endIndex));
  }, [filteredSubmissions, currentPage, entriesPerPage]);

  // Change page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Format boolean or string values for display
  const formatValue = (value: any): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'boolean') return value ? 'TAK' : 'NIE';
    return value.toString();
  };

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

  // Handle downloading data as Excel with improved formatting
  const handleDownloadExcel = () => {
    try {
      // Use enhanced Excel with proper UTF-8 encoding and formatting
      const excelData = generateEnhancedExcel(submissions);
      downloadExcel(
        excelData, 
        `jarmark_baltycki_zgloszenia_${new Date().toLocaleDateString('pl-PL')}.xlsx`,
        true
      );
      toast.success('Plik Excel został wygenerowany pomyślnie.');
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.error('Wystąpił błąd podczas generowania pliku Excel.');
    }
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            isActive={currentPage === 1} 
            onClick={() => goToPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Calculate range of pages to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start or end
      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2);
      }

      // Show ellipsis if needed before middle pages
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed after middle pages
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-baltic-blue">Panel Administratora - Zgłoszenia</h1>
        <Button 
          onClick={logout}
          variant="outline" 
          className="bg-white hover:bg-gray-100 text-baltic-blue border-baltic-blue hover:text-baltic-orange flex items-center gap-2"
        >
          <DoorOpen className="h-4 w-4" />
          Wyloguj się
        </Button>
      </div>

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
                  <TableHead 
                    className="w-32 cursor-pointer"
                    onClick={toggleSortDirection}
                  >
                    <div className="flex items-center">
                      Data zgłoszenia
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-36 min-w-[140px]">Firma</TableHead>
                  <TableHead className="w-40 min-w-[160px]">Osoba kontaktowa</TableHead>
                  <TableHead className="w-36 min-w-[140px]">Email / Telefon</TableHead>
                  <TableHead className="w-36 min-w-[140px]">Kategoria</TableHead>
                  <TableHead className="w-36 min-w-[140px]">Lokalizacja</TableHead>
                  <TableHead className="w-16 text-center">Szczegóły</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedSubmissions.map((submission, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell className="font-medium">{(currentPage - 1) * entriesPerPage + index + 1}</TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        {submission.submissionDateTime || 'Brak daty'}
                      </TableCell>
                      <TableCell className="font-semibold">
                        <div className="break-words">{submission.companyName}</div>
                        <div className="text-xs text-gray-500">{submission.nip}</div>
                      </TableCell>
                      <TableCell>
                        <div className="break-words">{submission.firstName} {submission.lastName}</div>
                        <div className="text-xs break-words">
                          {submission.street}, {submission.postalCode} {submission.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="break-words">{submission.email}</div>
                        <div className="text-xs">{submission.phone}</div>
                      </TableCell>
                      <TableCell className="max-w-36" title={submission.category}>
                        <div className="line-clamp-2 break-words">{submission.category}</div>
                      </TableCell>
                      <TableCell className="max-w-36" title={submission.location1}>
                        <div className="line-clamp-2 break-words">{submission.location1}</div>
                      </TableCell>
                      <TableCell className="text-center">
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
                                  
                                  // Make all text fields potentially scrollable
                                  const isLongText = typeof formattedValue === 'string' && formattedValue.length > 50;
                                  
                                  return (
                                    <div key={key} className="mb-2">
                                      <div className="font-semibold text-baltic-blue mb-1">{label}:</div>
                                      {isLongText ? (
                                        <div className="max-h-32 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50 whitespace-pre-wrap break-words">
                                          {formattedValue}
                                        </div>
                                      ) : (
                                        <div className="break-words">{formattedValue}</div>
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

      {/* Pagination controls and entry display selector */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Pokaż</span>
          <Select
            value={entriesPerPage.toString()}
            onValueChange={(value) => {
              setEntriesPerPage(Number(value));
              setCurrentPage(1); // Reset to first page when changing entries per page
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="25" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">pozycji na stronę</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => goToPage(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => goToPage(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Łącznie zgłoszeń: {submissions.length}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
