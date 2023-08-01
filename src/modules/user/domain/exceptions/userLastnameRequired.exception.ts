import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class UserLastnameRequiredException extends DomainException {
	constructor() {
		super(UserLastnameRequiredException.getMessage())
		this.name = DomainExceptionCode.USER_LASTNAME_REQUIRED
	}
	static getMessage() {
		return 'Lastname is required'
	}
}
