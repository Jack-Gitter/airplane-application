import { InjectDataSource } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Flight } from "src/Domain/Flight/Flight";
import { DataSource } from "typeorm";

export class RemoveScheduleService {
    constructor(@InjectDataSource() private dataSource: DataSource) { }

    public async removeScheduleService(schedule: UUID) {

        await this.dataSource.transaction(async (entityManager) => {
            const flightRepository = entityManager.getRepository(Flight)
            const flight = await flightRepository.findOne({ where: {schedule} })
            flight.setSchedule(undefined)
            flightRepository.save(flight)
        })

    }


}