<template >
    <div class="cont">
      <div v-if="currentScreen === 'add-persons'" class="add-person">
        <div class="add-person-content">
        <add-persons
          :people="people"
          @add-people="addPeople"
          @delete-person="deletePerson"
        />

        <button @click="currentScreen = 'add-positions'" class="next-button">Далее</button>
      </div> </div>
      <div v-else-if="currentScreen === 'add-positions'">
        <add-positions :people="people" @add-position="addPosition" />
        <button @click="currentScreen = 'choose-eaten'">Далее</button>
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
 .cont {
  background-color: #111520;
  background-image: url(./img.png); /* Путь к вашей картинке */
  background-repeat: no-repeat;
  background-position: right;
  width: 100%;
  height: 1000px;
}
 

.next-button {
  background-color: #4caf50;
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
  background-color: white;
  margin: auto;
  
  padding: 30px;
  border: 1px solid #ccc;
  max-width: 400px;
  text-align: center;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Горизонтальное смещение, вертикальное смещение, размытие, цвет тени */
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