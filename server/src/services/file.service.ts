import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDTO } from 'src/dtos/create-file.dto';
import { File } from 'src/interfaces/file.interfaces';
import { DbService } from './db.service';
import { maxId } from 'src/helpers/max-id.helper';
import { promises as promiseFs } from 'fs';

@Injectable()
export class FileService {
  constructor(private dbService: DbService) {}
  async create(createFileDto: CreateFileDTO): Promise<void> {
    const { folders, files } = await this.dbService.getDataFromDb();
    const newId = maxId(files);
    const { name, path, extension } = createFileDto;
    const { size } = await promiseFs.stat(`${path}/${name}.${extension}`);
    const sizeInMb = size / (1024 * 1024);
    const newFile = { id: newId, sizeInMb, ...createFileDto };
    const newData = { folders, files: [...files, newFile] };
    await this.dbService.saveDataToDb(newData);
  }

  async getAll(): Promise<File[]> {
    const { files } = await this.dbService.getDataFromDb();
    return files;
  }

  async findById(id: number): Promise<File> {
    const { files } = await this.dbService.getDataFromDb();
    const result = files.find((item) => item.id == id);
    if (result) {
      return result;
    }
    throw new NotFoundException();
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
