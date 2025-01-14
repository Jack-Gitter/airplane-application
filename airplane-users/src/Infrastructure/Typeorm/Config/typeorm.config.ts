import { Person } from "../../../Domain/Person/Person"
import { DataSource } from "typeorm"
import { Initial1736890878198 } from "../Migrations/1736890878198-initial"

const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Person],
      migrations: [Initial1736890878198],
      synchronize: false,
})

export default dataSource