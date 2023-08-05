import { UserRequired } from '../interfaces/userRequired.interface'
import { UserOptional } from '../interfaces/userOptional.interface'

export type UserProperties = Required<UserRequired> & Partial<UserOptional>
