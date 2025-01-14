import { Column } from "typeorm"

export enum SEAT_COLUMN {
   A = 'A',
   B = 'B',
   C = 'C'
}

export class SeatPosition {

    @Column()
    private row: number

    @Column({
        type: 'enum',
        enum: SEAT_COLUMN,
    })
    private column: SEAT_COLUMN

    constructor(row: number, seat: SEAT_COLUMN) {
        this.row = row
        this.column = seat
     }

    public getRowCopy(): number {
        return this.row
    }

    public getSeatCopy(): SEAT_COLUMN {
        return this.column
    }

    public equals(other: SeatPosition) {
        return this.row === other.row && this.column === other.column
    }
}
