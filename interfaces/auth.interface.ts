import { intCompany } from "./company.interface"
import { intUser } from "./user.interface"


export interface intRegister {
    userInfos: intUser,
    companyInfos: intCompany,
    owner?:intUser
}

export interface intLogin {
    email: string,
    password:string,
}

export interface intConfirmPwd {
    newPwd:string
    confirmNewPwd: string
}

export interface intOldPwd {
    newPwd:string
    oldPwd: string
}