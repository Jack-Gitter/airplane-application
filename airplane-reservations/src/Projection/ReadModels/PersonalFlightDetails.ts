import { SeatPosition } from "src/Domain/Flight/ValueObjects/SeatPosition";
import { Location } from "src/Domain/FlightSchedule/ValueObjects/Location";

// this class is responsible for transfering data about all of a users flihgts
export class PersonalFlightDetails {
    constructor(private seatPosition: SeatPosition, private to: Location, private from: Location) {}
}