import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'O Mandato', href: '/mandato' },
    { name: 'Leis e Projetos', href: '/leis-projetos' },
    { name: 'Procuradoria da Mulher', href: '/procuradoria' },
    { name: 'Agenda Pública', href: '/agenda' },
    { name: 'Mídia e Imprensa', href: '/midia' },
    { name: 'Participe', href: '/participe' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-zeli-yellow rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-zeli-gray">Deputada Zeli</h1>
              <p className="text-sm text-gray-600">Mulher de Palavra</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-zeli-gray hover:text-zeli-yellow font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button className="bg-zeli-yellow hover:bg-yellow-600 text-white">
              Fale Conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-zeli-gray hover:text-zeli-yellow font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-zeli-yellow hover:bg-yellow-600 text-white mt-4">
                Fale Conosco
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
