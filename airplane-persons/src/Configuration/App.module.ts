import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../Domain/Person/Person';
import { PersonModule } from './Person.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Person],
      synchronize: false,
    }),
    PersonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
