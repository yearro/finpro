import { LoanRequired } from '../../../domain/interfaces/loanRequired.interface'
import { DTO } from './dto.generic'
import { LoanUpdateDTO } from './types/loanupdate.type'

export class LoanUpdateMapping extends DTO<LoanRequired, LoanUpdateDTO> {
	execute(loan: LoanRequired): LoanUpdateDTO {
		return {
			amount: loan.amount,
			currentRate: loan.currentRate,
			state: loan.state,
			paymentDate: loan.paymentDate,
			balance: loan.balance,
			id: loan.id,
		}
	}
}
