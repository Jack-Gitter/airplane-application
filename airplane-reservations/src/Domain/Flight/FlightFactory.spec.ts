import { Flight } from "./Flight";
import { COMMERCIAL_FLIGHT_ROW_COUNT, PRIVATE_FLIGHT_ROW_COUNT, SEAT_VOLITILITY } from "./FlightConstants";
import { FLIGHT_TYPE } from "./FlightEnums";
import { FlightFactory } from "./FlightFactory";
import { SEAT_COLUMN } from "./ValueObjects/SeatPosition";

describe(FlightFactory.name, () => {

    let flightFactory: FlightFactory
    let commercialFlight: Flight
    let privateFlight: Flight

    beforeAll(() => {
        flightFactory = new FlightFactory()
        commercialFlight = flightFactory.createFlight(FLIGHT_TYPE.Commercial)
        privateFlight = flightFactory.createFlight(FLIGHT_TYPE.Private)
    })
    test(`Generates seats all with unique combination of row and seat`, () => {
        const commericalFlightSeats = commercialFlight.seats
        const privateFlightSeats = privateFlight.seats

        for (let i = 0; i < commericalFlightSeats.length; i++) {
            for (let j = i+1; j < commericalFlightSeats.length; j++) {
                expect(commericalFlightSeats[i].position.equals(commericalFlightSeats[j].position)).toBe(false)
            }
        }

        for (let i = 0; i < privateFlightSeats.length; i++) {
            for (let j = i+1; j < privateFlightSeats.length; j++) {
                expect(privateFlightSeats[i].position.equals(privateFlightSeats[j].position)).toBe(false)
            }
        }
    })

    test(`Generates the expected number of seats for each respective flight type`, () => {
        const commericalFlightSeats = commercialFlight.seats
        const privateFlightSeats = privateFlight.seats

        expect(commericalFlightSeats).toHaveLength(COMMERCIAL_FLIGHT_ROW_COUNT * Object.values(SEAT_COLUMN).length)
        expect(privateFlightSeats).toHaveLength(PRIVATE_FLIGHT_ROW_COUNT * Object.values(SEAT_COLUMN).length)
    })

    test(`The maximum price difference between seats is equal to the defined volitility`, () => {
        const commericalFlightSeats = commercialFlight.seats
        const privateFlightSeats = privateFlight.seats

        let leastExpensiveSeatUnits = Number.MAX_VALUE
        let mostExpensiveSeatUnits = Number.MIN_VALUE

        for (const seat of commericalFlightSeats) {
            leastExpensiveSeatUnits = Math.min(leastExpensiveSeatUnits, seat.price.getUnitsCopy())
            mostExpensiveSeatUnits = Math.max(mostExpensiveSeatUnits, seat.price.getUnitsCopy())
        }

        expect(mostExpensiveSeatUnits - leastExpensiveSeatUnits).toBeLessThanOrEqual(SEAT_VOLITILITY)

        for (const seat of privateFlightSeats) {
            leastExpensiveSeatUnits = Math.min(leastExpensiveSeatUnits, seat.price.getUnitsCopy())
            mostExpensiveSeatUnits = Math.max(mostExpensiveSeatUnits, seat.price.getUnitsCopy())
        }

        expect(mostExpensiveSeatUnits - leastExpensiveSeatUnits).toBeLessThanOrEqual(SEAT_VOLITILITY)
    })

})