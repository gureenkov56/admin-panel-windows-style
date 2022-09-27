<template>
  <div class="window">
    <div
      class="window__header"
      @mousedown="headerMouseDown($event)"
      @mousemove="headerMouseMove($event)"
      @mouseup="drugAndDropWindow = false"
    >
      <span class="window__header__name">
        <img
          src="../assets/img/folder-icon.png"
          alt="folder-icon"
        >
        <span>{{ windowName }}</span>
      </span>
      <div class="window__header__btn-wrapper">
        <button
          class="window__header__btn blue windows-btn"
          @click.stop="changeWindowsStatus({'windowName': windowName, 'newClass': 'hide'})"
        >
          _
        </button>
        <button
          class="window__header__btn  blue windows-btn"
          @click.stop="fullScreenToogle($event, windowName)"
        >
          □
        </button>
        <button
          class="window__header__btn red windows-btn"
          @click.stop="changeWindowsStatus({'windowName': windowName, 'newClass': 'close'})"
        >
          ×
        </button>
      </div>
    </div>

    {{ windowName }}
    <!-- POSTS -->
    <div v-if="windowName === 'Posts' ">
      <div
        v-for="post in posts.postStore"
        :key="post.id"
      >
        {{ post.title }}
      </div>
      {{ posts }}
    </div>
    <!-- END POSTS -->
    <!--    <div class="windows__folder__body">-->
    <!--      <div class="windows__folder__body__left">-->
    <!--        <div class="windows__folder__body__left__menuWrapper">-->
    <!--          <div class="windows__folder__body__left__menuWrapper__header">-->
    <!--            <span>Действия</span>-->
    <!--            <img-->
    <!--              src="../assets/img/folder-leftmenu-icon.png"-->
    <!--              alt="hider-icon"-->
    <!--            >-->
    <!--          </div>-->
    <!--          <div class="windows__folder__body__left__menuWrapper__body">-->
    <!--            <ul>-->
    <!--              <li id="createNewPost">-->
    <!--                Создать новый пост-->
    <!--              </li>-->
    <!--              <li class="disable-link">-->
    <!--                Опубликовать пост-->
    <!--              </li>-->
    <!--              <li class="disable-link">-->
    <!--                Категории-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <div class="windows__folder__body__left__menuWrapper">-->
    <!--          <div class="windows__folder__body__left__menuWrapper__header">-->
    <!--            <span>Директории</span>-->
    <!--            <img-->
    <!--              src="../assets/img/folder-leftmenu-icon.png"-->
    <!--              alt="hider-icon"-->
    <!--            >-->
    <!--          </div>-->
    <!--          <div class="windows__folder__body__left__menuWrapper__body">-->
    <!--            <ul class="disable-link">-->
    <!--              <li>Категории</li>-->
    <!--              <li>Не опубликованные</li>-->
    <!--              <li>Корзина</li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="windows__folder__body__right">-->
    <!--        <div class="windows__folder__body__right__wrapper__counter">-->
    <!--          Показано <span id="postsCountVuew">all</span> из <span id="postsCountTotal">Х</span> файлов-->
    <!--        </div>-->

    <!--        <div class="windows__folder__body__right__wrapper">-->
    <!--          <p>В процессе разработки...</p>-->
    <!--          &lt;!&ndash;post template&ndash;&gt;-->
    <!--          <div class="windows__folder__body__right__file">-->
    <!--            <img-->
    <!--              src="../assets/img/textfile-icon.png"-->
    <!--              alt="text-file"-->
    <!--            >-->
    <!--            <div-->
    <!--              class="fileinfo__wrapper"-->
    <!--              title="TEST TITLE"-->
    <!--            >-->
    <!--              <div class="fileinfo__title" />-->
    <!--              <div class="fileinfo__status_pub">-->
    <!--                Date-->
    <!--              </div>-->
    <!--              <div class="d-flex">-->
    <!--                <div class="fileinfo__views">-->
    <!--                  Просмотры: <span class="views_count" />-->
    <!--                </div>-->
    <!--                <div class="fileinfo__status">-->
    <!--                  Статус: <span class="draft_or_pub" />-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "WindowWrapper",
  props: {
    'windowName': String
  },
  data() {
    return {
      drugAndDropWindow: false,
      drugAndDropOffsetY: 0,
      drugAndDropOffsetX: 0,
    }
  },
  computed: {
    ...mapState(['posts']),
  },
  methods: {
    ...mapMutations([
      'changeWindowsStatus',
      'toggleFullScreenWindow',
      'getPosts'
    ]),
    headerMouseDown(event) {
      this.drugAndDropWindow = true;
      this.drugAndDropOffsetY = event.offsetY;
      this.drugAndDropOffsetX = event.offsetX;
    },
    headerMouseMove(event) {
      if (this.drugAndDropWindow) {
        event.target.parentElement.classList.remove('full-screen');
        event.target.parentElement.style.top = `${event.clientY - Number(this.drugAndDropOffsetY)}px`;
        event.target.parentElement.style.left = `${event.clientX - Number(this.drugAndDropOffsetX)}px`;
      }
    },
    windowHide(event) {
      event.target.closest('.window').classList.add('d-none');
    },
    fullScreenToogle(event, windowName) {
      const window = event.target.closest('.window');
      window.style.top = '0px';
      window.style.left = '0px';
      this.toggleFullScreenWindow(windowName);
    },
  },
  beforeMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => this.getPosts(json))
  }
}
</script>

