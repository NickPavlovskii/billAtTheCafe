<template>
  <div>
    <h2>Добавление позиции</h2>
    <input type="checkbox" v-model="peopleEaten" :value="person" />
    
    <form @submit.prevent="addPosition">
      <div>
        <label for="name">Название:</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div>
        <label for="price">Стоимость:</label>
        <input type="number" id="price" v-model="price" />
      </div>
      <div>
        <label for="people">Кто ел или пил:</label>
        <div v-for="person in people" :key="person.id">
        
        </div>
      </div>
      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    people: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      price: null,
      peopleEaten: [],
    };
  },
  methods: {
    addPosition() {
      const position = {
        name: this.name,
        price: Number(this.price),
        peopleEaten: this.peopleEaten,
      };
      this.$emit("add-position", position);
      this.name = "";
      this.price = null;
      this.peopleEaten = [];
    },
  },
};
</script>
