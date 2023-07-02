import { Box, Grid, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField} from "@mui/material";
import React from "react";
import Employee from "../../Model/Employee";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import configEmployee from "../../Config/employee-config.json"
import dayjs, { Dayjs } from "dayjs";

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

    return  <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                
                <Box>
                    <TextField sx={{width:"300px"}} name = "employeeName" id="filled-basic" label="name employee" variant="filled" required />
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{width:"300px"}} label="Birth day"  value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                </Box>
               
                
                <Box>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup 
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group">
                            <FormControlLabel onClick={() => setGender("female")} value="female" control={<Radio />} label="Female" />
                            <FormControlLabel onClick={() => setGender("male")} value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box sx={{
                    marginTop:1
                }}>
                    <TextField sx={{width:"300px"}} inputProps={{ min: configEmployee.minSalary * 1000, max: configEmployee.maxSalary * 1000 }} name = "salary" id="filled-basic" label="Salary" variant="filled" type="number" required/>
                </Box>
                <Box sx={{marginTop:1}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                            <Select sx={{width:"300px"}}
                                    name="departments"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Department"
                                    onChange={handleChange} required>
                                    {props.items.map((item:string) => <MenuItem value={item}>{item}</MenuItem>)}
                            </Select>
                        </FormControl>
                </Box>
                <Box>
                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>Submit</Button>
                </Box>
        </Box>
                        </Box> 
                    </Container>
            </ThemeProvider>
               
                     
                    
    
            
                   
}

export default EmployeeForm;