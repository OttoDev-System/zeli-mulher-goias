import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EventoForm from '@/components/admin/EventoForm';
import { useAuth } from '@/contexts/AuthContext';

const EditarEventoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  if (!id) {
    return <div>ID de evento não fornecido</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/admin/agenda" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Agenda</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Evento</h1>
          <EventoForm eventoId={id} />
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

export default EditarEventoPage; 