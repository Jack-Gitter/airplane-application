import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CancelReservationService } from "src/Application/Flight/CancelReservation.service";
import { CancelReservationsByPersonService } from "src/Application/Flight/CancelReservationsByPerson.service";
import { CreateFlightService } from "src/Application/Flight/CreateFlight.service";
import { CreateReservationService } from "src/Application/Flight/CreateReservation.service";
import { FlightController } from "src/Controller/Flight/Flight";
import { Flight } from "src/Domain/Flight/Flight";
import { FlightEventHandler } from "src/EventHandler/Flight";

@Module({
    imports: [
        TypeOrmModule.forFeature([Flight]),
        ClientsModule.register([{name: 'RMQ_CLIENT', transport: Transport.RMQ }]),
    ],
    controllers: [FlightController, FlightEventHandler],
    providers: [CreateFlightService, CreateReservationService, CancelReservationService, CancelReservationsByPersonService],
    exports: []
})

export class FlightModule {}