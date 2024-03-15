import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDateToTrscRecord1710505325015 implements MigrationInterface {
    name = 'FixDateToTrscRecord1710505325015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD "date" date NOT NULL`);
    }

}
