import React from 'react';
import { FormData, formFieldLabels } from '@/utils/formUtils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  
  const FieldItem = ({ label, value, isLongText = false }: { label: string, value: string, isLongText?: boolean }) => {
    if (!value) return null;
    
    return (
      <div className="bg-white rounded-md p-3 border border-gray-100 shadow-sm">
        <div className="text-xs font-semibold text-gray-500 mb-1">{label}</div>
        {isLongText ? (
          <div className="max-h-48 overflow-y-auto border border-gray-100 rounded p-2 bg-white text-sm text-gray-900 whitespace-pre-wrap break-words">
            {value}
          </div>
        ) : (
          <div className="text-sm text-gray-900 break-words">{value}</div>
        )}
      </div>
    );
  };
  
  const InfoSection = ({ title, fields, excludeFields = [] }: { 
    title: string, 
    fields: string[],
    excludeFields?: string[]
  }) => {
    const filteredFields = fields.filter(key => !excludeFields.includes(key));
    
    return (
      <>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4 mt-4">
          <h3 className="font-bold text-baltic-blue border-b pb-1 mb-2">{title}</h3>
        </div>
        
        {filteredFields.map((key) => {
          const value = submission[key as keyof FormData];
          const formattedValue = formatValue(value);
          const label = formFieldLabels[key as keyof typeof formFieldLabels];
          
          if (formattedValue === '') return null;
          
          const isLongText = typeof formattedValue === 'string' && formattedValue.length > 50;
          
          return (
            <div key={key} className={`${isLongText ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}`}>
              <FieldItem 
                label={label} 
                value={formattedValue} 
                isLongText={isLongText} 
              />
            </div>
          );
        })}
      </>
    );
  };
  
  return (
    <div className="w-full px-6 py-4 bg-gray-50 rounded-md border border-gray-200 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {/* Company Information */}
        <InfoSection 
          title="Informacje podstawowe"
          fields={['firstName', 'lastName', 'companyName', 'nip', 'email', 'phone']}
        />
        
        {/* Address Information */}
        <InfoSection 
          title="Adres"
          fields={['street', 'city', 'postalCode']}
        />
        
        {/* Booth Information */}
        <InfoSection 
          title="Informacje o stoisku"
          fields={['category', 'location1', 'location2', 'location3', 'tent']}
        />
        
        {/* Products section - detailed view of products */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <FieldItem 
            label={formFieldLabels.products}
            value={formatValue(submission.products)}
            isLongText={true}
          />
        </div>
        
        {/* Other Information */}
        <InfoSection 
          title="Inne informacje"
          fields={Object.keys(formFieldLabels)}
          excludeFields={['firstName', 'lastName', 'companyName', 'nip', 'email', 'phone', 
                        'street', 'city', 'postalCode', 'category', 'products', 
                        'location1', 'location2', 'location3', 'tent']}
        />
      </div>
    </div>
  );
};

export default DetailedView;
