
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FormData, getSubmissions, generateCSV, downloadCSV, generateExcel, downloadExcel } from '@/utils/formUtils';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileSpreadsheet, FileText } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const submissions = getSubmissions();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const filteredSubmissions = submissions.filter(submission => 
    submission.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="min-h-screen bg-baltic-beige">
      <div className="container py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-baltic-blue">Panel administracyjny - Jarmark Bałtycki 2025</h1>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleExportCSV}>
                <FileSpreadsheet className="mr-2" />
                Eksportuj do CSV
              </Button>
              <Button variant="outline" onClick={handleExportExcel}>
                <FileText className="mr-2" />
                Eksportuj do Excel
              </Button>
              <Button variant="destructive" onClick={logout}>
                Wyloguj
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <Input
              placeholder="Szukaj po nazwie firmy lub kategorii..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Firma</TableHead>
                  <TableHead>Osoba kontaktowa</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Kategoria</TableHead>
                  <TableHead>Rodzaj stoiska</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission, index) => (
                    <TableRow key={index}>
                      <TableCell>{submission.companyName}</TableCell>
                      <TableCell>{submission.contactPerson}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.phone}</TableCell>
                      <TableCell>{submission.category}</TableCell>
                      <TableCell>{submission.boothType}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      {submissions.length === 0
                        ? "Brak zgłoszeń w systemie. Kiedy formularz zostanie wypełniony, zgłoszenia pojawią się tutaj."
                        : "Brak wyników wyszukiwania."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
