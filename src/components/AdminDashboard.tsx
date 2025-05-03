
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FormData, getSubmissions, generateCSV, downloadCSV } from '@/utils/formUtils';

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

  return (
    <div className="min-h-screen bg-baltic-beige">
      <div className="container py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-baltic-blue">Panel administracyjny - Jarmark Bałtycki 2025</h1>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleExportCSV}>
                Eksportuj do CSV
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-baltic-blue text-white">
                  <th className="p-2 border text-left">Firma</th>
                  <th className="p-2 border text-left">Osoba kontaktowa</th>
                  <th className="p-2 border text-left">Email</th>
                  <th className="p-2 border text-left">Telefon</th>
                  <th className="p-2 border text-left">Kategoria</th>
                  <th className="p-2 border text-left">Rodzaj stoiska</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-2 border">{submission.companyName}</td>
                      <td className="p-2 border">{submission.contactPerson}</td>
                      <td className="p-2 border">{submission.email}</td>
                      <td className="p-2 border">{submission.phone}</td>
                      <td className="p-2 border">{submission.category}</td>
                      <td className="p-2 border">{submission.boothType}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">
                      {submissions.length === 0
                        ? "Brak zgłoszeń w systemie. Kiedy formularz zostanie wypełniony, zgłoszenia pojawią się tutaj."
                        : "Brak wyników wyszukiwania."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
