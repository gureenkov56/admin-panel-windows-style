<template>
  <div @click="toggleShowStartMenu('hide')">
    <!-- posts window -->
    <WindowWrapper
      v-for="window in windows"
      :key="window.name"
      :class="[
        window.cssClass,
        {'active': activeWindow == window.name},
        {'full-screen': window.fullScreen}
      ]"
      :window-name="window.name"
      @click="setActiveWindow(window.name)"
    />
    <!-- end posts window -->

    <DesktopGrid />
    <BottomBar />
  </div>
</template>

<script>

import DesktopGrid from "@/components/DesktopGrid";
import BottomBar from "@/components/BottomBar";
import {mapMutations, mapState} from "vuex";
import WindowWrapper from "@/components/WindowWrapper";

export default {
  name: 'App',
  components: {
    DesktopGrid,
    BottomBar,
    WindowWrapper
  },
  computed: {
    ...mapState(['windows', 'activeWindow'])
  },
  methods: {
    ...mapMutations(['toggleShowStartMenu', 'setActiveWindow'])
  },
  beforeMount() { document.title = 'Админ панель' },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans");
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  overflow: hidden;
}

#app {
  background: #ccc url('./assets/img/windows-wallpaper.jpeg') no-repeat center;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
}

/* Class for mixing */
.windows-btn {
  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(0.9) !important;
  }
}

.d-flex {
  display: flex;
}
</style>
