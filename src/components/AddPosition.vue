<template>
  <div>
    <h2 class="title">Добавление позиции</h2>
    <AddPositionForm
      :people="people"
      @add-position="handleAddPosition"
    />
    <PositionList
      :positions="positions"
      @remove-position="removePosition"
    />
    <InterimTotal
      :positions="positions"
      :defaultTip="defaultTip"
    />
  </div>
</template>

<script>
  import 'primevue/resources/themes/saga-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'
  import AddPositionForm from './AddPosition/AddPositionForm.vue'
  import PositionList from './AddPosition/PositionList.vue'
  import InterimTotal from './AddPosition/InterimTotal.vue'

  export default {
    components: {
      AddPositionForm,
      PositionList,
      InterimTotal,
    },
    props: {
      positions: {
        type: Array,
        required: true,
      },
      people: {
        type: Array,
        required: true,
      },
      defaultTip: {
        type: Number,
        required: true,
      },
    },
    methods: {
      isNameValid() {
        return this.name.trim().length > 0
      },
      isPriceValid() {
        return this.price !== null
      },
      isPeopleSelected() {
        return this.people.some((person) => person.checked)
      },
      handleAddPosition(position) {
        this.$emit('add-position', position)
      },
      removePosition(position) {
        this.$emit('remove-position', position)
      },
      closeModal() {
        this.showModal = false
      },
      addPosition() {
        if (!this.isNameValid || !this.isPriceValid || !this.isPeopleSelected) {
          this.showModal = true
          return
        }

        const position = {
          name: this.name,
          price: Number(this.price),
          people: this.people.filter((person) => person.checked),
        }

        this.$emit('add-position', position)

        // Сбросить значения полей ввода
        this.name = ''
        this.price = null

        // Сбросить состояние выбора людей
        this.resetPeopleChecked()
      },

      calculateTotal() {
        let total = 0
        this.positions.forEach((position) => {
          total += position.price
        })
        return total
      },
      calculateTip() {
        const tipPercentage = 0.1 // 10% tip
        const total = this.calculateTotal()
        const tip = total * tipPercentage
        return tip.toFixed(2) // Round to 2 decimal places
      },
      toggleAvatarCheck(person) {
        person.checked = !person.checked
        this.updateAllPeopleSelected()
      },
      resetPeopleChecked() {
        this.people.forEach((person) => {
          person.checked = false
        })
        this.allPeopleSelected = false
      },
      selectAllPeople() {
        this.allPeopleSelected = !this.allPeopleSelected
        this.people.forEach((person) => {
          person.checked = this.allPeopleSelected
        })
      },
      updateAllPeopleSelected() {
        const selectedPeopleCount = this.people.filter(
          (person) => person.checked
        ).length
        this.allPeopleSelected = selectedPeopleCount === this.people.length
      },
      getAvatarColor(index) {
        const colors = ['#048bfa', '#ff6b6b', '#67d17e', '#f4b942', '#7c49b3']
        return colors[index % colors.length]
      },
    },
  }
</script>

<style>
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
  .add-button_1 {
    margin-left: 15px;
  }
  .input-field {
    width: 100%;
  }
  .button-icon-wrapper {
    padding-left: 4px;
  }
  .itog {
    font-size: 18px;
    margin-top: 10px;
  }
  .pi-cutlery {
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
    font-size: 1.3rem;
    color: black;
  }
</style>
