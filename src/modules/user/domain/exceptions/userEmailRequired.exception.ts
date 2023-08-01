import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class UserEmailRequiredException extends DomainException {
	constructor() {
		super(UserEmailRequiredException.getMessage())
		this.name = DomainExceptionCode.USER_EMAIL_REQUIRED
	}
	static getMessage() {
		return 'Email is required'
	}
}
