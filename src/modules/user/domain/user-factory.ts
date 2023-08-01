import { v4 as uuidV4 } from 'uuid'
import User from './user'
import { UserProperties } from './types/userProperties.type'
import { UserPasswordService } from './services/user-password.service'
import { EmailVO } from './value-objects/email.vo'
import { UserLastnameRequiredException } from './exceptions/userLastnameRequired.exception'
import { UserNameRequiredException } from './exceptions/userNameRequired.exception'
import { UserPasswordRequiredException } from './exceptions/userPasswordRequired.exception'
import { UserPasswordLengthInvalidException } from './exceptions/userPasswordLengthInvalid.exception'
import { UserPhoneRequiredException } from './exceptions/userPhoneRequired.exception'

import { err, ok, Result } from 'neverthrow'

export type UserResult = Result<
	User,
	| UserLastnameRequiredException
	| UserNameRequiredException
	| UserPasswordRequiredException
	| UserPasswordLengthInvalidException
	| UserPhoneRequiredException
>

export default class UserFactory {
	async create(name: string, lastName: string, email: EmailVO, password: string, phone: number, isAdmin: boolean) {
		if (!name || name.trim() === '') {
			return err(new UserNameRequiredException())
		}

		if (!lastName || lastName.trim() === '') {
			return err(new UserLastnameRequiredException())
		}

		if (!password || password.trim() === '') {
			return err(new UserPasswordRequiredException())
		}

		if (password.length < 5) {
			return err(new UserPasswordLengthInvalidException(password))
		}

		if (!phone || phone.toString().trim() === '') {
			return err(new UserPhoneRequiredException())
		}

		const passwordHash = await UserPasswordService.hash(password)

		const userProperties: UserProperties = {
			name,
			lastName,
			email,
			password: passwordHash,
			guid: uuidV4(),
			isAdmin,
			phone,
			state: 'Active',
		}
		const user = new User(userProperties)
		return ok(user)
	}
}
