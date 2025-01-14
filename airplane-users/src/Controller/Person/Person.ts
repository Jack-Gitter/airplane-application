import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePersonService } from "src/Application/Person/CreatePersonService";
import { CreatePersonDTO } from "./DTO/CreatePersonDTO";
import { UUID } from "crypto";
import { FindPersonDTO } from "./DTO/FindPersonDTO";
import { FindPersonService } from "src/Application/Person/FindPersonService";

@Controller('person')
export class PersonController {
    constructor(private createPersonService: CreatePersonService, private findPersonService: FindPersonService) {}

    @Post()
    public async createPerson(@Body() createPersonDTO: CreatePersonDTO) {
        return await this.createPersonService.createPerson(
            createPersonDTO.firstName,
            createPersonDTO.middleName,
            createPersonDTO.lastName,
            createPersonDTO.emailPrefix,
            createPersonDTO.emailPostfix
        )
    }

    @Get(':id')
    public async Person(@Param() findPersonDTO: FindPersonDTO) {
        return await this.findPersonService.findPerson(findPersonDTO.id)
    }

}