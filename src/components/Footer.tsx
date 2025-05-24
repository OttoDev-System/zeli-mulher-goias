
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, MessageSquare, Users, Calendar, FileText } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'O Mandato', href: '/mandato', icon: Users },
    { name: 'Leis e Projetos', href: '/leis', icon: FileText },
    { name: 'Procuradoria da Mulher', href: '/procuradoria', icon: Users },
    { name: 'Agenda Pública', href: '/agenda', icon: Calendar }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', color: 'text-blue-600' },
    { name: 'Instagram', href: '#', color: 'text-pink-600' },
    { name: 'Twitter', href: '#', color: 'text-blue-400' },
    { name: 'YouTube', href: '#', color: 'text-red-600' }
  ];

  return (
    <footer className="bg-zeli-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-zeli-yellow rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Deputada Zeli</h3>
                <p className="text-sm text-gray-300">Atuante, forte e de palavra</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Trabalhando por um Goiás mais justo, transparente e próspero. 
              Representando o Entorno do DF com dedicação e compromisso.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-zeli-yellow transition-colors duration-200 flex items-center space-x-2"
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-zeli-yellow mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p>Assembleia Legislativa de Goiás</p>
                  <p>Rua da Assembleia, s/n</p>
                  <p>Setor Central, Goiânia - GO</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-zeli-yellow" />
                <span className="text-sm text-gray-300">(62) 3261-8000</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-zeli-yellow" />
                <span className="text-sm text-gray-300">gabinete@deputadazeli.com.br</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-zeli-yellow hover:text-white hover:border-zeli-yellow"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.name}
                  </a>
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Newsletter</h5>
              <p className="text-xs text-gray-400 mb-3">
                Receba atualizações do mandato
              </p>
              <Button size="sm" className="bg-zeli-yellow hover:bg-yellow-600 text-white w-full">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2023 Deputada Zeli. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacidade" className="text-sm text-gray-400 hover:text-zeli-yellow">
              Política de Privacidade
            </Link>
            <Link to="/transparencia" className="text-sm text-gray-400 hover:text-zeli-yellow">
              Transparência
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
