
import { Observable, Subscriber } from "rxjs";
import Employee from "../../Model/Employee";
import { AUTH_DATA_JWT } from "../Auth/AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { SERVER_NOT_AVALIABLE } from "../../Config/service-configuration";
import Employees from "../../Components/Pages/Employees";
import { PushMessage } from "../../Model/PushMessage";
import { EmptyObject } from "redux";

class Cach {

    cashMap = new Map<any,Employee>();

    addToCach(employee:Employee){
        this.cashMap.set(employee.id, employee);
    }

    delFromCach(id:any){
        this.cashMap.delete(id);
    }

    updateInCash(id:any, employee:Employee){
        this.cashMap.set(employee.id, employee);
    }

    addAllToCach(employees:Employee[]){
        employees.forEach(employee => this.addToCach(employee))
    }

    getCach():Employee[]{
        
        return Array.from(this.cashMap.values());
    }

}

export default class EmployeesServeceREST implements EmployeesService{
      
    private observable: Observable<Employee[]|string> | null = null;
    private subscriber: Subscriber<string|Employee[]> | undefined;
    private urlService:string;
    private urlWebSocket:string;
    private webSocket: WebSocket | undefined;
    private cash:Cach;

    
    constructor(baseUrl:string) {
        this.urlService = `http://${baseUrl}`;
        this.urlWebSocket = `ws://${baseUrl}/websocket`;
        this.cash = new Cach();
    }

     private async fetchAllEmployees():Promise< Employee[]|string> {
        try {
            const token = localStorage.getItem(AUTH_DATA_JWT);
            const response = await fetch(this.urlService, {
                headers: {
                Authorization: `Bearer ${token}`
            }
            });
            return this.getResponse(response);
        } catch (error) {
            return SERVER_NOT_AVALIABLE
        }
    }

    async updateEmploee(id:any, employee: Employee): Promise<Employee|string> {
        try {
            let res;
        const response = await fetch(this.urlService + `/${id}`, {
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

    private sibscriberAllNext(): void {
        
        this.fetchAllEmployees().then(employees => {
            if ( typeof employees != "string") {
                this.cash?.addAllToCach(employees)
            }
            this.subscriber?.next(this.cash?.getCach());     
        })
        .catch(error => this.subscriber?.next(error));
    }

    async getEmployee(id: any): Promise<Employee> {
        try {
            let res;
            const response = await fetch(this.urlService + `/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
            });
            res = await this.getResponse(response);
            return res;
        } catch (error) {
            throw SERVER_NOT_AVALIABLE
        }
       
    }
    
    async deleteEmployee(id: any): Promise<void|string> {
      try {
        let res;
        const response = await fetch(this.urlService + `/${id}`, {
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

    async addEmployee(employee: Employee): Promise<Employee> {

        try {
            let res:Employee;
            const response = await fetch(this.urlService, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`},
                body: JSON.stringify({ ...employee, userId: 'admin' })
            });
            res = await this.getResponse(response);
            return res;     
                } catch (error) {
                    throw SERVER_NOT_AVALIABLE
                } 
             
    } 


    getEmployees():Observable<Employee[]|string> { 

        if (!this.observable) {
            this.observable = new Observable<Employee[] | string>(subscriber => {
                this.subscriber = subscriber;
                this.sibscriberAllNext();
                this.connectWebSocket();
                
                return () => this.disconectWebSocket();
            })
        }
        return this.observable;
    }

    connectWebSocket() {
        this.webSocket = new WebSocket(this.urlWebSocket, localStorage.getItem(AUTH_DATA_JWT) || '');
        
        this.webSocket.onmessage = message => {
            console.log(message.data);
            this.sibscriberAllNext();  
        }
      
    }

    private getAction(message:any) {
        const pushMessage: PushMessage = JSON.parse(message.body);
        switch (pushMessage.status) {
            case "deleted":
                this.cash?.delFromCach(pushMessage.employee.id);
                break;
            case "added":
                this.cash?.addToCach(pushMessage.employee);
                break;
            case "updated":
                this.cash?.updateInCash(pushMessage.employee.id, pushMessage.employee);
                break;
            default:
                break;
        }
        this.subscriber?.next(this.cash?.getCach());
    }

    disconectWebSocket(): void {
        this.webSocket?.close();
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