import { LoanRequired } from '../../../domain/interfaces/loanRequired.interface'
import { DTO } from './dto.generic'
import { LoanInsert } from './types/loantinsert.type'

export class LoanInsertMapping extends DTO<LoanRequired, LoanInsert> {
   execute(data: LoanRequired): LoanInsert {
      return {
         amount: data.amount,
         deptorGuid: data.deptorGuid,
         avalGuid: data.avalGuid,
         currentRate: data.currentRate,
         paymentDate: data.paymentDate,
         balance: data.balance,
         id: data.id,
      }
   }
}
