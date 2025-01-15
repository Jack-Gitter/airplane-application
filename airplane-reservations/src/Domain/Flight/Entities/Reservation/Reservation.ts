import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UUID } from "crypto";
import { SeatPosition } from "../../ValueObjects/SeatPosition";
import { Flight } from "../../Flight";

@Entity('Reservation')
@Unique('flight_seatPosition', ['flight', 'seatPosition'])
export class Reservation {

    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @ManyToOne(() => Flight, (flight) => flight.reservations)
    public flight: UUID

    @Column(() => SeatPosition)
    public seatPosition: SeatPosition

    @Column('uuid')
    public personId: UUID

    private constructor(seatPosition: SeatPosition, personId: UUID, flight: UUID) {
        this.seatPosition = seatPosition
        this.personId = personId
        this.flight = flight
    }

    static CreateReservation(seatPosition: SeatPosition, personId: UUID, flight: UUID): Reservation {
        return new Reservation(seatPosition, personId, flight)
    }
}