import { UserProperties } from "../../../domain/types/userProperties.type";
import { DTO } from "./dto.generic";
import { UserListtOne } from "./types/userlistOne.type";

export class UserListOnetMapping extends DTO<UserProperties, UserListtOne> {
  execute(data: UserProperties): UserListtOne {
    return {
      name: data.name,
      lastname: data.lastName,
      email: data.email.value,
      guid: data.guid,
    };
  }
}
