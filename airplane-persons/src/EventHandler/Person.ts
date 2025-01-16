import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy, EventPattern, MessagePattern } from "@nestjs/microservices";
import { UUID } from "crypto";
import { FindPersonService } from "src/Application/Person/FindPersonService";

@Controller('personEventHandler')
export class PersonEventHandler {
    constructor(
        private findPersonService: FindPersonService,
    ) {}

    @EventPattern('PersonExistsCheck')
    public async doesPersonExist(data: UUID) {
        return await this.findPersonService.doesPersonExist(data)
    }
}