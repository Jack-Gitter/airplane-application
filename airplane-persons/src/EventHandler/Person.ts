import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy, EventPattern, MessagePattern } from "@nestjs/microservices";
import { UUID } from "crypto";
import { FindPersonService } from "src/Application/Person/FindPersonService";

@Controller('personEventHandler')
export class PersonEventHandler {
    constructor(
        private findPersonService: FindPersonService,
        @Inject('RMQ_CLIENT') private rmqClient: ClientProxy
    ) {}

    @EventPattern('PersonExistsCheck')
    public async doesPersonExist(data: UUID) {
        const response = await this.findPersonService.doesPersonExist(data)
        this.rmqClient.emit('PersonExistsReponse', response)
    }
}