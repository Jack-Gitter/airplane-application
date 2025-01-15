import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Flight } from "src/Domain/Flight/Flight";
import { ArrayContains, Repository } from "typeorm";

export class RemoveReservationsByPersonService {
    constructor(@InjectRepository(Flight) private flightRepository: Repository<Flight>) {}

    public async removeReservationByPerson(personId: UUID) {
        const flights = await this.flightRepository.find({
            where: {
                reservations: ArrayContains([personId])
            }
        })
        console.log(flights)
    }
}