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
    const resFolders = folders.map((folder) => {
      return {
        name: folder.name,
        id: folder.id,
      };
    });
    return resFolders;
  }

  async findById(id: number, path: string): Promise<FullFolder> {
    const { folders } = await this.dbService.getDataFromDb();
    const result = folders.find((item) => item.id == id);
    if (result) {
      const folderPath = `${result.path}/${result.name}${
        path ? '/' + path : ''
      }`;
      const foldersContent = await this.getFolderContentByPath(folderPath);
      const splitedPath = folderPath.split('/');
      const name = splitedPath[splitedPath.length - 1];
      const folder = { name, ...foldersContent };
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

  async getFolderPath(id: number): Promise<string> {
    const { folders } = await this.dbService.getDataFromDb();
    const result = folders.find((item) => item.id == id);
    if (result) return `${result.path}/${result.name}`;
    return '';
  }

  async delete(id: number): Promise<void> {
    const { files, folders } = await this.dbService.getDataFromDb();
    const editedFolders = folders.filter((folder) => folder.id != id);
    await this.dbService.saveDataToDb({ files, folders: editedFolders });
  }

  private fileNameSplit(fileName: string) {
    let i = fileName.length - 1;
    let extension = '';
    while (fileName[i] !== '.' && i >= fileName.length - 12) {
      extension = fileName[i] + extension;
      i = i - 1;
    }
    const name = fileName.substring(0, fileName.length - extension.length - 1);
    return { extension, name };
  }

  async getFolderContentByPath(path: string): Promise<FolderContent> {
    const folders = [];
    const files = [];
    const rootPath = path;
    try {
      const rootFolderContent = await fsPromises.readdir(rootPath);
      if (!rootFolderContent) return { folders, files };
      for (const item of rootFolderContent) {
        const stat = await fsPromises.stat(`${rootPath}/${item}`);
        if (stat.isFile()) {
          const { extension, name } = this.fileNameSplit(item);
          files.push({
            path: rootPath,
            name,
            extension,
            sizeInMb: stat.size / (1024 * 1024),
          });
        } else {
          folders.push({
            path: rootPath,
            name: item,
          });
        }
      }
    } catch (error) {}
    return { folders, files };
  }
}
