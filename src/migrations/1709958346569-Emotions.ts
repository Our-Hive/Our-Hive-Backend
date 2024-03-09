import { MigrationInterface, QueryRunner } from 'typeorm';

export class Emotions1709958346569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const primaryEmotions = [
      {
        name: 'anger',
        description:
          'A strong feeling of annoyance, displeasure, or hostility.',
      },
      {
        name: 'fear',
        description:
          'An unpleasant emotion caused by the threat of danger, pain, or harm.',
      },
      {
        name: 'happiness',
        description: 'A state of well-being and contentment.',
      },
      {
        name: 'sadness',
        description: 'A feeling of sorrow, disappointment, or distress.',
      },
      {
        name: 'surprise',
        description:
          'A feeling of mild astonishment or shock caused by something unexpected.',
      },
    ];

    const secondaryEmotions = [
      {
        name: 'Irritation',
        description: 'A feeling of annoyance.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'anger',
      },
      {
        name: 'Rage',
        description: 'A feeling of intense anger.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'anger',
      },
      {
        name: 'Terror',
        description: 'A feeling of extreme fear.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'fear',
      },
      {
        name: 'Panic',
        description: 'A feeling of sudden uncontrollable fear.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'fear',
      },
      {
        name: 'Joy',
        description: 'A feeling of great pleasure and happiness.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'happiness',
      },
      {
        name: 'Euphoria',
        description: 'A feeling of intense excitement and happiness.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'happiness',
      },
      {
        name: 'Grief',
        description: 'A feeling of deep sorrow.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'sadness',
      },
      {
        name: 'Despair',
        description: 'A feeling of complete loss or absence of hope.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'sadness',
      },
      {
        name: 'Amazement',
        description: 'A feeling of great surprise.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'surprise',
      },
      {
        name: 'Astonishment',
        description: 'A feeling of great surprise.',
        color: 'FF5733',
        theme: 'dark',
        primaryEmotion: 'surprise',
      },
    ];

    for (const primaryEmotion of primaryEmotions) {
      await queryRunner.query(
        `INSERT INTO primary_emotions (name, description) VALUES ('${primaryEmotion.name}', '${primaryEmotion.description}')`,
      );
    }

    for (const secondaryEmotion of secondaryEmotions) {
      await queryRunner.query(
        `INSERT INTO secondary_emotions VALUES ('${secondaryEmotion.name}', '${secondaryEmotion.description}', '${secondaryEmotion.color}', '${secondaryEmotion.theme}', '${new Date().toLocaleDateString()}', '${new Date().toLocaleDateString()}', null,'${secondaryEmotion.primaryEmotion}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM secondary_emotions');
    await queryRunner.query('DELETE FROM primary_emotions');
  }
}
