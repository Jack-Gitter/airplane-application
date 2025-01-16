import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { UUID } from "crypto";
import { FindPersonService } from "src/Application/Person/FindPersonService";

@Controller('person')
export class PersonController {
    constructor(
        private findPersonService: FindPersonService,
    ) {}

    @Get(':id')
    @EventPattern('PersonExistsCheck')
    public async doesPersonExist(data: UUID) {
        return await this.findPersonService.doesPersonExist(data)
    }
}