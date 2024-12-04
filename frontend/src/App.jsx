import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RootLayout from './pages/RootLayout';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: '/login', element: <AuthPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
