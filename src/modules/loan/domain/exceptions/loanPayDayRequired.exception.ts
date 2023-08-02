import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class LoanPayDayRequiredException extends DomainException {
  constructor() {
    super(LoanPayDayRequiredException.getMessage());
    this.name = DomainExceptionCode.LOAN_PAY_DAY_REQUIRED;
  }
  static getMessage() {
    return "Pay day is required";
  }
}
