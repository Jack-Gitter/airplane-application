import { UUID } from "crypto";

export class DoesPersonExistDTO {
    constructor (private found: boolean, private personId: UUID ) {}

    public getFound() {
        return this.found
    }
    public getPersonId() {
        return this.personId
    }
}