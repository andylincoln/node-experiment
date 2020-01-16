import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoItem1579201862937 implements MigrationInterface {
    name = 'TodoItem1579201862937'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "todo_item" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_d454c4b9eac15cc27c2ed8e4138" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "todo_item"`, undefined);
    }

}
