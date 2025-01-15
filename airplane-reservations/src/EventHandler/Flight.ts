import { Controller } from "@nestjs/common"
import { EventPattern } from "@nestjs/microservices"
import { UUID } from "crypto"
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service"

@Controller('flightEventHandler')
export class FlightEventHandler {

    constructor(
        private cancelReservationsByPersonService: CancelReservationsByPersonService
    ) {}

    @EventPattern('PersonDeletedAccount')
    public async cancelReservationViaMessage(data: UUID) {
        console.log(data)
        await this.cancelReservationsByPersonService.cancelReservationByPerson(data)
    }

}