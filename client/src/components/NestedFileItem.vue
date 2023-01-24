<template>
  <div class="item-block file-block">
    <div class="file-name">{{ fileName }}</div>
    <div class="file-size">{{ fileSize }}</div>
    <div class="btn-block">
      <button class="btn btn-download" @click="downloadFile">Download</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NestedFileItem",
  props: ["file", "folderId", "path"],
  computed: {
    fileName() {
      return `${this.file.name}.${this.file.extension}`;
    },
    fileSize() {
      return `${Math.round(this.file.sizeInMb, 2)} mb`;
    },
  },
  methods: {
    ...mapActions(["DownloadFileByPath"]),
    async downloadFile() {
      const { name, extension } = this.file;
      const url = await this.DownloadFileByPath({
        folderId: this.folderId,
        name,
        extension,
        path: this.path,
      });
      let a = document.createElement("a");
      a.href = url;
      a.download = `${this.file.name}.${this.file.extension}`;
      document.body.appendChild(a);
      a.click();
    },
  },
};
</script>
