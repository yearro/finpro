import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class LoanUserGuidRequiredException extends DomainException {
   constructor() {
      super(LoanUserGuidRequiredException.getMessage())
      this.name = DomainExceptionCode.LOAN_USER_GUID_REQUIRED
   }
   static getMessage() {
      return 'Guid user is required'
   }
}
