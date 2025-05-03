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
  
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 text-baltic-blue">Szczegóły zgłoszenia</h2>
      <div className="space-y-8">
        {/* Company Information Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-baltic-blue">
              Informacje o firmie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldItem label={formFieldLabels.companyName} value={formatValue(submission.companyName)} />
              <FieldItem label={formFieldLabels.nip} value={formatValue(submission.nip)} />
              <FieldItem label={formFieldLabels.firstName} value={formatValue(submission.firstName)} />
              <FieldItem label={formFieldLabels.lastName} value={formatValue(submission.lastName)} />
            </div>
          </CardContent>
        </Card>
        
        {/* Contact Information Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-baltic-blue">
              Dane kontaktowe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldItem label={formFieldLabels.email} value={formatValue(submission.email)} />
              <FieldItem label={formFieldLabels.phone} value={formatValue(submission.phone)} />
            </div>
          </CardContent>
        </Card>
        
        {/* Address Information Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-baltic-blue">
              Adres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldItem label={formFieldLabels.street} value={formatValue(submission.street)} />
              <FieldItem label={formFieldLabels.city} value={formatValue(submission.city)} />
              <FieldItem label={formFieldLabels.postalCode} value={formatValue(submission.postalCode)} />
            </div>
          </CardContent>
        </Card>
        
        {/* Booth Information Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-baltic-blue">
              Informacje o stoisku
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldItem label={formFieldLabels.category} value={formatValue(submission.category)} />
              <FieldItem label={formFieldLabels.tent} value={formatValue(submission.tent)} />
              <FieldItem label={formFieldLabels.location1} value={formatValue(submission.location1)} />
              <FieldItem label={formFieldLabels.location2} value={formatValue(submission.location2)} />
              <FieldItem label={formFieldLabels.location3} value={formatValue(submission.location3)} />
            </div>
          </CardContent>
        </Card>
        
        {/* Products Information Card - Full width for long text */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-baltic-blue">
              Asortyment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldItem 
              label={formFieldLabels.products} 
              value={formatValue(submission.products)} 
              isLongText={true} 
            />
          </CardContent>
        </Card>
        
        {/* Other Information Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-baltic-blue">
              Dodatkowe informacje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {Object.keys(formFieldLabels)
                .filter(key => ![
                  'firstName', 'lastName', 'companyName', 'nip', 'email', 'phone',
                  'street', 'city', 'postalCode', 'category', 'products',
                  'location1', 'location2', 'location3', 'tent'
                ].includes(key))
                .map(key => {
                  const value = submission[key as keyof FormData];
                  const formattedValue = formatValue(value);
                  
                  if (!formattedValue) return null;
                  
                  const label = formFieldLabels[key as keyof typeof formFieldLabels];
                  const isLongText = typeof formattedValue === 'string' && formattedValue.length > 50;
                  
                  return (
                    <FieldItem 
                      key={key} 
                      label={label} 
                      value={formattedValue} 
                      isLongText={isLongText} 
                    />
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailedView;
