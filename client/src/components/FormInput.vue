<template>
  <div class="input-block">
    <div class="form-input">
      <div class="title">{{ title }}</div>
      <input
        :value="modelValue"
        @input="inputUpdate"
        :type="!isPassword ? 'text' : 'password'"
        :placeholder="placeholder || title"
        :required="required || false"
        :minlength="minLength || 0"
        :maxlength="maxLength || 255"
      />
    </div>
    <div class="error-block">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: [
    "title",
    "placeholder",
    "isPassword",
    "modelValue",
    "required",
    "minLength",
    "maxLength",
  ],
  emits: ["update:modelValue"],
  methods: {
    inputUpdate(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-block {
  text-align: left;
  .form-input {
    display: grid;
    gap: 0.5rem;
    .title {
      font-size: 1.2rem;
    }
    input {
      outline: none;
      border: none;
      padding: 0.2rem 0.5rem;
      font-size: 1rem;
    }
  }
}
</style>
