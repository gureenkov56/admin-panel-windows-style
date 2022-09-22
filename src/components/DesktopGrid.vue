<template>
  <div class="desktop">
    <div
      v-for="i in countGridItems"
      :key="i"
      class="desktop__grid"
      @dragover.prevent
      @dragenter.prevent
      @drop="dropElement($event, i)"
    >
      <!-- gird items -->
      <div
        v-if="iconFolder = findDesktopIconByPlace(i)"
        :id="iconFolder.iconName"
        class="desktop__icon"
        draggable="true"
        @dragstart="startDrag($event)"
        @dblclick.stop="openFolder($event)"
      >
        <div
          :id="iconFolder.iconName"
          class="desktop__icon__image"
          @dblclick.stop="openFolder($event)"
        />
        <div
          :id="iconFolder.iconName"
          @dblclick.stop="openFolder($event)"
        >
          {{ iconFolder.iconName }}
        </div>
      </div>
      <!-- end gird items -->
    </div>
  </div>
</template>

<script>
export default {
  name: "DesktopGrid",
  data() {
    return {
      countGridItems: Math.floor((window.innerHeight / 85) * (window.innerWidth / 80)),
      desktopIcons: [
        {
          placeId: 1,
          iconName: 'Posts'
        },
        {
          placeId: 2,
          iconName: 'Users'
        }
      ]
    }
  },
  methods: {
    startDrag(event) {
      event.dataTransfer.setData('dragId', event.target.id);
    },
    dropElement(event, i) {
      let droppedEl = document.getElementById(event.dataTransfer.getData('dragId'));
      event.target.append(droppedEl);
    },
    findDesktopIconByPlace(placeIdByGrid) {
      return this.desktopIcons.find(el => el.placeId == placeIdByGrid)
    },
    openFolder(event) {
      console.log(event.target.id);
    }
  }
}
</script>

<style lang="scss" scoped>
.desktop {
  display: flex;
  flex-wrap: wrap;

  &__grid {
    height: 85px;
    width: 80px;
  }

  &__icon {
    max-width: 80px;
    height: 85px;
    margin: 0 auto;
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px black;
    font-family: "Open Sans", sans-serif;
    font-size: 0.8rem;
    background-color: transparent;

    &__image {
      background-image: url('../assets/img/dir-icon.png');
      background-size: cover;
      background-repeat: no-repeat;
      height: 60px;
      width: 60px;
      margin: 0 auto;
    }
  }
}
</style>









