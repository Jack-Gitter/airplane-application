import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableFlightSchedule1737052836546 implements MigrationInterface {
    name = 'NullableFlightSchedule1737052836546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Flight" DROP CONSTRAINT "FK_ed230987ee9822a349a3cf4638e"`);
        await queryRunner.query(`ALTER TABLE "Flight" ADD CONSTRAINT "FK_ed230987ee9822a349a3cf4638e" FOREIGN KEY ("scheduleId") REFERENCES "FlightSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Flight" DROP CONSTRAINT "FK_ed230987ee9822a349a3cf4638e"`);
        await queryRunner.query(`ALTER TABLE "Flight" ADD CONSTRAINT "FK_ed230987ee9822a349a3cf4638e" FOREIGN KEY ("scheduleId") REFERENCES "FlightSchedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
