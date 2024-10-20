<template>
  <div
      class="error"
      :class="{'error--column': column}"
  >
    <img src="@/assets/image/api/error.png" class="error__image" alt="">
    <div class="error__text-wrap">
      <h2 class="error__title">
        Сервер не отвечает
      </h2>
      <p class="error__text">
        Уже работаем над этим
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    column: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.error {
  $self: &;

  display: flex;
  align-items: center;
  justify-content: center;

  &--column {
    flex-direction: column;
  }

  &__image {
   #{$self}--column & {
     margin-bottom: 2.4rem;
   }

    #{$self}:not(#{$self}--column) & {
      margin-right: 1.6rem;
    }
  }

  &__text-wrap {
    flex-shrink: 0;
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
