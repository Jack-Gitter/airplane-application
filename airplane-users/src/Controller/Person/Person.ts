import { Controller, Post } from "@nestjs/common";
import { CreatePersonService } from "src/Application/Person/CreatePersonService";
import { CreatePersonDTO } from "./DTO/CreatePersonDTO";

@Controller('person')
export class PersonController {
    constructor(private createPersonService: CreatePersonService) {}

    @Post()
    public async createPerson(createPersonDTO: CreatePersonDTO) {
        return await this.createPersonService.createPerson(
            createPersonDTO.firstName,
            createPersonDTO.middleName,
            createPersonDTO.lastName,
            createPersonDTO.emailPrefix,
            createPersonDTO.emailPostfix
        )
    }

}