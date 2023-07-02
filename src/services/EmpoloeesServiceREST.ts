import Employee from "../Model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";



export default class EmployeesServeceREST implements EmployeesService{
      
    constructor(private URL:string) {

    }

    async  addEmployee(employee: Employee): Promise<Employee> {
        const token = localStorage.getItem(AUTH_DATA_JWT)
        const response = await fetch(this.URL,{
            method: 'POST',
            headers: {"Content-Type":"application/json", 
            Authorization: `Bearer ${token}`},
            body: JSON.stringify({...employee,userId:"admin"})
        })
        
        const data = await response.json()

        
      return data 
    }
    
}