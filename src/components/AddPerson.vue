<template>
  <div class="add-person-container add-person">
    <h2>Добавить человека</h2>
    <form @submit.prevent="addPerson">
      <label>
        <div class="p-inputgroup flex-">
          <span class="p-inputgroup-addon">
            <i :class="['pi pi-user', { 'input-group-user': isInputActive }]"></i>
          </span>
          <!-- Ввод имени человека -->
          <InputText placeholder="Имя" v-model="newPerson.name" @focus="isInputActive = true"
            @blur="isInputActive = false" />
        </div>
      </label>
      <div class="button-wrapper">
        <!-- Кнопка добавления персоны -->
        <button type="submit" class="p-mt-3 add-button_1">
          <span class="button-icon-wrapper">
            <i class="pi pi-plus"></i>
          </span>
          <span class="dob"> Добавить</span>
        </button>
      </div>
      <!-- Текст, отображаемый при отсутствии добавленных персон -->
      <div v-if="people.length === 0" class="add-someone-text">
        <p>Добавим кого-нибудь!</p>
        <i class="pi pi-user-plus"></i>
      </div>
    </form>
    <div class="Added_persons" v-if="people.length > 0">
      <h3>Добавленные персоны:</h3>
      <div class="person-list-wrapper">
        <ul class="person-list">
          <li v-for="person in people" :key="person.id" class="person-item">
            <!-- Аватар персоны с первой буквой имени -->
            <div class="avatar">{{ person.name[0] }}</div>
            <span class="person-name">{{ person.name }}</span>
            <i class="pi pi-times person-delete-icon" @click="deletePerson(person)"></i>
          </li>
        </ul>
      </div>
    </div>

  </div>
  <button @click="goToNextScreen" class="p-mt-3  addbtn result-button">
    <span class="button-text">Далее<i class="pi pi-chevron-right"></i></span>
    <i class="i"></i>
  </button>

  <Dialog v-model:visible="showModal" modal :closable="false">

    <div @click="closeModal">
      <div class="modal-content">
        <h3 v-if="people.length === 0">Но тут же никого нет 🤔 </h3>
        <h3 v-else-if="people.length === 1">Добавьте еще кого-нибудь!</h3>
        <button @click="closeModal" class="p-button">Ок</button>
      </div>
    </div>

  </Dialog>
</template>

<script>

import { mapState, mapMutations } from 'vuex';
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
export default {
  components: {
    InputText,
    Dialog,
  },
  data() {
    return {
      showModal: false,
      newPerson: {
        name: "",
      },
      isInputActive: false,
    };
  },
  methods: {
    ...mapMutations({
      mutationAddPerson: 'addPerson',
      mutationDeletePerson: 'deletePerson',
    }),

    closeModal() {
      this.showModal = false;
    },

    goToNextScreen() {
      if (this.people.length >= 2) {
        this.$router.push('/add-positions');
      } else {
        this.showModal = true;
      }
    },

    deletePerson(person) {
      const index = this.people.findIndex((p) => p.id === person.id);
      if (index !== -1) {
        this.mutationDeletePerson(person); // Call the renamed mutation
      }
    },

    addPerson() {
      if (this.newPerson.name.trim()) {
        const newPersonObject = {
          id: Date.now(),
          name: this.newPerson.name.trim(),
        };
        this.mutationAddPerson(newPersonObject); // Call the renamed mutation
        this.newPerson.name = '';
      }
    },
  },
  computed: {
    ... mapState('people') //на самом деле обучающий проект хотел использовать разные способы тут
  },
};
</script>


<style lang="scss" scoped>

//------------------------ result-button----------------
.result-button {
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


  &:hover {
    color: #fff;
    background: #048bfa;
    letter-spacing: 0.25em;
    transition: 0.5s;

    .i::before {
      width: 6px;
      left: calc(50% - 3px);
      border: 2px solid #048bfa;
      box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c, 10px -10px #048bfa;
    }


    .i::after {
      width: 6px;
      left: calc(50% - 3px);
      border: 2px solid #048bfa;
      box-shadow: 70px 0 #fff;
    }

    .button-text .pi-chevron-right {
      color: #fff;
      letter-spacing: 0.25em;
      transition: 0.5s;
    }
  }

  &::before {
    content: "";
    position: absolute;
    inset: 2px;
    background: #27282c;
  }


  .button-text {
    position: relative;
    z-index: 1;
  }

  .i {
    position: absolute;
    inset: 0;
    display: block;


    &::before {
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


    &::after {
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



  }

}

// ------------add-someone-text
.add-someone-text {
  position: relative;
  top: 100px;
  text-align: center;

  p {
    font-size: 25px;
    margin-bottom: 10px;
  }

  i {
    font-size: 40px;
    color: green;
  }
}

//------------------ button-wrapper----------
.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;

  button {
    position: relative;
    display: flex;
    background-color: #27282c;
    color: #27282c;
    letter-spacing: 0.1em;
    font-weight: 400;
    padding: 10px 20px;
    transition: 0.5s;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
      letter-spacing: 0.25em;
    }

    &:hover .pi-plus {
      letter-spacing: 0.25em;
      transition: 0.5s;
    }

    &::before {
      content: '';
      background: white;
      inset: 2px;
      position: absolute;
    }

    span {
      position: relative;
      z-index: 1;
    }

    .i {
      position: absolute;
      inset: 0;
      display: block;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 80%;
        width: 25px;
        height: 10px;
        background: white;
        transform: translateX(-50%) skewX(325deg);
        transition: 0.5s;
      }

      &:hover::before {
        width: 28px;
        left: 20%;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 20%;
        width: 25px;
        height: 6px;
        background: white;
        transform: translateX(-50%) skewX(325deg);
        transition: 0.5s;
      }

      &:hover::after {
        width: 28px;
        left: 80%;
      }
    }

    .pi-plus {
      color: #27282c;
      margin-right: 8px;
    }
  }
}

.pi-plus {
  color: rgba(255, 255, 255, 0.616);
}

.add-person-container {
  padding: 0 20px 250px 20px;
  border-radius: 4px;
  height: 400px;
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

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #27282c;
  background-color: #048bfa;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin-right: 10px;
}

.person-name {
  font-size: 16px;
  font-family: "Verdana", sans-serif;
  color: #27282c;
}

.person-delete-icon {
  font-size: 16px;
  color: #999;
  cursor: pointer;
  margin-left: auto;
}



// --------------modal---------


.modal-content {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border: 4px solid #27282c;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content button {
  margin-top: 20px;
  background: #27282c;
}

</style>
