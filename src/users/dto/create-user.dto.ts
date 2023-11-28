import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, isAlphanumeric, MaxLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    name: string;

}