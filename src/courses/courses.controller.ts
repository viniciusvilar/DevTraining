import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-couse.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

    constructor(private readonly courseService: CoursesService) {}

    @Get()
    findAll() {
        return this.courseService.findAll()
    }

    @Get("/:id")
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id)
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDTO) {
        return this.courseService.create(createCourseDto)
    }

    @Put("/:id")
    update(@Param('id') id: string, @Body() updateCourseDto:UpdateCourseDTO) {
        return this.courseService.update(id, updateCourseDto)
    }

    @Delete("/:id")
    remove(@Param('id') id: string) {
        return this.courseService.remove(id)
    }
}
