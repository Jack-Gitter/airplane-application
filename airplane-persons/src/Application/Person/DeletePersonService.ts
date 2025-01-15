import { Inject, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Person } from "src/Domain/Person/Person";
import { Repository } from "typeorm";

export class DeletePersonService {

    constructor(
        @InjectRepository(Person) private personRepository: Repository<Person>,
        @Inject('RMQ_CLIENT') private rmqClient: ClientProxy
    ) {}

    public async deletePerson(personId: UUID) {
        const result = await this.personRepository.delete({id: personId})
        if (result.affected === 0) {
            throw new NotFoundException(`Person with id ${personId} not found`)
        }
        this.rmqClient.emit<never, UUID>('PersonDeletedAccount', personId)
    }
}