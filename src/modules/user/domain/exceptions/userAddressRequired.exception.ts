import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class UserAddressRequiredException extends DomainException {
  constructor() {
    super(UserAddressRequiredException.getMessage());
    this.name = DomainExceptionCode.USER_ADDRESS_REQUIRED;
  }
  static getMessage() {
    return "Address is required";
  }
}
