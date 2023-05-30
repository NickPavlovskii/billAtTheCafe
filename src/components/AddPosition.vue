<template>
  <div >
    <h2 class="title">Добавление позиции</h2>

    <form @submit.prevent="addPosition" class="position-form">
      <div class="form-group">
        <div class="p-inputgroup flex-1">
          <span class="p-inputgroup-addon">  <Icon icon="fluent:food-24-filled" width="32" height="32" /> </span>
           <!-- Поле ввода названия позиции -->
          <InputText type="text" id="name" v-model="name" placeholder="Название" class="input-field" />
        </div>
      </div>
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon"><Icon icon="ph:currency-rub-bold" width="32" height="32" /></span>
        <!-- Поле ввода стоимости позиции -->
        <InputNumber id="price" v-model="price" placeholder="Стоимость" class="input-field" />
      </div>
      <div class="form-group "  >
        <div class="avatars-container">
          <!-- Аватары для выбора людей, которые ели -->
          <div class="avatar" @click="selectAllPeople" :class="{ active: allPeopleSelected }">
            Все
          </div>
          <div
            class="avatar"
            :class="{ active: person.checked }"
            v-for="(person, personIndex) in people"
            :key="personIndex"
            @click="toggleAvatarCheck(person)"
          >
            <span class="avatar-text" :class="{ 'avatar-text-active': person.checked }">{{ person.name[0] }}</span>
            <input type="checkbox" v-model="person.checked" class="avatar-checkbox" />
          </div>
        </div>
      </div>
      <div class="button-wrapper">
        <button @click="openModal" class="p-mt-3 add-button_1" >
    <span class="dob">Добавить позицию</span>
    <span class="button-icon-wrapper">
      <i class="pi pi-check"></i>
    </span>
    <i class="i"></i>
  </button>
     <!-- Модальное окно для ошибок -->
   <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-content">
      <h3 v-if="!isNameValid">Напишите название</h3>
      <h3 v-else-if="!isPriceValid">Бесплатно?</h3>
      <h3 v-else-if="!isPeopleSelected">Выберите, кто ел</h3>
      <button @click="closeModal" class="p-button ok-button">Ок</button>
    </div>
  </div>
      
      </div>
    </form>

    <h3 class="title">Список позиций:</h3>
    <ul class="position-list">
      <li v-for="(position, index) in positions" :key="index" class="position-item">

        <div class="position-info">
          <span class="position-name">{{ position.name }}</span>
          <span class="position-price">{{ position.price }} руб.</span>
          <div class="avatars-container">
            <div
              class="avatar ava"
              v-for="(person, personIndex) in position.people"
              :key="personIndex"
              :style="{ backgroundColor: getAvatarColor(personIndex) }"
              :class="{ 'avatar-active': person.checked }"
            >
              <span class="avatar-text">{{ person.name[0] }}</span>
            </div>
          </div>
        </div>
        <button @click="removePosition(index)" class="remove-button">  <!-- Кнопка удаления позиции -->
          <i class="pi pi-trash"></i>
        </button>
      </li>
    </ul>
    <!-- Промежуточный итог -->
    <div class="interim-total">
      <h3>Промежуточный итог:</h3>
      <p class="itog">
        {{ calculateTotal() }} руб. (+ {{ calculateTip() }} руб. чаевых)
      </p>
    </div>


  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber';
