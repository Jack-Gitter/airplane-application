import { Column } from "typeorm"

export class Price {

    @Column()
    private currency: string

    @Column()
    private units: number

    @Column()
    private subUnits: number

    constructor(currency: string, units: number, subUnits: number) {
        this.currency = currency
        this.units = units
        this.subUnits = subUnits
    }

    public getCurrencyCopy(): string {
        return this.currency
    }

    public getUnitsCopy(): number {
        return this.units
    }

    public getSubUnitsCopy(): number {
        return this.subUnits
    }

    public equals(other: Price): boolean {
        return this.currency === other.currency && this.units === other.units && this.subUnits === other.subUnits
    }
}
