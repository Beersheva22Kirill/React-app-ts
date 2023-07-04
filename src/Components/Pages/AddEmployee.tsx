
import EmployeeForm from "../Forms/EmployeeForm";
import configEmpl from "../../Config/employee-config.json"
import Employee from "../../Model/Employee";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import {employeesService} from "../../Config/service-configuration"
import {authService} from "../../Config/service-configuration"
import { useDispatch } from "react-redux";
import { Alert, Box } from "@mui/material";

import { CodePayload } from "../../Model/CodePayload";
import CodeType from "../../Model/CodeType";
import { codeAction } from "../../Redux/Slices/codeSlice";


const AddEmployee: React.FC = () => {
    const dispatch = useDispatch()


    async function callbackFn(employee:Employee){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        
        const response = await employeesService.addEmployee(employee)
        if(typeof response === 'string'){
            if(response.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + response
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + response
            }
               
        } else {
            codeAlert.message = `Emploee with id: ${response.id} added`
        
        }
        dispatch(codeAction.set(codeAlert))
          
    }

    return <Box>
                <EmployeeForm callback={callbackFn} items={configEmpl.departments}></EmployeeForm>
            </Box>
    
}

export default AddEmployee;