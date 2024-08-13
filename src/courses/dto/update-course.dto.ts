import { IsOptional, IsString } from "class-validator"

export class UpdateCourseDTO {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsString({ each: true })
    @IsOptional()
    tags: string[]
}