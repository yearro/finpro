import Loan from "../domain/loan";
import { LoanUpdate } from "../domain/interfaces/loandUpdate.interface";
import { LoanRepository } from "../domain/loan.repository";
import { LoanEntity } from "./loan.entity";
import { UserEntity } from '../../user/infraestructure/user.entity'
import DatabaseBootstrap from "../../../bootstrap/database.bootstrap";
import { stateType } from "./types/loanStateType.type";
import { LoanNotFoundException } from "../domain/exceptions/loanNotFound.exception";
import { LoanAvalNotFoundException } from '../domain/exceptions/loanAvalNotFound.exception'
import { LoanUserNotFoundException } from '../domain/exceptions/loanUserNotFound.exception'
import { Result, err, ok } from "neverthrow";

export default class LoanInfraestructure implements LoanRepository {
  async insert(loan: Loan): Promise<Result<Loan, LoanUserNotFoundException | LoanAvalNotFoundException>> {
    const loanInsert = new LoanEntity();
    const {
      amount,
      deptorGuid,
      avalGuid,
      currentRate,
      state,
      paymentDate,
      balance,
    } = loan.properties();

    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userFound = await repo.findOne({ where: { guid: deptorGuid } });
    if (!userFound) {
      return err(new LoanUserNotFoundException());
    }
    const avalFound = await repo.findOne({ where: { guid: avalGuid } });
    if (!avalFound) {
      return err(new LoanAvalNotFoundException());
    }
    Object.assign(loanInsert, {
      amount,
      deptorGuid,
      avalGuid,
      currentRate,
      state,
      paymentDate,
      balance,
      id: 0,
    });
    const loanEntity = await DatabaseBootstrap.dataSource
      .getRepository(LoanEntity)
      .save(loanInsert);
    return ok(
        new Loan({
          id: loanEntity.id,
          amount: loanEntity.amount,
          deptorGuid: loanEntity.deptorGuid,
          avalGuid: loanEntity.avalGuid,
          currentRate: loanEntity.currentRate,
          state: loanEntity.state,
          paymentDate: loanEntity.paymentDate,
          balance: loanEntity.balance,
        })
      );
  }

  async list(state: stateType): Promise<Loan[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(LoanEntity);
    const query = state === "All" ? {} : { where: { state } };
    const result = await repo.find(query);
    return result.map((el: LoanEntity) => {
      return new Loan({
        id: el.id,
        amount: el.amount,
        deptorGuid: el.deptorGuid,
        avalGuid: el.avalGuid,
        currentRate: el.currentRate,
        state: el.state,
        paymentDate: el.paymentDate,
        balance: el.balance,
      });
    });
  }

  async listOne(id: number): Promise<Result<Loan, LoanNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(LoanEntity);
    const result = await repo.findOne({ where: { id } });
    if (!result) {
      return err(new LoanNotFoundException());
    }
    return ok(
      new Loan({
        id: result.id,
        amount: result.amount,
        deptorGuid: result.deptorGuid,
        avalGuid: result.avalGuid,
        currentRate: result.currentRate,
        state: result.state,
        paymentDate: result.paymentDate,
        balance: result.balance,
      })
    );
  }

  async listByUser(deptorGuid: string): Promise<Loan[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(LoanEntity);
    const result = await repo.find({ where: { deptorGuid } });
    return result.map((el: LoanEntity) => {
      return new Loan({
        id: el.id,
        amount: el.amount,
        deptorGuid: el.deptorGuid,
        avalGuid: el.avalGuid,
        currentRate: el.currentRate,
        state: el.state,
        paymentDate: el.paymentDate,
        balance: el.balance,
      });
    });
  }

  async update(
    id: number,
    loan: Partial<LoanUpdate>
  ): Promise<Result<Loan, LoanNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(LoanEntity);
    const loanFound = await repo.findOne({ where: { id } });
    if (!loanFound) {
      return err(new LoanNotFoundException());
    }
    Object.assign(loanFound, loan);
    const loanEntity = await repo.save(loanFound);
    return ok(
      new Loan({
        id: loanEntity.id,
        amount: loanEntity.amount,
        deptorGuid: loanEntity.deptorGuid,
        avalGuid: loanEntity.avalGuid,
        currentRate: loanEntity.currentRate,
        state: loanEntity.state,
        paymentDate: loanEntity.paymentDate,
        balance: loanEntity.balance,
      })
    );
  }

  async delete(id: number): Promise<Result<Loan, LoanNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(LoanEntity);
    const loanFound = await repo.findOne({ where: { id } });

    if (!loanFound) {
      return err(new LoanNotFoundException());
    }
    loanFound.state = "Paid";
    const loanEntity = await repo.save(loanFound);
    return ok(
      new Loan({
        id: loanEntity.id,
        amount: loanEntity.amount,
        deptorGuid: loanEntity.deptorGuid,
        avalGuid: loanEntity.avalGuid,
        currentRate: loanEntity.currentRate,
        state: loanEntity.state,
        paymentDate: loanEntity.paymentDate,
        balance: loanEntity.balance,
      })
    );
  }
}
