import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Repository } from "typeorm";

export class RemoveSegmentService {

    constructor(
        @InjectRepository(FlightSchedule) private flightScheduleRepository: Repository<FlightSchedule>
    ) {}

    public async removeSegment(scheduleID: UUID, segmentId: UUID) {
        await this.flightScheduleRepository.manager.transaction(async (entityManager) => {
            const flightScheduleRepository = entityManager.getRepository(FlightSchedule)
            const flightSchedule = await flightScheduleRepository.findOne({
                lock: {mode: 'pessimistic_write'},
                where: {id: scheduleID}
            })

            if (!flightSchedule) {
                throw new BadRequestException(`No flight schedule with id ${scheduleID}`)
            }

            flightSchedule.removeSegment(segmentId)

            await this.flightScheduleRepository.save(flightSchedule)

        })
    }

}