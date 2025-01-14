import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Price } from "../../ValueObjects/Price"
import { SeatPosition } from "../../ValueObjects/SeatPosition"
import { UUID } from "crypto"
import { Flight } from "../../Flight"

@Entity('Seat')
export class Seat {
    
    @PrimaryGeneratedColumn('uuid')
    public id: UUID

    @ManyToOne(() => Flight, (flight) => flight.seats)
    public flight: UUID

    @Column(() => SeatPosition)
    public position: SeatPosition

    @Column(() => Price)
    public price: Price
    
    private constructor (flightId: UUID, position: SeatPosition, price: Price) {
        this.flight = flightId
        this.position = position
        this.price = price
    }

    public static CreateSeat(flightId: UUID, position: SeatPosition, price: Price): Seat {
        return new Seat(flightId, position, price, )
    }

}