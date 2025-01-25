import { Controller, Get, Param } from "@nestjs/common";
import { UUID } from "crypto";
import { ProjectionDAO } from "src/Projection/DAOs/ProjectionDAO";
import { PersonalFlightDetailsDTO } from "./Dto/PersonalFlightDetailsDto";

@Controller()
export class ProjectionController {

    constructor(private projectionDAO: ProjectionDAO) {}

    @Get('person/:id/flight')
    public async personalFlightDetails(@Param() personalFlightDetailsDTO: PersonalFlightDetailsDTO ) {
        return await this.projectionDAO.flightDetailsByPerson(personalFlightDetailsDTO.id)
    }

}