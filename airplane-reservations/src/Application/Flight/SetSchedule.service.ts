import { BadRequestException, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Flight } from "src/Domain/Flight/Flight";
import { DataSource } from "typeorm";

@Injectable()
export class SetScheduleService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        private eventEmitter: EventEmitter2
    ) {}

    public async setSchedule(flightId: UUID, scheduleId: UUID) {
        await this.dataSource.transaction(async (entityManager) => {
            const flightRepository = entityManager.getRepository(Flight)

            const flight = await flightRepository
            .createQueryBuilder('flight')
            .where('flight.id = :flightId', {flightId})
            .setLock('pessimistic_write')
            .getOne()

            if (!flight) {
                throw new BadRequestException(`Flight with id ${flightId} does not exist`)
            }

            flight.setSchedule(scheduleId)

            await flightRepository.save(flight)

            this.eventEmitter.emit('CheckScheduleExists', scheduleId)
        })
    }

}