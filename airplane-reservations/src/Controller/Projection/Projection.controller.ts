import { Controller, Get } from "@nestjs/common";
import { UUID } from "crypto";
import { ProjectionDAO } from "src/Projection/DAOs/ProjectionDAO";

@Controller()
export class ProjectionController {

    constructor(private projectionDAO: ProjectionDAO) {}

    @Get('person/:id/flight')
    public async personalFlightDetails(personId: UUID) {
        return await this.projectionDAO.flightDetailsByPerson(personId)
    }

}