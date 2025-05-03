
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import { FormData, FormErrors } from '@/utils/formUtils';

interface LocationSectionProps {
  formData: FormData;
  errors: FormErrors;
  touchedFields: Record<string, boolean>;
  mapPdfUrl: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  errors,
  touchedFields,
  mapPdfUrl,
  handleChange,
  handleBlur,
}) => {
  return (
    <>
      {/* Map download link - moved above the instruction text */}
      <a 
        href={mapPdfUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-bold text-lg text-baltic-blue hover:text-baltic-orange underline mb-4 transition-colors"
        download="mapa-jarmark-baltycki.pdf"
      >
        <Download size={20} />
        <span>📍 Pobierz mapę wydarzenia (PDF)</span>
      </a>
      
      <p className="text-sm italic mb-6">(prosimy o wskazanie kilku preferencji – w razie niedostępności pierwszego wyboru)</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location1" className={errors.location1 ? "text-red-500" : ""}>
            1. Pierwszy wybór lokalizacji:
          </Label>
          <Input 
            id="location1" 
            name="location1" 
            value={formData.location1} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.location1 ? "border-red-500" : ""} 
            required 
          />
          {errors.location1 && touchedFields.location1 && (
            <p className="text-red-500 text-sm mt-1">{errors.location1}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location2" className={errors.location2 ? "text-red-500" : ""}>
            2. Drugi wybór lokalizacji:
          </Label>
          <Input 
            id="location2" 
            name="location2" 
            value={formData.location2} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.location2 ? "border-red-500" : ""} 
            required 
          />
          {errors.location2 && touchedFields.location2 && (
            <p className="text-red-500 text-sm mt-1">{errors.location2}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location3" className={errors.location3 ? "text-red-500" : ""}>
            3. Trzeci wybór lokalizacji:
          </Label>
          <Input 
            id="location3" 
            name="location3" 
            value={formData.location3} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.location3 ? "border-red-500" : ""} 
            required 
          />
          {errors.location3 && touchedFields.location3 && (
            <p className="text-red-500 text-sm mt-1">{errors.location3}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationSection;
