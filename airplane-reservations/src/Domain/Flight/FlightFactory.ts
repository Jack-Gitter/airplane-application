import { BadRequestException } from "@nestjs/common";
import { Flight } from "./Flight";
import { FLIGHT_TYPE } from "./FlightEnums";
import { SEAT_COLUMN, SeatPosition } from "./ValueObjects/SeatPosition";
import { Seat } from "./Entities/Reservation/Seat";
import { BASE_COMMERCIAL_FLIGHT_PRICE_SUB_UNITS, BASE_COMMERCIAL_FLIGHT_PRICE_UNITS, BASE_PRIVATE_FLIGHT_SUB_UNITS, COMMERCIAL_FLIGHT_ROW_COUNT, PRIVATE_FLIGHT_ROW_COUNT, SEAT_VOLITILITY, USD } from "./FlightConstants";
import { Price } from "./ValueObjects/Price";
import { randomUUID, UUID } from "crypto";

export class FlightFactory {

    public createFlight(flightType: FLIGHT_TYPE): Flight {
        let seats: Array<Seat>
        const flightId = randomUUID()
        switch (flightType) {
            case FLIGHT_TYPE.Commercial: 
                seats = this.generateSeats(flightId, flightType, new Price(USD, BASE_COMMERCIAL_FLIGHT_PRICE_UNITS, BASE_COMMERCIAL_FLIGHT_PRICE_SUB_UNITS))
                return new Flight(flightId, seats)
            case FLIGHT_TYPE.Private:
                seats = this.generateSeats(flightId, flightType, new Price(USD, BASE_PRIVATE_FLIGHT_SUB_UNITS, BASE_PRIVATE_FLIGHT_SUB_UNITS))
                return new Flight(flightId, seats)
            default: 
                throw new BadRequestException('Unknown Flight Type')
        }
    }

    private generateSeats(flightId: UUID, flightType: FLIGHT_TYPE, basePrice: Price): Array<Seat> {
        switch (flightType) {
            case FLIGHT_TYPE.Commercial: 
                return this.seatAlgorithm(flightId, COMMERCIAL_FLIGHT_ROW_COUNT, basePrice)
            case FLIGHT_TYPE.Private:
                return this.seatAlgorithm(flightId, PRIVATE_FLIGHT_ROW_COUNT, basePrice)
            default: 
                throw new BadRequestException('Unknown Flight Type')
        }
    }

    private seatAlgorithm(flightId: UUID, flightRowCount: number, basePrice: Price): Array<Seat> {
        const flightSeats: Array<Seat> = new Array<Seat>()
        for (const seatRow of [...Array(flightRowCount).keys()]) {
            for (const seatCol of Object.values(SEAT_COLUMN)) {
                const seatPosition = new SeatPosition(seatRow, seatCol)
                const newUnits = basePrice.getUnitsCopy() + Math.floor(Math.random() * SEAT_VOLITILITY)
                const seatPrice = new Price(basePrice.getCurrencyCopy(), newUnits, basePrice.getSubUnitsCopy())
                const seat = Seat.CreateSeat(flightId, seatPosition, seatPrice)
                flightSeats.push(seat)
            }
        }
        return flightSeats
    }
}