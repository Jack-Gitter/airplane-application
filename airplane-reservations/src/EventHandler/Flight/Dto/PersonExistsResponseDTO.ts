import { UUID } from "crypto";

export type PersonExistsResponseDTO = {
    found: boolean,
    personId: UUID
}