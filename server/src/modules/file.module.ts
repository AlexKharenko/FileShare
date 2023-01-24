import { Module } from '@nestjs/common';
import { FileController } from 'src/controllers/file.controller';
import { FileService } from 'src/services/file.service';
import { DbModule } from './db.module';
import { FolderModule } from './folder.module';

@Module({
  imports: [DbModule, FolderModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
