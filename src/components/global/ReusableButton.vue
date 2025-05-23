<template>
  <div class="button-wrapper">
    <button
      type="button"
      class="add-button"
      :disabled="disabled"
      @click="$emit('click')"
    >
      <span
        class="button-icon-wrapper"
        v-if="leftIcon"
      >
        <i :class="leftIcon" />
      </span>

      <span class="button-text">
        {{ text }}
      </span>

      <span
        class="button-icon-wrapper"
        v-if="rightIcon"
      >
        <i :class="rightIcon" />
      </span>

      <i class="i"></i>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'ReusableButton',
    props: {
      text: {
        type: String,
        default: 'Кнопка',
      },
      leftIcon: {
        type: String,
        default: '',
      },
      rightIcon: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    emits: ['click'],
  }
</script>

<style scoped>
  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .button-wrapper button {
    position: relative;
    display: flex;
    background-color: #27282c;
    color: #27282c;
    letter-spacing: 0.1em;
    font-weight: 400;
    padding: 10px 20px;
    transition: 0.5s;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .button-wrapper button:hover {
    letter-spacing: 0.25em;
  }

  .button-wrapper button:hover .pi-plus {
    letter-spacing: 0.25em;
    transition: 0.5s;
  }

  .button-wrapper button::before {
    content: '';
    background: white;
    inset: 2px;
    position: absolute;
  }

  .button-wrapper button span {
    position: relative;
    z-index: 1;
  }

  .button-wrapper button .i {
    position: absolute;
    inset: 0;
    display: block;
  }

  .button-wrapper button .i::before {
    content: '';
    position: absolute;
    top: 0;
    left: 80%;
    width: 25px;
    height: 10px;
    background: white;
    transform: translateX(-50%) skewX(325deg);
    transition: 0.5s;
  }

  .button-wrapper button:hover .i::before {
    width: 28px;
    left: 20%;
  }

  .button-wrapper button .i::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 25px;
    height: 6px;
    background: white;
    transform: translateX(-50%) skewX(325deg);
    transition: 0.5s;
  }

  .button-wrapper button:hover .i::after {
    width: 28px;
    left: 80%;
  }

  .button-text {
    color: #000;
    margin: 0 0.6rem;
  }

  .pi-plus {
    color: rgba(255, 255, 255, 0.616);
  }

  .add-button .button-icon-wrapper i {
    color: rgb(131, 130, 130);
  }

  .add-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(60%);
  }
</style>
