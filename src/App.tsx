import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Components/Pages/SignIn";
import SignOut from "./Components/Pages/SignOut";
import NotFound from "./Components/Pages/NotFound";
import { useSelectorCode, useSelectorUserState } from "./Redux/store";
import { useEffect, useMemo, useState } from "react";
import "./App.css"
import { getMenuItem } from "./services/AuthService";
import NavigatorDispather from "./Components/Navigators/NavigatorDispather";
import UserData from "./Model/UserData";
import Employees from "./Components/Pages/Employees";
import AddEmployee from "./Components/Pages/AddEmployee";
import AgeStatistics from "./Components/Pages/AgeStatistics";
import SalaryStatistics from "./Components/Pages/SalaryStatistics";
import Generation from "./Components/Pages/Generation";
import { CodePayload } from "./Model/CodePayload";
import CodeType from "./Model/CodeType";
import { Alert } from "@mui/material";
import { StatusType } from "./Model/StatusType";
import { useDispatch } from "react-redux";
import { codeAction } from "./Redux/Slices/codeSlice";
import { authService } from "./Config/service-configuration";
import { userStateAction } from "./Redux/Slices/autorizedSlice";

const App: React.FC = () => {
  const dispath = useDispatch()
  const currentUser:UserData = useSelectorUserState()
  const menuItems = useMemo(() => getMenuItem(currentUser), [currentUser])
  const codeMessage:CodePayload = useSelectorCode();

  const [alertMessage, severity] = useMemo(() => codeProcessing(),[codeMessage]);


  function codeProcessing() {
    const res:[string,StatusType] = ['','success']
    res[1] = codeMessage.code  === CodeType.OK ? 'success' : 'error'
    res[0] = codeMessage.message
    if (codeMessage.code === CodeType.AUTH_ERROR) {
      setTimeout(() => {
        authService.logout()
        dispath(userStateAction.reset())
      },3000)
    }
    setTimeout(() => {
      dispath(codeAction.reset())
    },5000)
    return res
  }


  return  <BrowserRouter>
            <Routes>    
            <Route path ='/' element = {<NavigatorDispather navItem={menuItems}/>}>
                <Route path="Employees" element = {<Employees/>}/>
                <Route path="Generation" element = {<Generation/>}/>
                <Route path="AddEmployee" element = {<AddEmployee/>}/>
                <Route path="statistics/age" element = {<AgeStatistics/>}/>
                <Route path="statistics/salary" element = {<SalaryStatistics/>}/>
                <Route path="SignIn" element = {<SignIn></SignIn>}/>
                <Route path="SignOut" element = {<SignOut></SignOut>}/>
                <Route path="/*" element = {<NotFound></NotFound>}></Route>
              </Route>
            </Routes>
            {alertMessage != '' && <Alert severity={severity}>{alertMessage}</Alert>}
          </BrowserRouter> 
            
         
}

export default App;

