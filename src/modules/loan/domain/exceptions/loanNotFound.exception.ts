import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class LoanNotFoundException extends DomainException {
  constructor() {
    super(LoanNotFoundException.getMessage());
    this.name = DomainExceptionCode.LOAN_NOT_FOUND;
  }
  static getMessage() {
    return "Balance is required";
  }
}
