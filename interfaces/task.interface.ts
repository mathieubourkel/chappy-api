import { intUserLight, intUsersLight } from "./user.interface"


export interface intTask {
    _id?: string
    name: string,
    status: number
    category: number
    budget: number
    description: string,
    startDate: string,
    endDate:string,
    comments?: any
    owner?: intUserLight
    members?: intUsersLight
    step?: string
    project?: string
}

export type intTasks = intTask[]