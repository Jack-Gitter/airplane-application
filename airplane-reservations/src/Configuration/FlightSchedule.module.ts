import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckScheduleService } from "src/Application/FlightSchedule/CheckSchedule.service";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { FlightScheduleEventHandler } from "src/EventHandler/FlightSchedule/FlightSchedule";

@Module({
    imports: [
        TypeOrmModule.forFeature([FlightSchedule]),
    ],
    controllers: [FlightScheduleEventHandler],
    providers: [CheckScheduleService],
    exports: []
})

export class FlightModule {}