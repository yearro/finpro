import { Request, Response, NextFunction } from 'express'
import { GuidValidator } from '../validators/guid.validator'
import { StateValidator } from '../validators/state.validator'
import { validate } from 'class-validator'

class LoanMiddleware {
   static async ValidateGuid(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const userGuidValidator = new GuidValidator()
      userGuidValidator.guid = guid
      const errors = await validate(userGuidValidator)
      if (errors.length > 0) {
         return next(new Error('Invalid request'))
      }
      next()
   }

   static async ValidateState(req: Request, _res: Response, next: NextFunction) {
      const { state } = req.params
      const userStateValidator = new StateValidator()
      userStateValidator.state = state
      const errors = await validate(userStateValidator)
      if (errors.length > 0) {
         return next(new Error('Invalid request'))
      }
      next()
   }
}

export const MiddlewareGuid: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   LoanMiddleware.ValidateGuid,
]

export const MiddlewareState: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   LoanMiddleware.ValidateState,
]
