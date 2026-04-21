import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Clients from './pages/Clients';
import ClientForm from './pages/ClientForm';
import NotFound from './pages/NotFound';
import MainLayout from './components/MainLayout';
import { AuthProvider, useAuth } from './context/AuthContext';

// 🔒 PRIVATE ROUTES: If user is not logged in, redirect to login
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <MainLayout>{children}</MainLayout> : <Navigate to='/login' />;
};

// 🔓 PUBLIC ROUTES: If user is already logged in, redirect to home
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to='/home' />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path='/' element={<Navigate to='/home' />} />

          {/* Public Routes */}
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path='/clients'
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />

          {/* Rutas de Clientes: Usamos el mismo componente para Crear y Editar */}
          <Route
            path='/clients/new'
            element={
              <PrivateRoute>
                <ClientForm />
              </PrivateRoute>
            }
          />

          <Route
            path='/clients/edit/:id'
            element={
              <PrivateRoute>
                <ClientForm />
              </PrivateRoute>
            }
          />

          {/* 404 Not Found */}
          <Route
            path='*'
            element={
              <PrivateRoute>
                <NotFound />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
