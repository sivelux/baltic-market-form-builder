
import React, { useState, useEffect } from 'react';
import { FormData, getSubmissions } from '@/utils/formUtils';
import AdminHeader from './admin/AdminHeader';
import AdminSearchBar from './admin/AdminSearchBar';
import AdminTable from './admin/AdminTable';
import AdminPagination from './admin/AdminPagination';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormData[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedSubmissions, setDisplayedSubmissions] = useState<FormData[]>([]);
  
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
      <AdminHeader title="Panel Administratora - Zgłoszenia" />
      
      <AdminSearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        submissions={submissions}
      />
      
      <AdminTable 
        displayedSubmissions={displayedSubmissions}
        filteredSubmissions={filteredSubmissions}
        currentPage={currentPage}
        entriesPerPage={entriesPerPage}
        sortDirection={sortDirection}
        toggleSortDirection={toggleSortDirection}
      />
      
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
