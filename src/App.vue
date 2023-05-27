<template>
  <div class="cont">
    <i class="pi pi-home app-icon app-icons app-icons-home" @click="navigateToHome"></i>
    <i class="pi pi-cog app-icon app-icons" @click="navigateToSettings"></i>

    <my-share class="share-container" />
    <h1 class="app-title">Cafe Bill Splitter</h1>
    <div v-if="currentScreen === 'main-component'" style="height: 300px; z-index: 2;">
      <h1>Добро пожаловать в Cafe Bill Splitter</h1>
      <div class="btns">
      <button @click="navigateToPersons" style="z-index: 5;">Начать</button>
    <button class="instruction-button" @click="showInstructions"><Icon style="color: yellow; font-weight: bold; " icon="fluent-mdl2:hint-text" /></button>
  </div>
    <div v-if="showModalMain" class="modal">
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
    
    <img src="cofe.png" class="background-image" />
    </div>

    <div v-else-if="currentScreen === 'add-persons'" class="add-person">
      <div class="add-person-content">
        <add-persons style="add"
          :people="people"
          @add-people="addPeople"
          @delete-person="deletePerson"
        />
        <button @click="goToNextScreen('add-positions')" class="p-mt-3 add-button addbtn btnn">
          <span>Далее<i class="pi pi-chevron-right"></i></span>
          <i class="i"></i>
        </button>
      </div>
    </div>
    <div v-else-if="currentScreen === 'add-positions'">
      <add-positions
  :people="people"
  :positions="positions"
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
    <div v-else-if="currentScreen === 'bill-result'">
      <bill-result :positions="positions" :people="people" />
    </div>
    <div class="niklad-tag">@Niklad</div>
   <!-- People Modal Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content">
        <h3 v-if="people.length === 0">Но тут же никого нет 🤔 </h3>
        <h3 v-else-if="people.length === 1">Добавьте еще кого-нибудь!</h3>
        <button @click="showModal = false" class="p-button">Ок</button>
      </div>
    </div>
     <!-- Position Modal -->
     <div v-if="showPositionModal" class="modal-overlay" @click="closePositionModal">
      <div class="modal-content">
        <h3>Должно быть добавлено как минимум 2 позиции</h3>
        <button @click=" showPositionModal = false" class="p-button">Ок</button>
      </div>
    </div>
  </div>
</template>

<script>
// import Button from "primevue/button";
import { Icon } from '@iconify/vue';
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import AddPersons from "./components/AddPerson.vue";
import AddPositions from "./components/AddPosition.vue";
import BillResult from "./components/BillResult.vue";
// import BillList from "./components/BillList.vue";
import MyShare from "./components/MyShare";
// import  MainComponent from "./components/MainComponent";
export default {
  components: {
    Icon,
    AddPersons,
    AddPositions,
    BillResult,
    MyShare,
    // MainComponent

  },

  props: {
    isNameValid: Boolean,
    isPriceValid: Boolean,
    isPeopleSelected: Boolean,
  },

  data() {
    return {
      currentScreen: "main-component",
      people: [],
      positions: [],
      showModal: false,
      showPositionModal: false,
      showModalMain: false,
     
    };
  },

  methods: {
    navigateToPersons() {
    this.currentScreen = 'add-persons';
  },

    showInstructions() {
      this.showModalMain = true;
    },
    closeModal() {
      this.showModalMain = false;
    },
 
    openPositionModal(nextScreen) {
      if (this.positions.length < 2) {
        this.showPositionModal = true;
      } else {
        this.currentScreen = nextScreen;
      }
    },
    closePositionModal() {
      this.showPositionModal = false;
    },
    
    goToNextScreen(nextScreen) {
      if (this.people.length >= 2) {
        this.currentScreen = nextScreen;
      } else {
        this.showModal = true;
      }
    },


    deletePerson(person) {
  const index = this.people.findIndex(p => p.id === person.id);
  if (index !== -1) {
    this.people.splice(index, 1);
  }
},
navigateToHome() {
    // Добавьте здесь логику перехода на главный экран
    // Например, изменение значения currentScreen на 'add-persons'
    this.currentScreen = 'main-component';
  },
  removePosition(position) {
    const index = this.positions.findIndex(p => p.id === position.id);
    if (index !== -1) {
      this.positions.splice(index, 1);
    }
  },
    addPeople(newPeople) {
      this.people = newPeople;
    },
    addPosition(newPosition) {
    this.positions.push(newPosition);
  },
    showPositionsScreen() {
    this.currentScreen = "listPositions";
  },
  showResultsScreen() {
    this.currentScreen = "results";
  },
  calculatePersonCost(person) {
    let totalCost = 0;
    for (let position of this.positions) {
      if (position.peopleEaten.includes(person)) {
        totalCost += position.cost / position.peopleEaten.length;
      }
    }
    return totalCost;
  },
  },
};
</script>


  <style scoped>

  .background-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 200px;
  z-index: -1;
}
 .btns{
  margin-top: 120px;
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
  
.pi-plus {
  color: rgba(255, 255, 255, 0.5);
}
.app-icons{
  margin-left: 12px;
  position: relative;
  right: 130px;
  margin-top: 12px;
 
}
.app-icon-Share{
  margin-left: 10px;
  position: relative;
  left: 90px;
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
}

.btnn:hover {
  color: #fff;
  background: #048bfa;
  letter-spacing: 0.25em;
  transition: 0.5s;
}

.btnn:hover span i {
  color: #fff;
  letter-spacing: 0.25em;
  transition: 0.5s;
}

.btnn::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: #27282c;
}

.btnn span {
  position: relative;
  z-index: 1;
}

.btnn .i {
  position: absolute;
  inset: 0;
  display: block;
}

.btnn .i::before {
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

.btnn:hover .i::before {
  width: 6px;
  left: calc(50% - 3px);
  border: 2px solid #048bfa;
  box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c, 10px -10px #048bfa  ;
}
.btnn .i::after {
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


.btnn:hover .i::after {
  width: 6px;
  left: calc(50% - 3px);
  border: 2px solid #048bfa;
  box-shadow: 70px 0 #fff  ;
}

  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

.app-title {
  font-family: 'Indie Flower', cursive;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #333;
  /* Дополнительные стили, если необходимо */
}



 .cont {
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Горизонтальное смещение, вертикальное смещение, размытие, цвет тени */

  
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