import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { UUID } from "crypto";
import { FindPersonService } from "src/Application/Person/FindPersonService";

@Controller('personEventHandler')
export class PersonEventHandler {
    constructor(
        private findPersonService: FindPersonService,
    ) {}

    @EventPattern('PersonExistsCheck')
    public async doesPersonExist(data: UUID) {
        console.log('here!')
        console.log(data)
        return await this.findPersonService.doesPersonExist(data)
    }
}