import { LoanRepository } from '../domain/loan.repository'
import Loan from '../domain/loan'
import { LoanUpdate } from '../domain/interfaces/loandUpdate.interface'
export default class LoanApplication {
	// Solid: Inversion Dependency
	// Design Pattern: Injection dependencies
	constructor(private readonly loanRepository: LoanRepository) {}

	insert(loan: Loan) {
		return this.loanRepository.insert(loan)
	}

	list(state: string) {
		return this.loanRepository.list(state)
	}

	listOne(id: number) {
		return this.loanRepository.listOne(id)
	}

	listByUser(guid: string) {
		return this.loanRepository.listByUser(guid)
	}

	update(id: number, loan: Partial<LoanUpdate>) {
		return this.loanRepository.update(id, loan)
	}

	delete(id: number) {
		return this.loanRepository.delete(id)
	}
}
