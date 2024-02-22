import { intDemands, intUser, intUserLight } from "./user.interface"


export interface intCompany extends intLightCompany {
    name: string
    description: string,
    additionalInfos?: string,
    user?: intUserLight
    demands?:intDemands
    owner?:intUser
}

export interface intLightCompany {
    id?:number
}

export type intCompanies = intCompany[]
export type intLightCompanies = intLightCompany[]
