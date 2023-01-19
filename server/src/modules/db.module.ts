import { Module } from '@nestjs/common';
import { DbService } from 'src/services/db.service';
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
