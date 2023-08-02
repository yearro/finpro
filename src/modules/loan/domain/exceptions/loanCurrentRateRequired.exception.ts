import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class LoanCurrentRateRequiredException extends DomainException {
  constructor() {
    super(LoanCurrentRateRequiredException.getMessage());
    this.name = DomainExceptionCode.LOAN_CURRENT_RATE_REQUIRED;
  }
  static getMessage() {
    return "Address is required";
  }
}
