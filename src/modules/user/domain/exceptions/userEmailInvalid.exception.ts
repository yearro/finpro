import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class UserEmailInvalidException extends DomainException {
  constructor() {
    super(UserEmailInvalidException.getMessage());
    this.name = DomainExceptionCode.USER_EMAIL_INVALID;
  }
  static getMessage() {
    return "Email is invalid";
  }
}
