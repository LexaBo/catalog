<template>
  <div class="grid-photo">
    <div
        class="grid-photo__item"
        v-for="photo in photos"
        :key="photo.id"
    >
      <div class="grid-photo__img-container">
        <img
            @click="toggleModal(photo)"
            :src="photo.thumbnailUrl"
            :alt="photo.title"
            :title="photo.title"
            class="grid-photo__img"
        >
        <img
            @click="toggleFavorites(photo)"
            :src="getFavoritesIco(photo)"
            alt="favorites"
            class="grid-photo__img-favorites"
        >
      </div>
      <p
          v-if="description"
          class="grid-photo__description"
      >
        {{ photo.title }}
      </p>
    </div>
    <Popup
        v-show="isShowModal"
        @close="toggleModal"
    >
      <img :src="selectPhoto.url" :alt="selectPhoto.title">
    </Popup>
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue';
import { mapActions } from 'vuex';

export default {
  name: 'GridPhotos',
  components: {
    Popup,
  },
  props: {
    photos: {
      type: Array,
      default: () => [],
    },
    description: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isShowModal: false,
    selectPhoto: {},
  }),
  methods: {
    ...mapActions('favorites', ['updateFavorites']),
    toggleModal(photo) {
      this.isShowModal = !this.isShowModal;

      if (this.isShowModal) {
        this.selectPhoto = photo;
      }
    },
    toggleFavorites(photo) {
      this.$store.dispatch('updateFavorites', photo);
    },
    getFavoritesIco(photo) {
      return this.$store.state.favorites.favorites
        .map((element) => element.id)
        .includes(photo.id)
        ? require('@/assets/image/favorites/star_active.png') : require('@/assets/image/favorites/star_empty.png');
    },
  },
};
</script>

<style scoped lang="scss">
.grid-photo {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, 15rem);
  grid-gap: 4.2rem;
  grid-auto-rows: max-content;

  &__item {
    cursor: pointer;
  }

  &__img-container {
    position: relative;
    width: 100%;
    height: 15rem;
    margin-bottom: .8rem;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__img-favorites {
    position: absolute;
    top: .8rem;
    right: .8rem;
  }

  &__description {
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: var(--primary-gray);
  }
}
</style>
