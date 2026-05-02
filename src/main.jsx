import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Root/RootLayout';
import Home from './components/Home/Home';
import AllProducts from './components/AllProducts/AllProducts';
import AuthProvider from './context/AuthProvider';
import Register from './components/Register/Register';
import LatestProducts from './components/LatestProducts/LatestProducts';
import Login from './components/Login/Login';
import ProductDetails from './components/ProductDetails/ProductDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MyBids from './components/MyBids/MyBids';
import BidForm from './components/CreateABid.jsx/BidForm';
import AddProduct from './components/AddProduct/AddProduct';


const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children:[
      {
        index: true,
        Component: Home,
      },
      {
        path: '/allProducts',
        element: <PrivateRoute>
          <AllProducts></AllProducts>
        </PrivateRoute>,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: `/productDetails/:id`,
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:3000/api/product/${params.id}`)
      },
      {
        path: '/myBids',
        element: <PrivateRoute>
          <MyBids></MyBids>
        </PrivateRoute>
      },
      {
        path: '/addProduct',
        element: <PrivateRoute>
          <AddProduct></AddProduct>
        </PrivateRoute>,
      },
      
    ]
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
