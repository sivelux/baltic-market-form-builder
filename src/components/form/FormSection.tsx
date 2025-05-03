
import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-baltic-blue">{title}</h2>
      {children}
    </div>
  );
};

export default FormSection;
