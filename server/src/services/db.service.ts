import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as promiseFs } from 'fs';
import { FolderContent } from 'src/interfaces/folder.interfaces';

@Injectable()
export class DbService {
  private fileName = 'db.txt';
  async getDataFromDb(): Promise<FolderContent> {
    try {
      const promise = promiseFs.readFile(this.fileName, 'utf8');
      const data = await promise;
      if (!data) {
        return { files: [], folders: [] };
      }
      return JSON.parse(data);
    } catch (error) {
      if (error.errno === -4058) {
        const file = await promiseFs.open(this.fileName, 'w');
        file.close();
        return await this.getDataFromDb();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async saveDataToDb(data: FolderContent): Promise<void> {
    try {
      const promise = promiseFs.writeFile(this.fileName, JSON.stringify(data));
      await promise;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
