import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateFlightService } from "src/Application/Flight/CreateFlight.service";
import { ReserveSeatService } from "src/Application/Flight/ReserveSeat.service";
import { FlightController } from "src/Controller/Flight/Flight";
import { Flight } from "src/Domain/Flight/Flight";
import { AirplanePersonService } from "src/Infrastructure/AirplanePerson/AirplanePerson.service";

@Module({
    imports: [TypeOrmModule.forFeature([Flight]), HttpModule],
    controllers: [FlightController],
    providers: [CreateFlightService, ReserveSeatService, AirplanePersonService],
    exports: []
})

export class FlightModule {}