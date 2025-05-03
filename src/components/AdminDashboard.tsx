
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FormData, getSubmissions, generateCSV, downloadCSV, generateExcel, downloadExcel } from '@/utils/formUtils';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileSpreadsheet, FileText, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const submissions = getSubmissions();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const filteredSubmissions = submissions.filter(submission => 
    submission.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const csv = generateCSV(submissions);
    const filename = `jarmark-baltycki-zgloszenia-${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csv, filename);
  };
  
  const handleExportExcel = () => {
    const excel = generateExcel(submissions);
    const filename = `jarmark-baltycki-zgloszenia-${new Date().toISOString().split('T')[0]}.xls`;
    downloadExcel(excel, filename);
  };

  const toggleExpandRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  // Format checkbox and radio values for display
  const formatValue = (value: any): string => {
    if (typeof value === 'boolean') {
      return value ? 'TAK' : 'NIE';
    }
    return value?.toString() || '';
  };

  return (
    <div className="min-h-screen bg-baltic-beige">
      <div className="container py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-baltic-blue">Panel administracyjny - Jarmark Bałtycki 2025</h1>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleExportCSV}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Eksportuj do CSV
              </Button>
              <Button variant="outline" onClick={handleExportExcel}>
                <FileText className="mr-2 h-4 w-4" />
                Eksportuj do Excel
              </Button>
              <Button variant="destructive" onClick={logout}>
                Wyloguj
              </Button>
            </div>
          </div>
          
          <div className="mb-4 relative">
            <div className="flex items-center border rounded-md px-3 focus-within:ring-2 focus-within:ring-baltic-blue">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Szukaj po nazwie firmy, kategorii lub osobie kontaktowej..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          
          {submissions.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Brak zgłoszeń w systemie. Kiedy formularz zostanie wypełniony, zgłoszenia pojawią się tutaj.</p>
            </div>
          ) : (
            <div className="overflow-hidden border rounded-lg">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-baltic-blue/10">
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Firma</TableHead>
                      <TableHead>Osoba kontaktowa</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Kategoria</TableHead>
                      <TableHead>Data zgłoszenia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((submission, index) => (
                        <React.Fragment key={index}>
                          <TableRow 
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleExpandRow(index)}
                          >
                            <TableCell>
                              {expandedRow === index ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </TableCell>
                            <TableCell className="font-medium">{submission.companyName}</TableCell>
                            <TableCell>{submission.contactPerson}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.phone}</TableCell>
                            <TableCell>{submission.category}</TableCell>
                            <TableCell>{new Date().toLocaleDateString('pl-PL')}</TableCell>
                          </TableRow>

                          {expandedRow === index && (
                            <TableRow>
                              <TableCell colSpan={7} className="p-0">
                                <div className="bg-gray-50 p-4 border-t">
                                  <h3 className="font-bold text-baltic-blue mb-4">Szczegóły zgłoszenia</h3>
                                  <ScrollArea className="h-[400px]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Pełna nazwa firmy:</p>
                                        <p>{submission.companyName}</p>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Imię i nazwisko:</p>
                                        <p>{submission.contactPerson}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Adres:</p>
                                        <p>{submission.address}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">NIP:</p>
                                        <p>{submission.nip}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Email:</p>
                                        <p>{submission.email}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Telefon:</p>
                                        <p>{submission.phone}</p>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Udział w 2024:</p>
                                        <p>{submission.participatedLastYear}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Kategoria wystawcy:</p>
                                        <p>{submission.category}</p>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Rodzaj stoiska:</p>
                                        <p>{submission.boothType}</p>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Wymiary stoiska:</p>
                                        <p>{submission.boothDimensions || '-'}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Zapotrzebowanie na prąd:</p>
                                        <p>{submission.powerConnection}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Parking:</p>
                                        <p>{submission.needsParking}</p>
                                      </div>

                                      <div className="space-y-1 md:col-span-2">
                                        <p className="font-medium text-gray-600">Asortyment sprzedaży:</p>
                                        <p className="whitespace-pre-wrap">{submission.products}</p>
                                      </div>

                                      <div className="space-y-1 md:col-span-2">
                                        <p className="font-medium text-gray-600">Uwagi:</p>
                                        <p className="whitespace-pre-wrap">{submission.notes || '-'}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Lokalizacja 1:</p>
                                        <p>{submission.location1}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Lokalizacja 2:</p>
                                        <p>{submission.location2 || '-'}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Lokalizacja 3:</p>
                                        <p>{submission.location3 || '-'}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Zgoda na regulamin:</p>
                                        <p>{formatValue(submission.acceptTerms)}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <p className="font-medium text-gray-600">Zgoda na dane osobowe:</p>
                                        <p>{formatValue(submission.acceptPrivacy)}</p>
                                      </div>
                                    </div>
                                  </ScrollArea>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Brak wyników wyszukiwania.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
