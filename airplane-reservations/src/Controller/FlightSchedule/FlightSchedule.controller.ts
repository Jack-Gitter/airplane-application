import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CancelFlightScheduleService } from "src/Application/FlightSchedule/CancelFlightSchedule.service";
import { CreateFlightScheduleService } from "src/Application/FlightSchedule/CreateSchedule.service";
import { CancelFlightScheduleDTO } from "./Dto/CancelFlightScheduleDTO";
import { AddSegmentService } from "src/Application/FlightSchedule/AddSegment.service";
import { AddSegmentDTO } from "./Dto/AddSegmentDTO";
import { RemoveSegmentDTO } from "./Dto/DeleteSegmentDTO";
import { RemoveSegmentService } from "src/Application/FlightSchedule/RemoveSegment.service";

@Controller('flightSchedule')
export class FlightScheduleController {

    constructor(
        private createFlightScheduleService: CreateFlightScheduleService,
        private cancelFlightScheduleService: CancelFlightScheduleService,
        private addSegmentService: AddSegmentService,
        private removeSegmentService: RemoveSegmentService
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

    @Delete('segment')
    public async removeSegment(@Body() removeSegmentDTO: RemoveSegmentDTO) {
        return await this.removeSegmentService.removeSegment(removeSegmentDTO.scheduleId, removeSegmentDTO.segmentId)
    }

}