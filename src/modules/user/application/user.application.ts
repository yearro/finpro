import { UserRepository } from '../domain/user.repository'
import User from '../domain/user'
import { UserUpdate } from '../domain/interfaces/userUpdate.interface'
export default class UserApplication {
	constructor(private readonly userRepository: UserRepository) {}

	insert(user: User) {
		return this.userRepository.insert(user)
	}

	list(state: string) {
		return this.userRepository.list(state)
	}

	listOne(guid: string) {
		return this.userRepository.listOne(guid)
	}

	update(guid: string, user: Partial<UserUpdate>) {
		return this.userRepository.update(guid, user)
	}

	delete(guid: string) {
		return this.userRepository.delete(guid)
	}
}
