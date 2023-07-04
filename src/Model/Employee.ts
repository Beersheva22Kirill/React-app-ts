import Genders from "./Genders";

type Employee = {
    id?:any,
    name:string,
    gender: Genders,
    salary: number,
    department: string,
    birthDate: Date
}

export default Employee;