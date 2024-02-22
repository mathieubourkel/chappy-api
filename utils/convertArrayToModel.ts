import { LogsModelEnum } from "enums/logs.model.enum"

export const convertArrayOfUserToModelNotif = (array:any[]) => {
    array.map((user:any) => {
        return {refId: user.id, refModel: LogsModelEnum.notif}
    })
    return array;
}