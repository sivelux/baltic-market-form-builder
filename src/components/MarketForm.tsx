
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from "@/components/ui/sonner";
import { FormData, initialFormData, validateEmail, validateNIP, validatePhone, submitForm } from '@/utils/formUtils';

const MarketForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showBoothDimensions, setShowBoothDimensions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Show/hide booth dimensions field based on selection
    if (name === 'boothType') {
      setShowBoothDimensions(value.includes('własny') || value.includes('Food truck'));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = (): boolean => {
    // Check required fields
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" || value === false) {
        toast.error(`Proszę wypełnić wszystkie pola formularza.`);
        return false;
      }
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      toast.error("Proszę podać poprawny adres email.");
      return false;
    }

    // Validate NIP
    if (!validateNIP(formData.nip)) {
      toast.error("NIP powinien składać się z 10 cyfr.");
      return false;
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      toast.error("Proszę podać poprawny numer telefonu.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      submitForm(formData);
      toast.success("Formularz został pomyślnie wypełniony. Dziękujemy za zgłoszenie!");
      setFormData(initialFormData);
      setShowBoothDimensions(false);
    }
  };

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
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Imię i nazwisko osoby zgłaszającej:</Label>
              <Input 
                id="contactPerson" 
                name="contactPerson" 
                value={formData.contactPerson} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adres (ulica, kod pocztowy, miejscowość):</Label>
            <Textarea 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nip">NIP:</Label>
              <Input 
                id="nip" 
                name="nip" 
                value={formData.nip} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Adres e-mail:</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
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
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Czy uczestniczył/a Pan/Pani w Jarmarku Bałtyckim w 2024 roku?</Label>
              <RadioGroup value={formData.participatedLastYear} 
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
            </div>
          </div>
        </div>
      </div>

      {/* Informacje techniczne */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-baltic-blue">Informacje techniczne dla organizatora</h2>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>1. Kategoria wystawcy:</Label>
            <RadioGroup 
              value={formData.category} 
              onValueChange={(value) => handleRadioChange('category', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="I. Artyści rękodzielnicy" id="category-1" />
                <Label htmlFor="category-1">I. Artyści rękodzielnicy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="II. Wytwórcy produktów tradycyjnych i regionalnych z woj. zachodniopomorskiego" id="category-2" />
                <Label htmlFor="category-2">II. Wytwórcy produktów tradycyjnych i regionalnych z woj. zachodniopomorskiego</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="III. Pozostali (pośrednicy, handlarze itp.)" id="category-3" />
                <Label htmlFor="category-3">III. Pozostali (pośrednicy, handlarze itp.)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="IV. Producenci artykułów spożywczych" id="category-4" />
                <Label htmlFor="category-4">IV. Producenci artykułów spożywczych</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="V. Winiarze, producenci nalewek" id="category-5" />
                <Label htmlFor="category-5">V. Winiarze, producenci nalewek</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="VI. Gastronomia" id="category-6" />
                <Label htmlFor="category-6">VI. Gastronomia</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <Label>2. Rodzaj stoiska:</Label>
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
          </div>
          
          {showBoothDimensions && (
            <div className="space-y-2 pl-6">
              <Label htmlFor="boothDimensions">2.1. Dokładne wymiary namiotu/food trucka:</Label>
              <Input 
                id="boothDimensions" 
                name="boothDimensions" 
                value={formData.boothDimensions} 
                onChange={handleChange} 
                required 
              />
            </div>
          )}
          
          <Separator />
          
          <div className="space-y-3">
            <Label>3. Podłączenie do prądu (opłata za 4 dni):</Label>
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="products">4. Asortyment sprzedaży (proszę podać po przecinku):</Label>
            <Textarea 
              id="products" 
              name="products" 
              value={formData.products} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">5. Uwagi:</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>6. Czy potrzebne jest miejsce parkingowe dla auta?</Label>
            <RadioGroup value={formData.needsParking} 
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
          </div>
        </div>
      </div>
      
      {/* Wybór lokalizacji */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-baltic-blue">Wybór lokalizacji</h2>
        <p className="text-sm italic mb-4">(prosimy o wskazanie kilku preferencji – w razie niedostępności pierwszego wyboru)</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location1">1. Pierwszy wybór lokalizacji:</Label>
            <Input 
              id="location1" 
              name="location1" 
              value={formData.location1} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location2">2. Drugi wybór lokalizacji:</Label>
            <Input 
              id="location2" 
              name="location2" 
              value={formData.location2} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location3">3. Trzeci wybór lokalizacji:</Label>
            <Input 
              id="location3" 
              name="location3" 
              value={formData.location3} 
              onChange={handleChange} 
              required 
            />
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
            />
            <Label htmlFor="acceptTerms" className="leading-normal">
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
          
          <div className="flex items-top space-x-2">
            <Checkbox 
              id="acceptPrivacy" 
              checked={formData.acceptPrivacy}
              onCheckedChange={(checked: boolean) => handleCheckboxChange('acceptPrivacy', checked)}
              required 
            />
            <Label htmlFor="acceptPrivacy" className="leading-normal">
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
