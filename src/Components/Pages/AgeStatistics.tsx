import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography, useMediaQuery, useTheme} from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import config from "../../Config/statistics-config.json"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { employeesService } from "../../Config/service-configuration";
import {useDispatch } from "react-redux";
import Employee from "../../Model/Employee";
import { CodePayload } from "../../Model/CodePayload";
import CodeType from "../../Model/CodeType";
import { codeAction } from "../../Redux/Slices/codeSlice";
import { Subscription } from "rxjs/internal/Subscription";
import { count } from "../../utils/numbers";
import Chart from "../common/Chart";


const AgeStatistics: React.FC = () => {
    
    const dispatch = useDispatch()

    const [interval, setInterval] = useState<number>(0)
    const [employees,setEmployees] = useState<Employee[]>([])
    const [dataFOrChart,setDataForChart] = useState<number[][]>([[]])
    const rows = useMemo(() => getStatistic(),[interval,employees])


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center',sortable:false},
        { field: 'min', headerName: 'MIN', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center',sortable:false},
        { field: 'max', headerName: 'MAX', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', sortable:false},
        { field: 'count', headerName: 'COUNT', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center',sortable:false},
    ]


    const handleChange = (event: SelectChangeEvent) => {
        setInterval(event.target.value as unknown as number);
        console.log(interval);
        
    };

    function getStatistic(){
        const currentYear = new Date().getFullYear();
        const ages = employees.map(e => {
            const date = new Date(e.birthDate);
            return {'age': currentYear - date.getFullYear()}
        });
        const statisticsObj = count(ages, "age", interval);

        const rows = Object.entries(statisticsObj).map((e,index) => {            
              const min = Number.parseInt(e[0]) * interval;
              const max = min + interval - 1;
              return {id:index + 1,min, max, count: e[1]}
         })


        getDataForCharts(rows)
        return rows
    }

    function getDataForCharts(rows:any){
        console.log(rows);
        let age = 0
        let data:number[][] = [[0,0]]
        if(rows.length > 0){
            const end = rows[rows.length - 1].max;
            const countInterval = Math.trunc(end/interval) + 1
            Array.from({length:countInterval}).forEach( el => { 
                age += interval; 
                let count 
                let index = 0
                while(count == undefined && index < rows.length){
                    if(rows[index].max >= age && rows[index].min <= age ){
                        count = rows[index].count
                    }
                    index++;
                }
                count != undefined && data.push([age,count])
            })
        }
        setDataForChart(data)
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

    const theme = useTheme();
    const rotateDisplay = useMediaQuery(theme.breakpoints.between('sm','md'));

    return <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center', marginTop: 0}}>
            <Box sx={{width: "90vw"}}>
            <Grid sx={{display:"flex",alignItems:'center'}} container spacing={2} justifyContent="center">
                <Grid item xs={11} sm = {6}>
                    <Typography style={{fontSize: rotateDisplay ? '1em' : '2em'}} variant = 'h3' align="center">Age statistics page</Typography>
                </Grid>
                <Grid item xs={11} sm = {6} md = {11}>
                    <FormControl sx={{marginTop: 1, marginBottom:'2vh'}} fullWidth>
                        <InputLabel id="demo-simple-select-label">Age interval</InputLabel>
                            <Select sx={{width:"300px", }}
                                    name="age-interval"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age interval"
                                    defaultValue = ''
                                    onChange={handleChange} required>
                                    {config.age_intervals.map((item:number) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                            </Select>
                    </FormControl>
                </Grid>
             
            </Grid>
            
            </Box>
            <Box>
                {interval > 0 && 
                                <Grid sx={{marginTop: '2vh',display:"flex",alignItems:'baseline', height:'70vh', overflowY: 'auto'}} container spacing={4} justifyContent="center">  
                                        <Grid item xs={10} sm = {6}>
                                            <DataGrid columns={columns} rows={rows}></DataGrid>
                                        </Grid>
                                    
                                    <Grid item xs={10} sm = {6}>
                                        <Paper sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                            }}>
                                           <Chart dataArray={dataFOrChart}/>
                                        </Paper>
                                    </Grid>
                                </Grid>}
            </Box>
            </Box>
          
}

export default AgeStatistics;