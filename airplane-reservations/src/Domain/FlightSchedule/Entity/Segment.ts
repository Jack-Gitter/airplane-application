import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Location } from "../ValueObjects/Location"
import { UUID } from "crypto"
import { FlightSchedule } from "../FlightSchedule"

@Entity('Segment')
export class Segment {

    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @ManyToOne(() => FlightSchedule, (flightSchedule) => flightSchedule.segments, {orphanedRowAction: 'delete'})
    public scheduleId: UUID

    @Column(() => Location)
    public to: Location

    @Column(() => Location)
    public from: Location

    @Column()
    public start: Date

    @Column()
    public end: Date

    constructor(to: Location, from: Location, start: Date, end: Date) {
        this.to = to
        this.from = from
        this.start = start
        this.end = end
    }
}