import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { NotFoundError } from 'rxjs';
import { Reservation } from 'src/Domain/Flight/Entities/Reservation/Reservation';
import { Flight } from 'src/Domain/Flight/Flight';
import { SEAT_COLUMN, SeatPosition } from 'src/Domain/Flight/ValueObjects/SeatPosition';
import { DataSource } from 'typeorm';

@Injectable()
export class SwitchReservationService {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async switchReservation(
        flightId: UUID, 
        personId: UUID, 
        currentSeatRow: number, 
        currentSeatCol: SEAT_COLUMN,
        desiredSeatRow: number,
        desiredSeatCol: SEAT_COLUMN
    ) {

        await this.dataSource.transaction(async (entityManager) => {

            const currentSeatPosition = new SeatPosition(currentSeatRow, currentSeatCol)
            const desiredSeatPosition = new SeatPosition(desiredSeatRow, desiredSeatCol)

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

            flight.switchReservation(currentSeatPosition, desiredSeatPosition, personId)

            await flightRepository.save(flight)

        })
    }
}