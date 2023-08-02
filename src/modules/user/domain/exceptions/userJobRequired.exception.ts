import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class UserJobRequiredException extends DomainException {
  constructor() {
    super(UserJobRequiredException.getMessage());
    this.name = DomainExceptionCode.USER_DESCRIBE_JOB;
  }
  static getMessage() {
    return "Address is required";
  }
}
