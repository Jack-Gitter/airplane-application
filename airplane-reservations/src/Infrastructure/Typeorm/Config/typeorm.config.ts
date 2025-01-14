import { DataSource } from "typeorm";
import { Reservation } from "../../../Domain/Flight/Entities/Reservation/Reservation";
import { Flight } from "../../../Domain/Flight/Flight";
import { Seat } from "../../../Domain/Flight/Entities/Reservation/Seat";
import { FlightSchedule } from "../../../Domain/FlightSchedule/FlightSchedule";
import { Segment } from "../../../Domain/FlightSchedule/Entity/Segment";
import { Initial1736889387721 } from "../Migrations/1736889387721-initial";

const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Flight, Reservation, Seat, FlightSchedule, Segment],
      migrations: [Initial1736889387721],
      synchronize: false,
})

export default dataSource