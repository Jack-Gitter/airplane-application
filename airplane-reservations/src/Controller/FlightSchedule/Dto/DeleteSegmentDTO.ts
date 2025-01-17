import { isUUID, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class RemoveSegmentDTO {
    @IsUUID()
    scheduleId: UUID

    @IsUUID()
    segmentId: UUID


}