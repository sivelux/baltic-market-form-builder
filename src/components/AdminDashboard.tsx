
import React, { useState, useEffect } from 'react';
import { FormData, getSubmissions } from '@/utils/formUtils';
import AdminHeader from './admin/AdminHeader';
import AdminSearchBar from './admin/AdminSearchBar';
import AdminTable from './admin/AdminTable';
import AdminPagination from './admin/AdminPagination';
import ChangePasswordForm from './admin/ChangePasswordForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Lock } from 'lucide-react';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormData[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedSubmissions, setDisplayedSubmissions] = useState<FormData[]>([]);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <AdminHeader title="Panel Administratora - Zgłoszenia" />
        
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="ml-0 md:ml-4 mt-4 md:mt-0 bg-baltic-blue text-white hover:bg-baltic-blue/80"
            >
              <Lock className="mr-2 h-4 w-4" /> Zmień hasło
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <ChangePasswordForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <AdminSearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        submissions={submissions}
      />
      
      <div className="my-6">
        <AdminTable 
          displayedSubmissions={displayedSubmissions}
          filteredSubmissions={filteredSubmissions}
          currentPage={currentPage}
          entriesPerPage={entriesPerPage}
          sortDirection={sortDirection}
          toggleSortDirection={toggleSortDirection}
        />
      </div>
      
      <AdminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        entriesPerPage={entriesPerPage}
        setCurrentPage={setCurrentPage}
        setEntriesPerPage={setEntriesPerPage}
        submissions={submissions.length}
      />
    </div>
  );
};

export default AdminDashboard;
