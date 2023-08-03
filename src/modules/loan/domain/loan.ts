import { IEntity } from "../../shared/entity.interface";
import { LoanRequired } from "./interfaces/loanRequired.interface";
import { LoanUpdate } from "./interfaces/loandUpdate.interface";

export default class Loan implements IEntity<LoanRequired, LoanUpdate> {
  private amount: number;
  private deptorGuid: string;
  private avalGuid: string;
  private currentRate: number;
  private state: string;
  private paymentDate: string;
  private balance: number;
  private id: number;

  constructor(loanProperties: LoanRequired) {
    this.state = "Active";
    Object.assign(this, loanProperties);
  }

  properties(): LoanRequired {
    return {
      amount: this.amount,
      deptorGuid: this.deptorGuid,
      avalGuid: this.avalGuid,
      currentRate: this.currentRate,
      state: this.state,
      paymentDate: this.paymentDate,
      balance: this.balance,
      id: this.id
    };
  }

  update(fields: LoanUpdate) {
    Object.assign(this, fields);
  }

  delete() {
    this.state = "Inactive";
  }
}
