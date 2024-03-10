import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRelationWithDailies1710034351947
  implements MigrationInterface
{
  name = 'AddUserRelationWithDailies1710034351947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "daily_records" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "daily_records" ADD CONSTRAINT "FK_33eeadcf3c22490fa10070f6c1a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "daily_records" DROP CONSTRAINT "FK_33eeadcf3c22490fa10070f6c1a"`,
    );
    await queryRunner.query(`ALTER TABLE "daily_records" DROP COLUMN "userId"`);
  }
}
