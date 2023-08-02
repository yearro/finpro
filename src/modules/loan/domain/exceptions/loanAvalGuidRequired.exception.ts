import { DomainException } from "./domain.exception";
import { DomainExceptionCode } from "../enums/domainException.enum";

export class LoanAvalGuidRequiredException extends DomainException {
  constructor() {
    super(LoanAvalGuidRequiredException.getMessage());
    this.name = DomainExceptionCode.LOAN_AVAL_NOT_FOUND;
  }
  static getMessage() {
    return "Guid user required is required";
  }
}
