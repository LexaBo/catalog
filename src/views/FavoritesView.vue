<template>
  <div class="favorites">
    <GridPhotos
        v-if="$store.state.favorites.favorites.length"
        :photos="$store.state.favorites.favorites"
        description
    />
    <Empty
        v-else
        class="favorites__empty"
    />
  </div>
</template>
<script>
import GridPhotos from '@/components/GridPhotos.vue';
import Empty from '@/components/Empty.vue';

export default {
  name: 'Favorites',
  components: {
    GridPhotos,
    Empty,
  },
};
</script>

<style scoped lang="scss">
.favorites {
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 1.5rem;
  flex-grow: 1;
}
</style>
