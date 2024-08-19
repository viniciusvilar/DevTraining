import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags.entity";
import { randomUUID } from "crypto";

@Entity('courses')
export class Course {
    @PrimaryColumn("uuid")
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

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return
        }

        this.id = randomUUID()
    }
}