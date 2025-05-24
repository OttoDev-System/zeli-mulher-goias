import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, FileText, LogOut, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoZeli from '@/assets/logo/logo_Zeli.png';

const AdminDashboardPage = () => {
  const { user, signOut } = useAuth();

  const menuItems = [
    {
      title: 'Agenda',
      description: 'Gerenciar eventos e compromissos públicos',
      icon: CalendarDays,
      link: '/admin/agenda'
    },
    {
      title: 'Leis e Projetos',
      description: 'Administrar leis e projetos legislativos',
      icon: FileText,
      link: '/admin/leis-projetos'
    },
    {
      title: 'Usuários',
      description: 'Gerenciar usuários do painel administrativo',
      icon: Users,
      link: '/admin/usuarios'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={logoZeli} alt="Logo Dra. Zeli" className="w-10 h-10 object-contain" />
            <h1 className="text-xl font-bold text-zeli-gray">Painel Administrativo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Olá, {user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl">
                  <item.icon className="h-5 w-5 mr-2 text-zeli-yellow" />
                  {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full mt-2">
                  <Link to={item.link}>Acessar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-white shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Deputada Zeli - Painel Administrativo
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboardPage; 