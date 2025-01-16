import { IsEnum, IsNumber, IsUUID } from "class-validator"
import { UUID } from "crypto"
import { SEAT_COLUMN } from "src/Domain/Flight/ValueObjects/SeatPosition"

export class SwitchReservationDTO {

    @IsUUID()
    flightId: UUID

    @IsUUID()
    personId: UUID

    @IsNumber()
    currentSeatRow: number

    @IsEnum(SEAT_COLUMN)
    currentSeatColumn: SEAT_COLUMN

    @IsNumber()
    desiredSeatRow: number

    @IsEnum(SEAT_COLUMN)
    desiredSeatColumn: SEAT_COLUMN
}