<template>
  <transition name="modal-fade">
    <div class="popup">
      <div class="popup__content">
        <slot></slot>
      </div>
      <button
          type="button"
          aria-label="закрыть"
          class="popup__close"
          @click="closeModal">
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--primary-gray-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  &__content {
    display: flex;
    max-width: 60rem;
    min-height: 20rem;

    > * {
      max-width: 100%;
    }
  }

  &__close {
    position: absolute;
    top: 3.2rem;
    right: 3.2rem;
    width: 2.4rem;
    height: 2.4rem;

    &:hover {
      &::before,
      &::after {
        background-color: var(--primary-color);
        transition: background-color .3s linear;
      }
    }

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: .2rem;
      height: 3.3rem;
      background-color: var(--primary-bg);
    }

    &::before {
      transform: translate(-50%, -50%)  rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%)  rotate(-45deg);
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .3s linear;
}
</style>
