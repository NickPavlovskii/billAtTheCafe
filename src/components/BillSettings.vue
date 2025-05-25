<template>
  <div class="settings-wrapper">
    <div class="settings-card">
      <h2 class="settings-title">⚙️ Настройки</h2>

      <form
        @submit.prevent="applySettings"
        class="settings-form"
      >
        <div class="form-group">
          <label for="tip">Процент чаевых по умолчанию</label>
          <PrimeInputNumber
            id="tip"
            v-model="defaultTip"
            :min="0"
            :max="100"
            showButtons
            buttonLayout="horizontal"
            decrementButtonClass="outlined-button"
            incrementButtonClass="outlined-button"
          />
        </div>

        <div class="form-group">
          <label for="theme">Тема</label>
          <PrimeDropdown
            id="theme"
            v-model="theme"
            :options="themeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите тему"
            class="dropdown"
          />
        </div>

        <div class="buttons-row">
          <reusable-btn
            class="btn-success"
            text="Применить"
            rightIcon="pi pi-check"
            @click="applySettings"
          />

          <reusable-btn
            class="btn-danger"
            text="Сбросить"
            leftIcon="pi pi-trash"
            @click="resetData"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BillSettings',
    data() {
      return {
        defaultTip: 10,
        theme: 'dark',
        themeOptions: [
          { label: 'Светлая(в разработке)', value: 'light' },
          { label: 'Тёмная', value: 'dark' },
        ],
        languageOptions: [
          { label: 'Русский', value: 'ru' },
          { label: 'English', value: 'en' },
        ],
      }
    },
    methods: {
      loadSettings() {
        const storedTip = localStorage.getItem('defaultTip')
        const storedTheme = localStorage.getItem('theme')


        if (storedTip !== null) this.defaultTip = Number(storedTip)
        if (storedTheme) this.theme = storedTheme


        document.body.className =
          this.theme === 'dark' ? 'dark-theme' : 'light-theme'
      },

      applySettings() {
        localStorage.setItem('defaultTip', this.defaultTip)
        localStorage.setItem('theme', this.theme)

        this.$emit('update-default-tip', this.defaultTip)
        this.$emit('update-theme', this.theme)

        document.body.className =
          this.theme === 'dark' ? 'dark-theme' : 'light-theme'

        alert('Настройки применены.')
      },

      resetData() {
        localStorage.removeItem('defaultTip')
        localStorage.removeItem('theme')

        this.defaultTip = 10
        this.theme = 'light'


        this.applySettings()
        this.$emit('reset-all')
        alert('Все данные сброшены.')
      },
    },
    mounted() {
      this.loadSettings()
    },
  }
</script>

<style scoped>
  .settings-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    padding: 1rem;
  }

  .settings-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }
  :deep(.p-button) {
    background-color: #333;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #444;
  }

  .dropdown {
    font-size: 0.9rem;
  }

  .buttons-row {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn-danger :deep(.add-button) {
    background-color: #dc3545;
  }
  .btn-danger :deep(.button-text) {
    color: #dc3545;
  }
  
  .btn-danger :deep(.add-button .button-icon-wrapper i) {

color: #dc3545;
}
</style>
