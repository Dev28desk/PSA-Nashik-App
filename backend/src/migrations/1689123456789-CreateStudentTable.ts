import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentTable1689123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE student (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                photo_url VARCHAR(255),
                sport_id INTEGER NOT NULL,
                batch_id INTEGER NOT NULL,
                joining_date TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE student`);
    }
}
