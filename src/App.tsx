import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "@/contexts/AuthContext";

// Páginas públicas
import Index from "./pages/Index";
import Mandato from "./pages/Mandato";
import Procuradoria from "./pages/Procuradoria";
import Agenda from "./pages/Agenda";
import { LeisProjetos } from './pages/LeisProjetos';
import NotFound from "./pages/NotFound";

// Páginas de admin
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminAgendaPage from "./pages/admin/AdminAgendaPage";
import NovoEventoPage from "./pages/admin/NovoEventoPage";
import EditarEventoPage from "./pages/admin/EditarEventoPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/mandato" element={<Mandato />} />
            <Route path="/procuradoria" element={<Procuradoria />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/leis-projetos" element={<LeisProjetos />} />
            
            {/* Rotas de autenticação */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Rotas protegidas - painel administrativo */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/agenda" element={
              <ProtectedRoute>
                <AdminAgendaPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/agenda/novo" element={
              <ProtectedRoute>
                <NovoEventoPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/agenda/editar/:id" element={
              <ProtectedRoute>
                <EditarEventoPage />
              </ProtectedRoute>
            } />
            
            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
