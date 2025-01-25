import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { DataSource } from "typeorm";
import { PersonalFlightDetails } from "../ReadModels/PersonalFlightDetails";
import { Reservation } from "src/Domain/Flight/Entities/Reservation/Reservation";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Segment } from "src/Domain/FlightSchedule/Entity/Segment";
import { Flight } from "src/Domain/Flight/Flight";
import { Location } from "src/Domain/FlightSchedule/ValueObjects/Location";
import { SeatPosition } from "src/Domain/Flight/ValueObjects/SeatPosition";

@Injectable()
export class ProjectionDAO {

    constructor(private dataSource: DataSource) {}

    public async flightDetailsByPerson(personId: UUID): Promise<PersonalFlightDetails[]> {
        
        const queryResults = await this.dataSource.createQueryBuilder()
        .select('*')
        .from(Reservation, 'reservation')
        .where('reservation.personId = :personId', {personId})
        .innerJoin(Flight, 'flight', 'flight.id = reservation."flightId"')
        .innerJoin(FlightSchedule, 'flightschedule', 'flightschedule.id = flight.schedule')
        .innerJoin(Segment, 'segment', 'segment."scheduleIdId" = flightschedule.id')
        .getRawMany()

        const personalFlightDetails: PersonalFlightDetails[] = []

        queryResults.forEach(result => {
            const to = new Location(result.toName, result.toLongitude, result.toLatitude)
            const from = new Location(result.fromName, result.fromLongitude, result.fromLatitude)
            const seatPosition = new SeatPosition(result.seatPositionRow, result.seatPositionColumn)
            const details = new PersonalFlightDetails(seatPosition, to, from)
            personalFlightDetails.push(details)
        })

        return personalFlightDetails
    }

}