
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-baltic-beige px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-baltic-blue text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Lock size={24} />
            Panel administracyjny
          </CardTitle>
          <CardDescription className="text-gray-200">
            Proszę podać dane logowania
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nazwa użytkownika</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ukryj" : "Pokaż"}
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-baltic-blue hover:bg-baltic-orange">
              Zaloguj
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => navigate('/')}>
            Powrót do formularza
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
