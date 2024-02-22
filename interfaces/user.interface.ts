import { intCompany } from "./company.interface"
import { intTasks } from "./task.interface"


export interface intUser extends intUserLight {
    lastname: string,
    firstname: string,
    email: string,
    address: string,
    zip: string,
    city: string,
    phone: string,
    password?: string,
    checkPassword?: string
    status:number
}


export interface intUserLight {
    firstname?: string,
    lastname?: string,
    company?: intCompany,
    email?: string,
    id?: number
    tasks?:intTasks
}


export interface intDemand {
    id?: number,
    group: intCompany,
    user?:intUser
    status:number
}

export type intDemands = intDemand[]
export type intUsers = intUser[]
export type intUsersLight = intUserLight[]
