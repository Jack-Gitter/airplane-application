import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CancelFlightScheduleService } from "src/Application/FlightSchedule/CancelFlightSchedule.service";
import { CreateFlightScheduleService } from "src/Application/FlightSchedule/CreateSchedule.service";
import { CancelFlightScheduleDTO } from "./Dto/CancelFlightScheduleDTO";
import { AddSegmentService } from "src/Application/FlightSchedule/AddSegment.service";
import { AddSegmentDTO } from "./Dto/AddSegmentDTO";

@Controller('flightSchedule')
export class FlightScheduleController {

    constructor(
        private createFlightScheduleService: CreateFlightScheduleService,
        private cancelFlightScheduleService: CancelFlightScheduleService,
        private addSegmentService: AddSegmentService
    ) { }

    @Post()
    public async createFlightSchedule() {
        return await this.createFlightScheduleService.createFlightSchedule()
    }
    
    @Delete()
    public async cancelFlightSchedule(@Body() cancelFlightScheduleDTO: CancelFlightScheduleDTO) {
        return await this.cancelFlightScheduleService.cancelFlightSchedule(cancelFlightScheduleDTO.scheduleId)
    }

    @Post('segment')
    public async addSegment(@Body() addSegmentDTO: AddSegmentDTO) {
        return await this.addSegmentService.addSegment(
            addSegmentDTO.scheduleId, 
            addSegmentDTO.toName, 
            addSegmentDTO.toLongitude, 
            addSegmentDTO.toLatitude,
            addSegmentDTO.fromName,
            addSegmentDTO.fromLongitude,
            addSegmentDTO.fromLatitude,
            addSegmentDTO.start,
            addSegmentDTO.end
        )
    }

}