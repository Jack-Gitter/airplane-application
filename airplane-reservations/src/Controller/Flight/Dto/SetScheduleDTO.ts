import { IsUUID } from "class-validator";
import { UUID } from "crypto";

export class SetScheduleDTO {
    @IsUUID()
    flightId: UUID

    @IsUUID()
    scheduleId: UUID
}