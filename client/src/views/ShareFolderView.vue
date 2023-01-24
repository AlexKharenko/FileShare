<template>
  <div class="share-view">
    <form @submit.prevent="onSubmit">
      <div v-if="getErrorMessage" class="error">{{ getErrorMessage }}</div>
      <FormInput
        title="Title"
        v-model.trim="title"
        :required="false"
        :minLength="3"
      />
      <FormInput
        title="Path"
        v-model.trim="path"
        :required="true"
        :minLength="2"
      />
      <button type="submit">Share</button>
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ShareFolderView",
  components: { FormInput },
  data() {
    return {
      title: "",
      path: "",
    };
  },
  computed: { ...mapGetters(["getErrorMessage"]) },
  methods: {
    ...mapActions(["CreateFolder"]),
    async onSubmit() {
      const data = {
        name: this.title,
        path: this.path,
      };
      await this.CreateFolder(data);
      if (this.getErrorMessage) return;

      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.share-view {
  min-height: inherit;
  width: 80%;
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    display: grid;
    grid-gap: 1rem;
    .error {
      margin-bottom: 0.5rem;
      font-size: 1.2em;
      color: rgb(249, 75, 75);
    }
    button {
      margin-top: 1rem;
      width: 100%;
      padding: 0.3rem 1rem;
      font-size: 0.95em;
    }
  }
}
</style>
