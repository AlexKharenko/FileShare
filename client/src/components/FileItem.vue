<template>
  <div class="item-block file-block">
    <div class="file-name">{{ fileName }}</div>
    <div class="file-size">{{ fileSize }}</div>
    <div class="btn-block">
      <button class="btn btn-download" @click="downloadFile">Download</button>
      <button v-if="isAdmin" class="btn btn-delete" @click="deleteFile">
        Del
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FileItem",
  props: ["file", "isAdmin"],
  emits: ["deleteFile"],
  computed: {
    fileName() {
      return `${this.file.name}.${this.file.extension}`;
    },
    fileSize() {
      return `${Math.round(this.file.sizeInMb, 2)} mb`;
    },
  },
  methods: {
    ...mapActions(["DownloadFileById", "DeleteFile"]),
    async downloadFile() {
      const url = await this.DownloadFileById(this.file.id);
      let a = document.createElement("a");
      a.href = url;
      a.download = `${this.file.name}.${this.file.extension}`;
      document.body.appendChild(a);
      a.click();
    },
    async deleteFile() {
      const result = confirm("Do you want to delete this file!");
      if (result) await this.DeleteFile(this.file.id);
      this.$emit("deleteFile", this.file.id);
    },
  },
};
</script>

<style lang="scss">
.file-block {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr;
  text-align: left;
  grid-gap: 0.5rem;
}
</style>
