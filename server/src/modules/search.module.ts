import { Module } from '@nestjs/common';
import { SearchController } from 'src/controllers/search.controller';
import { SearchService } from 'src/services/search.service';
import { FolderModule } from './folder.module';
import { FileModule } from './file.module';

@Module({
  imports: [FolderModule, FileModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
