
import { Observable, Subscriber } from "rxjs";
import Employee from "../../Model/Employee";
import { AUTH_DATA_JWT } from "../Auth/AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { SERVER_NOT_AVALIABLE } from "../../Config/service-configuration";
import { CompatClient, Stomp } from "@stomp/stompjs";

const TOPIC = "/topic/employees"
export default class EmployeesServeceREST implements EmployeesService{
      
    private observable: Observable<Employee[]|string> | null = null;
    private subscriber: Subscriber<string|Employee[]> | undefined;
    private urlService:string;
    private urlWebSocket:string;
    private stompClient: CompatClient;

    
    constructor(baseUrl:string) {
        this.urlService = `http://${baseUrl}/employees`;
        this.urlWebSocket = `ws://${baseUrl}/websocket/employees`;
        this.stompClient = Stomp.client(this.urlWebSocket);
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
            this.subscriber?.next(employees);     
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
        this.stompClient.connect({},() => {
            this.stompClient.subscribe(TOPIC, message => {
                console.log(message.body);
                this.sibscriberAllNext();
            });
        },(error:any) => {
            this.subscriber?.next(JSON.stringify(error))
            console.log(error);
        }, () => {
            console.log("websocket disconnected");
        })
    }

    disconectWebSocket(): void {
        this.stompClient.disconnect();
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