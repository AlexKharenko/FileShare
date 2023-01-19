import { Module } from '@nestjs/common';
import { FileController } from 'src/controllers/file.controller';
import { FileService } from 'src/services/file.service';
import { DbModule } from './db.module';

@Module({
  imports: [DbModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
