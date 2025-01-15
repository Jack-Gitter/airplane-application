import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Flight } from "src/Domain/Flight/Flight";
import { ArrayContains, Repository } from "typeorm";

export class CancelReservationsByPersonService {
    constructor(@InjectRepository(Flight) private flightRepository: Repository<Flight>) {}

    public async cancelReservationByPerson(personId: UUID) {
        const flights = await this.flightRepository
        .createQueryBuilder('flight')
        .setLock('pessimistic_write')
        .innerJoinAndSelect('flight.reservations', 'reservations')
        .where('reservations."personId" = :personId', { personId }) 
        .getMany()

        for (const flight of flights) {
            flight.cancelReservationsByPerson(personId)
        }

        await this.flightRepository.save(flights)
    }
}