<template>
  <div class="home">
    <section class="folders-section" v-if="folders.length > 0">
      <h3>Folders</h3>
      <div class="folders-list">
        <FolderItem
          v-for="folder in folders"
          :key="folder.id"
          :folder="folder"
          :isAdmin="isAdmin"
          @deleteFolder="removeFolder"
        />
      </div>
    </section>
    <section class="files-section" v-if="files.length > 0">
      <h3>Files</h3>
      <div class="= files-list">
        <FileItem
          v-for="file in files"
          :key="file.id"
          :file="file"
          :isAdmin="isAdmin"
          @deleteFile="removeFile"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FileItem from "@/components/FileItem";
import FolderItem from "@/components/FolderItem";
export default {
  name: "HomeView",
  data() {
    return {
      files: [],
      folders: [],
    };
  },
  components: {
    FolderItem,
    FileItem,
  },
  methods: {
    removeFile(fileId) {
      this.files = this.files.filter((file) => fileId != file.id);
    },
    removeFolder(folderId) {
      this.folders = this.folders.filter((folder) => folderId != folder.id);
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isAdmin", "getLoadingStatus"]),
  },
  watch: {
    async isAuthenticated() {
      if (this.isAuthenticated && !this.getLoadingStatus) {
        this.files = await this.$store.dispatch("GetAllFiles");
        this.folders = await this.$store.dispatch("GetAllFolders");
      }
    },
  },
  async mounted() {
    if (this.isAuthenticated && !this.getLoadingStatus) {
      this.files = await this.$store.dispatch("GetAllFiles");
      this.folders = await this.$store.dispatch("GetAllFolders");
    }
  },
};
</script>

<style lang="scss">
.folders-list,
.files-list {
  display: grid;
}
</style>
