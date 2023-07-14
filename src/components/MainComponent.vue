<template>
  <div style="height: 300px; z-index: 2;">
    <h1>Добро пожаловать в Cafe Bill Splitter</h1>
    <div class="btns">
      <button class="start-button" @click="navigateToPersons" style="z-index: 5;">Начать</button>
      <button class="instruction-button" @click="showInstructions">
        <Icon style="color: yellow; font-weight: bold;" icon="fluent-mdl2:hint-text" />
      </button>
    </div>

    <!-- Modal for main instructions -->
    <Dialog v-model:visible="showModalMain" modal header="Инструкция">

      <div class="modal-content">
        <h2>
          <Icon icon="fluent-mdl2:hint-text" />
        </h2>
        <ol>
          <li>Шаг 1: Добавьте участников счета, нажав кнопку "Добавить участников".</li>
          <li>Шаг 2: Добавьте позиции счета, указав название и цену для каждой позиции.</li>
          <li>Шаг 3: Проверьте результаты разделения счета на вкладке "Результат".</li>
        </ol>
        <p>Вы также можете удалить участника или позицию, кликнув на соответствующую кнопку.</p>
      </div>

    </Dialog>
    <!-- Background image -->
    <img src="cofe.png" class="background-image" />
  </div>
</template>

<script>
import {  mapMutations } from 'vuex';

import { Icon } from '@iconify/vue';
import Dialog from 'primevue/dialog';

export default {
  components: {
    Dialog,
    Icon,

  },
  data() {
    return {

      currentScreen: '', // Add the currentScreen variable here
      showModalMain: false, // Flag to control the visibility of the main modal
    };
  },
  methods: {
    ...mapMutations(['setCurrentScreen', 'setPeople', 'setPositions', 'setShowModal', 'setShowPositionModal', 'setShowModalMain']),
    goToNextScreen(nextScreen) {
      this.$router.push(nextScreen);
    },
    navigateToPersons() {
      this.$router.push('/add-persons');
    },


    // Метод для отображения инструкций
    showInstructions() {
      this.showModalMain = true;
    },

    // Метод для закрытия модального окна с инструкциями
    closeModalMain() {
      this.showModalMain = false;
    },
  },

};
</script>


<style scoped>
.instruction-button {
  background-color: #27282c;
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;

  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 5;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border: 4px solid #27282c;
}



.background-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 200px;
  z-index: -1;
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




</style>


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


</style>