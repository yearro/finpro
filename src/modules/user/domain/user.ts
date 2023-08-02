import { IEntity } from "../../shared/entity.interface";
import { EmailVO } from "./value-objects/email.vo";
import { UserUpdate } from "./interfaces/userUpdate.interface";
import { UserProperties } from "./types/userProperties.type";

export default class User implements IEntity<UserProperties, UserUpdate> {
  private name: string;
  private lastName: string;
  private readonly email: EmailVO;
  private password: string;

  private phone: number;
  private isAdmin: boolean;
  private state: string;

  private job: string;

  private readonly guid: string;

  constructor(userProperties: UserProperties) {
    this.state = "Active";
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      isAdmin: this.isAdmin,
      state: this.state,
      job: this.job,
      guid: this.guid,
    };
  }

  update(fields: UserUpdate) {
    Object.assign(this, fields);
  }

  delete() {
    this.state = "Inactive";
  }
}
