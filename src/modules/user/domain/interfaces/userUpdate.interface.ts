import { EmailVO } from '../value-objects/email.vo'

export interface UserUpdate {
   name: string
   lastName: string
   email: EmailVO
   password: string
   phone: number
   state: string
}
