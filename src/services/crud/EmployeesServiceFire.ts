import { Observable, catchError, of } from "rxjs";
import Employee from "../../Model/Employee";
import EmployeesService from "./EmployeesService";
import fireAppConfig from "../../Config/firebase-config";
import {CollectionReference,DocumentReference, getFirestore, 
        collection, getDoc, setDoc, deleteDoc, doc, FirestoreError} from 'firebase/firestore'
import {collectionData} from 'rxfire/firestore'
import { getRandomInt } from "../../utils/numbers";
import { getISODateStr } from "../../utils/date-functions";

const MIN_ID = 100000;
const MAX_ID = 1000000;

function convertEmployee(employee:Employee, id?:string):any{
    const result:any = {...employee, id: id ? id : employee.id, birthDate: getISODateStr(employee.birthDate)}
    return result;
}

function getErrorMessage(firestoreError:FirestoreError):string{
    let errorMessage = '';
    switch (firestoreError.code) {
        case 'unauthenticated':
        case 'permission-denied': errorMessage = 'Authentification'; break   ;
        
        default: errorMessage = firestoreError.message;
           
    }
    return errorMessage;
}

export default class EmployeesServeceFire implements EmployeesService {

    collectionRef:CollectionReference = collection(getFirestore(fireAppConfig), 'employees')

    private async exists(id:string):Promise<boolean> {
        const docRef:DocumentReference = this.getDocReference(id);
        const docSnapShot = await getDoc(docRef);
        return docSnapShot.exists()
    }

    private getDocReference(id:string):DocumentReference{
        return doc(this.collectionRef,id)
    }

     private async getId():Promise<string>{
        let id:string  = '';
        do{
            id = getRandomInt(MIN_ID,MAX_ID).toString()
        }while(await this.exists(id))
        
        return id
    }

    async addEmployee(employee: Employee): Promise<Employee> {
        const id:string = await this.getId();
        const empl = convertEmployee(employee,id);
        const docRef = this.getDocReference(id);
        try {
            await setDoc(docRef, empl)
            
        } catch (error:any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return empl;
    }


    getEmployees(): Observable<string | Employee[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string|Employee[]>
    }

    async deleteEmployee(id: any): Promise<string | void> {
        const docRef = this.getDocReference(id);
        if(!await this.exists(id)){
            return 'Not found'
        }
        try {
            await deleteDoc(docRef);
        } catch (error:any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return errorMessage;
        }

    }

    async getEmployee(id: any): Promise<Employee> {
        const docRef:DocumentReference = this.getDocReference(id);
        const snapShot = await getDoc(docRef)
        return snapShot.data() as Employee

    }

    
    async updateEmploee(id: any, employee: Employee): Promise<string | Employee> {
        if(!await this.exists(id)){
            return 'Not found'
        }
        const docRef = this.getDocReference(id);
        const empl = convertEmployee(employee,id);
        try {
            await setDoc(docRef, {...empl, id})
            
        } catch (error:any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return errorMessage;
        }
        return employee;
    }
    
}