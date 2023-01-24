<template>
  <div class="item-block folder-block">
    <div class="file-name">
      <router-link :to="`/folders/${folder.id}`">{{ folder.name }}</router-link>
    </div>
    <div class="btn-block">
      <button v-if="isAdmin" class="btn btn-delete" @click="deleteFolder">
        Del
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FolderItem",
  props: ["folder", "isAdmin", "rootFolderId"],
  emits: ["deleteFolder"],
  methods: {
    ...mapActions(["DeleteFolder"]),
    async deleteFolder() {
      const result = confirm("Do you want to delete this file!");
      if (result) await this.DeleteFolder(this.folder.id);
      this.$emit("deleteFolder", this.folder.id);
    },
  },
};
</script>

<style lang="scss">
.folder-block {
  display: grid;
  grid-template-columns: 6fr 1fr;
  text-align: left;
  .file-name {
    cursor: pointer;
    a {
      text-decoration: none;
      color: #7a8da0;
    }
    a:hover {
      color: #7faddb;
    }
  }
}
</style>
