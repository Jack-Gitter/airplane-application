import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CancelFlightScheduleService } from "src/Application/FlightSchedule/CancelFlightSchedule.service";
import { CreateFlightScheduleService } from "src/Application/FlightSchedule/CreateSchedule.service";
import { CancelFlightScheduleDTO } from "./CancelFlightScheduleDTO";

@Controller('flightSchedule')
export class FlightScheduleController {

    constructor(
        private createFlightScheduleService: CreateFlightScheduleService,
        private cancelFlightScheduleService: CancelFlightScheduleService
    
    ) { }

    @Post()
    public async createFlightSchedule() {
        return await this.createFlightScheduleService.createFlightSchedule()
    }
    
    @Delete()
    public async cancelFlightSchedule(@Body() cancelFlightScheduleDTO: CancelFlightScheduleDTO) {
        return await this.cancelFlightScheduleService.cancelFlightSchedule(cancelFlightScheduleDTO.scheduleId)
    }

}