import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Components/Pages/SignIn";
import SignOut from "./Components/Pages/SignOut";
import NotFound from "./Components/Pages/NotFound";
import { useSelectorUserState } from "./Redux/store";
import { useEffect, useMemo, useState } from "react";
import "./App.css"
import { getMenuItem } from "./services/AuthService";
import NavigatorDispather from "./Components/Navigators/NavigatorDispather";
import UserData from "./Model/UserData";
import Employees from "./Components/Pages/Employees";
import AddEmployee from "./Components/Pages/AddEmployee";
import AgeStatistics from "./Components/Pages/AgeStatistics";
import SalaryStatistics from "./Components/Pages/SalaryStatistics";

const App: React.FC = () => {

  const currentUser:UserData = useSelectorUserState()
  const menuItems = useMemo(() => getMenuItem(currentUser), [currentUser])
  
  return  <BrowserRouter>
            <Routes>    
            <Route path ='/' element = {<NavigatorDispather navItem={menuItems}/>}>
                <Route path="Employees" element = {<Employees/>}/>
                <Route path="AddEmployee" element = {<AddEmployee/>}/>
                <Route path="statistics/age" element = {<AgeStatistics/>}/>
                <Route path="statistics/salary" element = {<SalaryStatistics/>}/>
                <Route path="SignIn" element = {<SignIn></SignIn>}/>
                <Route path="SignOut" element = {<SignOut></SignOut>}/>
                <Route path="/*" element = {<NotFound></NotFound>}></Route>
              </Route>
            </Routes>
          </BrowserRouter> 
            
         
}

export default App;

