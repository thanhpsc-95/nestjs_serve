import { ProductsModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ProductsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://thanhd2:ENVFB8YbfkwbZvie@cluster0.br5nv.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
