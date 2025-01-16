import { CreateFlightService } from "src/Application/Flight/CreateFlight.service";
import { CreateFlightDTO } from "./Dto/CreateFlightDTO";
import { Body, Controller, Delete, Patch, Post } from "@nestjs/common";
import { CreateReservationDTO } from "./Dto/CreateReservationDTO";
import { CancelReservationDTO } from "./Dto/CancelReservationDTO";
import { CreateReservationService } from "src/Application/Flight/CreateReservation.service";
import { CancelReservationService } from "src/Application/Flight/CancelReservation.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { UUID } from "crypto";
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service";
import { SwitchReservationDTO } from "./Dto/SwitchReservationDTO";
import { SwitchReservationService } from "src/Application/Flight/SwitchReservation.service";

@Controller('flight')
export class FlightController {

    constructor(
        private createFlightService: CreateFlightService, 
        private createReservationService: CreateReservationService,
        private cancelReservationService: CancelReservationService,
        private switchReservationService: SwitchReservationService,
    ) {}

    @Post()
    public async createFlight(@Body() createFlightDTO: CreateFlightDTO) {
        return await this.createFlightService.createFlight(createFlightDTO.flightType)
    }
    
    @Post('reservation')
    public async createReservation(@Body() reserveSeatDTO: CreateReservationDTO) {
        return await this.createReservationService.createReservation(
            reserveSeatDTO.flightId, 
            reserveSeatDTO.personId, 
            reserveSeatDTO.seatRow, 
            reserveSeatDTO.seatColumn
        )
    }

    @Delete('reservation')
    public async cancelReservation(@Body() cancelReservationDTO: CancelReservationDTO) {
        return await this.cancelReservationService.cancelReservation(
            cancelReservationDTO.flightId,
            cancelReservationDTO.personId,
            cancelReservationDTO.seatRow,
            cancelReservationDTO.seatColumn
        )
    }

    @Patch('reservation')
    public async switchReservation(@Body() switchReservationDTO: SwitchReservationDTO) {
        return await this.switchReservationService.switchReservation(
            switchReservationDTO.flightId,
            switchReservationDTO.personId,
            switchReservationDTO.currentSeatRow,
            switchReservationDTO.currentSeatColumn,
            switchReservationDTO.desiredSeatRow,
            switchReservationDTO.desiredSeatColumn,
        )

    }

}