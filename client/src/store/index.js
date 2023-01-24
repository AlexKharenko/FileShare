import { createStore } from "vuex";
import authModule from "./modules/auth.module";
import errorModule from "./modules/error.module";
import loadingModule from "./modules/loading.module";
import userModule from "./modules/user.module";
import fileModule from "./modules/file.module";
import folderModule from "./modules/folder.module";

export default createStore({
  modules: {
    authModule,
    errorModule,
    loadingModule,
    userModule,
    fileModule,
    folderModule,
  },
});
