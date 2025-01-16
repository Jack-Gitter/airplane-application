import { Inject, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { DoesPersonExistDTO } from "src/EventHandler/DTO/DoesPersonExistDTO";
import { Person } from "src/Domain/Person/Person";
import { Repository } from "typeorm";
import { ClientProxy } from "@nestjs/microservices";

export class FindPersonService {

    constructor(
        @InjectRepository(Person) private personRepository: Repository<Person>,
        @Inject('RMQ_CLIENT') private rmqClient: ClientProxy,
    ) {}

    public async findPerson(personId: UUID) {

        const person = await this.personRepository.findOne({
            where: {id: personId}
        })

        if (!person) {
            throw new NotFoundException(`Person with id ${personId} does not exist`)
        }

        return true
    }

    public async doesPersonExist(personId: UUID) {

        const person = await this.personRepository.findOne({
            where: {id: personId}
        })

        if (!person) {
            this.rmqClient.emit('PersonDoesNotExist', personId)
        }
    }
}