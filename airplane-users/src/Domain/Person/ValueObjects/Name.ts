import { Column } from "typeorm"

export class Name {

    @Column()
    private firstName: string

    @Column()
    private middleName: string

    @Column()
    private lastName: string

    constructor(firstName: string, middleName: string, lastName: string) {
        this.firstName = firstName
        this.middleName = middleName
        this.lastName = lastName
    }

    public toString() {
        return this.firstName + ' ' + this.middleName + ' ' + this.lastName
    }
}