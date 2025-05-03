
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData, FormErrors } from '@/utils/formUtils';

interface ExhibitorInfoSectionProps {
  formData: FormData;
  errors: FormErrors;
  touchedFields: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRadioChange: (name: string, value: string) => void;
}

const ExhibitorInfoSection: React.FC<ExhibitorInfoSectionProps> = ({
  formData,
  errors,
  touchedFields,
  handleChange,
  handleBlur,
  handleRadioChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Pełna nazwa firmy:</Label>
          <Input 
            id="companyName" 
            name="companyName" 
            value={formData.companyName} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.companyName ? "border-red-500" : ""} 
            required 
          />
          {errors.companyName && touchedFields.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>
      </div>

      {/* Split the name into firstName and lastName */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Imię:</Label>
          <Input 
            id="firstName" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName ? "border-red-500" : ""} 
            required 
          />
          {errors.firstName && touchedFields.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Nazwisko:</Label>
          <Input 
            id="lastName" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastName ? "border-red-500" : ""} 
            required 
          />
          {errors.lastName && touchedFields.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Ulica:</Label>
        <Input 
          id="street" 
          name="street" 
          value={formData.street} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.street ? "border-red-500" : ""} 
          required 
        />
        {errors.street && touchedFields.street && (
          <p className="text-red-500 text-sm mt-1">{errors.street}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Kod pocztowy:</Label>
          <Input 
            id="postalCode" 
            name="postalCode" 
            value={formData.postalCode} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="XX-XXX"
            maxLength={6} // 5 digits plus dash
            className={errors.postalCode ? "border-red-500" : ""} 
            required 
          />
          {errors.postalCode && touchedFields.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">Miejscowość:</Label>
          <Input 
            id="city" 
            name="city" 
            value={formData.city} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.city ? "border-red-500" : ""} 
            required 
          />
          {errors.city && touchedFields.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nip">NIP:</Label>
          <Input 
            id="nip" 
            name="nip" 
            value={formData.nip} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.nip ? "border-red-500" : ""} 
            required 
          />
          {errors.nip && touchedFields.nip && (
            <p className="text-red-500 text-sm mt-1">{errors.nip}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Adres e-mail:</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? "border-red-500" : ""} 
            required 
          />
          {errors.email && touchedFields.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Numer telefonu:</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? "border-red-500" : ""} 
            required 
          />
          {errors.phone && touchedFields.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className={errors.participatedLastYear ? "text-red-500" : ""}>
            Czy uczestniczył/a Pan/Pani w Jarmarku Bałtyckim w 2024 roku?
          </Label>
          <RadioGroup 
            value={formData.participatedLastYear} 
            onValueChange={(value) => handleRadioChange('participatedLastYear', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="TAK" id="participated-yes" />
              <Label htmlFor="participated-yes">TAK</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="NIE" id="participated-no" />
              <Label htmlFor="participated-no">NIE</Label>
            </div>
          </RadioGroup>
          {errors.participatedLastYear && touchedFields.participatedLastYear && (
            <p className="text-red-500 text-sm mt-1">{errors.participatedLastYear}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitorInfoSection;
