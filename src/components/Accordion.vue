<template>
  <div class="accordion">
    <div
        @click="toggleAccordion"
        class="accordion__header accordion-header"
        :class="{'accordion-header--is-active': isOpen }"
    >
      <span class="accordion-header__icon"></span>
      <slot name="title"></slot>
    </div>
    <div
        class="accordion__content"
        v-show="isOpen"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.$emit('openAccordion');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.accordion {
  display: flex;
  flex-direction: column;

  &__content {
    padding-top: 4.8rem;
    padding-right: 1.5rem;
    padding-left: 4.8rem;
  }
}

.accordion-header {
  $self: &;

  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  user-select: none;

  &__icon {
    position: relative;
    display: inline-block;
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 2.4rem;
    background-color: var(--secondary-color);
    border-radius: 50%;

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      display: block;
      width: .2rem;
      height: 1.4rem;
      background-color: var(--primary-bg);
    }

    &::before {
      transform: translate(-50%, -50%);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    #{$self}--is-active &::before {
      display: none;
    }
  }
}
</style>
