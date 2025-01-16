import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreatePersonService } from "src/Application/Person/CreatePersonService";
import { CreatePersonDTO } from "./DTO/CreatePersonDTO";
import { FindPersonDTO } from "./DTO/FindPersonDTO";
import { FindPersonService } from "src/Application/Person/FindPersonService";
import { DeletePersonDTO } from "./DTO/DeletePersonDTO";
import { DeletePersonService } from "src/Application/Person/DeletePersonService";

@Controller('person')
export class PersonController {
    constructor(
        private createPersonService: CreatePersonService, 
        private findPersonService: FindPersonService,
        private deletePersonService: DeletePersonService
    ) {}

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
    public async findPerson(@Param() findPersonDTO: FindPersonDTO) {
        return await this.findPersonService.findPerson(findPersonDTO.id)
    }

    @Delete(':id')
    public async deletePerson(@Param() deletePersonDTO: DeletePersonDTO) {
        return await this.deletePersonService.deletePerson(deletePersonDTO.id)
    }

}