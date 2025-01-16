import { Controller } from "@nestjs/common";
import {  OnEvent } from "@nestjs/event-emitter";
import { UUID } from "crypto";
import { CheckScheduleService } from "src/Application/FlightSchedule/CheckSchedule.service";

@Controller('flightScheduleEventHandler')
export class FlightScheduleEventHandler {

    constructor(
        private checkScheduleService: CheckScheduleService,
    ) {}

    @OnEvent('CheckScheduleExists', { async: true })
    public async checkHandleScheduleEvent(data: UUID) {
        await this.checkScheduleService.checkScheduleExists(data)
    }
}