

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeeStructure20250706122112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE fee_structure (
        id SERIAL PRIMARY KEY,
        sport_id INTEGER NOT NULL REFERENCES sports(id),
        levels JSONB NOT NULL DEFAULT '[]',
        discounts JSONB DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      CREATE INDEX ON fee_structure(sport_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE fee_structure;`);
  }
}