<style lang="scss" scoped>
.window {
  display: none;

  position: absolute;
  width: 70%;
  height: 80%;
  left: 60px;
  top: 30px;

  background-color: white;
  border: 1px solid #003ddc;
  border-radius: 8px 8px 0 0;

  &.full-screen {
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &.open {
    display: block;
  }

  &.active {
    z-index: 100;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
  }

  &__header {
    background: linear-gradient(180deg, rgba(45, 137, 251, 1) 10%, rgba(0, 85, 235, 1) 60%, rgba(4, 104, 251, 1) 100%);;
    border-radius: 5px 5px 0 0;

    display: flex;
    justify-content: space-between;
    color: white;

    padding: 3px;
    font-size: .8rem;

    &__name {
      display: flex;
      align-items: center;

      > img {
        padding: 0px 5px;
      }
    }

    &__btn-wrapper {
      display: flex;
      justify-content: space-between;
    }

    &__btn {
      border: 1px solid white;
      border-radius: 4px;

      color: white;
      width: 24px;
      height: 24px;
      text-align: center;

      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 3px;


      margin: 1px;

      cursor: pointer;

      &.red {
        font-size: 1.3rem;
        background: linear-gradient(167deg, rgba(244, 167, 139, 1) 10%, rgba(209, 68, 40, 1) 60%);
      }

      &.blue {
        font-size: 1.3rem;
        padding-bottom: 8px;
        background: linear-gradient(180deg, rgba(95, 140, 247, 1) 7%, rgba(59, 119, 245, 1) 33%, rgba(16, 69, 190, 1) 95%);
      }
    }
  }
}

/*
toDo:
 1. drag and drop
 2. clean old styles
 3. mobile version
*/

.windows__folder__body {
  //position: absolute;
  display: flex;
  background-color: #ccc;

  width: 100%;
  height: calc(100% - 32px);

  font-family: "Open Sans", sans-serif;
}

.windows__folder__body__left {
  height: 100%;
  min-width: 250px;
  background: linear-gradient(
          180deg,
          rgba(122, 161, 230, 1) 19%,
          rgba(99, 118, 214, 1) 70%
  );
}

.windows__folder__body__right {
  width: 100%;
  overflow-y: scroll;
}

.windows__folder__body__right__wrapper {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}

.windows__folder__body__left__menuWrapper {
  width: 90%;
  margin: 20px auto;
  background-color: #d6dff7;

  border: 1px solid white;
  border-radius: 4px 4px 0 0;

  color: #215dc6;
  font-size: 0.8rem;
  font-weight: bold;
}

.windows__folder__body__left__menuWrapper__header {
  background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 19%,
          rgba(199, 212, 247, 1) 70%
  );
  padding: 5px 10px;

  display: flex;
  justify-content: space-between;
}

.windows__folder__body__left__menuWrapper__header > img {
  width: 19px;
}

.windows__folder__body__left__menuWrapper__header:hover {
  cursor: pointer;
}

.windows__folder__body__left__menuWrapper__body > ul > li:hover {
  cursor: pointer;
  text-decoration: underline;
}

.windows__folder__body__right__wrapper__counter {
  margin: 10px 20px;
  text-align: center;
  font-size: 0.7rem;
  color: rgb(128, 128, 128);
}

.windows__folder__body__right__file {
  width: 350px;
  height: 80px;
  display: flex;
  cursor: pointer;
}

.windows__folder__body__right__file > img {
  height: 50px;
  margin-right: 10px;
}


.fileinfo__title {
  font-size: 0.8rem;
  white-space: nowrap;
  max-width: 250px;
  overflow: hidden;
}

.fileinfo__status_pub,
.fileinfo__views,
.fileinfo__status {
  color: grey;
  font-size: 0.7rem;
}

.fileinfo__status {
  padding-left: 10px;
}
</style>