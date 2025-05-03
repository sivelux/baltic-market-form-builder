import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from "@/components/ui/sonner";
import { FormData, FormErrors, initialFormData, validateEmail, validateNIP, validatePhone, validatePostalCode, submitForm } from '@/utils/formUtils';
import FormConfirmation from './FormConfirmation';

const MarketForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showBoothDimensions, setShowBoothDimensions] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change if it has been touched
    if (touchedFields[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
    
    // Show/hide booth dimensions field based on selection
    // Fix: Only show dimensions field for "inny wymiar" and "Food truck / przyczepa" options
    if (name === 'boothType') {
      setShowBoothDimensions(value === 'Namiot własny, inny wymiar' || value === 'Food truck / przyczepa');
      // If hiding booth dimensions, clear any error
      if (value !== 'Namiot własny, inny wymiar' && value !== 'Food truck / przyczepa') {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.boothDimensions;
          return newErrors;
        });
      }
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, checked);
  };

  // Validate a single field
  const validateField = (name: string, value: any): boolean => {
    let errorMessage = "";
    
    // Skip validation for boothDimensions if not shown
    if (name === 'boothDimensions' && !showBoothDimensions) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.boothDimensions;
        return newErrors;
      });
      return true;
    }
    
    // Skip validation for notes field as it's optional
    if (name === 'notes') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.notes;
        return newErrors;
      });
      return true;
    }
    
    // Required field validation for all other fields
    if (value === "" || value === false) {
      errorMessage = "To pole jest wymagane";
    }
    // Specific field validations
    else if (name === 'email' && !validateEmail(value)) {
      errorMessage = "Proszę podać poprawny adres email";
    }
    else if (name === 'nip' && !validateNIP(value)) {
      errorMessage = "NIP powinien składać się z 10 cyfr";
    }
    else if (name === 'phone' && !validatePhone(value)) {
      errorMessage = "Proszę podać poprawny numer telefonu";
    }
    else if (name === 'postalCode' && !validatePostalCode(value)) {
      errorMessage = "Proszę podać poprawny kod pocztowy (XX-XXX)";
    }
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return errorMessage === "";
  };

  // Validate all form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let formIsValid = true;
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    
    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      allTouched[key] = true;
      
      // Skip validation for boothDimensions if not shown
      if (key === 'boothDimensions' && !showBoothDimensions) {
        return;
      }
      
      // Skip validation for notes field as it's optional
      if (key === 'notes') {
        return;
      }
      
      // Required field validation for all other fields
      if (value === "" || value === false) {
        newErrors[key] = "To pole jest wymagane";
        formIsValid = false;
      }
      // Specific field validations
      else if (key === 'email' && !validateEmail(value)) {
        newErrors[key] = "Proszę podać poprawny adres email";
        formIsValid = false;
      }
      else if (key === 'nip' && !validateNIP(value)) {
        newErrors[key] = "NIP powinien składać się z 10 cyfr";
        formIsValid = false;
      }
      else if (key === 'phone' && !validatePhone(value)) {
        newErrors[key] = "Proszę podać poprawny numer telefonu";
        formIsValid = false;
      }
      else if (key === 'postalCode' && !validatePostalCode(value)) {
        newErrors[key] = "Proszę podać poprawny kod pocztowy (XX-XXX)";
        formIsValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouchedFields(allTouched);
    
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
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
    setErrors({});
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
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-baltic-blue">Dane wystawcy</h2>
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
      </div>

      {/* Informacje techniczne */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-baltic-blue">Informacje techniczne dla organizatora</h2>
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
                <RadioGroupItem value="Pozostali (np. pośrednicy, handlarze itp.)" id="category-3" />
                <Label htmlFor="category-3">Pozostali (np. pośrednicy, handlarze itp.)</Label>
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
      </div>
      
      {/* Wybór lokalizacji */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-baltic-blue">Wybór lokalizacji</h2>
        <p className="text-sm italic mb-4">(prosimy o wskazanie kilku preferencji – w razie niedostępności pierwszego wyboru)</p>
        
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
      </div>
      
      {/* Akceptacja warunków */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-baltic-blue">Akceptacja warunków</h2>
        
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
      </div>
      
      <div className="flex justify-center">
        <Button 
          type="submit" 
          className="bg-baltic-blue hover:bg-baltic-orange text-white px-8 py-2 rounded-lg text-lg transition-colors"
        >
          Wyślij zgłoszenie
        </Button>
      </div>
    </form>
  );
};

export default MarketForm;
