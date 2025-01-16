import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Repository } from "typeorm";

@Injectable()
export class CheckScheduleService {
    constructor(
        @InjectRepository(FlightSchedule) private flightScheduleRepository: Repository<FlightSchedule>,
        private eventEmitter: EventEmitter2
    ) {}

    public async checkScheduleExists(id: UUID) {

        const schedule = await this.flightScheduleRepository.findOne({
            where: {id}
        })

        if (!schedule) {
            this.eventEmitter.emit('RemoveScheduleFromFlight', id)
        }

    }
}