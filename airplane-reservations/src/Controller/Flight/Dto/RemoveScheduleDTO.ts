import { IsUUID } from "class-validator";
import { UUID } from "crypto";

export class removeScheduleDTO {
    @IsUUID()
    flightId: UUID
}