import { MigrationInterface, QueryRunner } from "typeorm";

export class Nofkconstraint1737053188172 implements MigrationInterface {
    name = 'Nofkconstraint1737053188172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Flight" DROP CONSTRAINT "FK_ed230987ee9822a349a3cf4638e"`);
        await queryRunner.query(`ALTER TABLE "Flight" DROP CONSTRAINT "REL_ed230987ee9822a349a3cf4638"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Flight" ADD CONSTRAINT "REL_ed230987ee9822a349a3cf4638" UNIQUE ("scheduleId")`);
        await queryRunner.query(`ALTER TABLE "Flight" ADD CONSTRAINT "FK_ed230987ee9822a349a3cf4638e" FOREIGN KEY ("scheduleId") REFERENCES "FlightSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
