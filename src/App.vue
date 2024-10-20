<template>
  <div id="app" class="app">
    <div class="app__container">
      <nav class="app__navigation app-navigation">
        <router-link class="app-navigation__link" to="/">Каталог</router-link>
        <router-link class="app-navigation__link" to="/favorites">Избранное</router-link>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (localStorage.getItem('favorites') !== null) {
      this.$store.dispatch('updateFromStorage', JSON.parse(localStorage.getItem('favorites')));
    }
  },
};
</script>

<style scoped lang="scss">
.app {
  display: flex;
  min-height: 100vh;
  padding: 6.4rem 1.5rem;

  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 74.4rem;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }

  &__navigation {
    margin-bottom: 1.6rem;
  }
}

.app-navigation {
  display: flex;
  align-items: center;
  justify-content: center;

  &__link {
    flex-grow: 1;
    color: var(--primary-color);
    padding: 1.6rem 3.2rem;
    border-radius: 1.6rem;
    font-size: 1.8rem;
    line-height: 2.4rem;
    text-align: center;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &.router-link-exact-active {
      color: var(--secondary-color);
      background-color: var(--tertiary-color);
    }
  }
}
</style>
