<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-content">
        <h3 v-if="people.length === 0">Но тут же никого нет 🤔 </h3>
        <h3 v-else-if="people.length === 1">Добавьте еще кого-нибудь!</h3>
        <button @click="closeModal" class="p-button">Ок</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      people: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
        closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  