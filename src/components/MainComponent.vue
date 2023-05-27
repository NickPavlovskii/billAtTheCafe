<template>
  <div class="main-component">
    <h1>Добро пожаловать в Cafe Bill Splitter</h1>
    
    <button class="instruction-button" @click="showInstructions"><Icon icon="fluent-mdl2:hint-text" /></button>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Инструкции</h2>
        <ol>
          <li>Шаг 1: Добавьте участников счета, нажав кнопку "Добавить участников".</li>
          <li>Шаг 2: Добавьте позиции счета, указав название и цену для каждой позиции.</li>
          <li>Шаг 3: Проверьте результаты разделения счета на вкладке "Результат".</li>
        </ol>
        <p>Вы также можете удалить участника или позицию, кликнув на соответствующую кнопку.</p>
        <button @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      currentScreen: '', // Add the currentScreen variable here
    };
  },
  methods: {
    navigateToPersons() {
    this.currentScreen = 'add-persons';
  },

    showInstructions() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>


<style scoped>
.MainComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.start-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.instruction-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

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

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
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