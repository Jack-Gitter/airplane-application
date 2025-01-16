import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flight } from "src/Domain/Flight/Flight";
import { FLIGHT_TYPE } from "src/Domain/Flight/FlightEnums";
import { FlightFactory } from "src/Domain/Flight/FlightFactory";
import { Repository } from "typeorm";

@Injectable()
export class CreateFlightService {

    public constructor(@InjectRepository(Flight) private flightRepository: Repository<Flight>) {}

    public async createFlight(flightType: FLIGHT_TYPE) {
        const flightFactory = new FlightFactory()
        const flight = flightFactory.createFlight(flightType)        
        await this.flightRepository.save(flight)
    }

}