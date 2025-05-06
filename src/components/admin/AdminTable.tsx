
import React, { useState } from 'react';
import { FormData } from '@/utils/formUtils';
import { Eye, Trash2 } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import DetailedView from './DetailedView';
import { useAuth } from '@/context/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminTableProps {
  displayedSubmissions: FormData[];
  filteredSubmissions: FormData[];
  currentPage: number;
  entriesPerPage: number;
  sortDirection: 'asc' | 'desc';
  toggleSortDirection: () => void;
  refreshSubmissions: () => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  displayedSubmissions,
  filteredSubmissions,
  currentPage,
  entriesPerPage,
  sortDirection,
  toggleSortDirection,
  refreshSubmissions
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const { deleteSubmission } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const toggleExpandRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const success = await deleteSubmission(id);
    if (success) {
      refreshSubmissions();
    }
    setDeleting(false);
  };

  return (
    <div>
      {filteredSubmissions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Brak wyników dla podanego wyszukiwania.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-14">#</TableHead>
                <TableHead className="w-40">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={toggleSortDirection}>
                    Data 
                    <span className="text-xs">
                      {sortDirection === 'desc' ? '▼' : '▲'}
                    </span>
                  </div>
                </TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Osoba kontaktowa</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Lokalizacja</TableHead>
                <TableHead>Asortyment</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedSubmissions.map((submission, index) => {
                const submissionId = `submission-${index}`;
                const isExpanded = expandedRows[submissionId] || false;
                const startIndex = (currentPage - 1) * entriesPerPage;
                
                return (
                  <React.Fragment key={submissionId}>
                    <TableRow className={isExpanded ? 'border-b-0 border-t' : ''}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>
                        <div className="text-sm">{submission.submissionDateTime || 'Brak daty'}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{submission.companyName}</div>
                        <div className="text-xs text-gray-500">NIP: {submission.nip}</div>
                      </TableCell>
                      <TableCell>
                        <div>{submission.firstName} {submission.lastName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-[200px]">{submission.email}</div>
                        <div className="text-xs text-gray-500">{submission.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-[120px]">{submission.category}</div>
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-[120px]">{submission.location1}</div>
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-[200px]">{submission.products}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => toggleExpandRow(submissionId)}
                            className="bg-baltic-blue text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-baltic-orange transition-colors"
                            aria-label="Szczegóły"
                          >
                            <Eye size={14} />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                aria-label="Usuń"
                                disabled={deleting}
                              >
                                <Trash2 size={14} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Potwierdzenie usunięcia</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Czy na pewno chcesz usunąć to zgłoszenie? Tej operacji nie można cofnąć.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(submission.id)}
                                  className="bg-red-500 hover:bg-red-600">
                                  Usuń
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={9} className="p-0 border-t-0">
                          <DetailedView submission={submission} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
