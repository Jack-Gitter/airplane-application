import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreatePersonService } from "src/Application/Person/CreatePersonService";
import { FindPersonService } from "src/Application/Person/FindPersonService";
import { PersonController } from "src/Controller/Person/Person";
import { Person } from "src/Domain/Person/Person";

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [CreatePersonService, FindPersonService],
})
export class PersonModule {}
