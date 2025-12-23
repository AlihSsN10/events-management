import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import BookDetailsPage from './Pages/BookDetailsPage'
import Login from './Pages/Login'
import WishList from './Pages/WishList'
import ReviewsPage from './Pages/ReviewsPage'
import SignUp from './Pages/SignUp'
import NotFoundPage from './Pages/NotFoundPage'
import Layout from './Layout/Layout'
import ProfilePage from './Pages/ProfilePage'
import HomePage from './Pages/HomePage'
import BookPage from './Pages/BookPage'
import Cart from './Pages/Cart'
import { Toaster } from 'react-hot-toast';
import PaymentPage from './Pages/PatmentPage'

// إنشاء الراوتر
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "book-details", element: <BookDetailsPage /> },
      { path: "booking", element: <BookPage /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "wishlist", element: <WishList /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <NotFoundPage /> }, 
      { path: "payment", element: <PaymentPage /> }, 
    ],
  },
]);

export default function App() {
  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={router} />
        
    </>
  )
}