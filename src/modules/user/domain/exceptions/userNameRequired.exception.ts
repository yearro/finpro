import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class UserNameRequiredException extends DomainException {
  constructor() {
    super(UserNameRequiredException.getMessage());
    this.name = DomainExceptionCode.USER_NAME_REQUIRED;
  }
  static getMessage() {
    return "Name is required";
  }
}
