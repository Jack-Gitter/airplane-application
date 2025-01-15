import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreatePersonService } from "src/Application/Person/CreatePersonService";
import { DeletePersonService } from "src/Application/Person/DeletePersonService";
import { FindPersonService } from "src/Application/Person/FindPersonService";
import { PersonController } from "src/Controller/Person/Person";
import { Person } from "src/Domain/Person/Person";

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]), 
    ClientsModule.register([{name: 'RMQ_CLIENT', transport: Transport.RMQ }]),
  ],
  controllers: [PersonController],
  providers: [CreatePersonService, FindPersonService, DeletePersonService],
})
export class PersonModule {}
