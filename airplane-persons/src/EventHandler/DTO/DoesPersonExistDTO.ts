import { UUID } from "crypto"

export type DoesPersonExistDTO = {
    found: boolean
    personId: UUID
}