import { DataSource } from "typeorm";
import { Reservation } from "../../../Domain/Flight/Entities/Reservation/Reservation";
import { Flight } from "../../../Domain/Flight/Flight";
import { Seat } from "../../../Domain/Flight/Entities/Reservation/Seat";
import { FlightSchedule } from "../../../Domain/FlightSchedule/FlightSchedule";
import { Segment } from "../../../Domain/FlightSchedule/Entity/Segment";
import { Init1736952733343 } from "../Migrations/1736952733343-init";

const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Flight, Reservation, Seat, FlightSchedule, Segment],
      migrations: [Init1736952733343],
      synchronize: false,
})

export default dataSource