import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { DataSource } from "typeorm";
import { PersonalFlightDetails } from "../ReadModels/PersonalFlightDetails";
import { Reservation } from "src/Domain/Flight/Entities/Reservation/Reservation";
import { Flight } from "src/Domain/Flight/Flight";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Segment } from "src/Domain/FlightSchedule/Entity/Segment";

@Injectable()
export class ProjectionDAO {

    constructor(private dataSource: DataSource) {}

    public async flightDetailsByPerson(personId: UUID): Promise<PersonalFlightDetails[]> {
        
        const queryResults = await this.dataSource.createQueryBuilder()
        .select()
        .from(Reservation, 'reservation')
        .where('personId = :personId', {personId})
        .innerJoinAndSelect(FlightSchedule, 'flightSchedule')
        .innerJoinAndSelect(Segment, 'segment')
        .where('reservation.flight = flightSchedule.flight AND flightSchedule.id = segment.scheduleId')
        .getRawMany()


        const personalFlightDetails: PersonalFlightDetails[] = []

        for (const result of queryResults) {
            const details = new PersonalFlightDetails(result.seatPosition, result.to, result.from)
            personalFlightDetails.push(details)
        }

        return personalFlightDetails
    }

}