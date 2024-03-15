import { MigrationInterface, QueryRunner } from 'typeorm';

export class TranscendentalRecordsEntity1710503227825
  implements MigrationInterface
{
  name = 'TranscendentalRecordsEntity1710503227825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transcendental-records" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, "location" character varying(255) NOT NULL, "activity" character varying(255) NOT NULL, "companion" character varying(255) NOT NULL, "primaryEmotionName" character varying, "secondaryEmotionName" character varying, CONSTRAINT "PK_c141d7bc09428df11d52ef797f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transcendental-records" ADD CONSTRAINT "FK_f89713b6fb6003833efa870cd9a" FOREIGN KEY ("primaryEmotionName") REFERENCES "primary_emotions"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transcendental-records" ADD CONSTRAINT "FK_93e40c317f61e687672068eb299" FOREIGN KEY ("secondaryEmotionName") REFERENCES "secondary_emotions"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transcendental-records" DROP CONSTRAINT "FK_93e40c317f61e687672068eb299"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transcendental-records" DROP CONSTRAINT "FK_f89713b6fb6003833efa870cd9a"`,
    );
    await queryRunner.query(`DROP TABLE "transcendental-records"`);
  }
}
