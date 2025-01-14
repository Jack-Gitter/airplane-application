import { IsUUID } from "class-validator";
import { UUID } from "crypto";

export class FindPersonDTO {

    @IsUUID()
    id: UUID

}