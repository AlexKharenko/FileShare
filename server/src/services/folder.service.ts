import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDTO } from 'src/dtos/create-folder.dto';
import {
  Folder,
  FullFolder,
  FolderContent,
} from 'src/interfaces/folder.interfaces';
import { DbService } from './db.service';
import { promises as fsPromises } from 'fs';
import { maxId } from 'src/helpers/max-id.helper';

@Injectable()
export class FolderService {
  constructor(private dbService: DbService) {}
  async create(createFolderDto: CreateFolderDTO): Promise<void> {
    const { folders, files } = await this.dbService.getDataFromDb();
    const newId = maxId(folders);
    const newFolder = { id: newId, ...createFolderDto };
    const newData = { folders: [...folders, newFolder], files };
    await this.dbService.saveDataToDb(newData);
  }

  async getAll(): Promise<Folder[]> {
    const { folders } = await this.dbService.getDataFromDb();
    return folders;
  }

  async findById(id: number): Promise<FullFolder> {
    const { folders } = await this.dbService.getDataFromDb();
    const result = folders.find((item) => item.id == id);
    if (result) {
      const foldersContent = await this.getFolderContentByPath(
        result.path,
        result.name,
      );
      const folder = { ...result, ...foldersContent };
      return folder;
    }
    throw new NotFoundException();
  }

  async findByName(name: string): Promise<Folder[]> {
    const { folders } = await this.dbService.getDataFromDb();
    const result = folders.map((item) => {
      if (item.name == name) return item;
    });
    return result;
  }
  async delete(id: number): Promise<void> {
    const { files, folders } = await this.dbService.getDataFromDb();
    const editedFolders = folders.filter((folder) => folder.id != id);
    await this.dbService.saveDataToDb({ files, folders: editedFolders });
  }

  async getFolderContentByPath(
    path: string,
    folderName: string,
  ): Promise<FolderContent> {
    const folders = [];
    const files = [];
    const rootPath = `${path}/${folderName}`;
    try {
      const rootFolderContent = await fsPromises.readdir(rootPath);
      if (!rootFolderContent) return { folders, files };
      for (const item of rootFolderContent) {
        const stat = await fsPromises.stat(`${rootPath}/${item}`);
        if (stat.isFile()) {
          const [name, extension] = item.split('.');
          files.push({
            path: rootPath,
            name,
            extension,
            sizeInMb: stat.size / (1024 * 1024),
          });
        } else {
          folders.push({ path: rootPath, name: item });
        }
      }
    } catch (error) {}
    return { folders, files };
  }
}
