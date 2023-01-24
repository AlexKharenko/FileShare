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
  Query,
} from '@nestjs/common';
import { FileService } from 'src/services/file.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { createReadStream } from 'fs';
import { DownloadGuard } from 'src/guards/download.guard';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('files')
  @UseGuards(AuthGuard)
  async getAllFiles() {
    return await this.fileService.getAll();
  }

  @Get('files/download/:id')
  @UseGuards(DownloadGuard)
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
    const fullFileName = `${name}.${extension}`;
    res.headers({
      'Content-Type': 'multipart/form-data',
      'Content-Disposition': `attachment; filename=${encodeURI(fullFileName)}`,
      'Accept-Range': 'bytes',
      'Content-Length': end,
      'Content-Range': `bytes 0-${end}/${end}`,
    });
    return new StreamableFile(fileStream);
  }

  @Get('files/download/path/:folderId')
  @UseGuards(DownloadGuard)
  async downloadFileByPath(
    @Param('folderId') folderId: number,
    @Query('path') filePath: string,
    @Query('filename') fileName: string,
    @Query('extension') fileExtension: string,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const { path, name, extension, sizeInMb } =
      await this.fileService.getFileByPath(
        folderId,
        filePath,
        fileName,
        fileExtension,
      );
    const end = sizeInMb * 1024 * 1024;
    const fileStream = createReadStream(`${path}/${name}.${extension}`, {
      end,
    });
    const fullFileName = `${name}.${extension}`;
    res.headers({
      'Content-Type': 'multipart/form-data',
      'Content-Disposition': `attachment; filename=${encodeURI(fullFileName)}`,
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
    await this.fileService.create({ name, path, extension });
    return { success: true };
  }

  @Delete('files/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteFile(@Param('id') id: number) {
    this.fileService.delete(id);
    return { success: true };
  }
}
