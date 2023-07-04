import { Alert, Box, Typography} from "@mui/material"
import { ReactNode, useEffect, useState } from "react";
import Employee from "../../Model/Employee";
import { authService, employeesService } from "../../Config/service-configuration";
import {Subscription} from 'rxjs'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import { StatusType } from "../../Model/StatusType";
import { CodePayload } from "../../Model/CodePayload";
import CodeType from "../../Model/CodeType";
import { codeAction } from "../../Redux/Slices/codeSlice";
import { useSelectorUserState } from "../../Redux/store";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserData from "../../Model/UserData";
import Confirmation from "../common/Confirmation";
import ModalWindow from "../common/ModalWindow";
import EmployeeForm from "../Forms/EmployeeForm";
import dayjs from "dayjs";




const Employees: React.FC = () => {
    
    const dispatch = useDispatch()
    const [employees,setEmployees] = useState<Employee[]>([])

    const [titleConfirm, setTitleConfirm] = useState<string>('')
    const [contentConfirm, setContentConfirm] = useState<string>('')
    const [activeConfirmation, setActiveConfirmation] = useState<boolean>(false)
    const [idCurrEmpl, setIdCurrEmpl] = useState<GridRowId>(0);

    const [activeModalWindow, setActiveModalWindow] = useState<boolean>(false)
    const [formEmployee, setFormEmployee] = useState<ReactNode>()
   
    const currentUser = useSelectorUserState();
    const columns: GridColDef[] = getColumns(currentUser)


    function getColumns(currentUser:UserData){
        
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 0.1, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
            { field: 'name', headerName: 'NAME', flex: 0.8, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
            { field: 'gender', headerName: 'GENDER' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
            { field: 'birthDate', headerName: 'DATE', type: 'date',flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
            { field: 'salary', headerName: 'SALARY', type: 'number' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
            { field: 'department', headerName: 'DEPARTMENT',flex: 0.5, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},   
        ]
        if(currentUser.role === 'admin') {
            columns.push({
                field: 'actions',headerName: 'ACTIONS', type: 'actions',  
                getActions: (params:GridRowParams) => [
                    <GridActionsCellItem onClick={() => {openEditForm(params.id)}} icon={<EditIcon/>} label="Edit"/>,
                    <GridActionsCellItem onClick={() => openConfirm(params.id)} icon={<DeleteIcon/>} label="Delete"/> 
                ]
            })
        }
    
        return columns

    }

    async function openEditForm(id:GridRowId) {
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        const employee:Employee|string = await employeesService.getEmployee(id)
        if (typeof employee != 'string'){
            const birtDateJS = dayjs(new Date(employee.birthDate))
            console.log(birtDateJS)
            const form:ReactNode = <EmployeeForm 
                                        defNameValue={employee.name}
                                        defBirthDate={birtDateJS}
                                        defGender={employee.gender}
                                        defSalary={employee.salary}
                                        defDepartment={employee.department}
                                        id={id}
                                        callback={updateEmployee}
                                        modalClose={setActiveModalWindow}/>
            setFormEmployee(form);
            setActiveModalWindow(true);
        } else {
            if(employee.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + employee
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + employee
            }   
        }
        dispatch(codeAction.set(codeAlert))
    }

    async function updateEmployee(employee:Employee, id:any){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        const response = await employeesService.updateEmploee(id,employee)
        if(typeof response === 'string'){
            if(response.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + response
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + response
            }   
        } else {
            codeAlert.message = `Emploee with id: ${id} updated`
        }
        dispatch(codeAction.set(codeAlert))
        console.log(employee);

        
    }

    async function openConfirm(id:GridRowId){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        const employee:Employee|string = await employeesService.getEmployee(id)
        if(typeof employee != 'string'){
            setTitleConfirm(`Remove employee ${employee.name} with id: ${employee.id} from table`)
            setContentConfirm('Recovering is not possible after deleting employee')
            setIdCurrEmpl(employee.id)
            setActiveConfirmation(true)
        } else {
            if(employee.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + employee
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + employee
            }   
        }
        dispatch(codeAction.set(codeAlert))
    }

    async function deleteEmployee(){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        const response = await employeesService.deleteEmployee(idCurrEmpl)
        if(typeof response === 'string'){
            if(response.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + response
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + response
            }   
        } else {
            codeAlert.message = `Emploee with id: ${idCurrEmpl} deleted`
        }
        dispatch(codeAction.set(codeAlert))
        
    }
    
    useEffect(() => {
       const codeAlert: CodePayload = {code:CodeType.OK,message:''}
       const subscription:Subscription = employeesService.getEmployees().subscribe({
        next(employeesArr:Employee[]|string) {
            if (typeof employeesArr === 'string') {
                if(employeesArr.includes('Authentification')) {
                    codeAlert.code = CodeType.AUTH_ERROR
                    codeAlert.message = employeesArr
                    dispatch(codeAction.set(codeAlert))
                } else {
                    codeAlert.code = CodeType.SERVER_ERROR
                    codeAlert.message = employeesArr
                    dispatch(codeAction.set(codeAlert))
                }
                
            } else {
                codeAlert.message = 'data loaded into table'
                dispatch(codeAction.set(codeAlert))
                setEmployees(employeesArr.map(e => ({...e,birthDate: new Date(e.birthDate)})))
            }
            
            
        }
       })
       return () => subscription.unsubscribe();
    },[])
    return (<Box>
            <ModalWindow active ={activeModalWindow} element = {formEmployee} setActive={setActiveModalWindow}></ModalWindow>
            <Confirmation callbackAgree={deleteEmployee} active ={activeConfirmation} setActive={setActiveConfirmation} content = {contentConfirm} question = {titleConfirm}></Confirmation>
                <Box sx={{ height: "80vh", width: '100vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <DataGrid style={{width:'80vw'}}
                        rows={employees}
                        columns={columns}/>
                </Box>
        </Box>
       
      );
}

export default Employees;