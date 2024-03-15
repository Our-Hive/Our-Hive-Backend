import { MigrationInterface, QueryRunner } from "typeorm";

export class TrscRecordRelWithUser1710503497469 implements MigrationInterface {
    name = 'TrscRecordRelWithUser1710503497469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" ADD CONSTRAINT "FK_c5c6cc6cb0ba6413578ea6ebbd6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP CONSTRAINT "FK_c5c6cc6cb0ba6413578ea6ebbd6"`);
        await queryRunner.query(`ALTER TABLE "transcendental-records" DROP COLUMN "userId"`);
    }

}
