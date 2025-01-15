import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CancelReservationService } from "src/Application/Flight/CancelReservation.service";
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service";
import { CreateFlightService } from "src/Application/Flight/CreateFlight.service";
import { CreateReservationService } from "src/Application/Flight/CreateReservation.service";
import { FlightController } from "src/Controller/Flight/Flight";
import { Flight } from "src/Domain/Flight/Flight";
import { FindPersonService } from "src/Infrastructure/AirplanePerson/FindPerson.service";

@Module({
    imports: [TypeOrmModule.forFeature([Flight]), HttpModule],
    controllers: [FlightController],
    providers: [CreateFlightService, CreateReservationService, FindPersonService, CancelReservationService, CancelReservationsByPersonService],
    exports: []
})

export class FlightModule {}