import { IsString } from "class-validator"
import { Tag } from "../entities/tags.entity"

export class CreateCourseDTO {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsString({ each: true })
    tags: string[]
}