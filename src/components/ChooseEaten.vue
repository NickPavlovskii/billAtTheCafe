<template>
    <div>
      <div v-for="(position, index) in positions" :key="index">
        <h3>{{ position.name }} ({{ position.price }} руб.)</h3>
        <div v-for="(person, personIndex) in people" :key="personIndex">
          <label>
            <input type="checkbox" v-model="position.peopleEaten" :value="person" />
            {{ person.name }}
          </label>
        </div>
      </div>
      <button @click="done">Готово</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
    
      positions: {
        type: Array,
        required: true,
      },
      people: {
        type: Array,
        required: true,
      },
     
    },
    methods: {
      done() {
        this.$emit("done");
      },
    },
  };
  </script>
  
  
  