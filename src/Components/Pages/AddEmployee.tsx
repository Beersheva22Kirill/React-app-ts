
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
        try {
            const response = await employeesService.addEmployee(employee)
            codeAlert.message = `Employee with id: ${response.id} added`
        } catch (error:any) {
            if(error.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + error
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + error
            }
        }
    
        dispatch(codeAction.set(codeAlert))
          
    }

    return <Box>
                <EmployeeForm callback={callbackFn}></EmployeeForm>
            </Box>
    
}

export default AddEmployee;