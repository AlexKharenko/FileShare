import { Module } from '@nestjs/common';
import { FolderService } from 'src/services/folder.service';
import { FolderController } from 'src/controllers/folder.controller';
import { DbModule } from './db.module';

@Module({
  imports: [DbModule],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService],
})
export class FolderModule {}
