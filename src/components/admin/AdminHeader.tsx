
import React from 'react';
import { Button } from '@/components/ui/button';
import { DoorOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
  title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  const { logout } = useAuth();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-baltic-blue">{title}</h1>
      <Button 
        onClick={logout}
        variant="outline" 
        className="bg-white hover:bg-gray-100 text-baltic-blue border-baltic-blue hover:text-baltic-orange flex items-center gap-2"
      >
        <DoorOpen className="h-4 w-4" />
        Wyloguj się
      </Button>
    </div>
  );
};

export default AdminHeader;
