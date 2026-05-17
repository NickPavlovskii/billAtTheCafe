<template>
  <button
    class="base-button"
    @click="$emit('click')"
  >
    <span>
      <img
        v-if="leftIcon"
        alt="icon"
        class="icon-img"
        :src="leftIcon"
      />
      {{ text }}
      <img
        v-if="rightIcon"
        alt="icon"
        class="icon-img"
        :src="rightIcon"
      />
    </span>
    <i class="i"></i>
  </button>
</template>

<script>
  export default {
    name: 'BaseButton',
    props: {
      text: { type: String, default: '' },
      rightIcon: { type: String, default: null },
      leftIcon: { type: String, default: null },
    },
  }
</script>

<style scoped>
  .base-button {
    position: relative;
    color: var(--btn-color);
    background: var(--btn-outer);
    font-size: 1em;
    letter-spacing: 0.1em;
    font-weight: 400;
    padding: 10px 30px;
    transition:
      color 0.5s,
      background 0.5s,
      letter-spacing 0.5s;
    display: inline-block;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    font-family: 'Nunito', sans-serif;
  }

  .base-button span {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .icon-img {
    width: 18px;
    height: 18px;
    opacity: 0.9;
  }
  body.light-theme .base-button .icon-img {
    filter: brightness(0) invert(1) opacity(0.95);
  }
  body.light-theme .base-button:hover .icon-img {
    filter: brightness(0) invert(1);
  }
  body.dark-theme .base-button .icon-img {
    filter: brightness(0) invert(1) opacity(0.9);
  }
  body.dark-theme .base-button:hover .icon-img {
    filter: brightness(0) invert(1);
  }

  .base-button:hover {
    color: var(--btn-hover-color);
    background: var(--btn-hover-bg, var(--accent));
    letter-spacing: 0.25em;
  }
  .base-button:active {
    transform: scale(0.96);
  }

  .base-button::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: var(--btn-inner);
    border-radius: 3px;
  }

  .base-button .i {
    position: absolute;
    inset: 0;
    display: block;
  }

  .base-button .i::before {
    content: '';
    position: absolute;
    top: -3.5px;
    left: 80%;
    width: 10px;
    height: 6px;
    background: var(--btn-inner);
    border: 2px solid var(--btn-clip);
    transform: translateX(-50%);
    transition:
      0.5s,
      box-shadow 0.5s;
  }
  .base-button:hover .i::before {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow:
      70px 0 #fff,
      -70px 0 var(--accent),
      -70px 0 0 4px var(--btn-inner),
      10px -10px var(--accent);
  }

  .base-button .i::after {
    content: '';
    position: absolute;
    bottom: -3.5px;
    left: 20%;
    width: 10px;
    height: 6px;
    background: var(--btn-inner);
    border: 2px solid var(--btn-clip);
    transform: translateX(-50%);
    transition:
      0.5s,
      box-shadow 0.5s;
  }
  .base-button:hover .i::after {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow: 70px 0 #fff;
  }

  @media (max-width: 480px) {
    .base-button {
      font-size: 0.95em;
      padding: 12px 24px;
      min-height: 44px;
    }
  }
</style>
