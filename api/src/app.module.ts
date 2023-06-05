import { Module } from '@nestjs/common';
import { ToDosModule } from './todos/todos.module';

@Module({
  imports: [ToDosModule],
})
export class AppModule {}
