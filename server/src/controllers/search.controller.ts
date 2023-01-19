import { Controller, Query, Get } from '@nestjs/common';
import { FolderContent } from 'src/interfaces/folder.interfaces';
import { SearchService } from 'src/services/search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  async Search(@Query() query): Promise<FolderContent> {
    const { name } = query;
    return await this.searchService.findFilesAndFoldersByName(name);
  }
}
