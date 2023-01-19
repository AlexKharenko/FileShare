import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Body,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { FileService } from 'src/services/file.service';
import { File } from 'src/interfaces/file.interfaces';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { createReadStream } from 'fs';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('files/:id')
  @UseGuards(AuthGuard)
  async getFileById(@Param('id') id: number): Promise<File> {
    return this.fileService.findById(id);
  }

  @Get('files')
  // @UseGuards(AuthGuard)
  async getAllFiles() {
    return await this.fileService.getAll();
  }

  @Get('files/download/:id')
  // @UseGuards(AuthGuard)
  async downloadFileById(
    @Param('id') id: number,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const { path, name, extension, sizeInMb } = await this.fileService.findById(
      id,
    );
    const end = sizeInMb * 1024 * 1024;
    const fileStream = createReadStream(`${path}/${name}.${extension}`, {
      end,
    });
    res.headers({
      'Content-Type': 'multipart/form-data',
      'Content-Disposition': `attachment; filename=${name}.${extension}`,
      'Accept-Range': 'bytes',
      'Content-Length': end,
      'Content-Range': `bytes 0-${end}/${end}`,
    });
    return new StreamableFile(fileStream);
  }

  @Post('files')
  @UseGuards(AuthGuard, AdminGuard)
  async createFile(@Body() body) {
    const { name, path, extension } = body;
    this.fileService.create({ name, path, extension });
    return { success: true };
  }

  @Delete('files/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteFile(@Param('id') id: number) {
    this.fileService.delete(id);
    return { success: true };
  }
}
