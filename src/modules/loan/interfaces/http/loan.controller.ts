import { Request, Response, NextFunction } from 'express'
import { IError } from '../../../shared/helpers/ierror'
import LoanFactory from '../../domain/loan-factory'

import LoanApplication from '../../application/loan.application'
import { GuidVO } from '../../../user/domain/value-objects/guid.vo'

import { LoanInsertMapping } from './dto/loan-insert.dto'
import { LoanListMapping } from './dto/loan-list.dto'
import { LoanUpdateMapping } from './dto/loan-update.dto'
import { LoanDeleteMapping } from './dto/loan-delete.dto'

export default class {
	constructor(private application: LoanApplication) {
		// pattern Controller, Mediator, Intermediary
		this.insert = this.insert.bind(this)
		this.delete = this.delete.bind(this)
		this.list = this.list.bind(this)
		this.listOne = this.listOne.bind(this)
		this.listByUser = this.listByUser.bind(this)
		this.update = this.update.bind(this)
	}

	async insert(req: Request, res: Response, next: NextFunction) {
		const { amount, deptorGuid, avalGuid, currentRate, paymentDate, balance } = req.body

		if (deptorGuid.trim() === avalGuid.trim()) {
			const err: IError = new Error('User and endorsement have the same identifier')
			err.status = 411
			return next(err)
		}

		const deptorGuidResult = GuidVO.create(deptorGuid)
		if (deptorGuidResult.isErr()) {
			const err: IError = new Error(deptorGuidResult.error.message)
			err.status = 411
			return next(err)
		}

		const avalGuidResult = GuidVO.create(deptorGuid)
		if (avalGuidResult.isErr()) {
			const err: IError = new Error(avalGuidResult.error.message)
			err.status = 411
			return next(err)
		}

		const loanResult = await new LoanFactory().create(amount, deptorGuid, avalGuid, currentRate, paymentDate, balance)

		if (loanResult.isErr()) {
			const err: IError = new Error(loanResult.error.message)
			err.status = 411
			return next(err)
		}
		const data = await this.application.insert(loanResult.value)
		const result = new LoanInsertMapping().execute(data.properties())
		res.status(201).json(result)
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params
		const dataResult = await this.application.delete(parseInt(id))
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const result = new LoanDeleteMapping().execute(dataResult.value.properties())
			return res.json(result)
		}
	}

	async list(req: Request, res: Response) {
		const { state } = req.params
		const list = await this.application.list(state)
		const result = new LoanListMapping().execute(list.map(loan => loan.properties()))
		res.json(result)
	}

	async listByUser(req: Request, res: Response) {
		const { deptorGuid } = req.params
		const list = await this.application.listByUser(deptorGuid)
		const result = new LoanListMapping().execute(list.map(loan => loan.properties()))
		res.json(result)
	}

	async listOne(req: Request, res: Response) {
		const { id } = req.params
		const loanResult = await this.application.listOne(parseInt(id))
		if (loanResult.isErr()) {
			return res.status(404).send(loanResult.error.message)
		}
		if (loanResult.isOk()) {
			const result = new LoanInsertMapping().execute(loanResult.value.properties())
			return res.json(result)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params
		const fieldsToUpdate = req.body

		const dataResult = await this.application.update(parseInt(id), fieldsToUpdate)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 404
			return next(err)
		}
		const result = new LoanUpdateMapping().execute(dataResult.value.properties())
		return res.json(result)
	}
}
