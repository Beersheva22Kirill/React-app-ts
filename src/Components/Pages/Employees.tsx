import { Alert, Box, Typography} from "@mui/material"
import { useEffect, useState } from "react";
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
import UserData from "../../Model/UserData";




const Employees: React.FC = () => {
    
    const dispatch = useDispatch()
    const [employees,setEmployees] = useState<Employee[]>([])
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
                    <GridActionsCellItem onClick={() => deleteEmployee(params.id)} icon={<DeleteIcon/>} label="Delete"/>
                ]
            })
        }
    
        return columns

    }

    async function deleteEmployee(id:GridRowId){
        const codeAlert: CodePayload = {code:CodeType.OK,message:''}
        const response = await employeesService.deleteEmployee(id)
        if(typeof response === 'string'){
            if(response.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + response
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + response
            }   
        } else {
            codeAlert.message = `Emploee with id: ${id} deleted`
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
    return (
        <Box sx={{ height: "80vh", width: '100vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <DataGrid style={{width:'80vw'}}
            rows={employees}
            columns={columns}/>
        </Box>
      );
}

export default Employees;