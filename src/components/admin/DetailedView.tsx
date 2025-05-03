
import React from 'react';
import { FormData, formFieldLabels } from '@/utils/formUtils';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      <div className="mb-3">
        <div className="text-xs font-semibold text-gray-500">{label}</div>
        {isLongText ? (
          <div className="max-h-48 overflow-y-auto text-sm text-gray-900 whitespace-pre-wrap break-words">
            {value}
          </div>
        ) : (
          <div className="text-sm text-gray-900 break-words">{value}</div>
        )}
      </div>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="mb-3">
      <h3 className="text-sm font-medium text-baltic-blue">{title}</h3>
      <Separator className="mt-1" />
    </div>
  );
  
  return (
    <div className="py-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-bold mb-4 text-baltic-blue">Szczegóły zgłoszenia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Company Information Section */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <SectionTitle title="Informacje o firmie" />
              <FieldItem label={formFieldLabels.companyName} value={formatValue(submission.companyName)} />
              <FieldItem label={formFieldLabels.nip} value={formatValue(submission.nip)} />
              <FieldItem label={formFieldLabels.firstName} value={formatValue(submission.firstName)} />
              <FieldItem label={formFieldLabels.lastName} value={formatValue(submission.lastName)} />
            </CardContent>
          </Card>
          
          {/* Contact Information Section */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <SectionTitle title="Dane kontaktowe" />
              <FieldItem label={formFieldLabels.email} value={formatValue(submission.email)} />
              <FieldItem label={formFieldLabels.phone} value={formatValue(submission.phone)} />
              <FieldItem label={formFieldLabels.street} value={formatValue(submission.street)} />
              <FieldItem label={formFieldLabels.city} value={formatValue(submission.city)} />
              <FieldItem label={formFieldLabels.postalCode} value={formatValue(submission.postalCode)} />
            </CardContent>
          </Card>
          
          {/* Booth Information Section */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <SectionTitle title="Informacje o stoisku" />
              <FieldItem label={formFieldLabels.category} value={formatValue(submission.category)} />
              {submission.location1 && <FieldItem label={formFieldLabels.location1} value={formatValue(submission.location1)} />}
              {submission.location2 && <FieldItem label={formFieldLabels.location2} value={formatValue(submission.location2)} />}
              {submission.location3 && <FieldItem label={formFieldLabels.location3} value={formatValue(submission.location3)} />}
            </CardContent>
          </Card>
          
          {/* Products Information - Full width with increased height*/}
          <Card className="shadow-sm border-gray-200 md:col-span-2 lg:col-span-3">
            <CardContent className="p-4">
              <SectionTitle title="Asortyment" />
              <FieldItem 
                label={formFieldLabels.products} 
                value={formatValue(submission.products)} 
                isLongText={true} 
              />
            </CardContent>
          </Card>
          
          {/* Additional Information - Any remaining fields */}
          <Card className="shadow-sm border-gray-200 md:col-span-2 lg:col-span-3">
            <CardContent className="p-4">
              <SectionTitle title="Dodatkowe informacje" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(formFieldLabels)
                  .filter(key => ![
                    'firstName', 'lastName', 'companyName', 'nip', 'email', 'phone',
                    'street', 'city', 'postalCode', 'category', 'products',
                    'location1', 'location2', 'location3'
                  ].includes(key))
                  .map(key => {
                    const value = submission[key as keyof FormData];
                    const formattedValue = formatValue(value);
                    
                    if (!formattedValue) return null;
                    
                    const label = formFieldLabels[key as keyof typeof formFieldLabels];
                    const isLongText = typeof formattedValue === 'string' && formattedValue.length > 50;
                    
                    return (
                      <div key={key} className={isLongText ? "col-span-full" : ""}>
                        <FieldItem
                          label={label}
                          value={formattedValue}
                          isLongText={isLongText}
                        />
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
