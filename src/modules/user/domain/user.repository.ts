import User from './user'
import { Result } from 'neverthrow'
import { UserNotFoundException } from './exceptions/userNotFound.exception'
import { UserUpdate } from './interfaces/userUpdate.interface'

export interface UserRepository {
	insert(user: User): Promise<User>
	list(state: string): Promise<User[]>
	listOne(guid: string): Promise<Result<User, UserNotFoundException>>
	update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>>
	delete(guid: string): Promise<Result<User, UserNotFoundException>>
}
