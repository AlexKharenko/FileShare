<template>
  <div class="home">
    <div class="navigation-bar">
      <button
        class="path-link"
        v-for="(name, index) in path"
        :key="index"
        @click="routeThePath(name)"
        :disabled="disabledRoute(index)"
      >
        {{ name }}
      </button>
    </div>
    <section class="folders-section" v-if="currentFolder.folders.length > 0">
      <h3>Folders</h3>
      <div class="folders-list">
        <NestedFoldersItem
          v-for="(folder, index) in currentFolder.folders"
          :key="index"
          :folder="folder"
          @click="nextFolder(index)"
          @keyup="enterPressed"
        />
      </div>
    </section>
    <section class="files-section" v-if="currentFolder.files.length > 0">
      <h3>Files</h3>
      <div class="files-list">
        <NestedFileItem
          v-for="(file, index) in currentFolder.files"
          :key="index"
          :file="file"
          :folderId="$route.params.id"
          :path="stringPath"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NestedFileItem from "@/components/NestedFileItem";
import NestedFoldersItem from "@/components/NestedFolderItem";

export default {
  name: "FolderView",
  data() {
    return {
      path: ["Root"],
      stringPath: "",
      currentFolder: {
        folders: [],
        files: [],
      },
    };
  },
  components: {
    NestedFileItem,
    NestedFoldersItem,
  },
  methods: {
    async enterPressed(e) {
      if (e.key === "Enter") {
        e.currentTarget.click();
      }
    },
    async nextFolder(index) {
      this.path.push(this.currentFolder.folders[index].name);
      let folderPath = "";
      if (this.path.length > 2) {
        for (let i = 2; i < this.path.length; i++) {
          folderPath += `/${this.path[i]}`;
        }
      }
      this.currentFolder = await this.$store.dispatch("GetFolderById", {
        id: this.$route.params.id,
        path: folderPath,
      });
      this.stringPath = folderPath;
    },
    disabledRoute(index) {
      if (index === this.path.length - 1) return true;
      return false;
    },
    async routeThePath(name) {
      if (name == "Root" || !name) {
        this.$router.push("/");
      } else {
        let folderPath = "";
        let newPath = [this.path[0]];
        let i = 1;
        let isNameEqual = false;
        do {
          if (i >= 2) folderPath += `/${this.path[i]}`;
          newPath.push(this.path[i]);
          isNameEqual = this.path[i] === name;
          i++;
        } while (i < this.path.length && !isNameEqual);
        this.path = newPath;
        this.currentFolder = await this.$store.dispatch("GetFolderById", {
          id: this.$route.params.id,
          path: folderPath,
        });
        this.stringPath = folderPath;
      }
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getLoadingStatus"]),
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated && !this.getLoadingStatus)
        this.$router.push("/login");
    },
  },
  async mounted() {
    this.currentFolder = await this.$store.dispatch("GetFolderById", {
      id: this.$route.params.id,
      path: "",
    });
    this.path.push(this.currentFolder.name);
  },
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  display: flex;
  width: 80%;
  margin: 1rem auto 0 auto;
  text-align: left;
  flex-wrap: wrap;
  gap: 0.3rem;
  .path-link {
    max-width: 20rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: none;
    border: none;
    font-size: 0.98em;
    font-family: inherit;
    color: #6e8eae;
    cursor: pointer;
  }
  .path-link:disabled {
    cursor: default;
    color: rgb(95, 151, 208);
  }
  .path-link::before {
    content: "/";
    padding: 0.1rem;
  }
}
</style>
