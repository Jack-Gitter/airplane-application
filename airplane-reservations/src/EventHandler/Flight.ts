import { Controller } from "@nestjs/common"
import { EventPattern, MessagePattern } from "@nestjs/microservices"
import { UUID } from "crypto"
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service"
import {  PersonExistsResponseDTO } from "./Dto/PersonExistsResponseDTO"

@Controller('flightEventHandler')
export class FlightEventHandler {

    constructor(
        private cancelReservationsByPersonService: CancelReservationsByPersonService
    ) {}

    @EventPattern('PersonDeletedAccount')
    public async cancelReservationViaMessage(data: UUID) {
        await this.cancelReservationsByPersonService.cancelReservationByPerson(data)
    }

    @EventPattern('PersonExistsReponse')
    public async validateReservationViaMessage(data: PersonExistsResponseDTO) {
        console.log('in the person exists response handler in airplane-reservation')
        console.log(data)
        if (!data.found) {
            console.log('cancelling reservation')
            await this.cancelReservationViaMessage(data.personId)
        }
    }

}