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

        flight.makeReservation(seatPosition, personId)

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

        expect(() => flight.makeReservation(seatPosition, personId)).toThrow(BadRequestException)
    })

    test('Trying to create a reservation for a seat that already has a reservation', () => {
        const personId = randomUUID()
        const seatRow = 1
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        flight.makeReservation(seatPosition, personId)
        expect(() => flight.makeReservation(seatPosition, personId)).toThrow(BadRequestException)
    })

    test('Canceling an existing reservation works properly', () => {
        const personId = randomUUID()
        const seatRow = 1
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        flight.makeReservation(seatPosition, personId)

        expect(flight.reservations).toHaveLength(1)

        flight.cancelReservation(seatPosition, personId)

        expect(flight.reservations).toHaveLength(0)

    })
    test('Canceling a reservation for a seat that does not exist throws error', () => {
        const personId = randomUUID()
        const seatRow = 100
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        expect(() => flight.cancelReservation(seatPosition, personId)).toThrow(BadRequestException)
    })
    test('Canceling a reservation for a reservation that does not exist throws error', () => {
        const personId = randomUUID()
        const seatRow = 1
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        expect(() => flight.cancelReservation(seatPosition, personId)).toThrow(BadRequestException)
    })

    test('Canceling a reservation by person works properly', () => {
        const personId = randomUUID()

        const seatRow1 = 1
        const seatCol1 = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow1, seatCol1)

        const seatRow2 = 2
        const seatCol2 = SEAT_COLUMN.A
        const seatPosition2 = new SeatPosition(seatRow2, seatCol2)

        const personId2 = randomUUID()
        const seatRow3 = 3
        const seatCol3 = SEAT_COLUMN.A

        const seatPosition3 = new SeatPosition(seatRow3, seatCol3)

        flight.makeReservation(seatPosition, personId)
        flight.makeReservation(seatPosition2, personId)
        flight.makeReservation(seatPosition3, personId2)

        expect(flight.reservations).toHaveLength(3)

        flight.cancelReservationsByPerson(personId)

        expect(flight.reservations).toHaveLength(1)

    })

    test('Throws error if there are no reservations on the flight', () => {
        expect(() => flight.cancelReservationsByPerson(randomUUID())).toThrow(BadRequestException)
    })

    test('Throws error if there are no reservations for the specific user on the flight', () => {
        const personId = randomUUID()

        const seatRow = 1
        const seatCol = SEAT_COLUMN.A
        const seatPosition = new SeatPosition(seatRow, seatCol)

        flight.makeReservation(seatPosition, personId)

        expect(() => flight.cancelReservationsByPerson(randomUUID())).toThrow(BadRequestException)

    })

})