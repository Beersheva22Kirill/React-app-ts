
import Input from "../common/Input";
import InputResult from "../../Model/InputResult";
import { getRandomEmployee } from "../../utils/RandomEmployee";
import config from "../../Config/employee-config.json"
import {employeesService} from "../../Config/service-configuration"
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { codeAction } from "../../Redux/Slices/codeSlice";
import { CodePayload } from "../../Model/CodePayload";
import CodeType from "../../Model/CodeType";
import Employee from "../../Model/Employee";


const Generation: React.FC = () => {
    const dispatch = useDispatch()
    const codeAlert: CodePayload = {code:CodeType.OK,message:'Success: '}
    let error:string = '';

     async function addRandomEmployees(inputText:string) {
        const codeAlert: CodePayload = {code:CodeType.OK,message:'Success: '}
        const count = Number.parseInt(inputText)
        if (count > 0 && count < 6) {
        const employees:Employee[] = Array.from({length:count}).map(() => getRandomEmployee(config.minSalary,config.maxSalary,config.minYear,config.maxYear,config.departments) )
        for (let index = 0; index < count; index++) {
            try {
                const empl = await employeesService.addEmployee(employees[index])
                codeAlert.message += `employee id:${empl.id} added/`
            } catch (error:any) {
                if (error.includes('Authentification')){
                    codeAlert.code = CodeType.AUTH_ERROR;
                    codeAlert.message = error
                } else {
                    codeAlert.code = CodeType.SERVER_ERROR;
                    codeAlert.message = 'Server error:' + error
                }
            }   
        }

        } else {
            codeAlert.code = CodeType.UNKNOWN
            codeAlert.message = "Count must be 1 to 5"
        }
        dispatch(codeAction.set(codeAlert))
        
    }



   return <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
            <Input  buttonTitle="Add employees" type="number" submitFn={addRandomEmployees} placeHolder="Enter count of employees"></Input>
        </Box>
    
    
    
}

export default Generation;