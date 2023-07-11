import AuthService from "../services/Auth/AuthentificationService";
import AuthServiceFire from "../services/Auth/AuthServiceFire";
import AuthServiceFake from "../services/Auth/AuthServiceFire";
import AuthServiceJwt from "../services/Auth/AuthServiceJwt";
import EmployeesService from "../services/crud/EmployeesService";
import EmployeesServeceFire from "../services/crud/EmployeesServiceFire";
import EmployeesServeceREST from "../services/crud/EmpoloeesServiceREST";

// export const authService: AuthService =
//  new AuthServiceJwt('http://localhost:3500/login')


//  export const employeesService: EmployeesService =
//  new EmployeesServeceREST('http://localhost:3500/employees')

 export const authService: AuthService =
 new AuthServiceFire()

 export const employeesService: EmployeesService =
 new EmployeesServeceFire()