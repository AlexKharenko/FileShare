import { File } from 'src/interfaces/file.interfaces';
import { Folder } from 'src/interfaces/folder.interfaces';

export const maxId = (array: File[] | Folder[]): number => {
  let maxId = 0;
  if (array.length === 0) return maxId + 1;
  for (const item of array) {
    if (maxId < item.id) maxId = item.id;
  }
  return maxId + 1;
};
