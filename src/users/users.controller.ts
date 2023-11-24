import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) {}

    @ApiOkResponse({type: User, isArray: true})
    @Get()
    getUsers(): User[] {
        return this.UsersService.findAll();
    }

    @ApiOkResponse({type: User, description: 'the user description'})
    @Get(':id')
    getUsersById(@Param('id') id: string): User { // TODO
        return this.UsersService.findById(Number(id));
    }

    @ApiCreatedResponse({type: User})
    @Post()
    createUser(@Body() body: CreateUserDto): User {
        return this.UsersService.createUser(body);
    }

}
