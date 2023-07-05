<template>
  <div class="cont">
    <!-- Home icon -->
    <i class="pi pi-home app-icon app-icons app-icons-home" @click="navigateToHome"></i>
    <!-- Settings icon -->
    <i class="pi pi-cog app-icon app-icons"></i>
    <!-- Share component -->
    <my-share class="share-container" />

    <h1 class="app-title">Cafe Bill Splitter</h1>
    
    <!-- Main component -->
    <div v-if="currentScreen === 'main-component'" style="height: 300px; z-index: 2;">
      <main-component />
      <div style="position: relative; bottom: 110px;">
        <button @click="navigateToPersons" style="z-index: 5;">Начать</button>
        <button class="instruction-button" @click="showInstructions">
          <Icon style="color: yellow; font-weight: bold;" icon="fluent-mdl2:hint-text" />
        </button>
      </div>
    </div>
    <modal-main v-if="showModalMain" @close="closeModalMain" />

    <!-- Add persons screen -->
    <div v-else-if="currentScreen === 'add-persons'" class="add-person">
      <div class="add-person-content">
        <add-persons style="add" />
        <button @click="goToNextScreen('add-positions')" class="p-mt-3 add-button addbtn btnn">
          <span>Далее<i class="pi pi-chevron-right"></i></span>
          <i class="i"></i>
        </button>
      </div>
    </div>
    <ModalPeople v-if="showModal" :people="people" @close="closeModal" />

    <!-- Add positions screen -->
    <div v-else-if="currentScreen === 'add-positions'">
      <add-positions
  
        :is-name-valid="isNameValid"
        :is-price-valid="isPriceValid"
        :is-people-selected="isPeopleSelected"
        @add-position="addPosition"
        @remove-position="removePosition"
      />
      <button @click="openPositionModal('bill-result')" class="p-mt-3 add-button addbtn btnn">
        <span>Результат<i class="pi pi-chevron-right"></i></span>
        <i class="i"></i>
      </button>
    </div>
    <ModalPosition v-if="showPositionModal" @close="closePositionModal" />

    <!-- Bill result screen -->
    <div v-else-if="currentScreen === 'bill-result'">
      <bill-result />
    </div>
    <div class="niklad-tag">@Niklad</div>

   
с

  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';
import ModalMain from './components/Modal/ModalMain.vue';
import ModalPeople from './components/Modal/ModalPeople.vue';
import ModalPosition from './components/Modal/ModalPosition.vue';
import MainComponent from './components/MainComponent.vue';
import { Icon } from '@iconify/vue';
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import AddPersons from "./components/AddPerson.vue";
import AddPositions from "./components/AddPosition.vue";
import BillResult from "./components/BillResult.vue";
import MyShare from "./components/MyShare";

export default {
  data() {
    return {
      showModal: false, // Flag to control the visibility of a modal
      showPositionModal: false, // Flag to control the visibility of a position modal
      showModalMain: false,
    };
  },
  components: {
    Icon,
    AddPersons,
    AddPositions,
    BillResult,
    MyShare,
    MainComponent,
    ModalMain,
    ModalPeople,
    ModalPosition,
  },
  methods: {
    ...mapMutations(['setCurrentScreen', 'setPeople', 'setPositions', 'setShowModal', 'setShowPositionModal', 'setShowModalMain']),
    closeModal() {
      this.showModal = false;
    },
    closePositionModal() {
      this.showPositionModal = false;
    },
    
    
    // Метод для навигации на экран "add-persons"
navigateToPersons() {
  this.setCurrentScreen('add-persons');
},

// Метод для отображения инструкций
showInstructions() {
  this.showModalMain = true;
},

// Метод для закрытия модального окна с инструкциями
closeModalMain() {
  this.showModalMain = false;
},

// Метод для открытия модального окна с позициями или перехода на следующий экран
openPositionModal(nextScreen) {
  if (this.positions.length < 2) {
    this.showPositionModal = true;
  } else {
    this.setCurrentScreen(nextScreen);
  }
},

// Метод для закрытия модального окна с позициями

// Метод для перехода на следующий экран
goToNextScreen(nextScreen) {
  if (this.people.length >= 2) {
    this.setCurrentScreen(nextScreen);
  } else {
    this.showModal = true;
  }
},

// Метод для навигации на главный экран
navigateToHome() {
  this.setCurrentScreen('main-component');
},

// Метод для добавления участников
addPeople(newPeople) {
  this.setPeople(newPeople);
},

// Метод для добавления позиции
addPosition(newPosition) {
  this.setPositions([...this.positions, newPosition]);
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



  <style lang="scss"  scoped>


 


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




button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
 



  .niklad-tag {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0px 2px;

  font-size: 14px;
 
 
}


  .share-container{
    position: absolute;
    top: 15px;
  right: 15px;
  }
  

.app-icons{
  margin-left: 12px;
  position: relative;
  right: 130px;
  margin-top: 12px;
 
}

 .app-icon {
  position: relative;
  bottom: 5px;
  font-size: 22px;
  transition: 1.25s;
  cursor: pointer;
}
.app-icons-home{
  position: relative;

  font-size: 1.5em;
}
.app-icon:hover {
color: #048bfa;
}

.btnn {
  margin-top: 30px;
  position: relative;
  color: rgba(255, 255, 255, 0.616);
  background: #444;
  font-size: 1.0em;
  letter-spacing: 0.1em;
  font-weight: 400;
  padding: 10px 30px;
  transition: 0.5s;
  text-decoration: none;
  display: inline-block;
  border: none;
  cursor: pointer;


  &:hover {
    color: #fff;
  background: #048bfa;
  letter-spacing: 0.25em;
  transition: 0.5s;
  .i::before {
  width: 6px;
  left: calc(50% - 3px);
  border: 2px solid #048bfa;
  box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c, 10px -10px #048bfa  ;
}


.i::after {
  width: 6px;
  left: calc(50% - 3px);
  border: 2px solid #048bfa;
  box-shadow: 70px 0 #fff  ;
}
  span i {
  color: #fff;
  letter-spacing: 0.25em;
  transition: 0.5s;
}
}
    
&::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: #27282c;
}
  

span {
  position: relative;
  z-index: 1;
}
.i {
  position: absolute;
  inset: 0;
  display: block;


  &::before {
  content: "";
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


&::after {
  content: "";
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



}

}

















  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

.app-title {
  font-family: 'Indie Flower', cursive;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #333;

}



 .cont {
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 

  
 padding: 30px;
 border: 1px solid #ccc;
 max-width: 400px;
 text-align: center;
 
 

}
 .add{
  margin-top: 50px;
 }

.next-button {
  background-color: #048bfa;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.next-button:hover {
  background-color: #45a049;
}

.next-button:focus {
  outline: none;
}

.add-person {
 
}


.add-person h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.add-person form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-person label {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.add-person-content{

}

.add-person ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.add-person li {
  font-size: 18px;
  margin-bottom: 10px;
}

</style>