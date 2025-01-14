import { InjectRepository } from "@nestjs/typeorm";
import { first, last } from "rxjs";
import { Person } from "src/Domain/Person/Person";
import { Email } from "src/Domain/Person/ValueObjects/Email";
import { Name } from "src/Domain/Person/ValueObjects/Name";
import { Repository } from "typeorm";

export class CreatePersonService {

    constructor(@InjectRepository(Person) private personRepository: Repository<Person>) {}

    public async createPerson(firstName: string, middleName: string, lastName: string, emailPrefix: string, emailPostfix: string) {

        const name = new Name(firstName, middleName, lastName)
        const email = new Email(emailPrefix, emailPostfix)
        const person = Person.CreatePerson(name, email)

        return await this.personRepository.save(person)
    }



}