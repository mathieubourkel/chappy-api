import { LogsModelEnum } from "enums/logs.model.enum"

export const convertArrayOfUserToModelNotif = (array:any[]) => {
    let tmpArray:any[] = []
    array.map((user:any) => {
        tmpArray.push({refId: user.id, refModel: LogsModelEnum.notifs})
    })
    return tmpArray
}