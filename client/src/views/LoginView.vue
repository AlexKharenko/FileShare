<template>
  <div class="login">
    <form @submit.prevent="onSubmit">
      <div v-if="getErrorMessage" class="error">{{ getErrorMessage }}</div>
      <FormInput
        title="Password"
        v-model.trim="password"
        :isPassword="isPassword"
        :required="true"
        :minLength="3"
        :maxLength="20"
      />
      <ShowPassword v-model="isPassword" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput";
import ShowPassword from "@/components/ShowPassword";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginView",
  components: { FormInput, ShowPassword },
  data() {
    return {
      password: "",
      isPassword: true,
    };
  },
  computed: { ...mapGetters(["getErrorMessage"]) },
  methods: {
    ...mapActions(["Login"]),
    async onSubmit() {
      await this.Login({ password: this.password });
      if (this.getErrorMessage) return;

      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  min-height: inherit;
  width: 100%;
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
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
