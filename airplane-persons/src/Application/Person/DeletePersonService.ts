import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { first, identity, last, NotFoundError } from "rxjs";
import { Person } from "src/Domain/Person/Person";
import { Email } from "src/Domain/Person/ValueObjects/Email";
import { Name } from "src/Domain/Person/ValueObjects/Name";
import { Repository } from "typeorm";

export class DeletePersonService {

    constructor(@InjectRepository(Person) private personRepository: Repository<Person>) {}

    public async deletePerson(personId: UUID) {
        const result = await this.personRepository.delete({id: personId})
        if (result.affected === 0) {
            throw new NotFoundException(`Person with id ${personId} not found`)
        }
    }
}