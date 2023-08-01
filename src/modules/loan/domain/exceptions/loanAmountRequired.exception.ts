import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class LoanAmountRequiredException extends DomainException {
	constructor() {
		super(LoanAmountRequiredException.getMessage())
		this.name = DomainExceptionCode.LOAN_AMOUNT_REQUIRED
	}
	static getMessage() {
		return 'Amount is required'
	}
}
