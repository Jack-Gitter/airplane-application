import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFlightStatus1737047370061 implements MigrationInterface {
    name = 'AddFlightStatus1737047370061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Flight_status_enum" AS ENUM('ON_TIME', 'DELAYED', 'CANCELED')`);
        await queryRunner.query(`ALTER TABLE "Flight" ADD "status" "public"."Flight_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Flight" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."Flight_status_enum"`);
    }

}
