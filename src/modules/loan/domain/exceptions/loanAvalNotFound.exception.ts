import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class LoanAvalNotFoundException extends DomainException {
   constructor() {
      super(LoanAvalNotFoundException.getMessage())
      this.name = DomainExceptionCode.LOAN_AVAL_NOT_FOUND
   }
   static getMessage() {
      return 'Aval user not found'
   }
}
