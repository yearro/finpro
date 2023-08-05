import { IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator'

export class StateValidator {
   @IsString({ message: 'State must be a string' })
   @IsNotEmpty({ message: 'State must not be empty' })
   @MinLength(2, { message: 'State not valid' })
   @IsIn(['All', 'Active', 'Locked', 'Deleted', 'Inactive'])
   state: string
}
