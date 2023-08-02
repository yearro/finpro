import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class LoanStateRequiredException extends DomainException {
  constructor() {
    super(LoanStateRequiredException.getMessage());
    this.name = DomainExceptionCode.LOAN_STATE_REQUIRED;
  }
  static getMessage() {
    return "Loan state is required";
  }
}
