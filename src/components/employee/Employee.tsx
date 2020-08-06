export type EmployeeId = number
export type DepartmentId = number

export default interface Employee {
    id: EmployeeId
    firstName: string
    lastName: string
    position: string
    employmentDate: number
    mentorId: EmployeeId
    department: DepartmentId
}
