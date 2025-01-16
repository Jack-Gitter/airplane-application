import { UUID } from "crypto"

export class DoesPersonExistDTO {
    constructor(private found: boolean, private personId: UUID) {}
}