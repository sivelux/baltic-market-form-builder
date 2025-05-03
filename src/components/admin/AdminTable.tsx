
import React from 'react';
import { FormData } from '@/utils/formUtils';
import { Eye } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import DetailedView from './DetailedView';

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
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});

  const toggleExpandRow = (id: string) => {
    setExpandedRows(prev => ({
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableHead className="text-right">Szczegóły</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedSubmissions.map((submission, index) => {
                const submissionId = `submission-${index}`;
                const isExpanded = expandedRows[submissionId] || false;
                const startIndex = (currentPage - 1) * entriesPerPage;
                
                return (
                  <React.Fragment key={submissionId}>
                    <TableRow className={isExpanded ? 'bg-gray-50' : ''}>
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
                        <button
                          onClick={() => toggleExpandRow(submissionId)}
                          className="bg-baltic-blue text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-baltic-orange transition-colors"
                          aria-label="Szczegóły"
                        >
                          <Eye size={14} />
                        </button>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={9} className="p-0 border-t-0">
                          <div className="p-4 bg-gray-50">
                            <DetailedView submission={submission} />
                          </div>
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
