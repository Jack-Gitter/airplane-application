import { Controller } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { CheckScheduleService } from "src/Application/FlightSchedule/CheckSchedule.service";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Repository } from "typeorm";

@Controller()
export class FlightScheduleEventHandler {

    constructor(
        private checkScheduleService: CheckScheduleService,
        private eventEmitter: EventEmitter2
    ) {}

    @OnEvent('CheckScheduleExists', { async: true })
    public async checkHandleScheduleEvent(data: UUID) {
        const schedule = await this.checkScheduleService.checkScheduleExists(data)
        if (!schedule) {
            this.eventEmitter.emit('RemoveScheduleFromFlight', data)
        }
    }
}