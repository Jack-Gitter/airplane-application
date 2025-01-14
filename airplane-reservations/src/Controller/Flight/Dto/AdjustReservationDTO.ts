import { IsEnum, IsNumber, IsUUID } from "class-validator"
import { UUID } from "crypto"
import { SEAT_COLUMN } from "src/Domain/Flight/ValueObjects/SeatPosition"

export class AdjustReservationDTO {
    @IsUUID()
    flightId: UUID

    @IsUUID()
    personId: UUID

    @IsNumber()
    seatRow: number

    @IsEnum(SEAT_COLUMN)
    seatColumn: SEAT_COLUMN
}