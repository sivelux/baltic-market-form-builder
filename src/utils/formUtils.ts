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
  firstName: string; // Changed from contactPerson to firstName
  lastName: string;  // Added lastName field
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
  firstName: "",    // Changed from contactPerson to firstName
  lastName: "",     // Added lastName field
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

// Persistent storage for submissions - using browser's localStorage for persistence
// Initialize from localStorage if available, otherwise use empty array
const getStoredSubmissions = (): FormData[] => {
  try {
    const stored = localStorage.getItem('formSubmissions');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error retrieving stored submissions:', error);
  }
  return [];
};

// Initialize submissions from localStorage
let formSubmissions: FormData[] = getStoredSubmissions();

export const submitForm = (data: FormData): void => {
  // Add submission date and time in the required format YYYY-MM-DD HH:mm:ss
  const now = new Date();
  const submissionData = {
    ...data,
    submissionDateTime: now.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/(\d+)\.(\d+)\.(\d+), (\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6')
  };
  
  // Add to the submissions array
  formSubmissions.push(submissionData);
  
  // Store updated submissions in localStorage for persistence
  try {
    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));
  } catch (error) {
    console.error('Error saving submissions to localStorage:', error);
  }
  
  console.log("Form submitted:", submissionData);
  console.log("Total submissions:", formSubmissions.length);
};

export const getSubmissions = (): FormData[] => {
  return formSubmissions;
};

// Map form field names to Polish column headers
export const formFieldLabels: Record<string, string> = {
  submissionDateTime: "Data i godzina zgłoszenia",
  companyName: "Pełna nazwa firmy",
  firstName: "Imię",                 // Updated from contactPerson to separate fields
  lastName: "Nazwisko",              // New field
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
  acceptPrivacy: "Zgoda na przetwarzanie danych osobowych"
};

// Field descriptions for the second worksheet
export const formFieldDescriptions: Record<string, string> = {
  submissionDateTime: "Data i godzina przesłania zgłoszenia w formacie RRRR-MM-DD GG:MM:SS",
  companyName: "Pełna nazwa firmy, pod którą prowadzona jest działalność",
  firstName: "Imię osoby odpowiedzialnej za zgłoszenie",     // Updated description
  lastName: "Nazwisko osoby odpowiedzialnej za zgłoszenie",  // New description
  street: "Nazwa ulicy wraz z numerem budynku/lokalu",
  postalCode: "Format: XX-XXX",
  city: "Nazwa miejscowości",
  nip: "10-cyfrowy Numer Identyfikacji Podatkowej",
  email: "Adres e-mail do kontaktu",
  phone: "Numer telefonu do szybkiego kontaktu",
  participatedLastYear: "Informacja o uczestnictwie w poprzedniej edycji Jarmarku",
  category: "Kategoria działalności wystawcy: Artyści rękodzielnicy, Wytwórcy produktów tradycyjnych i regionalnych, Pozostali, Producenci artykułów spożywczych, Winiarze i producenci nalewek, Gastronomia",
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
  acceptPrivacy: "Zgoda na przetwarzanie danych osobowych zgodnie z RODO"
};

// Helper to format boolean values in Polish
export const formatBooleanValue = (value: boolean): string => value ? "TAK" : "NIE";

// Ensure field order for export - putting submissionDateTime first
export const getOrderedFieldNames = (): string[] => {
  return ['submissionDateTime', ...Object.keys(initialFormData)];
};

// Convert form data to CSV with improved UTF-8 handling
export const generateCSV = (submissions: FormData[]): string => {
  if (submissions.length === 0) return "";
  
  // Get ordered field names
  const orderedFields = getOrderedFieldNames();
  
  // Use the field labels map to create headers in Polish
  const headers = orderedFields.map(key => formFieldLabels[key] || key).join(";"); // Using semicolon for Excel compatibility
  
  // Format each submission row
  const rows = submissions.map(submission => {
    return orderedFields.map(key => {
      const value = submission[key as keyof FormData];
      
      // Format boolean values as TAK/NIE
      if (typeof value === "boolean") {
        return `"${formatBooleanValue(value)}"`;
      }
      
      // Handle string values with proper escaping
      if (typeof value === "string") {
        // Double all double quotes and wrap in quotes
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      return value === undefined ? '""' : `"${value}"`;
    }).join(";"); // Using semicolon delimiter for Excel compatibility
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

// Generate Excel with two worksheets and improved formatting
export const generateEnhancedExcel = (submissions: FormData[]): string => {
  if (submissions.length === 0) return "";
  
  // Add BOM (Byte Order Mark) for UTF-8
  const BOM = "\uFEFF";
  
  // Get ordered field names
  const orderedFields = getOrderedFieldNames();
  
  // Worksheet 1: Form Submissions
  let excelContent = "WORKSHEET: Zgłoszenia\n";
  
  // Use the field labels map to create headers in Polish
  const headers = orderedFields.map(key => formFieldLabels[key] || key).join("\t");
  excelContent += headers + "\n";
  
  // Format each submission row with tab separators (better for Excel)
  submissions.forEach(submission => {
    const rowValues = orderedFields.map(key => {
      const value = submission[key as keyof FormData];
      
      // Format boolean values as TAK/NIE
      if (typeof value === "boolean") {
        return formatBooleanValue(value);
      }
      
      // Handle string values properly
      if (typeof value === "string") {
        // Replace tabs with spaces to prevent column misalignment
        return value.replace(/\t/g, ' ');
      }
      
      return value === undefined ? '' : String(value);
    });
    
    excelContent += rowValues.join("\t") + "\n";
  });
  
  // Worksheet 2: Field Descriptions
  excelContent += "\nWORKSHEET: Opis pól\n";
  excelContent += "Nazwa pola\tOpis\n";
  
  // Add each field description in the same order
  orderedFields.forEach(key => {
    excelContent += (formFieldLabels[key] || key) + "\t" + (formFieldDescriptions[key] || "") + "\n";
  });
  
  return BOM + excelContent;
};

// Download helper for CSV with improved encoding
export const downloadCSV = (data: string, filename: string): void => {
  // Add BOM (Byte Order Mark) for UTF-8
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + data], { type: 'text/csv;charset=utf-8;' });
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
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' 
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
