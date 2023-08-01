import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class UserPasswordLengthInvalidException extends DomainException {
	constructor(password: string) {
		super(UserPasswordLengthInvalidException.getMessage(password))
		this.name = DomainExceptionCode.USER_PASSWORD_LENGTH_INVALID
	}
	static getMessage(password: string) {
		return `Password must be than 4, but ${password.length}`
	}
}
