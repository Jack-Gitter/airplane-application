import { Controller, Post } from "@nestjs/common";
import { CreateFlightScheduleService } from "src/Application/FlightSchedule/CreateSchedule.service";

@Controller('flightSchedule')
export class FlightScheduleController {

    constructor(private createFlightScheduleService: CreateFlightScheduleService) { }

    @Post()
    public async createFlightSchedule() {
        return await this.createFlightScheduleService.createFlightSchedule()
    }

}