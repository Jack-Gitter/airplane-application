import { HttpService } from "@nestjs/axios";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Reservation } from "src/Domain/Flight/Entities/Reservation/Reservation";
import { Flight } from "src/Domain/Flight/Flight";
import { SEAT_COLUMN, SeatPosition } from "src/Domain/Flight/ValueObjects/SeatPosition";
import { FindPersonService } from "src/Infrastructure/AirplanePerson/FindPerson.service";
import { DataSource } from "typeorm";

export class ReserveSeatService {

    public constructor(
        @InjectDataSource() private dataSource: DataSource,
        private findPersonService: FindPersonService
    ) {}

    public async reserveSeat(flightId: UUID, personId: UUID, seatRow: number, seatCol: SEAT_COLUMN) {

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

            const person = await this.findPersonService.findPerson(personId)

            if (!person) {
                throw new BadRequestException(`person with id ${personId} does not exist`)
            }

            const seatPosition = new SeatPosition(seatRow, seatCol)

            flight.reserveSeat(seatPosition, personId)

            await flightRepository.save(flight)

        })

    }

}