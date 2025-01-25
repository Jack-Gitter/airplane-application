import { SeatPosition } from "src/Domain/Flight/ValueObjects/SeatPosition";
import { Location } from "src/Domain/FlightSchedule/ValueObjects/Location";

export class PersonalFlightDetails {
    constructor(private seatPosition: SeatPosition, private to: Location, private from: Location) {}
}