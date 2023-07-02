type Employee = {
    id?:any,
    name:string,
    gender: "male"|"female",
    salary: number,
    department: string,
    birthDate: Date
}

export default Employee;