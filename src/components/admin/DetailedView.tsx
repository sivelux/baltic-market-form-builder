import React from 'react';
import { FormData, formFieldLabels } from '@/utils/formUtils';

interface DetailedViewProps {
  submission: FormData;
}

const DetailedView: React.FC<DetailedViewProps> = ({ submission }) => {
  // Format boolean or string values for display
  const formatValue = (value: any): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'boolean') return value ? 'TAK' : 'NIE';
    return value.toString();
  };
  
  return (
    <div className="py-4 px-3 mt-2 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {/* Group 1: Informacje podstawowe */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-4">
          <h3 className="font-bold text-baltic-blue border-b pb-1 mb-2">Informacje podstawowe</h3>
        </div>
        
        {/* Personal Information Fields */}
        {['firstName', 'lastName', 'companyName', 'nip', 'email', 'phone'].map((key) => {
          const value = submission[key as keyof FormData];
          const formattedValue = formatValue(value);
          const label = formFieldLabels[key as keyof typeof formFieldLabels];
          
          if (formattedValue === '') return null;
          
          return (
            <div key={key} className="bg-white rounded-md p-3 border border-gray-100 shadow-sm">
              <div className="font-semibold text-baltic-blue mb-1">{label}</div>
              <div className="break-words">{formattedValue}</div>
            </div>
          );
        })}
        
        {/* Group 2: Adres */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-4 mt-4">
          <h3 className="font-bold text-baltic-blue border-b pb-1 mb-2">Adres</h3>
        </div>
        
        {/* Address Fields */}
        {['street', 'city', 'postalCode'].map((key) => {
          const value = submission[key as keyof FormData];
          const formattedValue = formatValue(value);
          const label = formFieldLabels[key as keyof typeof formFieldLabels];
          
          if (formattedValue === '') return null;
          
          return (
            <div key={key} className="bg-white rounded-md p-3 border border-gray-100 shadow-sm">
              <div className="font-semibold text-baltic-blue mb-1">{label}</div>
              <div className="break-words">{formattedValue}</div>
            </div>
          );
        })}
        
        {/* Group 3: Informacje o stoisku */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-4 mt-4">
          <h3 className="font-bold text-baltic-blue border-b pb-1 mb-2">Informacje o stoisku</h3>
        </div>
        
        {/* Booth Information Fields */}
        {['category', 'products', 'location1', 'location2', 'location3', 'tent'].map((key) => {
          const value = submission[key as keyof FormData];
          const formattedValue = formatValue(value);
          const label = formFieldLabels[key as keyof typeof formFieldLabels];
          
          if (formattedValue === '') return null;
          
          const isLongText = typeof formattedValue === 'string' && formattedValue.length > 50;
          
          return (
            <div key={key} className={`bg-white rounded-md p-3 border border-gray-100 shadow-sm ${isLongText ? 'col-span-1 sm:col-span-2 lg:col-span-3' : ''}`}>
              <div className="font-semibold text-baltic-blue mb-1">{label}</div>
              {isLongText ? (
                <div className="max-h-32 overflow-y-auto border border-gray-100 rounded p-2 whitespace-pre-wrap break-words">
                  {formattedValue}
                </div>
              ) : (
                <div className="break-words">{formattedValue}</div>
              )}
            </div>
          );
        })}
        
        {/* Group 4: Inne informacje */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-4 mt-4">
          <h3 className="font-bold text-baltic-blue border-b pb-1 mb-2">Inne informacje</h3>
        </div>
        
        {/* Other fields, only display if they have values */}
        {Object.entries(formFieldLabels)
          .filter(([key]) => !['firstName', 'lastName', 'companyName', 'nip', 'email', 'phone', 'street', 'city', 'postalCode', 'category', 'products', 'location1', 'location2', 'location3', 'tent'].includes(key))
          .map(([key, label]) => {
            const value = submission[key as keyof FormData];
            const formattedValue = formatValue(value);
            
            if (formattedValue === '') return null;
            
            const isLongText = typeof formattedValue === 'string' && formattedValue.length > 50;
            
            return (
              <div key={key} className={`bg-white rounded-md p-3 border border-gray-100 shadow-sm ${isLongText ? 'col-span-1 sm:col-span-2 lg:col-span-3' : ''}`}>
                <div className="font-semibold text-baltic-blue mb-1">{label}</div>
                {isLongText ? (
                  <div className="max-h-32 overflow-y-auto border border-gray-100 rounded p-2 whitespace-pre-wrap break-words">
                    {formattedValue}
                  </div>
                ) : (
                  <div className="break-words">{formattedValue}</div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailedView;
