import { intProjectLight } from "./project.interface"
import { intTasks } from "./task.interface"



export interface intStepLight {
    _id?:number | string | undefined
    name?:string
  }

  export interface intStep extends intStepLight{
    description: string,
    budget: number,
    estimEndDate: string
    status:number
    project: intProjectLight
    tasks : intTasks
}

export interface intCreateStep extends intStepLight {
    description: string,
    budget: number,
    estimEndDate: string
    status:number
    project: string
    tasks : intTasks
}

export type intSteps = intStep[]
export type intStepsLight = intStepLight[]