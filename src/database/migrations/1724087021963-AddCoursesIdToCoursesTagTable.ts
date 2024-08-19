import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCoursesIdToCoursesTagTable1724087021963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses_tag', new TableColumn({
            name: 'coursesId',
            type: 'uuid',
            isNullable: true
        }))

        await queryRunner.createForeignKey('courses_tag', new TableForeignKey({
            name: 'courses_tag_courses',
            columnNames: ['coursesId'],
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tag', 'courses_tag_courses')

        await queryRunner.dropColumn('courses_tag', 'coursesId')
    }

}
