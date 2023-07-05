<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-content">
        <h3>Должно быть добавлено как минимум 2 позиции</h3>
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
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  