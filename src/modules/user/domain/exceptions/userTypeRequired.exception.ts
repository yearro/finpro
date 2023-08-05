import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class UserTypeRequiredException extends DomainException {
   constructor() {
      super(UserTypeRequiredException.getMessage())
      this.name = DomainExceptionCode.USER_TYPE_REQUIRED
   }
   static getMessage() {
      return 'Type is required'
   }
}
