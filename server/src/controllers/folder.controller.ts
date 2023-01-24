import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { FolderService } from 'src/services/folder.service';
import { Folder, FullFolder } from 'src/interfaces/folder.interfaces';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(AuthGuard)
  @Get('folders/:id')
  async getFolderById(
    @Param('id') id: number,
    @Query('path') path: string,
  ): Promise<FullFolder> {
    return await this.folderService.findById(id, path);
  }

  @UseGuards(AuthGuard)
  @Get('folders')
  async getAllFolders(): Promise<Folder[]> {
    return await this.folderService.getAll();
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post('folders')
  async createFile(@Body() body) {
    const { name, path } = body;
    this.folderService.create({ name, path });
    return { success: true };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete('folders/:id')
  async deleteFile(@Param('id') id: number) {
    this.folderService.delete(id);
    return { success: true };
  }
}
