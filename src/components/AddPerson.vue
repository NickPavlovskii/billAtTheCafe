<template>
  <div class="add-person-container">
    <h2>Добавить человека</h2>
    <form @submit.prevent="addPerson">
      <label>
        <div class="p-inputgroup flex-">
          <!-- Иконка пользователя с возможностью активации -->
          <span class="p-inputgroup-addon">
            <i :class="['pi pi-user', { 'input-group-user': isInputActive }]"></i>
          </span>
          <!-- Ввод имени человека -->
          <InputText placeholder="Имя" v-model="newPerson.name" @focus="isInputActive = true" @blur="isInputActive = false" />
        </div>
      </label>
      <div class="button-wrapper">
        <!-- Кнопка с иконкой плюс для добавления человека -->
        <Button type="submit" class="p-mt-3 add-button">
          <!-- Обертка для иконки плюс в виде кружка -->
          <span class="button-icon-wrapper">
            <i class="pi pi-plus"></i>
          </span>
          Добавить
        </Button>
      </div>
    </form>
    <div class="Added_persons" v-if="people.length > 0">
      <h3>Добавленные персоны:</h3>
      <ul class="person-list">
        <li v-for="person in people" :key="person.id" class="person-item">
          <!-- Аватар персоны с первой буквой имени -->
          <div class="avatar">{{ person.name[0] }}</div>
          <span class="person-name">{{ person.name }}</span>
          <!-- Иконка удаления персоны -->
          <i class="pi pi-times person-delete-icon" @click="deletePerson(person)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

export default {
  components: {
    InputText,
    Button 
  },
  data() {
    return {
      newPerson: {
        name: "",
      },
      isInputActive: false,
    };
  },
  props: {
    people: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deletePerson(person) {
      this.$emit("delete-person", person);
    },
    addPerson() {
      if (this.newPerson.name.trim()) {
        const newPersonObject = {
          id: Date.now(),
          name: this.newPerson.name.trim(),
        };

        // Добавление новой персоны и очистка поля ввода
        this.$emit("add-people", [...this.people, newPersonObject]);

        this.newPerson.name = "";
      }
    },
  },
};
</script>

<style scoped>
.pi-plus {
  color: rgba(255, 255, 255, 0.616);
}

.add-button {
  background: #27282c;
  font-size: 1.0em;
  letter-spacing: 0.1em;
  font-weight: 400;
  padding: 5px 16px;

  transition: 0.5s;
  color: rgba(255, 255, 255, 0.616);
 

  border: none;
  outline: none;
  cursor: pointer;
}

.add-button .button-icon-wrapper {
  background:white;
 
  border-radius: 50%  ;
  padding: 0.25rem;
  margin-right: 0.8rem;
}

.add-button .button-icon-wrapper i {
  color: rgb(131, 130, 130);
}

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

.input-group-user {
  color: #048bfa !important;
}

.button-wrapper {
  margin-top: 20px;
}
.person-list {
  list-style-type: none;
  padding: 0;
  height: 180px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 4px;
}

.person-list::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.person-list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #048bfa;
}

.person-list::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.person-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid #7ec7fc;
  background-color: #048bfa;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin-right: 10px;
}

.person-name {
  font-size: 16px;
  font-family: "Verdana", sans-serif;
}

.person-delete-icon {
  font-size: 16px;
  color: #999;
  cursor: pointer;
  margin-left: auto;
}
</style>
