import { DataSource } from "typeorm";
import { Reservation } from "../../../Domain/Flight/Entities/Reservation/Reservation";
import { Flight } from "../../../Domain/Flight/Flight";
import { Seat } from "../../../Domain/Flight/Entities/Reservation/Seat";
import { FlightSchedule } from "../../../Domain/FlightSchedule/FlightSchedule";
import { Segment } from "../../../Domain/FlightSchedule/Entity/Segment";
import { Init1736952733343 } from "../Migrations/1736952733343-init";
import { AddFlightStatus1737047370061 } from "../Migrations/1737047370061-add_flight_status";
import { AddDefault1737047412828 } from "../Migrations/1737047412828-add_default";

const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Flight, Reservation, Seat, FlightSchedule, Segment],
      migrations: [Init1736952733343, AddFlightStatus1737047370061, AddDefault1737047412828],
      synchronize: false,
})

export default dataSource