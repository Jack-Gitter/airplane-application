import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { randomUUID, UUID } from "crypto";
import { Flight } from "src/Domain/Flight/Flight";
import { DataSource } from "typeorm";

@Injectable()
export class RemoveScheduleService {
    constructor(@InjectDataSource() private dataSource: DataSource) { }

    public async removeScheduleService(scheduleId: UUID) {

        await this.dataSource.transaction(async (entityManager) => {
            const flightRepository = entityManager.getRepository(Flight)
            const flight = await flightRepository
            .createQueryBuilder('flight')
            .where('flight.schedule = :scheduleId', {scheduleId})
            .getOne()

            if (flight) {
                flight.setSchedule(null)
                await flightRepository.save(flight)
            }
        })

    }


}