<template>
    <div class="modal-overlay" >
      <div class="modal-content">
        <h2><Icon icon="fluent-mdl2:hint-text" /></h2>
        <ol>
          <li>Шаг 1: Добавьте участников счета, нажав кнопку "Добавить участников".</li>
          <li>Шаг 2: Добавьте позиции счета, указав название и цену для каждой позиции.</li>
          <li>Шаг 3: Проверьте результаты разделения счета на вкладке "Результат".</li>
        </ol>
        <p>Вы также можете удалить участника или позицию, кликнув на соответствующую кнопку.</p>
        <button @click="closeModal">Закрыть</button>
      </div>
    </div>
  </template>
  
  <script>
  import { Icon } from '@iconify/vue';
  
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      Icon,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style>
  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
    z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border: 4px solid #27282c;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content button {
  margin-top: 20px;
  background: #27282c;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>