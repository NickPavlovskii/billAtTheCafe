<template >
  <div class="cont">
  
    <i class="pi pi-home app-icon app-icons" @click="navigateToHome"></i>
      <i class="pi pi-cog app-icon app-icons" @click="navigateToSettings"></i>
 
     
  <my-share class="share-container"/>
    <h1  class="app-title">Cafe Bill Splitter</h1>
  
    <div v-if="currentScreen === 'add-persons'" class="add-person">
      <div class="add-person-content">
      <add-persons style="add"
        :people="people"
        @add-people="addPeople"
        @delete-person="deletePerson"
      />
      <button @click="currentScreen = 'add-positions'" class="p-mt-3 add-button addbtn btnn">
        <span>Далее<i class="pi pi-chevron-right"></i></span>
        <i class="i"></i>
      </button>
      <!-- <Button @click="currentScreen = 'add-positions'" class="p-mt-3 add-button">Далее<i class="pi pi-chevron-right"></i></Button> -->
    </div> 
  </div>
    <div v-else-if="currentScreen === 'add-positions'">
      <add-positions :people="people" :positions="positions" @add-position="addPosition" @remove-position="removePosition"  />
      <button @click="currentScreen = 'bill-result'" class="p-mt-3 add-button addbtn btnn">
        <span>Результат<i class="pi pi-chevron-right"></i></span>
        <i class="i"></i>
      </button>
      <!-- <button @click="currentScreen = 'choose-eaten'">Далее <i class="pi pi-chevron-right"></i></button> -->
    </div>
    <div v-else-if="currentScreen === 'bill-result'">
      <bill-result
        :positions="positions"
        :people="people"
        
    
      />
     
    </div>
    <div class="niklad-tag">@Niklad</div>
  </div>
</template>

<script>
// import Button from "primevue/button";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import AddPersons from "./components/AddPerson.vue";
import AddPositions from "./components/AddPosition.vue";
import BillResult from "./components/BillResult.vue";
// import BillList from "./components/BillList.vue";
import MyShare from "./components/MyShare";

export default {
  components: {
    AddPersons,
    AddPositions,
    BillResult,
    MyShare
   
  },



  data() {
    return {
      currentScreen: "add-persons",
      people: [],
      positions: [],
     
    };
  },
  methods: {
    deletePerson(person) {
  const index = this.people.findIndex(p => p.id === person.id);
  if (index !== -1) {
    this.people.splice(index, 1);
  }
},
navigateToHome() {
    // Добавьте здесь логику перехода на главный экран
    // Например, изменение значения currentScreen на 'add-persons'
    this.currentScreen = 'add-persons';
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
  margin-left: 10px;
  position: relative;
  right: 110px;
}
.app-icon-Share{
  margin-left: 10px;
  position: relative;
  left: 90px;
}

 .app-icon {

  font-size: 22px;

  cursor: pointer;
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