import { BadRequestException } from "@nestjs/common"
import { Flight } from "../Flight/Flight"
import { FLIGHT_TYPE } from "../Flight/FlightEnums"
import { FlightFactory } from "../Flight/FlightFactory"
import { Segment } from "./Entity/Segment"
import { FlightSchedule } from "./FlightSchedule"
import { Location } from "./ValueObjects/Location"

describe(FlightSchedule.name, () => {

    let flightSchedule: FlightSchedule
    let greece: Location
    let bahamas: Location
    let segment: Segment

    beforeEach(() => {
        flightSchedule = FlightSchedule.CreateFlightSchedule()
        greece = new Location('Greece', 1, 1)
        bahamas = new Location('Bahamas', 2, 2)
        segment = new Segment(greece, bahamas, new Date('2024-12-12'), new Date('2024-12-13'))
    })
    test('Adding a segment to a flight works when no other segments are on the flight', () => {
        expect(flightSchedule.segments).toHaveLength(0)
        flightSchedule.addSegment(segment)
        expect(flightSchedule.segments).toHaveLength(1)
    })

    test('Adding a non-overlapping segment works', () => {
        const segment2 = new Segment(bahamas, greece, new Date('2025-12-12'), new Date('2025-12-13'))
        expect(flightSchedule.segments).toHaveLength(0)
        flightSchedule.addSegment(segment)
        flightSchedule.addSegment(segment2)
        expect(flightSchedule.segments).toHaveLength(2)
    })
    test('Adding an overlapping segment throws an error', () => {
        const segment2 = new Segment(bahamas, greece, new Date('2024-12-12'), new Date('2024-12-14'))
        expect(flightSchedule.segments).toHaveLength(0)
        flightSchedule.addSegment(segment)
        expect(flightSchedule.segments).toHaveLength(1)
        expect(() => flightSchedule.addSegment(segment2)).toThrow(BadRequestException)
    })
})