import { BadRequestException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Repository } from "typeorm";

export class CancelFlightScheduleService {
    constructor(
        @InjectRepository(FlightSchedule) private flightScheduleRepository: Repository<FlightSchedule>,
        private eventEmitter: EventEmitter2
    ) {}

    public async cancelFlightSchedule(id: UUID) {
        const res = await this.flightScheduleRepository.delete({id})
        if (res.affected === 0) {
            throw new BadRequestException(`No flight schedule with id ${id} exists`)
        }
        this.eventEmitter.emit('FlightScheduleCanceled', id)
    }
}