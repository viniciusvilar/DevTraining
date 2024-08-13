import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags.entity";

@Entity('courses')
export class Course {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @JoinTable()
    @ManyToMany(() => Tag, tag => tag.courses, {
        cascade: true
    })
    tags: Tag[]
}