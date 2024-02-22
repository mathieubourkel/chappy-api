export interface intCompta {
    _id?:string,
    refId: string
    refModel: number
    description: string,
    price: {devise: number, fullTaxPrice:number},
    status: number,
    commandDate: string,
    deliveryDate: string
    owner:number
  }

  export type intComptas = intCompta[]
