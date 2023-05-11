<template>
  <div>
    <h2>Добавление персон</h2>
    <form @submit.prevent="addPerson">
      <label>
        Имя:
        <input type="text" v-model="newPerson.name" />
      </label>
      <button type="submit">Добавить</button>
    </form>
    <h3>Добавленные персоны:</h3>
    <ul>
      <li v-for="person in people" :key="person.id">
        {{ person.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPerson: {
        name: "",
      },
    };
  },
  props: {
    people: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addPerson() {
      if (this.newPerson.name.trim()) {
        this.$emit("add-people", [
          ...this.people,
          { id: Date.now(), name: this.newPerson.name.trim() },
        ]);
        this.newPerson.name = "";
      }
    },
  },
};
</script>

