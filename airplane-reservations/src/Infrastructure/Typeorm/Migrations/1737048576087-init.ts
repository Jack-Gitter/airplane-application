import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737048576087 implements MigrationInterface {
    name = 'Init1737048576087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Seat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "flightId" uuid, "positionRow" integer NOT NULL, "positionColumn" "public"."Seat_positioncolumn_enum" NOT NULL, "priceCurrency" character varying NOT NULL, "priceUnits" integer NOT NULL, "priceSubunits" integer NOT NULL, CONSTRAINT "PK_29e79c2e2e25cb2e9f942d8e872" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Segment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "scheduleIdId" uuid, "toName" character varying NOT NULL, "toLongitude" integer NOT NULL, "toLatitude" integer NOT NULL, "fromName" character varying NOT NULL, "fromLongitude" integer NOT NULL, "fromLatitude" integer NOT NULL, CONSTRAINT "PK_e16eab386679ac4f5d5780318ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "FlightSchedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_f3078a4218e93d9fc47a2670b95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Flight_status_enum" AS ENUM('ON_TIME', 'DELAYED', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "Flight" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."Flight_status_enum" NOT NULL DEFAULT 'ON_TIME', "scheduleId" uuid, CONSTRAINT "REL_ed230987ee9822a349a3cf4638" UNIQUE ("scheduleId"), CONSTRAINT "PK_9426b759382ba6927a7013beb3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid NOT NULL, "flightId" uuid, "seatPositionRow" integer NOT NULL, "seatPositionColumn" "public"."Reservation_seatpositioncolumn_enum" NOT NULL, CONSTRAINT "flight_seatPosition" UNIQUE ("flightId", "seatPositionRow", "seatPositionColumn"), CONSTRAINT "PK_7872a944b02ce511a96c8bcced1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Seat" ADD CONSTRAINT "FK_cb66d47b33402c21aff7a6c4948" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Segment" ADD CONSTRAINT "FK_699fb93392ddcc8a80ebfb8bc98" FOREIGN KEY ("scheduleIdId") REFERENCES "FlightSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Flight" ADD CONSTRAINT "FK_ed230987ee9822a349a3cf4638e" FOREIGN KEY ("scheduleId") REFERENCES "FlightSchedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reservation" ADD CONSTRAINT "FK_4db099de5ce7cf6fe30255752a0" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Reservation" DROP CONSTRAINT "FK_4db099de5ce7cf6fe30255752a0"`);
        await queryRunner.query(`ALTER TABLE "Flight" DROP CONSTRAINT "FK_ed230987ee9822a349a3cf4638e"`);
        await queryRunner.query(`ALTER TABLE "Segment" DROP CONSTRAINT "FK_699fb93392ddcc8a80ebfb8bc98"`);
        await queryRunner.query(`ALTER TABLE "Seat" DROP CONSTRAINT "FK_cb66d47b33402c21aff7a6c4948"`);
        await queryRunner.query(`DROP TABLE "Reservation"`);
        await queryRunner.query(`DROP TABLE "Flight"`);
        await queryRunner.query(`DROP TYPE "public"."Flight_status_enum"`);
        await queryRunner.query(`DROP TABLE "FlightSchedule"`);
        await queryRunner.query(`DROP TABLE "Segment"`);
        await queryRunner.query(`DROP TABLE "Seat"`);
    }

}
