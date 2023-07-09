import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import Employee from "../../Model/Employee"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import CodeType from "../../Model/CodeType"
import { CodePayload } from "../../Model/CodePayload"
import { codeAction } from "../../Redux/Slices/codeSlice"
import { Subscription } from "rxjs/internal/Subscription"
import { employeesService } from "../../Config/service-configuration"
import { count } from "../../utils/numbers"
import config from "../../Config/statistics-config.json"


const SalaryStatistics: React.FC = () => {

    const dispatch = useDispatch()

    const [interval, setInterval] = useState<number>(0)
    const [employees,setEmployees] = useState<Employee[]>([])
    const rows = useMemo(() => getStatistic(),[interval,employees])
    

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center',sortable:false},
        { field: 'min', headerName: 'MIN', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center',sortable:false},
        { field: 'max', headerName: 'MAX', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', sortable:false},
        { field: 'count', headerName: 'COUNT',  headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center',sortable:false},
    ]


    const handleChange = (event: SelectChangeEvent) => {
        setInterval(event.target.value as unknown as number);
        console.log(interval);
        
    };

    function getStatistic(){
        const salaryes = employees.map(e => ({'salary': e.salary}));
        const statisticsObj = count(salaryes, "salary", interval);

        const rows = Object.entries(statisticsObj).map((e,index) => {            
              const min = Number.parseInt(e[0]) * interval;
              const max = min + interval - 1;
              return {id:index + 1,min, max, count: e[1]}
         })

        return rows
    }


    useEffect(() => {
        
        const subscription:Subscription = employeesService.getEmployees().subscribe({
         next(employeesArr:Employee[]|string) {
            const codeAlert: CodePayload = {code:CodeType.OK,message:''}
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
                dispatch(codeAction.set(codeAlert))
                setEmployees(employeesArr)
             }
                
         }
        })
        return () => subscription.unsubscribe();
     },[])

    return  <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant="h3" align="center">Salary statistics page</Typography>
                <Box>
                <FormControl sx={{marginTop: 1, marginBottom:'2vh'}} fullWidth>
                        <InputLabel id="demo-simple-select-label">Salary interval</InputLabel>
                        <Select sx={{width:"300px", }}
                            name="age-interval"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Salary interval"
                            defaultValue = ''
                            onChange={handleChange} required>
                            {config.salary_intervals.map((item:number) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                        </Select>
                </FormControl> 
                </Box>        
        {interval > 0 && 
         <Grid sx={{marginTop: '3vh', display:"flex",alignItems:'center'}} container spacing={4} justifyContent="center">
            <Grid style={{height:'60vh'}} item xs={11} sm = {6}>
                <DataGrid columns={columns} rows={rows}></DataGrid>
            </Grid>
        </Grid>}
        </Box>
}

export default SalaryStatistics;
