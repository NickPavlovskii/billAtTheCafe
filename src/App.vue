<template >
    <div class="cont">
      <h1  class="app-title">Cafe Bill Splitter</h1>
      
      <div v-if="currentScreen === 'add-persons'" class="add-person">
        <div class="add-person-content">
        <add-persons style="add"
          :people="people"
          @add-people="addPeople"
          @delete-person="deletePerson"
        />

        <Button @click="currentScreen = 'add-positions'" class="p-mt-3 add-button">Далее<i class="pi pi-chevron-right"></i></Button>
      </div> </div>
      <div v-else-if="currentScreen === 'add-positions'">
        <add-positions :people="people" @add-position="addPosition" />
        <button @click="currentScreen = 'choose-eaten'">Далее <i class="pi pi-chevron-right"></i></button>
      </div>
      <div v-else-if="currentScreen === 'choose-eaten'">
        <choose-eaten
          :positions="positions"
          :people="people"
          :person="person"
          @done="currentScreen = 'list-positions'"
        />
      </div>
      <div v-else-if="currentScreen === 'list-positions'">
        <list-positions 
        :positions="positions" 
        :people="people" 
        :person="person"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Button from "primevue/button";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
  import AddPersons from "./components/AddPerson.vue";
  import AddPositions from "./components/AddPosition.vue";
  import ChooseEaten from "./components/ChooseEaten.vue";
  import ListPositions from "./components/ListPositions.vue";
  
  export default {
    components: {
      AddPersons,
      AddPositions,
      ChooseEaten,
      ListPositions,
      Button
    },
    data() {
      return {
        currentScreen: "add-persons",
        people: [],
        positions: [],
        personL: []
      };
    },
    methods: {
      deletePerson(person) {
    const index = this.people.findIndex(p => p.id === person.id);
    if (index !== -1) {
      this.people.splice(index, 1);
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

  <style>


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
  
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Горизонтальное смещение, вертикальное смещение, размытие, цвет тени */
margin-top: 50px;
  
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