import { Box} from "@mui/material"
import { ReactNode, useEffect, useState } from "react";
import Employee from "../../Model/Employee";
import { employeesService } from "../../Config/service-configuration";
import {Subscription} from 'rxjs'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
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

function getColumns(currentUser:UserData,columnsAdmin:GridColDef){
        
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'NAME', flex: 0.2, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        { field: 'gender', headerName: 'GENDER' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', sortable:false},
        { field: 'birthDate', headerName: 'DATE', type: 'date',flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        { field: 'salary', headerName: 'SALARY', type: 'number' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'department', headerName: 'DEPARTMENT', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},   
    ]
    if(currentUser.role === 'admin') {
        columns.push(columnsAdmin)
    }

    return columns

}

function setErrorMessage(error: any, codeAlert: CodePayload) {
    if (error.includes('Authentification')) {
        codeAlert.code = CodeType.AUTH_ERROR;
        codeAlert.message = 'Authentification error:' + error;
    } else {
        codeAlert.code = CodeType.SERVER_ERROR;
        codeAlert.message = "Server error: " + error;
    }
}


const Employees: React.FC = () => {

    const columnsAdmin:GridColDef = {
        field: 'actions',headerName: '', type: 'actions',flex:0.2,
        getActions: (params:GridRowParams) => [
            <GridActionsCellItem onClick={() => {openEditForm(params.id)}} icon={<EditIcon/>} label="Edit"/>,
            <GridActionsCellItem onClick={() => openConfirm(params.id)} icon={<DeleteIcon/>} label="Delete"/> 
        ]
    }
    
    const dispatch = useDispatch()
    const [employees,setEmployees] = useState<Employee[]>([])

    const [titleConfirm, setTitleConfirm] = useState<string>('')
    const [contentConfirm, setContentConfirm] = useState<string>('')
    const [activeConfirmation, setActiveConfirmation] = useState<boolean>(false)
    const [idCurrEmpl, setIdCurrEmpl] = useState<GridRowId>(0);

    const [activeModalWindow, setActiveModalWindow] = useState<boolean>(false)
    const [formEmployee, setFormEmployee] = useState<ReactNode>()
   
    const currentUser = useSelectorUserState();
    const columns: GridColDef[] = getColumns(currentUser,columnsAdmin)

    async function openEditForm(id:GridRowId) {
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        try {
            const employee:Employee = await employeesService.getEmployee(id)
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
        } catch (error:any) {
            setErrorMessage(error, codeAlert);  
        }
        dispatch(codeAction.set(codeAlert))
    }

    async function updateEmployee(employee:Employee, id:any){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        try {
            const response = await employeesService.updateEmploee(id,employee)
            codeAlert.message = `Emploee with id: ${id} updated`
        } catch (error:any) {
            setErrorMessage(error, codeAlert);   
        }
        dispatch(codeAction.set(codeAlert))
       
    }

    async function openConfirm(id:GridRowId){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        try {
            const employee:Employee = await employeesService.getEmployee(id)
            setTitleConfirm(`Remove employee ${employee.name} with id: ${employee.id} from table`)
            setContentConfirm('Recovering is not possible after deleting employee')
            setIdCurrEmpl(id)
            setActiveConfirmation(true)
        } catch (error:any) {
            setErrorMessage(error, codeAlert);   
        }
       
        dispatch(codeAction.set(codeAlert))
    }

    async function deleteEmployee(){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        try {
            const response = await employeesService.deleteEmployee(idCurrEmpl)
        } catch (error:any) {
            setErrorMessage(error, codeAlert);   
        }
        dispatch(codeAction.set(codeAlert))
        
    }
    
    useEffect(() => {
       
       const subscription:Subscription = employeesService.getEmployees().subscribe({
        next(employeesArr:Employee[]|string) {
            const codeAlert: CodePayload = {code:CodeType.OK,message:''}
            if (typeof employeesArr === 'string') {
                if(employeesArr.includes('Authentification')) {
                    codeAlert.code = CodeType.AUTH_ERROR
                    codeAlert.message = employeesArr
                } else {
                    codeAlert.code = CodeType.SERVER_ERROR
                    codeAlert.message = employeesArr 
                }
                
            } else {  
                setEmployees(employeesArr.map(e => ({...e,birthDate: new Date(e.birthDate)})))
            }
            dispatch(codeAction.set(codeAlert))
            
        }
       })
       return () => subscription.unsubscribe();
    },[])

    return (<Box>
            <ModalWindow active ={activeModalWindow} element = {formEmployee} setActive={setActiveModalWindow}></ModalWindow>
            <Confirmation callbackAgree={deleteEmployee} active ={activeConfirmation} setActive={setActiveConfirmation} content = {contentConfirm} question = {titleConfirm}></Confirmation>
                <Box sx={{ height: "80vh", width: '100vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <DataGrid style={{width:'90vw'}}
                        rows={employees}
                        columns={columns}/>
                </Box>
        </Box>
       
      );
}

export default Employees;


