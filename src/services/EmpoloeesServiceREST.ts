
import { Observable } from "rxjs";
import Employee from "../Model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { CodePayload } from "../Model/CodePayload";
import CodeType from "../Model/CodeType";



export default class EmployeesServeceREST implements EmployeesService{
      
    constructor(private URL:string) {

    }
    
    async deleteEmployee(id: any): Promise<void|string> {
      
        let res;
        const response = await fetch(this.URL + `/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
        });
        if(!response.ok) {
            res = response.status == 401 || response.status == 403 ? `Authentification error` : response.statusText;
        }  
        return res;
    }

    async addEmployee(employee: Employee): Promise<Employee|string> {

        try {
            let res:Employee|string;
            const response = await fetch(this.URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`},
                body: JSON.stringify({ ...employee, userId: 'admin' })
            });
            if (response.ok) {
                res = await response.json()
            } else {
                res = response.status == 401 || response.status == 403 ? `Authentification error` : response.statusText;
            }
            return res;
                } catch (error) {
                    return 'Server is unavalible, repeat later'
                }        
    } 


    getEmployees():Observable<Employee[]|string> {        
       
        return new Observable<Employee[]|string>((subscriber) => {
            fetch(this.URL,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT)}`}
                })
                .then(response => {
                    let res:Promise<Employee[]|string>;
                    if(response.ok){
                        res = response.json();  
                    } else {
                        res = Promise.resolve(response.status == 401 || response.status == 403 ? `Authentification error` : response.statusText);
                    }
                    return res;
                    })
                .then(data => subscriber.next(data)).catch(error => subscriber.next('Server is unavalible, repeat later'));
            }) 
    }
                
}