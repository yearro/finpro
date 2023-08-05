import User from '../domain/user'
import { UserUpdate } from '../domain/interfaces/userUpdate.interface'
import { UserRepository } from '../domain/user.repository'
import { UserEntity } from './user.entity'
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'
import { EmailVO } from '../domain/value-objects/email.vo'
import { UserEmailInvalidException } from '../domain/exceptions/userEmailInvalid.exception'
import { UserGuidInvalidException } from '../domain/exceptions/userGuidInvalid.exception'
import { UserNotFoundException } from '../domain/exceptions/userNotFound.exception'
import { userStateType } from './types/userStateType.type'
import { Result } from 'neverthrow'
import { err, ok } from 'neverthrow'
export default class UserInfraestructure implements UserRepository {
   async insert(user: User): Promise<User> {
      const userInsert = new UserEntity()
      const { guid, name, lastName, email, password, phone, isAdmin, state, job } = user.properties()
      Object.assign(userInsert, {
         guid,
         name,
         lastName,
         email: email.value,
         password,
         phone,
         isAdmin,
         state,
         job,
      })
      await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)
      return user
   }

   async list(state: userStateType): Promise<User[]> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
      const query = state === 'All' ? {} : { where: { state } }
      const result = await repo.find(query)
      return result.map((el: UserEntity) => {
         const emailResult = EmailVO.create(el.email)
         if (emailResult.isErr()) {
            throw new UserEmailInvalidException()
         }

         return new User({
            guid: el.guid,
            name: el.name,
            lastName: el.lastName,
            email: emailResult.value,
            password: el.password,
            phone: el.phone,
            isAdmin: el.isAdmin,
            state: el.state,
            job: el.job,
         })
      })
   }

   async listOne(guid: string): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
      const result = await repo.findOne({ where: { guid } })
      const emailResult = EmailVO.create(result.email)

      if (emailResult.isErr()) {
         return err(new UserGuidInvalidException())
      }
      if (!result) {
         return err(new UserNotFoundException())
      }
      return ok(
         new User({
            guid: result.guid,
            name: result.name,
            lastName: result.lastName,
            email: emailResult.value,
            password: result.password,
            phone: result.phone,
            isAdmin: result.isAdmin,
            state: result.state,
            job: result.job,
         }),
      )
   }

   async update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
      const userFound = await repo.findOne({ where: { guid } })
      if (!userFound) {
         return err(new UserNotFoundException())
      }
      Object.assign(userFound, user)
      const userEntity = await repo.save(userFound)
      const emailResult = EmailVO.create(userEntity.email)
      if (emailResult.isErr()) {
         return err(new UserEmailInvalidException())
      }
      return ok(
         new User({
            guid: userEntity.guid,
            name: userEntity.name,
            lastName: userEntity.lastName,
            email: emailResult.value,
            password: userEntity.password,
            isAdmin: userEntity.isAdmin,
            phone: userEntity.phone,
            state: userEntity.state,
         }),
      )
   }

   async delete(guid: string): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
      const userFound = await repo.findOne({ where: { guid } })

      if (!userFound) {
         return err(new UserNotFoundException())
      }
      userFound.state = 'Deleted'
      const userEntity = await repo.save(userFound)
      const emailResult = EmailVO.create(userEntity.email)
      if (emailResult.isErr()) {
         return err(new UserEmailInvalidException())
      }
      return ok(
         new User({
            guid: userEntity.guid,
            name: userEntity.name,
            lastName: userEntity.lastName,
            email: emailResult.value,
            password: userEntity.password,
            isAdmin: userEntity.isAdmin,
            phone: userEntity.phone,
            state: userEntity.state,
         }),
      )
   }
}
