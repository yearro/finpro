import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class UserGuidInvalidException extends DomainException {
   constructor() {
      super(UserGuidInvalidException.getMessage())
      this.name = DomainExceptionCode.USER_GUID_INVALID
   }
   static getMessage() {
      return 'Guid is invalid'
   }
}
