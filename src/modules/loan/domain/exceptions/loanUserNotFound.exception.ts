import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class LoanUserNotFoundException extends DomainException {
   constructor() {
      super(LoanUserNotFoundException.getMessage())
      this.name = DomainExceptionCode.LOAN_USER_NOT_FOUND
   }
   static getMessage() {
      return 'User not found'
   }
}
