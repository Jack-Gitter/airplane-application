import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Name } from "./ValueObjects/Name";
import { Email } from "./ValueObjects/Email";
import { UUID } from "crypto";

@Entity('Person')
export class Person {

    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column(() => Name)
    public name: Name

    @Column(() => Email)
    public email: Email

    private constructor(name: Name, email: Email) {
        this.name = name
        this.email = email
    }

    public static CreatePerson(name: Name, email: Email): Person {
        return new Person(name, email)
    }

}