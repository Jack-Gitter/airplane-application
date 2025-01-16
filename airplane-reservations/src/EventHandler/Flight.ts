import { Controller } from "@nestjs/common"
import { EventPattern, MessagePattern } from "@nestjs/microservices"
import { UUID } from "crypto"
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service"
import { DoesPersonExistDTO } from "./Dto/DoesPersonExistDTO"

@Controller('flightEventHandler')
export class FlightEventHandler {

    constructor(
        private cancelReservationsByPersonService: CancelReservationsByPersonService
    ) {}

    @EventPattern('PersonDeletedAccount')
    public async cancelReservationViaMessage(data: UUID) {
        await this.cancelReservationsByPersonService.cancelReservationByPerson(data)
    }

    @MessagePattern('PersonExistsCheck')
    public async validateReservationViaMessage(data: DoesPersonExistDTO) {
        if (!data.getFound()) {
            await this.cancelReservationViaMessage(data.getPersonId())
        }
    }

}