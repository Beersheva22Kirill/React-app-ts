
import { Observable, Subscriber } from "rxjs";
import Employee from "../../Model/Employee";
import { AUTH_DATA_JWT } from "../Auth/AuthServiceJwt";
import EmployeesService from "./EmployeesService";

const POLLER_INTERVAL = 1000;
const SERVER_NOT_AVALIABLE = 'Server is unavalible, repeat later';

class Cache {

    cacheStr:string = '';

    set(employees:Employee[]):void{
        this.cacheStr = JSON.stringify(employees);
    }

    reset():void{
        this.cacheStr = '';
    }

    isEqual(employees:Employee[]):boolean{

        return this.cacheStr === JSON.stringify(employees);
    }

    getChache():Employee[]{

        return !this.isEmpty()  ? JSON.parse(this.cacheStr) : []
    }

    isEmpty(): boolean {
        return this.cacheStr.length === 0
    }
}

export default class EmployeesServeceREST implements EmployeesService{
      
    private observable: Observable<Employee[]|string> | null = null;
    private cache: Cache = new Cache();
    private subscriber: Subscriber<string|Employee[]> | undefined;
    
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
        this.sibscriberAllNext(this.subscriber!);  
        return res;
        } catch (error) {
            return SERVER_NOT_AVALIABLE 
        }
        
    }

    private sibscriberAllNext(subscriber: Subscriber<Employee[] | string>): void {
        
        this.getAllEmployees().then(response => response.json()).then(employees => {
            if (this.cache.isEmpty() || !this.cache.isEqual(employees as Employee[])) {
                this.cache.set(employees as Employee[]);
                subscriber.next(employees);
            }
        })
        .catch(error => subscriber.next(error));
    }

    async getEmployee(id: any): Promise<Employee> {
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
            throw SERVER_NOT_AVALIABLE
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
        this.sibscriberAllNext(this.subscriber!); 
        return res;
      } catch (error) {
        return SERVER_NOT_AVALIABLE
      }
        
    }

    async addEmployee(employee: Employee): Promise<Employee> {

        try {
            let res:Employee;
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
                    throw SERVER_NOT_AVALIABLE
                } 
             
    } 


    getEmployees():Observable<Employee[]|string> { 

        let intervalId: any;
        if (!this.observable) {
            this.observable = new Observable<Employee[] | string>(subscriber => {
                this.cache.reset();

                this.sibscriberAllNext(subscriber);
                this.subscriber = subscriber;
                intervalId = setInterval(() => this.sibscriberAllNext(subscriber), POLLER_INTERVAL);
                return () => clearInterval(intervalId)
            })
        }
        return this.observable;
    }

    private getAllEmployees() {
        const token = localStorage.getItem(AUTH_DATA_JWT);
        
        return fetch(this.URL, {
                headers: {
                Authorization: `Bearer ${token}`
            }
        });
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