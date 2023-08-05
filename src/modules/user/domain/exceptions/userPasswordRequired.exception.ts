import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class UserPasswordRequiredException extends DomainException {
   constructor() {
      super(UserPasswordRequiredException.getMessage())
      this.name = DomainExceptionCode.USER_PASSWORD_REQUIRED
   }
   static getMessage() {
      return 'Password is required'
   }
}
