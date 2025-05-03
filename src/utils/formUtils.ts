
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

export interface FormData {
  companyName: string;
  contactPerson: string;
  address: string;
  nip: string;
  email: string;
  phone: string;
  participatedLastYear: "TAK" | "NIE";
  category: string;
  boothType: string;
  boothDimensions: string;
  powerConnection: string;
  products: string;
  notes: string;
  needsParking: "TAK" | "NIE";
  location1: string;
  location2: string;
  location3: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export const initialFormData: FormData = {
  companyName: "",
  contactPerson: "",
  address: "",
  nip: "",
  email: "",
  phone: "",
  participatedLastYear: "NIE",
  category: "",
  boothType: "",
  boothDimensions: "",
  powerConnection: "",
  products: "",
  notes: "",
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
  formSubmissions.push(data);
  console.log("Form submitted:", data);
  // In a real application, this would be an API call
};

export const getSubmissions = (): FormData[] => {
  return formSubmissions;
};

// Convert form data to CSV
export const generateCSV = (submissions: FormData[]): string => {
  if (submissions.length === 0) return "";
  
  const headers = Object.keys(submissions[0]).join(",");
  const rows = submissions.map(submission => 
    Object.values(submission).map(value => 
      typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
    ).join(",")
  );
  
  return [headers, ...rows].join("\n");
};

// Generate Excel file
export const generateExcel = (submissions: FormData[]): Blob => {
  // This is a simplified approach that creates an Excel-compatible CSV file
  const csvContent = generateCSV(submissions);
  return new Blob([csvContent], { type: 'application/vnd.ms-excel' });
};

// Download helper
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

// Download Excel helper
export const downloadExcel = (data: Blob, filename: string): void => {
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(data);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
