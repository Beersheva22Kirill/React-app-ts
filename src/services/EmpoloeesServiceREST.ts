
import { Observable } from "rxjs";
import Employee from "../Model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";



const SERVER_NOT_AVALIABLE = 'Server is unavalible, repeat later';
export default class EmployeesServeceREST implements EmployeesService{
      
    constructor(private URL:string) {

    }

    async updateEmploee(id:any, employee: Employee): Promise<Employee|string> {
        try {
            let res;
        const response = await fetch(this.URL + `/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`},
            body: JSON.stringify({ ...employee, userId: 'admin' })
        });
        res = await this.getResponse(response);   
        return res;
        } catch (error) {
            return SERVER_NOT_AVALIABLE 
        }
        
    }

    async getEmployee(id: any): Promise<string | Employee> {
        try {
            let res;
            const response = await fetch(this.URL + `/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
            });
            res = await this.getResponse(response);
            return res;
        } catch (error) {
            return SERVER_NOT_AVALIABLE
        }
       
    }
    
    async deleteEmployee(id: any): Promise<void|string> {
      try {
        let res;
        const response = await fetch(this.URL + `/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
        });
        res = await this.getResponse(response);
        return res;
      } catch (error) {
        return SERVER_NOT_AVALIABLE
      }
        
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
            res = await this.getResponse(response);
            return res;
                } catch (error) {
                    return SERVER_NOT_AVALIABLE
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
                .then(data => subscriber.next(data)).catch(error => subscriber.next(SERVER_NOT_AVALIABLE));
            }) 
    }

    private async getResponse(response: Response) {
        let res;
        if (!response.ok) {
            res = response.status == 401 || response.status == 403 ? `Authentification error` : response.statusText;
        } else {
            res = await response.json();
        }
        return res;
    }
                
}