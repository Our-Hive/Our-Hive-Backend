import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSecEmotionToDaily1710026018970 implements MigrationInterface {
  name = 'AddSecEmotionToDaily1710026018970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "daily_records" ADD "secondaryEmotionName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "daily_records" ADD CONSTRAINT "FK_6df40e971f6eec00a06a934a37e" FOREIGN KEY ("secondaryEmotionName") REFERENCES "secondary_emotions"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "daily_records" DROP CONSTRAINT "FK_6df40e971f6eec00a06a934a37e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "daily_records" DROP COLUMN "secondaryEmotionName"`,
    );
  }
}
