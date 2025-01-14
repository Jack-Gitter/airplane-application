import { IsUUID } from "class-validator";
import { UUID } from "crypto";

export class DeletePersonDTO {
    @IsUUID()
    id: UUID
}