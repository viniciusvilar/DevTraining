import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './courses.entity';
import { CreateCourseDTO } from './dto/create-couse.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import {v4 as uuid} from 'uuid'

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: uuid(),
            name: "NestJS",
            description: "Curso sobre fundamentos do framework NestJS",
            tags: ['node.js', 'nestjs', 'javascript', 'typescript']
        },
    ]

    findAll() {
        return this.courses;
    }

    findOne(id: string) {
        const course = this.courses.find(course => course.id === id)

        if (!course) {
            throw new HttpException(`Course with ID ${id} not exists`, HttpStatus.NOT_FOUND)
        }

        return course
    }

    create(createCourseDto: CreateCourseDTO): CreateCourseDTO {
        const course: Course = {
            id: uuid(),
            ...createCourseDto
        }
        this.courses.push(course)
        return createCourseDto
    }

    update(id: string, updateCourseDto: UpdateCourseDTO) {
        const existingCourse = this.courses.find(course => course.id === id)

        if (existingCourse) {
            const index = this.courses.findIndex(course => course.id === id)
            this.courses[index] = {
                id,
                name: updateCourseDto.name ?? existingCourse.name,
                description: updateCourseDto.description ?? existingCourse.description,
                tags: updateCourseDto.tags ?? existingCourse.tags,
            }
        }
    }

    remove(id: string) {
        const index = this.courses.findIndex(course => course.id === id)

        if (index >= 0) {
            this.courses.splice(index, 1)
        }
    }
}
