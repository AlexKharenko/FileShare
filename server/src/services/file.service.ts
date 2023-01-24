import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDTO } from 'src/dtos/create-file.dto';
import { File } from 'src/interfaces/file.interfaces';
import { DbService } from './db.service';
import { maxId } from 'src/helpers/max-id.helper';
import { promises as promiseFs } from 'fs';
import { FolderService } from './folder.service';

@Injectable()
export class FileService {
  constructor(
    private dbService: DbService,
    private folderService: FolderService,
  ) {}
  async create(createFileDto: CreateFileDTO): Promise<void> {
    const { folders, files } = await this.dbService.getDataFromDb();
    const newId = maxId(files);
    const { name, path, extension } = createFileDto;
    try {
      const { size } = await promiseFs.stat(
        `${path}/${name || ''}.${extension}`,
      );
      const sizeInMb = size / (1024 * 1024);
      const newFile = {
        id: newId,
        sizeInMb,
        name: name || '',
        path,
        extension,
      };
      const newData = { folders, files: [...files, newFile] };
      await this.dbService.saveDataToDb(newData);
    } catch (error) {
      if (error.errno === -4058)
        throw new BadRequestException('No such file or directory!');
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<File[]> {
    const { files } = await this.dbService.getDataFromDb();
    const resFiles = files.map((file) => {
      return {
        name: file.name,
        id: file.id,
        extension: file.extension,
        sizeInMb: file.sizeInMb,
      };
    });

    return resFiles;
  }

  async findById(id: number): Promise<File> {
    const { files } = await this.dbService.getDataFromDb();
    const result = files.find((item) => item.id == id);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async getFileByPath(
    folderId: number,
    path: string,
    name: string,
    extension: string,
  ): Promise<File> {
    const result = await this.folderService.getFolderPath(folderId);
    try {
      if (result && extension) {
        const fullPath = result + (path || '');
        const { size } = await promiseFs.stat(
          `${fullPath}/${name || ''}.${extension}`,
        );
        const sizeInMb = size / (1024 * 1024);
        const newFile = {
          sizeInMb,
          name: name,
          extension,
          path: fullPath,
        };
        return newFile;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error.errno === -4058)
        throw new BadRequestException('No such file or directory!');
      throw error;
    }
  }

  async findByName(name: string): Promise<File[]> {
    const { files } = await this.dbService.getDataFromDb();
    const result = files.map((item) => {
      if (item.name == name) return item;
    });
    return result;
  }
  async delete(id: number): Promise<void> {
    const { files, folders } = await this.dbService.getDataFromDb();
    const editedFiles = files.filter((file) => file.id != id);
    await this.dbService.saveDataToDb({ files: editedFiles, folders });
  }
}
