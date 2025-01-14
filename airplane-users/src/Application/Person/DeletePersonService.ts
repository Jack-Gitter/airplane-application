import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { first, last } from "rxjs";
import { Person } from "src/Domain/Person/Person";
import { Email } from "src/Domain/Person/ValueObjects/Email";
import { Name } from "src/Domain/Person/ValueObjects/Name";
import { Repository } from "typeorm";

export class DeletePersonService {

    constructor(@InjectRepository(Person) private personRepository: Repository<Person>) {}

    public async deletePerson(personId: UUID) {
        return await this.personRepository.delete({id: personId})
    }



}