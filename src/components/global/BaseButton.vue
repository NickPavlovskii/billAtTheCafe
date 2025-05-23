<template>
  <button
    class="base-button start-button"
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
      text: {
        type: String,
        default: '',
      },
      rightIcon: {
        type: String,
        default: null,
      },
      leftIcon: {
        type: String,
        default: null,
      },
    },
  }
</script>

<style scoped>
  .base-button {
    margin-top: 30px;
    position: relative;
    color: rgba(255, 255, 255, 0.616);
    background: #444;
    font-size: 1em;
    letter-spacing: 0.1em;
    font-weight: 400;
    padding: 10px 30px;
    transition: 0.5s;
    text-decoration: none;
    display: inline-block;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .base-button span {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .icon-img {
    width: 20px;
    height: 20px;
  }

  .base-button:hover {
    color: #fff;
    background: #048bfa;
    letter-spacing: 0.25em;
    transition: 0.5s;
  }

  .base-button:hover span i {
    color: #fff;
    letter-spacing: 0.25em;
    transition: 0.5s;
  }

  .base-button::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: #27282c;
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
    background: #27282c;
    border: 2px solid #048bfa;
    transform: translateX(-50%);
    transition: 0.5s, box-shadow 0.5s;
  }

  .base-button:hover .i::before {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c,
      10px -10px #048bfa;
  }

  .base-button .i::after {
    content: '';
    position: absolute;
    bottom: -3.5px;
    left: 20%;
    width: 10px;
    height: 6px;
    background: #27282c;
    border: 2px solid #048bfa;
    transform: translateX(-50%);
    transition: 0.5s, box-shadow 0.5s;
  }

  .base-button:hover .i::after {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow: 70px 0 #fff;
  }

  .start-button {
    font-size: 18px;
    background-color: #3498db;
    color: #fff;
    margin-bottom: 10px;
  }
</style>
