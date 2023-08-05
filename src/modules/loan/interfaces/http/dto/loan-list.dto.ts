import { LoanRequired } from '../../../domain/interfaces/loanRequired.interface'
import { DTO } from './dto.generic'
import { LoanListDTO } from './types/loanlist.type'

export class LoanListMapping extends DTO<LoanRequired[], LoanListDTO> {
   execute(data: LoanRequired[]): LoanListDTO {
      return data.map((loan: LoanRequired) => {
         return {
            amount: loan.amount,
            deptorGuid: loan.deptorGuid,
            avalGuid: loan.avalGuid,
            currentRate: loan.currentRate,
            state: loan.state,
            paymentDate: loan.paymentDate,
            balance: loan.balance,
            id: loan.id,
         }
      })
   }
}
