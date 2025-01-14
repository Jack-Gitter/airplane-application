import { BadRequestException } from "@nestjs/common";
import { Column } from "typeorm";

export class Email {

    @Column()
    private prefix: string

    @Column()
    private postfix: string

    constructor(prefix: string, postfix: string) {
        this.prefix = prefix
        this.postfix = postfix
    }

    static CreateEmail(prefix: string, postfix: string) {
        if (prefix.length === 0 || postfix.length === 0 || postfix.indexOf('.com') === -1) {
            throw new BadRequestException('Invalid email format')
        }
        return new Email(prefix, postfix)
    }

    public toString(): string {
        return this.prefix + '@' + this.postfix
    }
}