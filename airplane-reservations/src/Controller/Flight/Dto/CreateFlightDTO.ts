import { IsEnum } from "class-validator"
import { FLIGHT_TYPE } from "src/Domain/Flight/FlightEnums"

export class CreateFlightDTO {
    @IsEnum(FLIGHT_TYPE)
    flightType: FLIGHT_TYPE
}