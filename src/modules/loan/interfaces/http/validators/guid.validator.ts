import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class GuidValidator {
	@IsString({ message: 'Guid must be a string' })
	@IsNotEmpty({ message: 'Guid must not be empty' })
	@MinLength(10, { message: 'Guid is to short' })
	guid: string
}
