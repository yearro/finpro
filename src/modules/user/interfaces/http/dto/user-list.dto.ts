import { UserProperties } from '../../../domain/types/userProperties.type'
import { DTO } from './dto.generic'
import { UserListDTO } from './types/userlist.type'

export class UserListMapping extends DTO<UserProperties[], UserListDTO> {
   execute(data: UserProperties[]): UserListDTO {
      return data.map((user: UserProperties) => {
         return {
            name: user.name,
            lastname: user.lastName,
            guid: user.guid,
         }
      })
   }
}
