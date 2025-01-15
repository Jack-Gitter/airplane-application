import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Flight } from "src/Domain/Flight/Flight";
import { ArrayContains, DataSource, Repository } from "typeorm";

export class CancelReservationsByPersonService {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async cancelReservationByPerson(personId: UUID) {

        await this.dataSource.transaction(async (entityManager) => {

            const flightRepository = entityManager.getRepository(Flight)

            const flights = await flightRepository
            .createQueryBuilder('flight')
            .setLock('pessimistic_write')
            .innerJoinAndSelect('flight.reservations', 'reservations')
            .where('reservations."personId" = :personId', { personId }) 
            .getMany()

            for (const flight of flights) {
                flight.cancelReservationsByPerson(personId)
            }

            await flightRepository.save(flights)

        })
    }
}