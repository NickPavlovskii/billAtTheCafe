<template>
  <div class="add-person-container">
    <h2>Добавить человека</h2>
    <form @submit.prevent="addPerson">
      <label>
        <div class="p-inputgroup flex-">
          <span class="p-inputgroup-addon">
            <i :class="['pi pi-user', { 'input-group-user': isInputActive }]" />
          </span>

          <InputText
            placeholder="Имя"
            v-model="newPerson.name"
            @focus="isInputActive = true"
            @blur="isInputActive = false"
          />
        </div>
      </label>
      <reusable-btn
        text="Добавить"
        leftIcon="pi pi-plus"
        :disabled="!newPerson.name"
        @click="addPerson"
      />
      <div
        v-if="people.length === 0"
        class="add-someone-text"
      >
        <p>Добавим кого-нибудь!</p>
        <i class="pi pi-user-plus" />
      </div>
    </form>
    <div
      class="Added_persons"
      v-if="people.length > 0"
    >
      <h3>Добавленные персоны:</h3>
      <div class="person-list-wrapper">
        <ul class="person-list">
          <li
            v-for="person in people"
            class="person-item"
            :key="person.id"
          >
            <Avatar
              :label="person.name[0]"
              class="mr-2"
              size="large"
              style="background-color: #ece9fc; color: #2a1261"
              shape="circle"
            />

            <span class="person-name">{{ person.name }}</span>

            <i
              class="pi pi-times person-delete-icon"
              @click="deletePerson(person)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import InputText from 'primevue/inputtext'
  import Avatar from 'primevue/avatar'
  import 'primevue/resources/themes/saga-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    components: {
      InputText,
      Avatar,
    },
    data() {
      return {
        newPerson: {
          name: '',
        },
        isInputActive: false,
      }
    },
    props: {
      people: {
        type: Array,
        required: true,
      },
    },
    methods: {
      deletePerson(person) {
        this.$emit('delete-person', person)
      },
      addPerson() {
        if (this.newPerson.name.trim()) {
          const newPersonObject = {
            id: Date.now(),
            name: this.newPerson.name.trim(),
          }

          this.$emit('add-people', [...this.people, newPersonObject])

          this.newPerson.name = ''
        }
      },
    },
  }
</script>

<style scoped>
  .add-someone-text {
    position: relative;
    top: 100px;
    text-align: center;
  }

  .add-someone-text p {
    font-size: 25px;
    margin-bottom: 10px;
  }

  .add-someone-text i {
    font-size: 40px;
    color: green;
  }

  .add-person-container {
    padding: 0 20px 250px 20px;
    border-radius: 4px;
    height: 400px;
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

  .person-list-wrapper {
    position: relative;
  }
  .person-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    list-style-type: none;
    padding: 0;
    height: 190px;
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

  .person-name {
    font-size: 16px;
    margin-left: 10px;
    font-family: 'Verdana', sans-serif;
    color: #27282c;
  }
  .person-delete-icon {
    font-size: 16px;
    color: #999;
    cursor: pointer;
    margin-left: auto;
  }
</style>
