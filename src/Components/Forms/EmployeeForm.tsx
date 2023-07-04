import { Box, Grid, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, useMediaQuery, useTheme, Snackbar, Alert} from "@mui/material";
import React from "react";
import Employee from "../../Model/Employee";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import configEmployee from "../../Config/employee-config.json"
import dayjs, { Dayjs } from "dayjs";
import { StatusType } from "../../Model/StatusType";

type Props = {
    items:string[],
    callback:(employee:Employee) => void
}

const EmployeeForm:React.FC<Props> = (props) => {
    
    const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [genderValue,setGender] = React.useState<"male"|"female">('male')

    const [dep, setDep] = React.useState('');   
      
    const handleChange = (event: SelectChangeEvent) => {
            setDep(event.target.value as string);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const employee:Employee = {
            name: `${data.get('employeeName')}`,
            gender: genderValue,
            department:`${data.get('departments')}`,
            birthDate: new Date(Number.parseFloat(dateValue + "")),
            salary: Number.parseInt(`${data.get('salary')}`),
        }
       props.callback(employee);      
      };

      const defaultTheme = createTheme();
      
      const theme = useTheme();
      const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

      

    return  <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                
                <Box sx = {{display:'flex', flexDirection: smallDisplay ? 'column' : 'row', justifyContent:'center' ,alignItems:'end'}}>
                    <TextField sx={{width: '300px', marginRight: smallDisplay ? 0 : 2}} name = "employeeName" id="filled-basic" label="name employee" variant="filled" required />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{width:"300px"}} label="Birth day"  value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider> 
                </Box>   
                <Box mt = {1} sx = {{display:'flex', flexDirection: "column", alignItems: "center"}}>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup sx={{display:'flex', flexDirection: smallDisplay ? 'column' : 'row'}}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group">
                            <FormControlLabel onClick={() => setGender("female")} value="female" control={<Radio />} label="Female" />
                            <FormControlLabel onClick={() => setGender("male")} value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                </Box>
                
                <Box sx = {{marginTop: 1, display:'flex', flexDirection: smallDisplay ? 'column' : 'row', justifyContent:'center' ,alignItems:'end'}}>
                    
                    <Box> 
                        <TextField inputProps={{ min: configEmployee.minSalary * 1000, max: configEmployee.maxSalary * 1000 }} sx={{width: '300px', marginRight: smallDisplay ? 0 : 2}} name = "salary" id="filled-basic" label="salary" type = 'number' variant="filled" required />
                    </Box>
                    <FormControl sx={{marginTop: 1}} fullWidth>
                        <InputLabel  id="demo-simple-select-label">Department</InputLabel>
                            <Select sx={{width:"300px", }}
                                    name="departments"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Department"
                                    onChange={handleChange} required>
                                    {props.items.map((item:string) => <MenuItem value={item}>{item}</MenuItem>)}
                            </Select>
                    </FormControl>
                </Box>
                <Box sx = {{display: 'flex', justifyContent: 'center'}}>
                    <Button type="submit"
                           
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}>Submit</Button>
                </Box>
        </Box>
        
                        </Box> 
                    </Container>
            </ThemeProvider>
               
                     
                    
    
            
                   
}

export default EmployeeForm;