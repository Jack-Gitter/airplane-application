import { UUID } from "crypto";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Entities/Reservation/Reservation";
import { Seat } from "./Entities/Reservation/Seat";
import { SeatPosition } from "./ValueObjects/SeatPosition";
import { BadRequestException } from "@nestjs/common";

@Entity('Flight')
export class Flight {

    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @OneToMany(() => Reservation, (reservation) => reservation.flight, { cascade: true, onDelete: 'CASCADE' })
    public reservations: Array<Reservation>

    @OneToMany(() => Seat, (seat) => seat.flight, { cascade: true, onDelete: 'CASCADE' })
    public seats: Array<Seat>

    constructor(id: UUID, seats: Array<Seat>) {
        this.id = id
        this.seats = seats
    }

    public reserveSeat(seatPosition: SeatPosition, personId: UUID) {

        if (!this.reservations) {
            this.reservations = new Array<Reservation>()
        }

        const seat = this.seats.find((seat) => seat.position.equals(seatPosition))

        if (!seat) {
            throw new BadRequestException(`No seat found with the position ${seatPosition} on the flight ${this.id}`)
        }

        const existingReservation = this.reservations.find((reservation) => reservation.seatPosition.equals(seatPosition))

        if (existingReservation) {
            throw new BadRequestException(`Reservation already exists for seat with position ${seatPosition} on the flight ${this.id}`)
        }

        const reservation = Reservation.CreateReservation(seatPosition, personId, this.id)

        this.reservations.push(reservation)
    }
}