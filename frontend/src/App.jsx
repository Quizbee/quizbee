import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import RootLayout from './pages/RootLayout';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import FullDeckPage from './pages/FullDeckPage';
import StudyPage from './pages/StudyPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: '/login', element: <AuthPage /> },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/decks/:deckId',
        element: (
          <ProtectedRoute>
            <FullDeckPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/decks/:deckId/study',
        element: (
          <ProtectedRoute>
            <StudyPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
