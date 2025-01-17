import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddSegmentService } from "src/Application/FlightSchedule/AddSegment.service";
import { CancelFlightScheduleService } from "src/Application/FlightSchedule/CancelFlightSchedule.service";
import { CheckScheduleService } from "src/Application/FlightSchedule/CheckSchedule.service";
import { CreateFlightScheduleService } from "src/Application/FlightSchedule/CreateSchedule.service";
import { RemoveSegmentService } from "src/Application/FlightSchedule/RemoveSegment.service";
import { FlightScheduleController } from "src/Controller/FlightSchedule/FlightSchedule.controller";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { FlightScheduleEventHandler } from "src/EventHandler/FlightSchedule/FlightSchedule";

@Module({
    imports: [
        TypeOrmModule.forFeature([FlightSchedule]),
    ],
    controllers: [FlightScheduleEventHandler, FlightScheduleController],
    providers: [CheckScheduleService, CreateFlightScheduleService, CancelFlightScheduleService, AddSegmentService, RemoveSegmentService],
    exports: []
})

export class FlightScheduleModule {}