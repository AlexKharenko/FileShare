import statusHandler from "../../handlers/status.handler";
import {
  getRequest,
  postRequest,
  deleteRequest,
} from "../../handlers/request.handler";

export default {
  actions: {
    async CreateFile(ctx, data) {
      const response = await postRequest("/files", data);
      const result = await statusHandler(response);
      return result;
    },
    async DeleteFile(ctx, id) {
      const response = await deleteRequest(`/files/${id}`);
      const result = await statusHandler(response);
      return result;
    },
    async GetAllFiles() {
      const response = await getRequest("/files");
      const result = await statusHandler(response);
      return result;
    },
    async GetFileById(ctx, id) {
      const response = await getRequest(`/files/${id}`);
      const result = await statusHandler(response);
      return result;
    },
    async DownloadFileById({ dispatch }, id) {
      try {
        const response = await getRequest(`/auth/download`);
        const { token } = await statusHandler(response);
        return `${process.env.VUE_APP_SERVER_URL}/files/download/${id}?token=${token}`;
      } catch (error) {
        await dispatch("setErrorMessage", error.message);
      }
    },
    async DownloadFileByPath(
      { dispatch },
      { folderId, path, name, extension }
    ) {
      try {
        const response = await getRequest(`/auth/download`);
        const { token } = await statusHandler(response);
        return `${process.env.VUE_APP_SERVER_URL}/files/download/path/${folderId}?token=${token}&path=${path}&filename=${name}&extension=${extension}`;
      } catch (error) {
        await dispatch("setErrorMessage", error.message);
      }
    },
  },
};
