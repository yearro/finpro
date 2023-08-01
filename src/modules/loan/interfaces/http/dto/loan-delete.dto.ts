import { LoanRequired } from '../../../domain/interfaces/loanRequired.interface'
import { DTO } from './dto.generic'
import { LoanDeleteDTO } from './types/loandelete.type'

export class LoanDeleteMapping extends DTO<LoanRequired, LoanDeleteDTO> {
	execute(data: LoanRequired): LoanDeleteDTO {
		return {
			amount: data.amount,
			balance: data.balance,
			id: data.id,
		}
	}
}
