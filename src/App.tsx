import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Orders from "./Components/Pages/Orders";
import Products from "./Components/Pages/Products";
import Customers from "./Components/Pages/Customers";
import ShoppingCart from "./Components/Pages/ShoppingCart";
import SignIn from "./Components/Pages/SignIn";
import SignOut from "./Components/Pages/SignOut";
import NotFound from "./Components/Pages/NotFound";
import { useSelectorUserState } from "./Redux/store";
import { useEffect, useMemo, useState } from "react";
import "./App.css"
import { getMenuItem } from "./services/AuthService";
import NavigatorDispather from "./Components/Navigators/NavigatorDispather";
import UserData from "./Model/UserData";

const App: React.FC = () => {

  const currentUser:UserData = useSelectorUserState()
  const menuItems = useMemo(() => getMenuItem(currentUser.role), [currentUser])
  
  return  <BrowserRouter>
            <Routes>    
            <Route path ='/' element = {<NavigatorDispather navItem={menuItems}/>}>
                <Route path="Home" element = {<Home></Home>}/>
                <Route path="Orders" element = {<Orders></Orders>}/>
                <Route path="Products" element = {<Products></Products>}/>
                <Route path="Customers" element = {<Customers></Customers>}/>
                <Route path="ShoppingCart" element = {<ShoppingCart></ShoppingCart>}/>
                <Route path="SignIn" element = {<SignIn></SignIn>}/>
                <Route path="SignOut" element = {<SignOut></SignOut>}/>
                <Route path="/*" element = {<NotFound></NotFound>}></Route>
              </Route>
            </Routes>
          </BrowserRouter> 
            
         
}

export default App;

