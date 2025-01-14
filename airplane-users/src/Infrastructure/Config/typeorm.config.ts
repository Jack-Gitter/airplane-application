import { Person } from "src/Domain/Person/Person"
import { DataSource } from "typeorm"

const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Person],
      migrations: [],
      synchronize: false,
})

export default dataSource