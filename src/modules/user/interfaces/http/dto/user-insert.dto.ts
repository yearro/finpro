import { UserProperties } from '../../../domain/types/userProperties.type'
import { DTO } from './dto.generic'
import { UserInsertOne } from './types/usertinsert.type'

export class UserInsertMapping extends DTO<UserProperties, UserInsertOne> {
	execute(data: UserProperties): UserInsertOne {
		return {
			name: data.name,
			lastname: data.lastName,
			email: data.email.value,
			guid: data.guid,
		}
	}
}
