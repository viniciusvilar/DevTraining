import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get()
    findAll() {
        return "Todos os cursos"
    }

    @Get("/:id/:name")
    findOne(@Param("id") id: string) {
        return `Curso do ID: ${id}`
    }

    @Post()
    create(@Body() body) {
        return body;
    }
}
