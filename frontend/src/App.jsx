import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FrontPage from './pages/FrontPage/FrontPage';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
