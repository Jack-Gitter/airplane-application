import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectDataSource } from "@nestjs/typeorm"
import { UUID } from "crypto"
import { Reservation } from "src/Domain/Flight/Entities/Reservation/Reservation"
import { Flight } from "src/Domain/Flight/Flight"
import { SEAT_COLUMN, SeatPosition } from "src/Domain/Flight/ValueObjects/SeatPosition"
import { DataSource } from "typeorm"

@Injectable()
export class CancelReservationService {

    public constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    public async cancelReservation(flightId: UUID, personId: UUID, seatRow: number, seatCol: SEAT_COLUMN) {

        await this.dataSource.transaction(async (entityManager) => {

            const flightRepository = entityManager.getRepository(Flight)

            const flight = await entityManager
            .getRepository(Flight)
            .createQueryBuilder('flight')
            .innerJoinAndSelect('flight.seats', 'seats')
            .where('flight.id = :flightId', {flightId})
            .setLock('pessimistic_write')
            .getOne()

            if (!flight) {
                throw new NotFoundException(`Cannot find flight with id ${flightId}`)
            }

            const reservations = await entityManager
            .getRepository(Reservation)
            .createQueryBuilder('reservation')
            .innerJoin('reservation.flight', 'flight')  
            .where('flight.id = :flightId', {flightId})
            .setLock('pessimistic_write')
            .getMany()

            flight.reservations = reservations

            const seatPosition = new SeatPosition(seatRow, seatCol)

            flight.cancelReservation(seatPosition, personId)

            await flightRepository.save(flight)

        })

    }

}