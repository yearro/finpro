import { UserProperties } from '../../../domain/types/userProperties.type'
import { DTO } from './dto.generic'
import { UserDeleteDTO } from './types/userdelete.type'

export class UserDeleteMapping extends DTO<UserProperties, UserDeleteDTO> {
   execute(data: UserProperties): UserDeleteDTO {
      return {
         name: data.name,
         lastname: data.lastName,
         guid: data.guid,
      }
   }
}
