import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-couse.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import {v4 as uuid} from 'uuid'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {

    constructor (
        @InjectRepository(Course)
        private readonly courseRepository : Repository<Course>,
        @InjectRepository(Tag)
        private readonly tagRepository : Repository<Tag>
    ) {}

    async findAll() {
        return await this.courseRepository.find({
            relations: ['tags']
        });
    }

    async findOne(id: string) {
        const course = await this.courseRepository.findOne({
            where: {id},
            relations: ['tags']
        })

        if (!course) {
            throw new HttpException(`Course with ID ${id} not exists`, HttpStatus.NOT_FOUND)
        }

        return course
    }

    async create(createCourseDto: CreateCourseDTO) {
        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.preloadTagByName(name))
        )
        const course = this.courseRepository.create({
            id: uuid(),
            ...createCourseDto,
            tags
        })
        return await this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDTO) {
        const tags = updateCourseDto.tags && await Promise.all(
            updateCourseDto.tags.map(name => this.preloadTagByName(name))
        )

        const course = await this.courseRepository.preload({
            ...updateCourseDto,
            id,
            tags
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

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({where: {name}})

        if (tag) {
            return tag
        }

        return this.tagRepository.create({name})

    }
}
