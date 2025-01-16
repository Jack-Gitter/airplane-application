import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Repository } from "typeorm";

export class CheckScheduleService {
    constructor(
        @InjectRepository(FlightSchedule) private flightScheduleRepository: Repository<FlightSchedule>,
    ) {}

    public async checkScheduleExists(id: UUID) {

        const schedule = await this.flightScheduleRepository.findOne({
            where: {id}
        })

        return schedule

    }
}