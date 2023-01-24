<template>
  <nav>
    <div class="nav-logo">
      <router-link to="/">FileShare</router-link>
    </div>
    <ul v-if="isAuthenticated">
      <li>
        <router-link v-if="isAdmin" to="/share/folder"
          >Share Folder</router-link
        >
      </li>
      <li>
        <router-link v-if="isAdmin" to="/share/file">Share File</router-link>
      </li>
      <li>
        <button class="btn btn-logout" @click="Logout">
          <span>Logout</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isAuthenticated", "isAdmin"]),
  },
  methods: { ...mapActions(["Logout"]) },
};
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem;
  background: #1a2734;
  align-items: center;
  z-index: 1000;
  a {
    text-decoration: none;
    color: #6e8eae;
    font-weight: 400;
    padding: 0.2rem;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    align-items: center;
    li {
      a:hover {
        border-bottom: solid 2px #6e8eae;
      }
      a.router-link-exact-active {
        color: rgb(95, 151, 208);
      }
      .btn-logout {
        cursor: pointer;
        font: inherit;
        background: none;
        color: #6e8eae;
        span {
          padding: 0.2rem;
        }
      }
      .btn-logout:hover {
        span {
          border-bottom: solid 2px #6e8eae;
        }
      }
    }
  }
}
</style>
>
