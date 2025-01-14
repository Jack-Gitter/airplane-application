import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { Flight } from "./Flight";
import { FLIGHT_TYPE } from "./FlightEnums";
import { FlightFactory } from "./FlightFactory";
import { randomUUID } from "crypto";
import { SEAT_COLUMN, SeatPosition } from "./ValueObjects/SeatPosition";
import { BadRequestException } from "@nestjs/common";

describe(Flight.name, () => {

    let flight: Flight 

    beforeEach(() => {
        const flightFactory = new FlightFactory()
        flight = flightFactory.createFlight(FLIGHT_TYPE.Commercial)
    })

    test('Creating a reservation occurs successfully', () => {
        const personId = randomUUID()
        const seatRow = 1
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        flight.reserveSeat(seatPosition, personId)

        expect(flight.reservations).toHaveLength(1)
        expect(flight.reservations[0].flight).toBe(flight.id)
        expect(flight.reservations[0].personId).toBe(personId)
        expect(flight.reservations[0].seatPosition).toMatchObject(seatPosition)

    })

    test('Trying to create a reservation for a seat that doesnt exist throws an error', () => {
        const personId = randomUUID()
        const seatRow = 50
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        expect(() => flight.reserveSeat(seatPosition, personId)).toThrow(BadRequestException)
    })

    test('Trying to create a reservation for a seat that already has a reservation', () => {
        const personId = randomUUID()
        const seatRow = 1
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        flight.reserveSeat(seatPosition, personId)
        expect(() => flight.reserveSeat(seatPosition, personId)).toThrow(BadRequestException)
    })

})