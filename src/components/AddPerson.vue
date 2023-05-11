<template>
  <div class="add-person-container">
    <h2>Добавить человека</h2>
    <form @submit.prevent="addPerson">
      <label>
        // используем библиотеку  primevue
        <div class="p-inputgroup flex-">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText placeholder="Имя" v-model="newPerson.name" />
          <!-- <small id="username-help">Enter your username to reset your password.</small> -->
        </div>
      </label>
      <Button type="submit" label="Добавить" icon="pi pi-plus" class="p-mt-3 add-button" />
    </form>
    <h3>Добавленные персоны:</h3>
    <ul class="person-list">
      <li v-for="person in people" :key="person.id" class="person-item">
        <div class="avatar">
          {{ person.name[0] }}
        </div>
        <span class="person-name">{{ person.name }}</span>
        <i class="pi pi-times person-delete-icon" @click="deletePerson(person)"></i>

      </li>
    </ul>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

export default {
  components: {
    Button,
    InputText,
  },
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
    //удаление персоны
    deletePerson(person) {
      this.$emit("delete-person", person);
    },
    // добавление персоны
    addPerson() {
      if (this.newPerson.name.trim()) {
        const newPersonObject = {
          id: Date.now(),
          name: this.newPerson.name.trim(),
        };

        this.$emit("add-people", [...this.people, newPersonObject]);

        this.newPerson.name = "";
      }
    },
  },

};
</script>

<style scoped>
.add-person-container {
  padding: 20px;
  border-radius: 4px;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-group-addon {
  margin-right: 10px;
  color: #666;
}

.person-list {
  list-style-type: none;
  padding: 0;
}

.person-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f0f0;
  font-size: 16px;
  font-weight: bold;
  color: #555;
  margin-right: 10px;
}

.person-name {
  font-size: 16px;
  font-family: 'Verdana', sans-serif; /* Пример шрифта */
}

.person-delete-icon {
  font-size: 16px;
  color: #999;
  cursor: pointer;
  margin-left: auto;
}
</style>