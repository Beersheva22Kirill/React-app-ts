
import { Observable } from "rxjs";
import Employee from "../../Model/Employee";

export default interface EmployeesService {

   addEmployee(employee:Employee):Promise<Employee>;
   getEmployees(): Observable<Employee[]|string>;
   deleteEmployee(id:any): Promise<void|string>
   getEmployee(id:any): Promise<Employee>
   updateEmploee(id:any,employee:Employee):Promise<Employee|string>;
}