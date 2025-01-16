import { DataSource } from "typeorm";
import { Reservation } from "../../../Domain/Flight/Entities/Reservation/Reservation";
import { Flight } from "../../../Domain/Flight/Flight";
import { Seat } from "../../../Domain/Flight/Entities/Reservation/Seat";
import { FlightSchedule } from "../../../Domain/FlightSchedule/FlightSchedule";
import { Segment } from "../../../Domain/FlightSchedule/Entity/Segment";
import { Init1737048576087 } from "../Migrations/1737048576087-init";
import { NullableFlightSchedule1737052836546 } from "../Migrations/1737052836546-nullable_flight_schedule";
import { Nofkconstraint1737053188172 } from "../Migrations/1737053188172-nofkconstraint";

const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Flight, Reservation, Seat, FlightSchedule, Segment],
      migrations: [Init1737048576087, NullableFlightSchedule1737052836546, Nofkconstraint1737053188172],
      synchronize: false,
})

export default dataSource