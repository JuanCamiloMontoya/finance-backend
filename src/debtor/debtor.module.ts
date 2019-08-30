import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorController } from './debtor.controller';
import { DebtorService } from './debtor.service';
import { debtor } from '../../entities/debtor';
import { debt } from '../../entities/debt';
import { user } from '../../entities/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([debtor, debt, user])
  ],
  controllers: [DebtorController],
  providers: [DebtorService]
})
export class DebtorModule { }
