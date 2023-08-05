import Loan from './loan'
import { LoanRequired } from './interfaces/loanRequired.interface'
import { LoanAmountRequiredException } from './exceptions/loanAmountRequired.exception'
import { LoanAvalGuidRequiredException } from './exceptions/loanAvalGuidRequired.exception'
import { LoanBalanceRequiredException } from './exceptions/loanBalanceRequiredException.exception'
import { LoanCurrentRateRequiredException } from './exceptions/loanCurrentRateRequired.exception'
import { LoanPayDayRequiredException } from './exceptions/loanPayDayRequired.exception'
import { LoanUserGuidRequiredException } from './exceptions/loanUserGuidRequired.exception'
import { err, ok, Result } from 'neverthrow'

export type LoanResult = Result<
   Loan,
   | LoanAmountRequiredException
   | LoanAvalGuidRequiredException
   | LoanBalanceRequiredException
   | LoanCurrentRateRequiredException
   | LoanPayDayRequiredException
   | LoanUserGuidRequiredException
>

// Patron de diseño Abstract Factory
export default class LoanFactory {
   async create(
      amount: number,
      deptorGuid: string,
      avalGuid: string,
      currentRate: number,
      paymentDate: string,
      balance: number,
   ) {
      if (!amount || amount <= 0) {
         return err(new LoanAmountRequiredException())
      }

      if (!deptorGuid || deptorGuid.trim() === '') {
         return err(new LoanUserGuidRequiredException())
      }

      if (!avalGuid || avalGuid.trim() === '') {
         return err(new LoanAvalGuidRequiredException())
      }

      if (!currentRate || currentRate <= 0) {
         return err(new LoanCurrentRateRequiredException())
      }

      if (!paymentDate || paymentDate.trim() === '') {
         return err(new LoanPayDayRequiredException())
      }

      if (!balance || balance <= 0) {
         return err(new LoanBalanceRequiredException())
      }

      const loanProperties: LoanRequired = {
         amount,
         deptorGuid,
         avalGuid,
         currentRate,
         paymentDate,
         balance,
         state: 'Active',
      }

      const loan = new Loan(loanProperties)
      return ok(loan)
   }
}
