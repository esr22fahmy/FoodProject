import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './SharedModule/Component/AuthLayout/AuthLayout';
import MasterLayout from './SharedModule/Component/MasterLayout/MasterLayout';
import Login from './AuthModule/Component/Login/Login';
import ForgetPass from './AuthModule/Component/ForgetPass/ForgetPass';
import Home from './HomeModule/Component/Home/Home';
import Categories from './CategoriesModule/Component/Categories/Categories';
import Recipes from './RecipesModule/Component/Recipes/Recipes';
import User from './UserModule/Component/User/User';
import NotFound from './SharedModule/Component/NotFound/NotFound';
import { jwtDecode } from 'jwt-decode';
import ProducteRoute from './SharedModule/Component/ProducteRoute/ProducteRoute';
import ResetPass from './AuthModule/Component/ResetPass/ResetPass';
import RecipesData from './RecipesModule/Component/Recipes/RecipesData';
import Register from './AuthModule/Component/Register/Register';
import { ToastContainer } from "react-toastify";
import VerifyRegister from './AuthModule/Component/VerifyRegister/VerifyRegister';
import Favorites from './Favorites/Favorites';

function App() {
  const [DataAdmin, setDataAdmin] = useState(null);

  const FunDataAdmin = () => {
    const TokenAdmin = localStorage.getItem("tokemAdmin");
      const decryToken = jwtDecode(TokenAdmin);
      setDataAdmin(decryToken);
      // console.log(DataAdmin)
      // for share data for recipes
      localStorage.setItem("dataLogin" , JSON.stringify(decryToken));

  };

  useEffect(() => {
    if(localStorage.getItem("tokemAdmin")){
    FunDataAdmin();
    }
  }, []);

  const routers = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout/>,
      children: [
        { index: true, element: <Login FunDataAdmin={FunDataAdmin}/> },
        { path: 'login', element: <Login FunDataAdmin={FunDataAdmin}/> },
        { path: 'forgetPass', element: <ForgetPass /> },
        { path: 'resetPass', element: <ResetPass /> },
        { path: 'register', element: <Register /> },
        { path: 'verifyRegister', element: <VerifyRegister/> },



      ],
    },
    {
      path: 'dashboard',
      element: <ProducteRoute DataAdmin={DataAdmin}><MasterLayout DataAdmin={DataAdmin} /></ProducteRoute>,
      children: [
        { index: true, element: <Home  DataAdmin={DataAdmin}/> },
        { path: 'home', element: <Home  DataAdmin={DataAdmin}/> },
        { path: 'recipes', element: <Recipes/> },
        { path: 'recipesData/:recipeId', element: <RecipesData/> },
        { path: 'user', element: <User /> },
        { path: 'categories', element: <Categories /> },
        { path: 'favorites', element: <Favorites /> },

      ]
    },
  ]);

  return (
   <>
   
   <ToastContainer/>
<RouterProvider router={routers} />
   
   
   
   
   
   
   </>
  );
}

export default App;
