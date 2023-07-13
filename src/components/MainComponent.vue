<template>
 <div  style="height: 300px; z-index: 2;">
      <h1>Добро пожаловать в Cafe Bill Splitter</h1>
      <div class="btns">
        <button class="start-button" @click="navigateToPersons" style="z-index: 5;">Начать</button>
        <button class="instruction-button" @click="showInstructions">
          <Icon style="color: yellow; font-weight: bold;" icon="fluent-mdl2:hint-text" />
        </button>
  </div>
  <modal-main v-if="showModalMain" @close="closeModalMain" />
  <!-- Modal for main instructions -->
    
       <!-- Background image -->
    <img src="cofe.png" class="background-image" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import { Icon } from '@iconify/vue';
import ModalMain from './Modal/ModalMain.vue';
export default {
  components: {
   
    ModalMain,
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
  computed: {
    
    ...mapState(['currentScreen', 'people', 'positions', 'showModal', 'showPositionModal', 'showModalMain']),
    isNameValid() {

      return this.people.every(person => person.name.trim() !== '');
    },
    isPriceValid() {

      return this.positions.every(position => position.price > 0);
    },
    isPeopleSelected() {

      return this.people.some(person => person.isSelected);
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
.MainComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}



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


button {
  padding: 10px 20px;
  font-size: 16px;

  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>