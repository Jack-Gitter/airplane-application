import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateFlightService } from "src/Application/Flight/CreateFlight.service";
import { ReserveSeatService } from "src/Application/Flight/ReserveSeat.service";
import { FlightController } from "src/Controller/Flight/Flight";
import { Flight } from "src/Domain/Flight/Flight";
import { FindPersonService } from "src/Infrastructure/AirplanePerson/FindPerson.service";

@Module({
    imports: [TypeOrmModule.forFeature([Flight]), HttpModule],
    controllers: [FlightController],
    providers: [CreateFlightService, ReserveSeatService, FindPersonService],
    exports: []
})

export class FlightModule {}