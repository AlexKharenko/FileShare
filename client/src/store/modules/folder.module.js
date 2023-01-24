import statusHandler from "../../handlers/status.handler";
import {
  getRequest,
  postRequest,
  deleteRequest,
} from "../../handlers/request.handler";

export default {
  actions: {
    async CreateFolder(ctx, data) {
      const response = await postRequest("/folders", data);
      const result = await statusHandler(response);
      return result;
    },
    async DeleteFolder(ctx, id) {
      const response = await deleteRequest(`/folders/${id}`);
      const result = await statusHandler(response);
      return result;
    },
    async GetAllFolders() {
      const response = await getRequest("/folders");
      const result = await statusHandler(response);
      return result;
    },
    async GetFolderById(ctx, { id, path }) {
      const response = await getRequest(`/folders/${id}?path=${path}`);
      const result = await statusHandler(response);
      return result;
    },
  },
};
