<template>
  <form
    class="position-form"
    @submit.prevent="onAdd"
  >
    <div class="form-group">
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <Icon
            icon="fluent:food-24-filled"
            width="32"
            height="32"
          />
        </span>
        <InputText
          type="text"
          v-model="name"
          placeholder="Название"
          class="input-field"
        />
      </div>
    </div>

    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <Icon
          icon="ph:currency-rub-bold"
          width="32"
          height="32"
        />
      </span>
      <InputNumber
        v-model="price"
        placeholder="Стоимость"
        class="input-field"
      />
    </div>

    <div class="form-group">
      <div class="avatars-container">
        <Avatar
          label="Все"
          class="avatar ava"
          size="small"
          shape="circle"
          :class="{ active: allSelected }"
          @click="toggleSelectAll"
        />
        <div
          v-for="(person, i) in people"
          :key="i"
          class="avatar-wrapper"
        >
          <Avatar
            :label="person.name[0]"
            class="avatar ava"
            size="small"
            shape="circle"
            :class="{ active: person.checked }"
            @click="togglePerson(person)"
          />
          <input
            type="checkbox"
            v-model="person.checked"
            class="avatar-checkbox"
          />
        </div>
      </div>
    </div>

    <reusable-btn
      text="Добавить позицию"
      rightIcon="pi pi-check"
      @click="onAdd"
    />

    <div
      v-if="showModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal-content">
        <h3 v-if="!isNameValid">Напишите название</h3>
        <h3 v-else-if="!isPriceValid">Бесплатно?</h3>
        <h3 v-else-if="!isPeopleSelected">Выберите, кто ел</h3>
        <button
          @click="closeModal"
          class="ok-button"
        >
          Ок
        </button>
      </div>
    </div>
  </form>
</template>

<script>
  import InputNumber from 'primevue/inputnumber'
  import InputText from 'primevue/inputtext'
  import Avatar from 'primevue/avatar'
  import { Icon } from '@iconify/vue'
  import 'primevue/resources/themes/saga-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    name: 'AddPositionForm',
    components: {
      InputText,
      InputNumber,
      Avatar,
      Icon,
    },
    props: {
      people: Array,
    },
    emits: ['add-position'],
    data() {
      return {
        name: '',
        price: null,
        showModal: false,
        allSelected: false,
      }
    },
    computed: {
      isNameValid() {
        return this.name.trim().length > 0
      },
      isPriceValid() {
        return this.price !== null
      },
      isPeopleSelected() {
        return this.people.some((p) => p.checked)
      },
    },
    methods: {
      onAdd() {
        if (!this.isNameValid || !this.isPriceValid || !this.isPeopleSelected) {
          this.showModal = true
          return
        }

        const position = {
          name: this.name,
          price: Number(this.price),
          people: this.people.filter((p) => p.checked),
        }

        this.$emit('add-position', position)
        this.name = ''
        this.price = null
        this.people.forEach((p) => (p.checked = false))
        this.allSelected = false
      },
      togglePerson(person) {
        person.checked = !person.checked
        this.updateAllSelected()
      },
      toggleSelectAll() {
        this.allSelected = !this.allSelected
        this.people.forEach((p) => (p.checked = this.allSelected))
      },
      updateAllSelected() {
        this.allSelected = this.people.every((p) => p.checked)
      },
      closeModal() {
        this.showModal = false
      },
    },
  }
</script>

<style scoped>
  .position-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .form-group {
    margin-bottom: 10px;
  }
</style>
