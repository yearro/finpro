import Loan from './loan'
import { Result } from 'neverthrow'
import { LoanNotFoundException } from './exceptions/loanNotFound.exception'
import { LoanAvalNotFoundException } from './exceptions/loanAvalNotFound.exception'
import { LoanUserNotFoundException } from './exceptions/loanUserNotFound.exception'
import { LoanUpdate } from './interfaces/loandUpdate.interface'

export interface LoanRepository {
   insert(loan: Loan): Promise<Result<Loan, LoanAvalNotFoundException | LoanUserNotFoundException>>
   list(state: string): Promise<Loan[]>
   listOne(id: number): Promise<Result<Loan, LoanNotFoundException>>
   listByUser(guid: string): Promise<Loan[]>
   update(id: number, user: Partial<LoanUpdate>): Promise<Result<Loan, LoanNotFoundException>>
   delete(id: number): Promise<Result<Loan, LoanNotFoundException>>
}
