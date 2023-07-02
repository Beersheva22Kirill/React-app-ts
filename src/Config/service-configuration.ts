import AuthService from "../services/AuthentificationService";
import AuthServiceJwt from "../services/AuthServiceJwt";
import EmployeesService from "../services/EmployeesService";
import EmployeesServeceREST from "../services/EmpoloeesServiceREST";

export const authService: AuthService =
 new AuthServiceJwt('http://localhost:3500/login')

 export const employeesService: EmployeesService =
 new EmployeesServeceREST('http://localhost:3500/employees')