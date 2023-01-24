import { File } from './file.interfaces';

export interface Folder {
  id?: number;
  name: string;
  path?: string;
}

export interface FullFolder {
  id?: number;
  name: string;
  path?: string;
  files: File[];
  folders: Folder[];
}

export interface FolderContent {
  folders: Folder[];
  files: File[];
}

export interface FullFolderContent {
  folders: FullFolder[];
  files: File[];
}
