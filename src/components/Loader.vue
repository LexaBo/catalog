<template>
  <div class="loader">
    <img class="loader__img" src="@/assets/image/api/loader.gif" alt="loader">
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>
<style scoped lang="scss">
  .loader {
    &__img {
      width: 4.8rem;
    }
  }
</style>
