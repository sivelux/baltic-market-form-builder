
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormData } from '@/utils/formUtils';
import { Printer } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

interface FormConfirmationProps {
  formData: FormData;
  onReturn: () => void;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({ formData, onReturn }) => {
  const handlePrint = () => {
    window.print();
  };
  
  // Helper function to format radio values
  const formatBoolean = (value: "TAK" | "NIE") => value;
  
  // Helper function to format checkbox values
  const formatCheckbox = (value: boolean) => value ? "TAK" : "NIE";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow print:shadow-none">
      {/* Top confirmation message */}
      <Alert className="mb-6 bg-baltic-blue/10 border-baltic-blue text-baltic-blue font-medium">
        <CheckCircle className="h-5 w-5 mr-2" />
        <AlertDescription className="text-baltic-blue font-semibold">
          Formularz został pomyślnie wysłany. Dziękujemy za zgłoszenie!
        </AlertDescription>
      </Alert>
      
      <h2 className="text-2xl font-bold text-baltic-blue mb-6 text-center">
        Formularz został pomyślnie wypełniony. Oto podsumowanie zgłoszenia:
      </h2>
      
      <div className="space-y-8 print:space-y-6">
        {/* Dane wystawcy */}
        <div>
          <h3 className="text-xl font-semibold text-baltic-blue mb-4">Dane wystawcy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Pełna nazwa firmy:</p>
              <p className="pl-3">{formData.companyName}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Imię i nazwisko osoby zgłaszającej:</p>
              <p className="pl-3">{formData.contactPerson}</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-1">
            <p className="font-medium text-gray-600">Adres:</p>
            <p className="pl-3">{formData.address}</p>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="font-medium text-gray-600">NIP:</p>
              <p className="pl-3">{formData.nip}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Adres e-mail:</p>
              <p className="pl-3">{formData.email}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Numer telefonu:</p>
              <p className="pl-3">{formData.phone}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Czy uczestniczył/a Pan/Pani w Jarmarku Bałtyckim w 2024 roku?</p>
              <p className="pl-3">{formatBoolean(formData.participatedLastYear)}</p>
            </div>
          </div>
        </div>
        
        <Separator className="print:hidden" />
        
        {/* Informacje techniczne */}
        <div>
          <h3 className="text-xl font-semibold text-baltic-blue mb-4">Informacje techniczne</h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Kategoria wystawcy:</p>
              <p className="pl-3">{formData.category}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Rodzaj stoiska:</p>
              <p className="pl-3">{formData.boothType}</p>
            </div>
            
            {formData.boothDimensions && (
              <div className="space-y-1">
                <p className="font-medium text-gray-600">Dokładne wymiary namiotu/food trucka:</p>
                <p className="pl-3">{formData.boothDimensions}</p>
              </div>
            )}
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Podłączenie do prądu:</p>
              <p className="pl-3">{formData.powerConnection}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Asortyment sprzedaży:</p>
              <p className="pl-3">{formData.products}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Uwagi:</p>
              <p className="pl-3">{formData.notes}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Czy potrzebne jest miejsce parkingowe dla auta?</p>
              <p className="pl-3">{formatBoolean(formData.needsParking)}</p>
            </div>
          </div>
        </div>
        
        <Separator className="print:hidden" />
        
        {/* Wybór lokalizacji */}
        <div>
          <h3 className="text-xl font-semibold text-baltic-blue mb-4">Wybór lokalizacji</h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Pierwszy wybór lokalizacji:</p>
              <p className="pl-3">{formData.location1}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Drugi wybór lokalizacji:</p>
              <p className="pl-3">{formData.location2}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Trzeci wybór lokalizacji:</p>
              <p className="pl-3">{formData.location3}</p>
            </div>
          </div>
        </div>
        
        <Separator className="print:hidden" />
        
        {/* Akceptacja warunków */}
        <div>
          <h3 className="text-xl font-semibold text-baltic-blue mb-4">Akceptacja warunków</h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Akceptacja regulaminu Jarmarku Bałtyckiego:</p>
              <p className="pl-3">{formatCheckbox(formData.acceptTerms)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-gray-600">Zgoda na przetwarzanie danych osobowych:</p>
              <p className="pl-3">{formatCheckbox(formData.acceptPrivacy)}</p>
            </div>
          </div>
        </div>
        
        {/* Bottom confirmation message */}
        <Alert className="mt-6 bg-baltic-blue/10 border-baltic-blue text-baltic-blue font-medium print:hidden">
          <CheckCircle className="h-5 w-5 mr-2" />
          <AlertDescription className="text-baltic-blue font-semibold">
            Formularz został pomyślnie wysłany. Dziękujemy za zgłoszenie!
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 print:hidden">
        <Button
          onClick={onReturn}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Powrót do formularza
        </Button>
        
        <Button
          onClick={handlePrint}
          className="bg-baltic-blue hover:bg-baltic-orange text-white flex items-center gap-2"
        >
          <Printer size={18} /> Drukuj / Zapisz PDF
        </Button>
      </div>
      
      {/* Add print-specific styles to the index.css file instead of here */}
    </div>
  );
};

export default FormConfirmation;
