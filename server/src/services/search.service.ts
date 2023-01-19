import { Injectable } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FileService } from './file.service';
import { FolderContent } from 'src/interfaces/folder.interfaces';

@Injectable()
export class SearchService {
  constructor(
    private folderService: FolderService,
    private fileService: FileService,
  ) {}

  async findFilesAndFoldersByName(name: string): Promise<FolderContent> {
    const files = await this.fileService.findByName(name);
    const folders = await this.folderService.findByName(name);
    return { files, folders };
  }
}
