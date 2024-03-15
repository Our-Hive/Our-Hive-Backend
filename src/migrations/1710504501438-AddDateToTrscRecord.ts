import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateToTrscRecord1710504501438 implements MigrationInterface {
    name = 'AddDateToTrscRecord1710504501438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP COLUMN "date"`);
    }

}
