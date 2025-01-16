import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckScheduleService } from "src/Application/FlightSchedule/CheckSchedule.service";
import { CreateFlightScheduleService } from "src/Application/FlightSchedule/CreateSchedule.service";
import { FlightScheduleController } from "src/Controller/FlightSchedule/FlightSchedule.controller";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { FlightScheduleEventHandler } from "src/EventHandler/FlightSchedule/FlightSchedule";

@Module({
    imports: [
        TypeOrmModule.forFeature([FlightSchedule]),
    ],
    controllers: [FlightScheduleEventHandler, FlightScheduleController],
    providers: [CheckScheduleService, CreateFlightScheduleService],
    exports: []
})

export class FlightScheduleModule {}