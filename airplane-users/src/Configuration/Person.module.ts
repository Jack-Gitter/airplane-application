import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreatePersonService } from "src/Application/Person/CreatePersonService";
import { PersonController } from "src/Controller/Person/Person";
import { Person } from "src/Domain/Person/Person";

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [CreatePersonService],
})
export class PersonModule {}
