import { Column } from "typeorm"

export class Location {

    @Column()
    private name: string

    @Column()
    private longitude: number

    @Column()
    private latitude: number

    constructor(name: string, longitutde: number, latitude: number) {
        this.name = name
        this.longitude = longitutde
        this.latitude = latitude
    }

    public getNameCopy(): string {
        return this.name
    }

    public getLongitudeCopy(): number {
        return this.longitude
    }

    public getLatitudeCopy(): number {
        return this.latitude
    }
}