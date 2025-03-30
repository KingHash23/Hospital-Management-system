import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import AppointmentList from './components/AppointmentList';
import DoctorList from './components/DoctorList';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HMS</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        <div className="px-4 py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Signed in as</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400"
          >
            Sign out
          </button>
        </div>
        <nav className="mt-4">
          {[
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Patients', path: '/patients' },
            { name: 'Doctors', path: '/doctors' },
            { name: 'Appointments', path: '/appointments' },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Hospital Management System
            </h1>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <PrivateRoute>
                  <Layout>
                    <PatientList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/doctors"
              element={
                <PrivateRoute>
                  <Layout>
                    <DoctorList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <PrivateRoute>
                  <Layout>
                    <AppointmentList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}