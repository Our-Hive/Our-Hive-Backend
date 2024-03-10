import { MigrationInterface, QueryRunner } from 'typeorm';

export class DailyRecord1710017122763 implements MigrationInterface {
  name = 'DailyRecord1710017122763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "daily_records" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "primaryEmotionName" character varying, CONSTRAINT "PK_12e9a005e55a184469b5c922b3f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "daily_records" ADD CONSTRAINT "FK_46de4b328e0381ac2d226d3e8df" FOREIGN KEY ("primaryEmotionName") REFERENCES "primary_emotions"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "daily_records" DROP CONSTRAINT "FK_46de4b328e0381ac2d226d3e8df"`,
    );
    await queryRunner.query(`DROP TABLE "daily_records"`);
  }
}
