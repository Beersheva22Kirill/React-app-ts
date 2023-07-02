import Employee from "../Model/Employee";

export default interface EmployeesService {

   addEmployee(employee:Employee):Promise<Employee>;

}