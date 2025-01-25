import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/Domain/Flight/Entities/Reservation/Reservation';
import { Seat } from 'src/Domain/Flight/Entities/Reservation/Seat';
import { Flight } from 'src/Domain/Flight/Flight';
import { Segment } from 'src/Domain/FlightSchedule/Entity/Segment';
import { FlightSchedule } from 'src/Domain/FlightSchedule/FlightSchedule';
import { FlightModule } from './flight.module';
import { FlightController } from 'src/Controller/Flight/Flight';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FlightScheduleModule } from './FlightSchedule.module';
import { ProjectionController } from 'src/Controller/Projection/Projection.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Flight, Reservation, Seat, FlightSchedule, Segment],
      synchronize: false,
    }),
    EventEmitterModule.forRoot(),
    FlightModule,
    FlightScheduleModule,
    ProjectionController
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}