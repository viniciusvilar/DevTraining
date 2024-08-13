import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-couse.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import {v4 as uuid} from 'uuid'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {

    constructor (
        @InjectRepository(Course)
        private readonly courseRepository : Repository<Course>
    ) {}

    async findAll() {
        return await this.courseRepository.find();
    }

    async findOne(id: string) {
        const course = await this.courseRepository.findOne({where: {id}})

        if (!course) {
            throw new HttpException(`Course with ID ${id} not exists`, HttpStatus.NOT_FOUND)
        }

        return course
    }

    async create(createCourseDto: CreateCourseDTO): Promise<CreateCourseDTO> {
        const course: Course = {
            id: uuid(),
            ...createCourseDto
        }
        await this.courseRepository.save(course)
        return createCourseDto
    }

    async update(id: string, updateCourseDto: UpdateCourseDTO) {
        const course = await this.courseRepository.preload({
            ...updateCourseDto,
            id,
        })

        if (!course) {
            throw new HttpException(`Course with ID ${id} not exists`, HttpStatus.NOT_FOUND)
        }

        return this.courseRepository.save(course)
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({where: {id}})

        if (!course) {
            throw new HttpException(`Course with ID ${id} not exists`, HttpStatus.NOT_FOUND)
        }

        return this.courseRepository.remove(course);
    }
}
