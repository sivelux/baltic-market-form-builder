
// Form validation functions
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateNIP = (nip: string): boolean => {
  const cleanNip = nip.replace(/[^0-9]/g, "");
  return cleanNip.length === 10;
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  return cleanPhone.length >= 9;
};

export const validatePostalCode = (postalCode: string): boolean => {
  const cleanPostalCode = postalCode.replace(/[^0-9-]/g, "");
  // Polish postal code format: XX-XXX
  const re = /^\d{2}-\d{3}$/;
  return re.test(cleanPostalCode);
};

export interface FormData {
  companyName: string;
  contactPerson: string;
  street: string;
  postalCode: string;
  city: string;
  nip: string;
  email: string;
  phone: string;
  participatedLastYear: "TAK" | "NIE";
  category: string;
  boothType: string;
  boothDimensions: string;
  powerConnection: string;
  products: string;
  notes: string; // This is the only optional field
  needsParking: "TAK" | "NIE";
  location1: string;
  location2: string;
  location3: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  submissionDateTime?: string; // Optional timestamp for when the form was submitted
}

export interface FormErrors {
  [key: string]: string;
}

export const initialFormData: FormData = {
  companyName: "",
  contactPerson: "",
  street: "",
  postalCode: "",
  city: "",
  nip: "",
  email: "",
  phone: "",
  participatedLastYear: "NIE",
  category: "",
  boothType: "",
  boothDimensions: "",
  powerConnection: "",
  products: "",
  notes: "", // Optional field
  needsParking: "NIE",
  location1: "",
  location2: "",
  location3: "",
  acceptTerms: false,
  acceptPrivacy: false,
};

// Mock database for submissions
let formSubmissions: FormData[] = [];

