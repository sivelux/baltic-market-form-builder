
import React from 'react';
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
import { ArrowUpDown } from 'lucide-react';
import { FormData } from '@/utils/formUtils';
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
  return (
    <div className="rounded-md border">
      {filteredSubmissions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Brak wyników dla podanego wyszukiwania.
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
                <TableHead className="w-36 min-w-[140px]">Asortyment</TableHead>
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
                    <TableCell className="max-w-36" title={submission.products}>
                      <div className="line-clamp-2 break-words">{submission.products}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${index}`} className="border-none">
                          <AccordionTrigger className="py-0 hover:no-underline">
                            <span className="text-sm text-baltic-blue hover:text-baltic-orange">Rozwiń</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <tr className="border-0">
                              <td colSpan={9} className="p-0">
                                <div className="w-full mt-2">
                                  <DetailedView submission={submission} />
                                </div>
                              </td>
                            </tr>
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
  );
};

export default AdminTable;
