import { Controller } from "@nestjs/common"
import { EventPattern, MessagePattern } from "@nestjs/microservices"
import { UUID } from "crypto"
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service"
import {  PersonExistsResponseDTO } from "./Dto/PersonExistsResponseDTO"
import { OnEvent } from "@nestjs/event-emitter"
import { RemoveScheduleService } from "src/Application/Flight/RemoveSchedule.service"

@Controller('flightEventHandler')
export class FlightEventHandler {

    constructor(
        private cancelReservationsByPersonService: CancelReservationsByPersonService,
        private removeScheduleService: RemoveScheduleService
    ) {}

    @EventPattern('PersonDeletedAccount')
    public async cancelReservationViaMessage(personId: UUID) {
        await this.cancelReservationsByPersonService.cancelReservationByPerson(personId)
    }

    @EventPattern('PersonExistsReponse')
    public async validateReservationViaMessage(data: PersonExistsResponseDTO) {
        if (!data.found) {
            await this.cancelReservationViaMessage(data.personId)
        }
    }

    @OnEvent('RemoveScheduleFromFlight', { async: true })
    public async removeScheduleFromFlightViaMessage(scheduleId: UUID) {
        await this.removeScheduleService.removeScheduleService(scheduleId)
    }


}