import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}
  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto);
    return await this.todoRepository.save(todo);
  }
  findAll() {
    return this.todoRepository.find();
  }
  findOne(id: number) {
    return this.todoRepository.findOne({ where: { id: id } });
  }
  async update(id: number, dto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    Object.assign(todo, dto);
    return await this.todoRepository.save(todo);
  }
  async delete(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    return await this.todoRepository.remove(todo);
  }
}
