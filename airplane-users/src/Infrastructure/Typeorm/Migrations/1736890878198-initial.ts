import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1736890878198 implements MigrationInterface {
    name = 'Initial1736890878198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameFirstname" character varying NOT NULL, "nameMiddlename" character varying NOT NULL, "nameLastname" character varying NOT NULL, "emailPrefix" character varying NOT NULL, "emailPostfix" character varying NOT NULL, CONSTRAINT "PK_5c3ede2b2959b65c86663e58180" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Person"`);
    }

}
