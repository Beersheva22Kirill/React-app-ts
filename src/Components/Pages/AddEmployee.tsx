
import EmployeeForm from "../Forms/EmployeeForm";
import configEmpl from "../../Config/employee-config.json"
import Employee from "../../Model/Employee";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import {employeesService} from "../../Config/service-configuration"
import {authService} from "../../Config/service-configuration"
import { useDispatch } from "react-redux";
import { Alert, Box } from "@mui/material";
import { useState } from "react";
import { StatusType } from "../../Model/StatusType";


const AddEmployee: React.FC = () => {
    const dispatch = useDispatch<any>()
    const [statusAdd,setStatusAdd] = useState<StatusType>()
    const [messageAdd,setMessageAdd] = useState<string>('')

    async function callbackFn(employee:Employee){

        const response = await employeesService.addEmployee(employee)
        if(typeof response != 'object'){
            setStatusAdd("error")
            setMessageAdd(response)
            setTimeout(() => {
                dispatch(userStateAction.setStatus({email:"unauthorized",role:"unauthorized"}))
                authService.logout()
            },3000)
            
        } else {
            setStatusAdd("success")
            setMessageAdd(`Emploee added: id of emploee: ${response.id}`)
            setTimeout(() => {
                setMessageAdd('')
            },5000)
        }

        


        
    }

    return <Box>
                <EmployeeForm callback={callbackFn} items={configEmpl.departments}></EmployeeForm>
                {messageAdd != "" && <Alert severity={statusAdd}>{messageAdd}</Alert>}
        </Box>
    
}

export default AddEmployee;