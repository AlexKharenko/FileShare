<template>
  <div class="item-block folder-block">
    <div tabindex="0" class="file-name">
      {{ folder.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FolderItem",
  props: ["folder"],
};
</script>

<style scoped lang="scss"></style>
