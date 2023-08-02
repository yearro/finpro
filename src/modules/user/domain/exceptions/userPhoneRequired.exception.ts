import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class UserPhoneRequiredException extends DomainException {
  constructor() {
    super(UserPhoneRequiredException.getMessage());
    this.name = DomainExceptionCode.USER_PHONE_REQUIRED;
  }
  static getMessage() {
    return "Phone is required";
  }
}
