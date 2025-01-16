import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./Entity/Segment";
import { UUID } from "crypto";
import { Flight } from "../Flight/Flight";

@Entity('FlightSchedule')
export class FlightSchedule {

    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @OneToOne(() => Flight, (flight) => flight.schedule)
    public flight: UUID

    @OneToMany(() => Segment, (segment) => segment.scheduleId, { cascade: true, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    public segments: Array<Segment>

    private constructor(segments: Array<Segment>) {
        this.segments = segments
    }

    public static CreateFlightSchedule(): FlightSchedule {
        return new FlightSchedule(new Array())
    }

    public addSegment(flightId: UUID) {

    }

}