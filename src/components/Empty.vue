<template>
  <div class="empty">
    <img class="empty__image" src="@/assets/image/api/empty.png" alt="empty">
      <h2 class="empty__title">
        Список избранного пуст
      </h2>
      <p class="empty__text">
        Добавляйте изображения, нажимая на звездочки
      </p>
  </div>
</template>

<script>
export default {
  name: 'Empty',
};
</script>
<style scoped lang="scss">
.empty {
  $self: &;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__image {
    margin-bottom: 2.4rem;
  }

  &__title {
    margin-bottom: .8rem;
    font-size: 2.2rem;
    line-height: 2.8rem;
    font-weight: 700;
  }

  &__text {
    font-size: 1.8rem;
    line-height: 2.3rem;
  }
}
</style>
