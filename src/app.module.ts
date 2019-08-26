import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovementModule } from './movement/movement.module';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    MovementModule,
    CategoryModule,
    AccountModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
