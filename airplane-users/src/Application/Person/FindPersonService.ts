import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { first, last } from "rxjs";
import { Person } from "src/Domain/Person/Person";
import { Email } from "src/Domain/Person/ValueObjects/Email";
import { Name } from "src/Domain/Person/ValueObjects/Name";
import { Repository } from "typeorm";

export class FindPersonService {

    constructor(@InjectRepository(Person) private personRepository: Repository<Person>) {}

    public async findPerson(personId: UUID) {

        const person = await this.personRepository.findOne({
            where: {id: personId}
        })

        if (!person) {
            throw new NotFoundException(`person with id ${personId} not found`)
        }

        return person
    }



}