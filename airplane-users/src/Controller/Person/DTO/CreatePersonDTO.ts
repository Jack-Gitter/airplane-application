import { IsNotEmpty, IsNotIn, IsString } from "class-validator"

export class CreatePersonDTO {

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    middleName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    emailPrefix: string

    @IsString()
    @IsNotEmpty()
    emailPostfix: string
}