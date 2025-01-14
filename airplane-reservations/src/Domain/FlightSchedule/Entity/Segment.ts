import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Location } from "../ValueObjects/Location"
import { UUID } from "crypto"
import { Flight } from "../../Flight/Flight"

@Entity('Segment')
export class Segment {

    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @ManyToOne(() => Flight, (flight) => flight.id)
    public flight: UUID

    @Column(() => Location)
    private to: Location

    @Column(() => Location)
    private from: Location

    @Column()
    private start: Date

    @Column()
    private end: Date

    constructor(to: Location, from: Location, start: Date, end: Date) {
        this.to = to
        this.from = from
        this.start = start
        this.end = end
    }

    public getToCopy(): Location {
        return this.to
    }

    public getFromCopy(): Location {
        return this.from
    }

    public getStartCopy(): Date {
        return new Date(this.start)
    }

    public getEndCopy(): Date {
        return new Date(this.end)
    }
}