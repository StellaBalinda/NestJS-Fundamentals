import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) {}

    @ApiOkResponse({type: User, isArray: true})
    @ApiQuery({name: 'name', required: false})
    @Get()
    getUsers(@Query('name') name: string): User[] {
        return this.UsersService.findAll(name);
    }

    @ApiOkResponse({type: User, description: 'the user description'})
    @ApiNotFoundResponse()
    @Get(':id')
    getUsersById(@Param('id', ParseIntPipe) id: number): User { // TODO
        
        const user = this.UsersService.findById(id);
        
        if(!user){
            throw new NotFoundException();
        }
        return user;
    }

    @ApiCreatedResponse({type: User})
    @Post()
    createUser(@Body() body: CreateUserDto): User {
        return this.UsersService.createUser(body);
    }

}
