<template>
  <div
    v-show="showStartMenu"
    class="start-menu"
  >
    <div class="start-menu__header">
      <img
        src="../assets/img/user-icon.jpeg"
        alt="user"
      >
      <span>ADMIN</span>
    </div>

    <div class="start-menu__orange-line" />

    <div class="start-menu__body">
      <div class="start-menu__body__first_half" />
      <div class="start-menu__body__second_half" />
    </div>

    <div class="start-menu__bottom">
      <div class="start-menu__bottom__btn">
        <img
          src="../assets/img/log-off-icon.jpg"
          alt="Log off"
        >
        <span>Log Off</span>
      </div>
      <a href="/">
        <div class="start-menu__bottom__btn">
          <img
            src="../assets/img/go-home-btn.jpg"
            alt="Go home"
          >
          <span>Home page</span>
        </div>
      </a>
    </div>
  </div>

  <div class="bottom__menu">
    <div class="d-flex">
      <button
        class="bottom__menu__start-btn windows-btn"
        @click.stop="toggleShowStartMenu"
      >
        <img
          src="../assets/img/start-btn-icon.png"
          alt="start"
        >
        <span>ПУСК</span>
      </button>

      <div
        v-for="window in getWindowsForBottomBar"
        :key="window.name"
        :class="{'active' : activeWindow === window.name}"
        class="bottom__programs"
        @click="activateAndOpenWindow(window.name)"
      >
        <img
          src="../assets/img/folder-icon.png"
          alt="folder-icon"
        >
        <span>{{ window.name }}</span>
      </div>
    </div>

    <div class="bottom__menu__right-block">
      <span>RU</span>
      <div class="bottom__menu__right-block__time">
        13:00
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from "vuex";

export default {
  name: "BottomBar",
  computed: {
    ...mapState(['showStartMenu', 'windows', 'activeWindow']),
    ...mapGetters(['getWindowsForBottomBar'])
  },
  methods: {
    ...mapMutations(['toggleShowStartMenu', 'setActiveWindow', 'changeWindowsStatus']),
    activateAndOpenWindow(windowName) {
      this.setActiveWindow(windowName);
      this.changeWindowsStatus({'windowName': windowName, newClass: 'open'});
    }
  }
}
</script>

<style lang="scss" scoped>
.start-menu {
  position: absolute;
  bottom: 35px;
  height: 500px;
  width: 400px;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
  box-shadow: 3px 3px 5px black;
  z-index: 10000;

  &__header {
    background-color: #ccc;
    height: 70px;
    border-radius: 5px 5px 0 0;
    background: rgb(108, 172, 233);
    background: linear-gradient(
            180deg,
            rgba(108, 172, 233, 1) 3%,
            rgba(14, 95, 203, 1) 15%,
            rgba(67, 142, 233, 1) 100%
    );
    padding: 3px;

    display: flex;
    align-items: center;

    > img {
      width: 50px;
      height: 50px;
      display: block;
      border-radius: 5px;
      border: 2px solid white;
      margin: 0 10px 0 10px;
    }

    > span {
      color: white;
      text-shadow: 1px 1px 3px black;
      font-family: "Open Sans", sans-serif;
    }
  }

  &__orange-line {
    height: 3px;
    background: black;
    background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 10%,
            rgba(253, 135, 37, 1) 50%,
            rgba(255, 255, 255, 1) 90%
    );
  }

  &__body {
    display: flex;

    &__first-half {
      flex: 1;
      border-right: 1px solid #a8bad0;
    }

    &__second-half {
      background-color: #d3e5fb;
      flex: 1;
    }
  }

  &__bottom {
    position: absolute;
    bottom: 0;

    height: 50px;
    width: 100%;
    background: rgb(43, 103, 189);
    background: linear-gradient(
            180deg,
            rgba(43, 103, 189, 1) 2%,
            rgba(72, 134, 235, 1) 6%,
            rgba(13, 98, 207, 1) 95%,
            rgba(29, 72, 138, 1) 98%
    );

    display: flex;
    justify-content: end;
    align-items: center;

    > a {
      text-decoration: none;
    }

    &__btn {
      display: flex;
      align-items: center;
      margin-right: 15px;
      cursor: pointer;

      color: white;

      > img {
        border: 1px solid white;
        border-radius: 3px;
        margin-right: 10px;
      }
    }
  }
}

.bottom {
  &__menu {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    height: 35px;
    background: linear-gradient(
            180deg,
            rgba(80, 126, 237, 1) 7%,
            rgba(31, 88, 193, 1) 22%,
            rgb(69, 120, 230) 100%
    );

    z-index: 1000;
    display: flex;
    justify-content: space-between;

    & > div:first-child {
      max-width: calc(100% - 125px);
    }

    &__start-btn {
      width: 100px;
      height: 100%;
      margin-right: 5px;

      border-radius: 90% 10% 10% 90% / 0 50% 50% 0;
      border: none;
      background: linear-gradient(
              180deg,
              rgba(125, 204, 123, 1) 7%,
              rgba(67, 174, 70, 1) 22%,
              rgba(59, 192, 51, 1) 100%
      );
      box-shadow: inset 0 0 10px -3px #000000;

      font-style: italic;
      color: white;
      font-weight: bold;

      cursor: pointer;

      display: flex;
      align-items: center;

      span {
        margin: 3px 0 0 6px;
      }
    }

    &__right-block {
      display: flex;
      color: white;
      z-index: 2;

      span {
        padding-top: 5px;
      }

      &__time {
        width: 70px;
        background: linear-gradient(
                180deg,
                rgba(17, 173, 234, 1) 7%,
                rgba(20, 130, 228, 1) 22%,
                rgba(15, 149, 236, 1) 100%
        );
        text-align: center;
        padding: 5px;
        margin-left: 20px;
      }
    }
  }

  &__programs {
    color: white;
    background: rgb(142, 181, 240);
    background: linear-gradient(0deg, rgb(70, 141, 244) 0%, rgb(55, 127, 245) 15%, rgb(55, 127, 245) 85%, rgb(70, 141, 244) 100%);
    margin: 5px 3px;
    padding-top: 2px;
    width: 180px;
    border-radius: 4px;
    box-shadow: 0px 0px 8px 0px #2e5dbd;
    font-size: .8rem;

    display: flex;
    align-items: center;

    > img {
      padding: 0 5px;
      margin-top: -2px;
    }

    &.active {
      background: rgb(36, 100, 229);
      box-shadow: inset 2px 2px 2px rgb(22, 64, 147);
    }

    &:hover {
      filter: brightness(1.1);
    }

    @media screen and (max-width: 600px) {
      display: none;
    }
  }

}
</style>