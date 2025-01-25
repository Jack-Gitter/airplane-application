import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { DataSource } from "typeorm";
import { PersonalFlightDetails } from "../ReadModels/PersonalFlightDetails";
import { Reservation } from "src/Domain/Flight/Entities/Reservation/Reservation";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Segment } from "src/Domain/FlightSchedule/Entity/Segment";
import { Flight } from "src/Domain/Flight/Flight";

@Injectable()
export class ProjectionDAO {

    constructor(private dataSource: DataSource) {}

    public async flightDetailsByPerson(personId: UUID): Promise<PersonalFlightDetails[]> {
        
        const queryResults = await this.dataSource.createQueryBuilder()
        .select()
        .from(Reservation, 'reservation')
        .where('reservation.personId = :personId', {personId})
        .leftJoinAndSelect(Flight, 'flight', 'flight.id = reservation."flightId"')
        /*.leftJoinAndSelect(FlightSchedule, 'flightschedule', 'flightschedule.id = flight.schedule')
        .leftJoinAndSelect(Segment, 'segment', 'segment."scheduleIdId" = flightschedule.id')*/
        .getRawMany()
        console.log(queryResults)

        console.log(queryResults)
        const personalFlightDetails: PersonalFlightDetails[] = []

        /*for (const result of queryResults) {
            const details = new PersonalFlightDetails(result.seatPosition, result.to, result.from)
            personalFlightDetails.push(details)
        }*/

        return personalFlightDetails
    }

}