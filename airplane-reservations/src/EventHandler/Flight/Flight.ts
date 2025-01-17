import { Controller } from "@nestjs/common"
import { EventPattern, MessagePattern } from "@nestjs/microservices"
import { UUID } from "crypto"
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service"
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

    @EventPattern('PersonDoesNotExist')
    public async removeReservationViaMessage(personId: UUID) {
        await this.cancelReservationViaMessage(personId)
    }

    @OnEvent('RemoveScheduleFromFlight', { async: true })
    @OnEvent('FlightScheduleCanceled', { async: true })
    public async removeScheduleFromFlightViaMessage(scheduleId: UUID) {
        await this.removeScheduleService.removeSchedule(scheduleId)
    }

}