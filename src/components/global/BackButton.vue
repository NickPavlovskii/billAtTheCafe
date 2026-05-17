<template>
  <button
    class="back-button"
    @click="$emit('click')"
  >
    <span>
      <img
        alt="back"
        class="icon-img"
        src="/icons/arrow.svg"
      />
      {{ text }}
    </span>
    <i class="i"></i>
  </button>
</template>

<script>
  export default {
    name: 'BackButton',
    props: {
      text: { type: String, default: 'Назад' },
    },
  }
</script>

<style scoped>
  .back-button {
    position: relative;
    color: var(--back-btn-text, #3d2b1f);
    background: var(--back-btn-outer);
    font-size: 0.9em;
    letter-spacing: 0.06em;
    font-weight: 700;
    padding: 8px 22px;
    transition: 0.3s;
    text-decoration: none;
    display: inline-block;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    font-family: 'Nunito', sans-serif;
  }

  .back-button span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .icon-img {
    width: 16px;
    height: 16px;
    transform: scaleX(-1);
    filter: brightness(0) opacity(0.85);
    transition: filter 0.3s;
  }

  .back-button:hover {
    color: var(--back-btn-text, #3d2b1f);
    background: var(--back-btn-hover-bg, #c4b49a);
    letter-spacing: 0.1em;
  }

  .back-button:hover .icon-img {
    filter: brightness(0) opacity(1);
  }

  body.dark-theme .back-button {
    color: var(--back-btn-text, #f5edd8);
  }
  body.dark-theme .back-button .icon-img {
    filter: brightness(0) invert(1) opacity(0.9);
  }
  body.dark-theme .back-button:hover {
    color: #fff;
  }

  .back-button::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: var(--back-btn-inner);
    border-radius: 3px;
  }

  .back-button .i {
    position: absolute;
    inset: 0;
    display: block;
  }

  .back-button .i::before {
    content: '';
    position: absolute;
    top: -3.5px;
    left: 20%;
    width: 10px;
    height: 6px;
    background: var(--back-btn-inner);
    border: 2px solid var(--back-btn-clip);
    transform: translateX(-50%);
    transition:
      0.3s,
      box-shadow 0.3s;
  }

  .back-button:hover .i::before {
    width: 6px;
    left: calc(50% - 3px);
    border-color: var(--back-btn-clip);
    box-shadow:
      -50px 0 var(--back-btn-inner),
      50px 0 var(--back-btn-clip);
  }

  .back-button .i::after {
    content: '';
    position: absolute;
    bottom: -3.5px;
    left: 80%;
    width: 10px;
    height: 6px;
    background: var(--back-btn-inner);
    border: 2px solid var(--back-btn-clip);
    transform: translateX(-50%);
    transition:
      0.3s,
      box-shadow 0.3s;
  }

  .back-button:hover .i::after {
    width: 6px;
    left: calc(50% - 3px);
  }

  @media (max-width: 480px) {
    .back-button {
      font-size: 0.9em;
      padding: 10px 20px;
      min-height: 44px;
      min-width: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
