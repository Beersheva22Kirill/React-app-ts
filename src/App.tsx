import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigator from "./Components/Navigators/Navigator";
import Home from "./Components/Pages/Home";
import Orders from "./Components/Pages/Orders";
import Products from "./Components/Pages/Products";
import Customers from "./Components/Pages/Customers";
import ShoppingCart from "./Components/Pages/ShoppingCart";
import SignIn from "./Components/Pages/SignIn";
import SignOut from "./Components/Pages/SignOut";
import { useSelectorUserState } from "./Redux/store";
import { useEffect, useState } from "react";
import "./App.css"
import { getMenuItem } from "./services/AuthService";

const App: React.FC = () => {
  const currentUser = useSelectorUserState()
  const [menuItems,setMenuItems] = useState<string[][]>(getMenuItem(currentUser))

  useEffect(() => {
    setMenuItems(getMenuItem(currentUser))
  },[currentUser])
 
  return  <BrowserRouter>
            <Routes>    
            <Route path ='/' element = {<Navigator navItem={menuItems}></Navigator>}>
                <Route path="Home" element = {<Home></Home>}/>
                <Route path="Orders" element = {<Orders></Orders>}/>
                <Route path="Products" element = {<Products></Products>}/>
                <Route path="Customers" element = {<Customers></Customers>}/>
                <Route path="ShoppingCart" element = {<ShoppingCart></ShoppingCart>}/>
                <Route path="SignIn" element = {<SignIn></SignIn>}/>
                <Route path="SignOut" element = {<SignOut></SignOut>}/>
              </Route>
            </Routes>
          </BrowserRouter> 
            
         
}

export default App;

