import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/sonner";
import { FormData, initialFormData, submitForm } from '@/utils/formUtils';
import FormConfirmation from './FormConfirmation';
import FormSection from './form/FormSection';
import ExhibitorInfoSection from './form/ExhibitorInfoSection';
import TechnicalInfoSection from './form/TechnicalInfoSection';
import LocationSection from './form/LocationSection';
import TermsSection from './form/TermsSection';
import EventScheduleSection from './form/EventScheduleSection';
import { useFormValidation } from './form/FormValidation';

interface MarketFormProps {
  mapPdfUrl?: string;
}

const MarketForm: React.FC<MarketFormProps> = ({ mapPdfUrl = "#" }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showBoothDimensions, setShowBoothDimensions] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  
  const { 
    errors, 
    touchedFields, 
    setTouchedFields, 
    validateField, 
    validateForm 
  } = useFormValidation(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for postal code to auto-format
    if (name === 'postalCode') {
      // Remove all non-digits first
      const digitsOnly = value.replace(/\D/g, '');
      
      // Apply formatting
      let formattedValue = '';
      if (digitsOnly.length <= 2) {
        formattedValue = digitsOnly;
      } else {
        // Insert dash after the second digit
        formattedValue = `${digitsOnly.slice(0, 2)}-${digitsOnly.slice(2, 5)}`;
      }
      
      // Update form data with formatted value
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Validate field on change if it has been touched
    if (touchedFields[name]) {
      validateField(name, value, showBoothDimensions);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value, showBoothDimensions);
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value, showBoothDimensions);
    
    // Show/hide booth dimensions field based on selection
    if (name === 'boothType') {
      const shouldShowDimensions = value === 'Namiot własny, inny wymiar' || value === 'Food truck / przyczepa';
      setShowBoothDimensions(shouldShowDimensions);
      
      // If hiding booth dimensions, clear any error
      if (!shouldShowDimensions) {
        const newErrors = { ...errors };
        delete newErrors.boothDimensions;
        setFormData(prev => ({ ...prev, boothDimensions: '' }));
      }
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, checked, showBoothDimensions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm(formData, showBoothDimensions)) {
      submitForm(formData);
      // Save the submitted data and show the confirmation screen
      setSubmittedData({...formData});
      setIsSubmitted(true);
      toast.success("Formularz został pomyślnie wypełniony!");
    } else {
      toast.error("Proszę wypełnić wszystkie wymagane pola formularza.");
    }
  };

  const handleReturnToForm = () => {
    // Reset the form
    setFormData(initialFormData);
    setShowBoothDimensions(false);
    setTouchedFields({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  // If the form has been submitted successfully, show the confirmation screen
  if (isSubmitted && submittedData) {
    return <FormConfirmation formData={submittedData} onReturn={handleReturnToForm} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-4xl mx-auto">
      {/* Dane wystawcy */}
      <FormSection title="Dane wystawcy">
        <ExhibitorInfoSection 
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleRadioChange={handleRadioChange}
        />
      </FormSection>

      {/* Informacje techniczne */}
      <FormSection title="Informacje techniczne dla organizatora">
        <TechnicalInfoSection 
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          showBoothDimensions={showBoothDimensions}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleRadioChange={handleRadioChange}
        />
      </FormSection>
      
      {/* Wybór lokalizacji */}
      <FormSection title="Wybór lokalizacji">
        <LocationSection 
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          mapPdfUrl={mapPdfUrl}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </FormSection>
      
      {/* Akceptacja warunków */}
      <FormSection title="Akceptacja warunków">
        <TermsSection 
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          handleCheckboxChange={handleCheckboxChange}
        />
      </FormSection>
      
      <div className="flex justify-center">
        <Button 
          type="submit" 
          className="bg-baltic-blue hover:bg-baltic-orange text-white px-8 py-2 rounded-lg text-lg transition-colors"
        >
          Wyślij zgłoszenie
        </Button>
      </div>
      
      {/* Event Schedule moved below submit button */}
      <div className="mt-8">
        <EventScheduleSection />
      </div>
    </form>
  );
};

export default MarketForm;
