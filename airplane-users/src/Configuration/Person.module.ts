import { Module } from "@nestjs/common";
import { CreatePersonService } from "src/Application/Person/CreatePersonService";
import { PersonController } from "src/Controller/Person/Person";

@Module({
  imports: [],
  controllers: [PersonController],
  providers: [CreatePersonService],
})
export class PersonModule {}
