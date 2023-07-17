import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
       ConfigModule.forRoot(),
       TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [Todo],
          synchronize: true,
        }),
        inject: [ConfigService],
      }),
       TodosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
