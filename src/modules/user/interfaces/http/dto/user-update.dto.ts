import { UserProperties } from "../../../domain/types/userProperties.type";
import { DTO } from "./dto.generic";
import { UserUpdateDTO } from "./types/userupdate.type";

export class UserUpdateMapping extends DTO<UserProperties, UserUpdateDTO> {
  execute(data: UserProperties): UserUpdateDTO {
    return {
      name: data.name,
      lastname: data.lastName,
      email: data.email.value,
      guid: data.guid,
    };
  }
}
