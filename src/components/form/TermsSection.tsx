
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "@/components/ui/sonner";
import { FormData, FormErrors } from '@/utils/formUtils';

interface TermsSectionProps {
  formData: FormData;
  errors: FormErrors;
  touchedFields: Record<string, boolean>;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const TermsSection: React.FC<TermsSectionProps> = ({
  formData,
  errors,
  touchedFields,
  handleCheckboxChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-top space-x-2">
        <Checkbox 
          id="acceptTerms" 
          checked={formData.acceptTerms}
          onCheckedChange={(checked: boolean) => handleCheckboxChange('acceptTerms', checked)}
          required 
          className={errors.acceptTerms ? "border-red-500" : ""}
        />
        <Label htmlFor="acceptTerms" className={`leading-normal ${errors.acceptTerms ? "text-red-500" : ""}`}>
          Akceptuję regulamin Jarmarku Bałtyckiego. {" "}
          <a 
            href="#" 
            className="text-baltic-blue hover:text-baltic-orange underline"
            onClick={(e) => { e.preventDefault(); toast.info("Regulamin zostanie otwarty w nowym oknie."); }}
          >
            [link do regulaminu]
          </a>
        </Label>
      </div>
      {errors.acceptTerms && touchedFields.acceptTerms && (
        <p className="text-red-500 text-sm ml-6">{errors.acceptTerms}</p>
      )}
      
      <div className="flex items-top space-x-2">
        <Checkbox 
          id="acceptPrivacy" 
          checked={formData.acceptPrivacy}
          onCheckedChange={(checked: boolean) => handleCheckboxChange('acceptPrivacy', checked)}
          required 
          className={errors.acceptPrivacy ? "border-red-500" : ""}
        />
        <Label htmlFor="acceptPrivacy" className={`leading-normal ${errors.acceptPrivacy ? "text-red-500" : ""}`}>
          Wyrażam zgodę na przetwarzanie danych osobowych. {" "}
          <a 
            href="#" 
            className="text-baltic-blue hover:text-baltic-orange underline"
            onClick={(e) => { e.preventDefault(); toast.info("Informacja o przetwarzaniu danych zostanie otwarta w nowym oknie."); }}
          >
            [link do informacji o przetwarzaniu danych osobowych]
          </a>
        </Label>
      </div>
      {errors.acceptPrivacy && touchedFields.acceptPrivacy && (
        <p className="text-red-500 text-sm ml-6">{errors.acceptPrivacy}</p>
      )}
    </div>
  );
};

export default TermsSection;
