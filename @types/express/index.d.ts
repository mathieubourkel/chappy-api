import * as jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  export interface Request {
    user : jwt.CustomJwtPayload
  }

}

  declare module 'jsonwebtoken' {
    export interface CustomJwtPayload extends jwt.JwtPayload {
        userId: number
        firstname: string
        lastname: string
        email:string
        firstname: string
        lastname: string
    }
}
