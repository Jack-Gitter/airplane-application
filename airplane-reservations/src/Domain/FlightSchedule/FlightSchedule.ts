import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./Entity/Segment";
import { UUID } from "crypto";
import { Flight } from "../Flight/Flight";
import { BadRequestException } from "@nestjs/common";

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

    public addSegment(segment: Segment) {
        if (!this.segments) {
            this.segments = new Array<Segment>()
        }


        const overlapsWith = this.segments.find((existingSegment) => {
            return this.isOverlapping({start: existingSegment.start, end: existingSegment.end}, {start: segment.start, end: segment.end})
        })

        if (overlapsWith) {
            throw new BadRequestException(`Date range for segment overlaps with another existing segment with id ${overlapsWith.id}`)
        }

        this.segments.push(segment)
    }

    public removeSegment(segmentId: UUID) {
        const startingSegmentCount = this.segments.length
        this.segments = this.segments.filter((existingSegment) => segmentId === existingSegment.id)
        const currentSegmentCount = this.segments.length

        if (startingSegmentCount === currentSegmentCount) {
            throw new BadRequestException(`No segment exists with the given id ${segmentId}`)
        }
    }

    private isOverlapping(range1: { start: Date, end: Date }, range2: { start: Date, end: Date }): boolean {
        return range1.start < range2.end && range1.end > range2.start;
    }
}