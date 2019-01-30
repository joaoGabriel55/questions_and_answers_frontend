<template>
     <header class="header">
	     <h1 class="title">
          <router-link to='/'>{{title}}</router-link>
	     </h1>
	     <UserDropdown v-if="!hideUserDropdown"/>
     </header>
</template>

<script>
import UserDropdown from "./UserDropdown";

export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa-angle-left"
        : "fa-angle-down";
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #4172dd, #4daec9);

  display: flex;
  justify-content: center;
  align-items: center;
}

.header a:hover {
  color: #fff;
  text-decoration: none;
}

.title {
  font-size: 1.2em;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}
</style>