export const submitForm = (data: FormData): void => {
  // Add submission date and time
  const submissionData = {
    ...data,
    submissionDateTime: new Date().toLocaleString('pl-PL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
  
  formSubmissions.push(submissionData);
  console.log("Form submitted:", submissionData);
  // In a real application, this would be an API call
};

export const getSubmissions = (): FormData[] => {
  return formSubmissions;
};

// Map form field names to Polish column headers
export const formFieldLabels: Record<string, string> = {
  companyName: "Pełna nazwa firmy",
  contactPerson: "Imię i nazwisko osoby zgłaszającej",
  street: "Ulica",
  postalCode: "Kod pocztowy",
  city: "Miejscowość",
  nip: "NIP",
  email: "Adres e-mail",
  phone: "Numer telefonu",
  participatedLastYear: "Czy uczestniczył/a Pan/Pani w Jarmarku Bałtyckim w 2024 roku?",
  category: "Kategoria wystawcy",
  boothType: "Rodzaj stoiska",
  boothDimensions: "Wymiary namiotu/food trucka",
  powerConnection: "Podłączenie do prądu",
  products: "Asortyment sprzedaży",
  notes: "Uwagi",
  needsParking: "Czy potrzebne jest miejsce parkingowe dla auta?",
  location1: "Pierwszy wybór lokalizacji",
  location2: "Drugi wybór lokalizacji",
  location3: "Trzeci wybór lokalizacji",
  acceptTerms: "Akceptacja regulaminu Jarmarku Bałtyckiego",
  acceptPrivacy: "Zgoda na przetwarzanie danych osobowych",
  submissionDateTime: "Data i godzina zgłoszenia"
};

// Field descriptions for the second worksheet
export const formFieldDescriptions: Record<string, string> = {
  companyName: "Pełna nazwa firmy, pod którą prowadzona jest działalność",
  contactPerson: "Imię i nazwisko osoby odpowiedzialnej za zgłoszenie",
  street: "Nazwa ulicy wraz z numerem budynku/lokalu",
  postalCode: "Format: XX-XXX",
  city: "Nazwa miejscowości",
  nip: "10-cyfrowy Numer Identyfikacji Podatkowej",
  email: "Adres e-mail do kontaktu",
  phone: "Numer telefonu do szybkiego kontaktu",
  participatedLastYear: "Informacja o uczestnictwie w poprzedniej edycji Jarmarku",
  category: "Kategoria działalności wystawcy",
  boothType: "Rodzaj i wymiary stoiska handlowego",
  boothDimensions: "Dokładne wymiary namiotu lub food trucka (jeśli dotyczy)",
  powerConnection: "Informacja o wymaganym podłączeniu do prądu",
  products: "Szczegółowy asortyment produktów oferowanych podczas Jarmarku",
  notes: "Dodatkowe informacje dla organizatora (pole opcjonalne)",
  needsParking: "Informacja o zapotrzebowaniu na miejsce parkingowe",
  location1: "Preferowana lokalizacja stoiska - pierwszy wybór",
  location2: "Preferowana lokalizacja stoiska - drugi wybór",
  location3: "Preferowana lokalizacja stoiska - trzeci wybór",
  acceptTerms: "Potwierdzenie zapoznania się i akceptacji regulaminu Jarmarku",
  acceptPrivacy: "Zgoda na przetwarzanie danych osobowych zgodnie z RODO",
  submissionDateTime: "Data i godzina przesłania zgłoszenia"
};

// Helper to format boolean values in Polish
export const formatBooleanValue = (value: boolean): string => value ? "TAK" : "NIE";

// Convert form data to CSV with proper UTF-8 handling
export const generateCSV = (submissions: FormData[]): string => {
  if (submissions.length === 0) return "";
  
  // Use the field labels map to create headers in Polish
  const headers = Object.keys(formFieldLabels).map(key => formFieldLabels[key]).join(",");
  
  // Format each submission row
  const rows = submissions.map(submission => {
    return Object.keys(formFieldLabels).map(key => {
      const value = submission[key as keyof FormData];
      
      // Format boolean values as TAK/NIE
      if (typeof value === "boolean") {
        return `"${formatBooleanValue(value)}"`;
      }
      
      // Handle string values with proper escaping
      if (typeof value === "string") {
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      return value === undefined ? '""' : `"${value}"`;
    }).join(",");
  });
  
  return [headers, ...rows].join("\n");
};

// Generate Excel file with better UTF-8 handling
export const generateExcel = (submissions: FormData[]): Blob => {
  // Add BOM (Byte Order Mark) for UTF-8
  const BOM = "\uFEFF";
  const csvContent = BOM + generateCSV(submissions);
  
  // Set the type to include charset=utf-8
  return new Blob([csvContent], { 
    type: 'application/vnd.ms-excel;charset=utf-8' 
  });
};

// Generate Excel with two worksheets (main data + field descriptions)
export const generateEnhancedExcel = (submissions: FormData[]): string => {
  if (submissions.length === 0) return "";
  
  // Add BOM (Byte Order Mark) for UTF-8
  const BOM = "\uFEFF";
  
  // Worksheet 1: Form Submissions
  let excelContent = "WORKSHEET: Zgłoszenia\n";
  
  // Use the field labels map to create headers in Polish
  const headers = Object.keys(formFieldLabels).map(key => formFieldLabels[key]).join("\t");
  excelContent += headers + "\n";
  
  // Format each submission row with tab separators (better for Excel)
  submissions.forEach(submission => {
    const rowValues = Object.keys(formFieldLabels).map(key => {
      const value = submission[key as keyof FormData];
      
      // Format boolean values as TAK/NIE
      if (typeof value === "boolean") {
        return formatBooleanValue(value);
      }
      
      return value === undefined ? '' : String(value);
    });
    
    excelContent += rowValues.join("\t") + "\n";
  });
  
  // Worksheet 2: Field Descriptions
  excelContent += "\nWORKSHEET: Opis pól\n";
  excelContent += "Nazwa pola\tOpis\n";
  
  // Add each field description
  Object.keys(formFieldLabels).forEach(key => {
    excelContent += formFieldLabels[key] + "\t" + (formFieldDescriptions[key] || "") + "\n";
  });
  
  return BOM + excelContent;
};

// Download helper for CSV
export const downloadCSV = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Download Excel helper with improved encoding
export const downloadExcel = (data: Blob | string, filename: string, isEnhanced: boolean = false): void => {
  let blob;
  
  if (typeof data === 'string') {
    // For enhanced Excel format (string with multiple worksheets)
    blob = new Blob([data], { 
      type: 'application/vnd.ms-excel;charset=utf-8' 
    });
  } else {
    // Use the blob directly
    blob = data;
  }
  
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
