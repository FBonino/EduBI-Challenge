import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  Delete,
} from '@nestjs/common';
import { ToDosService } from './todos.service';
import { CreateToDoDTO, UpdateToDoDTO } from './todos.dtos';

@Controller('todos')
export class ToDosController {
  constructor(private todosService: ToDosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() createToDoDTO: CreateToDoDTO) {
    return this.todosService.create(createToDoDTO);
  }

  @Put(':id')
  updateByID(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateToDoDTO: UpdateToDoDTO,
  ) {
    return this.todosService.updateByID(id, updateToDoDTO);
  }

  @Delete(':id')
  deleteByID(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteByID(id);
  }
}
