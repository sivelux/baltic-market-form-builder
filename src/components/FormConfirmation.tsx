import React from 'react';
import { FormData } from '@/utils/formUtils';
import { Button } from '@/components/ui/button';
import { PrinterIcon, CheckCircle2 } from 'lucide-react';

interface FormConfirmationProps {
  formData: FormData;
  onReturn: () => void;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({ formData, onReturn }) => {
  // Helper function to format boolean values
  const formatBooleanValue = (value: boolean): string => value ? 'Tak' : 'Nie';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto print:max-w-full">
      <div className="flex flex-col items-center justify-center space-y-4 print:mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center print:hidden">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-baltic-blue print:text-black">
          Dziękujemy za zgłoszenie!
        </h1>
        <p className="text-center text-gray-600 max-w-lg print:text-black">
          Twoje zgłoszenie zostało zapisane. Prosimy zachować podsumowanie zgłoszenia.
          Skontaktujemy się z Państwem w sprawie dalszych kroków.
        </p>
        <div className="flex space-x-4 print:hidden mt-4">
          <Button onClick={onReturn} variant="outline">
            Powrót do formularza
          </Button>
          <Button onClick={handlePrint} className="bg-baltic-blue hover:bg-baltic-orange text-white flex items-center gap-2">
            <PrinterIcon className="w-4 h-4" />
            Drukuj potwierdzenie
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 print:shadow-none print:p-0">
        <h2 className="text-xl font-semibold mb-4 text-baltic-blue print:text-black">
          Podsumowanie zgłoszenia
        </h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="font-medium text-lg mb-3 text-baltic-blue print:text-black border-b pb-1">Dane zgłaszającego</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Pełna nazwa firmy:</p>
                <p className="font-medium">{formData.companyName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Imię i nazwisko zgłaszającego:</p>
                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">NIP:</p>
                <p className="font-medium">{formData.nip}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Adres:</p>
                <p className="font-medium">{formData.street}, {formData.postalCode} {formData.city}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email:</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Telefon:</p>
                <p className="font-medium">{formData.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Uczestniczył/a w poprzedniej edycji Jarmarku:</p>
                <p className="font-medium">{formData.participatedLastYear}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-medium text-lg mb-3 text-baltic-blue print:text-black border-b pb-1">Informacje techniczne</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Kategoria wystawcy:</p>
                <p className="font-medium">{formData.category}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Rodzaj stoiska:</p>
                <p className="font-medium">{formData.boothType}</p>
              </div>
              {formData.boothDimensions && (
                <div>
                  <p className="text-gray-500 text-sm">Dokładne wymiary namiotu/food trucka:</p>
                  <p className="font-medium">{formData.boothDimensions}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-sm">Podłączenie do prądu:</p>
                <p className="font-medium">{formData.powerConnection}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-500 text-sm">Asortyment sprzedaży:</p>
                <p className="font-medium">{formData.products}</p>
              </div>
              {formData.notes && (
                <div className="md:col-span-2">
                  <p className="text-gray-500 text-sm">Uwagi:</p>
                  <p className="font-medium">{formData.notes}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-sm">Potrzebne miejsce parkingowe:</p>
                <p className="font-medium">{formData.needsParking}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-medium text-lg mb-3 text-baltic-blue print:text-black border-b pb-1">Preferencje lokalizacji</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Pierwszy wybór lokalizacji:</p>
                <p className="font-medium">{formData.location1}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Drugi wybór lokalizacji:</p>
                <p className="font-medium">{formData.location2}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Trzeci wybór lokalizacji:</p>
                <p className="font-medium">{formData.location3}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-medium text-lg mb-3 text-baltic-blue print:text-black border-b pb-1">Akceptacje</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Akceptacja regulaminu:</p>
                <p className="font-medium">{formatBooleanValue(formData.acceptTerms)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Zgoda na przetwarzanie danych:</p>
                <p className="font-medium">{formatBooleanValue(formData.acceptPrivacy)}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 print:mt-8">
        <p>Nr zgłoszenia: {new Date().getTime().toString(36).toUpperCase()}</p>
        <p className="mt-1">
          Data zgłoszenia: {new Date().toLocaleString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit', 
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default FormConfirmation;
