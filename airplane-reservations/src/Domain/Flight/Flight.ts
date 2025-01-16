import { UUID } from "crypto";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Entities/Reservation/Reservation";
import { Seat } from "./Entities/Reservation/Seat";
import { SeatPosition } from "./ValueObjects/SeatPosition";
import { BadRequestException } from "@nestjs/common";
import { FLIGHT_STATUS } from "./FlightEnums";
import { FlightSchedule } from "../FlightSchedule/FlightSchedule";

@Entity('Flight')
export class Flight {

    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @Column({type: 'enum', enum: FLIGHT_STATUS, default: FLIGHT_STATUS.ON_TIME})
    public status: FLIGHT_STATUS

    @OneToOne(() => FlightSchedule, (flightSchedule) => flightSchedule.flight, { cascade: true, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    @JoinColumn()
    public schedule: UUID

    @OneToMany(() => Reservation, (reservation) => reservation.flight, { cascade: true, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    public reservations: Array<Reservation>

    @OneToMany(() => Seat, (seat) => seat.flight, { cascade: true, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    public seats: Array<Seat>

    constructor(id: UUID, seats: Array<Seat>) {
        this.id = id
        this.seats = seats
        this.status = FLIGHT_STATUS.ON_TIME
    }

    public makeReservation(seatPosition: SeatPosition, personId: UUID) {

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

    public cancelReservation(seatPosition: SeatPosition, personId: UUID) {

        if (!this.reservations) {
            throw new BadRequestException(`No reservations exist for this flight!`)
        }

        const seat = this.seats.find((seat) => seat.position.equals(seatPosition))

        if (!seat) {
            throw new BadRequestException(`No seat found with the position ${seatPosition} on the flight ${this.id}`)
        }

        const existingReservation = this.reservations.find((reservation) => reservation.seatPosition.equals(seatPosition))

        if (!existingReservation) {
            throw new BadRequestException(`No existing reservation with that information exists`)
        }

        this.reservations = this.reservations.filter((reservation) => { reservation.id !== existingReservation.id })

    }

    public cancelReservationsByPerson(personId: UUID) {

        if (!this.reservations) {
            throw new BadRequestException(`No reservations exist for this flight!`)
        }

        const existingReservations = this.reservations.filter((reservation) => reservation.personId === personId)

        if (existingReservations.length === 0) {
            throw new BadRequestException(`No existing reservation with that information exists`)
        }

        this.reservations = this.reservations.filter((reservation) => reservation.personId !== personId)

    }

    public switchReservation(currentSeatPosition: SeatPosition, desiredSeatPosition: SeatPosition, personId: UUID) {

        if (!this.reservations) {
            throw new BadRequestException(`No reservations exist yet for this flight`)
        }

        const currentSeat = this.seats.find((seat) => seat.position.equals(currentSeatPosition))

        if (!currentSeat) {
            throw new BadRequestException(`Current seat does not exist!`)
        }

        const desiredSeat = this.seats.find((seat) => seat.position.equals(desiredSeatPosition))

        if (!desiredSeat) {
            throw new BadRequestException(`Disired seat does not exist`)
        }

        const reservationForCurrentSeat = this.reservations.find((reservation) => reservation.personId === personId && reservation.seatPosition.equals(currentSeatPosition))

        if (!reservationForCurrentSeat) {
            throw new BadRequestException(`The specific person does not have a reservation for the specific current seat`)
        }

        const reservationForDesiredSeat = this.reservations.find((reservation) => reservation.seatPosition.equals(desiredSeatPosition))

        if (reservationForDesiredSeat) {
            throw new BadRequestException(`There already exists a reservation for the desired seat`)
        }

        this.reservations = this.reservations.filter((reservation) => reservation.id !== reservationForCurrentSeat.id)

        const newReservation = Reservation.CreateReservation(desiredSeatPosition, personId, this.id)

        this.reservations.push(newReservation)

    }
}