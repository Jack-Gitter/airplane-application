import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Repository } from "typeorm";

@Injectable()
export class CreateFlightScheduleService {
    constructor(@InjectRepository(FlightSchedule) private flightScheduleRepository: Repository<FlightSchedule>) { }

    public async createFlightSchedule() {
        const schedule = FlightSchedule.CreateFlightSchedule()
        return await this.flightScheduleRepository.save(schedule)
    }
}