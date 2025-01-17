import { IsDate, IsNumber, IsString, IsUUID } from "class-validator"
import { UUID } from "crypto"

export class AddSegmentDTO {
    @IsUUID()
    scheduleId: UUID

    @IsString()
    toName: string

    @IsNumber()
    toLongitude: number

    @IsNumber()
    toLatitude: number

    @IsString()
    fromName: string

    @IsNumber()
    fromLongitude: number

    @IsNumber()
    fromLatitude: number

    @IsDate()
    start: Date

    @IsDate()
    end: Date
}