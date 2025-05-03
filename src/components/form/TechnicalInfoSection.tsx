
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FormData, FormErrors } from '@/utils/formUtils';

interface TechnicalInfoSectionProps {
  formData: FormData;
  errors: FormErrors;
  touchedFields: Record<string, boolean>;
  showBoothDimensions: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRadioChange: (name: string, value: string) => void;
}

const TechnicalInfoSection: React.FC<TechnicalInfoSectionProps> = ({
  formData,
  errors,
  touchedFields,
  showBoothDimensions,
  handleChange,
  handleBlur,
  handleRadioChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className={errors.category ? "text-red-500" : ""}>1. Kategoria wystawcy:</Label>
        <RadioGroup 
          value={formData.category} 
          onValueChange={(value) => handleRadioChange('category', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Artyści rękodzielnicy" id="category-1" />
            <Label htmlFor="category-1">Artyści rękodzielnicy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Wytwórcy produktów tradycyjnych i regionalnych z województwa zachodniopomorskiego" id="category-2" />
            <Label htmlFor="category-2">Wytwórcy produktów tradycyjnych i regionalnych z województwa zachodniopomorskiego</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Producenci artykułów spożywczych" id="category-4" />
            <Label htmlFor="category-4">Producenci artykułów spożywczych</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Winiarze i producenci nalewek" id="category-5" />
            <Label htmlFor="category-5">Winiarze i producenci nalewek</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Gastronomia" id="category-6" />
            <Label htmlFor="category-6">Gastronomia</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Pozostali (np. pośrednicy, handlarze itp.)" id="category-3" />
            <Label htmlFor="category-3">Pozostali (np. pośrednicy, handlarze itp.)</Label>
          </div>
        </RadioGroup>
        {errors.category && touchedFields.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      <Separator />
      
      <div className="space-y-3">
        <Label className={errors.boothType ? "text-red-500" : ""}>2. Rodzaj stoiska:</Label>
        <RadioGroup 
          value={formData.boothType} 
          onValueChange={(value) => handleRadioChange('boothType', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Namiot organizatora – 3 m × 3 m" id="booth-1" />
            <Label htmlFor="booth-1">Namiot organizatora – 3 m × 3 m</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Namiot własny – 3 m × 3 m" id="booth-2" />
            <Label htmlFor="booth-2">Namiot własny – 3 m × 3 m</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Namiot własny, inny wymiar" id="booth-3" />
            <Label htmlFor="booth-3">Namiot własny, inny wymiar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Food truck / przyczepa" id="booth-4" />
            <Label htmlFor="booth-4">Food truck / przyczepa – prosimy podać wymiary (szerokość i głębokość)</Label>
          </div>
        </RadioGroup>
        {errors.boothType && touchedFields.boothType && (
          <p className="text-red-500 text-sm mt-1">{errors.boothType}</p>
        )}
      </div>
      
      {showBoothDimensions && (
        <div className="space-y-2 pl-6">
          <Label htmlFor="boothDimensions" className={errors.boothDimensions ? "text-red-500" : ""}>
            2.1. Dokładne wymiary namiotu/food trucka:
          </Label>
          <Input 
            id="boothDimensions" 
            name="boothDimensions" 
            value={formData.boothDimensions} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.boothDimensions ? "border-red-500" : ""} 
            required 
          />
          {errors.boothDimensions && touchedFields.boothDimensions && (
            <p className="text-red-500 text-sm mt-1">{errors.boothDimensions}</p>
          )}
        </div>
      )}
      
      <Separator />
      
      <div className="space-y-3">
        <Label className={errors.powerConnection ? "text-red-500" : ""}>3. Podłączenie do prądu (opłata za 4 dni):</Label>
        <RadioGroup 
          value={formData.powerConnection} 
          onValueChange={(value) => handleRadioChange('powerConnection', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Do 2 kW – 200 zł + VAT" id="power-1" />
            <Label htmlFor="power-1">Do 2 kW – 200 zł + VAT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Do 6 kW – 500 zł + VAT" id="power-2" />
            <Label htmlFor="power-2">Do 6 kW – 500 zł + VAT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Powyżej 6 kW – cena do uzgodnienia" id="power-3" />
            <Label htmlFor="power-3">Powyżej 6 kW – cena do uzgodnienia</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Brak – zakaz podłączenia do prądu" id="power-4" />
            <Label htmlFor="power-4">Nie dotyczy – brak podłączenia do prądu</Label>
          </div>
        </RadioGroup>
        {errors.powerConnection && touchedFields.powerConnection && (
          <p className="text-red-500 text-sm mt-1">{errors.powerConnection}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="products" className={errors.products ? "text-red-500" : ""}>
          4. Asortyment sprzedaży (proszę podać po przecinku):
        </Label>
        <Textarea 
          id="products" 
          name="products" 
          value={formData.products} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.products ? "border-red-500" : ""} 
          required 
        />
        {errors.products && touchedFields.products && (
          <p className="text-red-500 text-sm mt-1">{errors.products}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes" className={errors.notes ? "text-red-500" : ""}>
          5. Uwagi (opcjonalnie):
        </Label>
        <Textarea 
          id="notes" 
          name="notes" 
          value={formData.notes} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.notes ? "border-red-500" : ""} 
        />
        {errors.notes && touchedFields.notes && (
          <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label className={errors.needsParking ? "text-red-500" : ""}>
          6. Czy potrzebne jest miejsce parkingowe dla auta?
        </Label>
        <RadioGroup 
          value={formData.needsParking} 
          onValueChange={(value) => handleRadioChange('needsParking', value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="TAK" id="parking-yes" />
            <Label htmlFor="parking-yes">TAK</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NIE" id="parking-no" />
            <Label htmlFor="parking-no">NIE</Label>
          </div>
        </RadioGroup>
        {errors.needsParking && touchedFields.needsParking && (
          <p className="text-red-500 text-sm mt-1">{errors.needsParking}</p>
        )}
      </div>
    </div>
  );
};

export default TechnicalInfoSection;
