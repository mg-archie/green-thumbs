import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Error from './pages/ErrorPage';
import SearchPlants from './pages/searchPlants.jsx';
import SavedPlants from './pages/SavedPlants';
import Blogs from './pages/Blogs';


// Configure routing with browserRouter instance
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <SearchPlants />,
      },
      {
        path: '/SavedPlants',
        element: <SavedPlants />,
      },
      {
        path: '/Blogs',
        element: <Blogs />,
      },
    ],
  },
]);
// Render RouterProvider with instance
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
