<template>
  <button
    class="icon-button instruction-button"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <Icon
      width="24"
      height="24"
      :icon="icon"
      :style="{ color: iconColor }"
    />
  </button>
</template>

<script>
  import { Icon } from '@iconify/vue'

  export default {
    name: 'IconButton',
    components: {
      Icon,
    },
    props: {
      icon: {
        type: String,
        required: true,
      },
      iconColor: {
        type: String,
        default: 'inherit',
      },
      backgroundColor: {
        type: String,
        default: 'inherit',
      },
      ariaLabel: {
        type: String,
        default: '',
      },
    },
    emits: ['click'],
  }
</script>

<style scoped>
  .icon-button {
    background-color: v-bind(backgroundColor);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 50%;
    font-size: 22px;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-button:hover {
    background-color: #026bb5;
  }
</style>