import InputText from "primevue/inputtext";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import { Icon } from '@iconify/vue';
export default {
  components: {
    InputText,
    InputNumber,
    Icon 
  },
  props: {
    positions: {
      type: Array,
      required: true
    },
    people: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isNameValid() {
      return this.name.trim().length > 0;
    },
    isPriceValid() {
      return this.price !== null;
    },
    isPeopleSelected() {
      return this.people.some(person => person.checked);
    },
   
    isPositionValid() {
      return (
        this.name.trim().length > 0 &&
        this.price !== null &&
        this.people.some(person => person.checked)
      );
    },
  },
  data() {
    return {
      name: "",
      price: null,
      allPeopleSelected: false,
      showModal: false,
    };
  },
  methods: {
    removePosition(index) {
    this.$emit("remove-position", index);
  },
    // openModal() {
    //   if (!this.isNameValid || !this.isPriceValid || !this.isPeopleSelected) {
    //     this.showModal = true;
    //   } else {
    //     this.addPosition();
    //   }
    // },
    closeModal() {
      this.showModal = false;
    },
    addPosition() {
  if (!this.isNameValid || !this.isPriceValid || !this.isPeopleSelected) {
    this.showModal = true;
    return; // Не выполнять добавление позиции, если не все поля заполнены
  }

  const position = {
    name: this.name,
    price: Number(this.price),
    people: this.people.filter((person) => person.checked),
  };

  this.$emit("add-position", position);

  // Сбросить значения полей ввода
  this.name = "";
  this.price = null;

  // Сбросить состояние выбора людей
  this.resetPeopleChecked();
},

  
    calculateTotal() {
      let total = 0;
      this.positions.forEach((position) => {
        total += position.price;
      });
      return total;
    },
    calculateTip() {
      const tipPercentage = 0.1; // 10% tip
      const total = this.calculateTotal();
      const tip = total * tipPercentage;
      return tip.toFixed(2); // Round to 2 decimal places
    },
    toggleAvatarCheck(person) {
      person.checked = !person.checked;
      this.updateAllPeopleSelected();
    },
    resetPeopleChecked() {
      this.people.forEach((person) => {
        person.checked = false;
      });
      this.allPeopleSelected = false;
    },
    selectAllPeople() {
      this.allPeopleSelected = !this.allPeopleSelected;
      this.people.forEach((person) => {
        person.checked = this.allPeopleSelected;
      });
    },
    updateAllPeopleSelected() {
      const selectedPeopleCount = this.people.filter((person) => person.checked).length;
      this.allPeopleSelected = selectedPeopleCount === this.people.length;
    },
    getAvatarColor(index) {
      const colors = ["#048bfa", "#ff6b6b", "#67d17e", "#f4b942", "#7c49b3"];
      return colors[index % colors.length];
    },
  },
};
</script>


<style scoped>
.ok-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

.ok-button:hover {
  background-color: #0056b3;
}

  .modal-overlay {
    z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

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
.add-button_1{
  margin-left: 15px;
}
.input-field {
  width: 100%;
}
.button-icon-wrapper{
  padding-left: 4px;
}
.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-wrapper button {

  position:relative;
  display: flex;
  background-color:#27282c;
  color: #27282c;
  letter-spacing: 0.1em;
  font-weight: 400;
  padding: 10px 20px;
  transition: 0.5s;
  border: none;
  outline: none;
  cursor: pointer;
}

.button-wrapper button:hover {
  /* background: #048bfa;
  color: #048bfa; */
  letter-spacing: 0.25em;
  /* box-shadow: 0 0 15px #048bfa; */
}

.button-wrapper button:hover .pi-plus {
  /* color: #048bfa; */
  letter-spacing: 0.25em;
  transition: 0.5s;
} 

.button-wrapper button::before {
  content: '';
  background: white;
  inset: 2px;
  position:absolute;
}

.button-wrapper button span {
  position: relative;
  z-index: 1;
}

.button-wrapper button .i {
  position: absolute;
  inset: 0;
  display: block;
}

.button-wrapper button .i::before {
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

.button-wrapper button:hover .i::before {
  width: 28px;
  left: 20%;
}

.button-wrapper button .i::after {
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

.button-wrapper button:hover .i::after {
  width: 28px;
  left: 80%;
}





.itog {
  font-size: 18px;
  margin-top: 10px;
}
.pi-cutlery{
  color: #000;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.position-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 10px;
}




.form-control {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.avatars-container {
  display: flex;
  margin-top: 10px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f2f2f2;
  cursor: pointer;
  margin-right: 8px;
  
}

.avatar.active {
  background-color: #048bfa;
  border: 2px solid white;
  color: white;
}

.avatar-text {
  font-size: 18px;
  color: #333;
}

.avatar-checkbox {
  display: none;
}

.btn {
  margin-top: 10px;
}

.position-list {
  list-style: none;
  padding-left: 0;
}

.position-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.position-info {

}

.position-name {
  font-weight: bold;
  margin-right: 8px;
}

.position-price {
  color: #888;
}

.avatar-text {
  font-size: 18px;
  color: #333;
}

.avatar-text-active {
  color: #fff;
}

.avatar-active {
  background-color: #048bfa;
  border: 2px solid white;
}
.position-info {

}

.position-name {
  font-weight: bold;
}

.position-price {
  color: #888;
  margin-left: 5px;
}

.remove-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.remove-button i {
  font-size: 1.5rem;
  color: #f00;
}
</style>
