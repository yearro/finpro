import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class LoanBalanceRequiredException extends DomainException {
   constructor() {
      super(LoanBalanceRequiredException.getMessage())
      this.name = DomainExceptionCode.LOAN_BALANCE_REQUIRED
   }
   static getMessage() {
      return 'Balance is required'
   }
}
