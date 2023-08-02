import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class UserNotFoundException extends DomainException {
  constructor() {
    super(UserNotFoundException.getMessage());
    this.name = DomainExceptionCode.USER_NOT_FOUND;
  }
  static getMessage() {
    return "User not found";
  }
}
