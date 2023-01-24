<template>
  <!-- <LoadingComponent v-if="getLoadingStatus" /> -->
  <NavBar />

  <main class="main-screen">
    <router-view />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar";
export default {
  components: { NavBar },
  async created() {
    await this.$store.dispatch("CheckAuthorization");
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getLoadingStatus"]),
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated && !this.getLoadingStatus)
        this.$router.push("/login");
      else if (this.isAuthenticated && !this.getLoadingStatus) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #7a8da0;
  font-size: 18px;
  min-height: 100vh;
  background: #2c3e50;
  width: 100%;
  .main-screen {
    width: inherit;
    min-height: calc(100vh - 3.5rem - 2rem);
    align-self: center;
    padding-bottom: 2rem;
  }
}

label,
button {
  user-select: none;
}

.btn {
  border: none;
}

.folders-section,
.files-section {
  width: 80%;
  margin: 1.2rem auto;
  h3 {
    margin-bottom: 1.1rem;
  }
}

.item-block {
  padding: 0.3rem 0.3rem;
  border: solid 1px rgb(99, 93, 132);
  border-collapse: collapse;
  .file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    outline-color: auto;
  }
  div {
    white-space: nowrap;
  }
  .btn-block {
    display: flex;
    justify-content: flex-end;
    gap: 0.2rem;
    .btn-download,
    .btn-delete {
      background: none;
      color: white;
      cursor: pointer;
    }
    .btn-download:hover,
    .btn-delete:hover {
      color: rgb(164, 142, 142);
    }
  }
}
</style>
