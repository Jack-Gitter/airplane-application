import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./Entity/Segment";
import { UUID } from "crypto";

@Entity('FlightSchedule')
export class FlightSchedule {

    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @OneToMany(() => Segment, (segment) => segment.flight, { cascade: true, onDelete: 'CASCADE' })
    public segments: Array<Segment>

    private constructor(segments: Array<Segment>) {
        this.segments = segments
    }

    public CreateFlightSchedule(): FlightSchedule {
        return new FlightSchedule(new Array())
    }

}