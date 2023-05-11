<template>
    <div>
      <div v-if="currentScreen === 'add-persons'" class="add-person">
        <add-persons :people="people" @add-people="addPeople" />
        <button @click="currentScreen = 'add-positions'">Далее</button>
      </div>
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
  .add-person {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  max-width: 400px;
  text-align: center;
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

.add-person input[type="text"] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
}

.add-person button[type="submit"] {
  padding: 8px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
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