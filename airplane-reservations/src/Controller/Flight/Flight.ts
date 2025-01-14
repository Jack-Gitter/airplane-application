import { CreateFlightService } from "src/Application/Flight/CreateFlight.service";
import { ReserveSeatService } from "src/Application/Flight/ReserveSeat.service";
import { CreateFlightDTO } from "./Dto/CreateFlightDTO";
import { ReserveSeatDTO } from "./Dto/ReserveSeatDTO";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('flight')
export class FlightController {

    constructor(private createFlightService: CreateFlightService, private reserveSeatService: ReserveSeatService) {}

    @Post()
    public async createFlight(@Body() createFlightDTO: CreateFlightDTO) {
        return await this.createFlightService.createFlight(createFlightDTO.flightType)
    }
    
    @Post('reservation')
    public async reserveSeat(@Body() reserveSeatDTO: ReserveSeatDTO) {
        return await this.reserveSeatService.reserveSeat(
            reserveSeatDTO.flightId, 
            reserveSeatDTO.personId, 
            reserveSeatDTO.seatRow, 
            reserveSeatDTO.seatColumn
        )

    }

}