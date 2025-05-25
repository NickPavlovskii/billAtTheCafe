<template>
  <div class="cont">
    <i
      class="pi pi-home app-icon app-icons app-icons-home"
      @click="navigateToHome"
    />
    <i
      class="pi pi-cog app-icon app-icons"
      @click="navigateToSettings"
    />

    <my-share class="share-container" />
    <h1 class="app-title">Cafe Bill Splitter</h1>

    <main-screen
      v-if="currentScreen === 'main-component'"
      @start="navigateToPersons"
    />
    <BillSettings
      v-else-if="currentScreen === 'settings'"
      @update-default-tip="updateDefaultTip"
      @update-theme="updateTheme"
      @update-language="updateLanguage"
      @reset-all="resetAllData"
    />

    <div
      v-else-if="currentScreen === 'add-persons'"
      class="add-person"
    >
      <div class="add-person-content">
        <add-persons
          style="add"
          :people="people"
          @add-people="addPeople"
          @delete-person="deletePerson"
        />
        <base-btn
          text="  Далее"
          rightIcon="./icons/arrow.svg"
          @click="goToNextScreen('add-positions')"
        />
      </div>
    </div>
    <div v-else-if="currentScreen === 'add-positions'">
      <add-positions
        :people="people"
        :positions="positions"
        :is-name-valid="isNameValid"
        :is-price-valid="isPriceValid"
        :is-people-selected="isPeopleSelected"
        :defaultTip="defaultTip"
        @add-position="addPosition"
        @remove-position="removePosition"
      />
      <button
        class="p-mt-3 add-button addbtn btnn"
        @click="openPositionModal('bill-result')"
      >
        <span>
          Результат
          <i class="pi pi-chevron-right"></i>
        </span>
        <i class="i"></i>
      </button>
    </div>
    <div v-else-if="currentScreen === 'bill-result'">
      <bill-result
        :positions="positions"
        :people="people"
        :defaultTip="defaultTip"
      />
    </div>
    <div class="niklad-tag">@Niklad</div>
    <!-- People Modal Modal -->
    <Dialog
      header="Ошибка"
      v-model:visible="showModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal-content">
        <h3 v-if="people.length === 0">Но тут же никого нет 🤔</h3>
        <h3 v-else-if="people.length === 1">Добавьте еще кого-нибудь!</h3>
      </div>
      <template #footer>
        <button
          @click="showModal = false"
          class="p-button"
          style="margin-top: 20px"
        >
          Ок
        </button>
      </template>
    </Dialog>
    <!-- Position Modal -->
    <Dialog
      v-model:visible="showPositionModal"
      header="Ошибка"
      class="modal-overlay"
      @click="closePositionModal"
    >
      <div class="modal-content">
        <h3>Должно быть добавлено как минимум 2 позиции</h3>
      </div>
      <template #footer>
        <button
          class="p-button"
          @click="showPositionModal = false"
        >
          Ок
        </button>
      </template>
    </Dialog>
  </div>
</template>

<script>
  import 'primevue/resources/themes/saga-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'
  import Dialog from 'primevue/dialog'
  import AddPersons from './components/AddPerson.vue'
  import AddPositions from './components/AddPosition.vue'
  import BillResult from './components/BillResult.vue'
  import MainScreen from './components/MainScreen.vue'
  import MyShare from './components/MyShare'
  import BillSettings from './components/BillSettings.vue'

  export default {
    components: {
      MainScreen,
      Dialog,
      AddPersons,
      AddPositions,
      BillResult,
      MyShare,
      BillSettings,
    },

    props: {
      isNameValid: Boolean,
      isPriceValid: Boolean,
      isPeopleSelected: Boolean,
    },
    data() {
      return {
        currentScreen: 'main-component',
        people: [],
        positions: [],
        showModal: false,
        showPositionModal: false,
        showModalMain: false,
        showSettings: false,
        defaultTip: 10, // глобальные настройки
        theme: 'light',
        language: 'ru',
      }
    },

    methods: {
      navigateToPersons() {
        this.currentScreen = 'add-persons'
      },
      navigateToSettings() {
        this.currentScreen = 'settings'
      },

      showInstructions() {
        this.showModalMain = true
      },
      closeModal() {
        this.showModalMain = false
      },

      openPositionModal(nextScreen) {
        if (this.positions.length < 2) {
          this.showPositionModal = true
        } else {
          this.currentScreen = nextScreen
        }
      },
      closePositionModal() {
        this.showPositionModal = false
      },

      goToNextScreen(nextScreen) {
        if (this.people.length >= 2) {
          this.currentScreen = nextScreen
        } else {
          this.showModal = true
        }
      },

      deletePerson(person) {
        const index = this.people.findIndex((p) => p.id === person.id)
        if (index !== -1) {
          this.people.splice(index, 1)
        }
      },
      updateDefaultTip(newTip) {
        this.defaultTip = newTip
        console.log('Новый процент чаевых:', newTip)
      },
      updateTheme(newTheme) {
        this.theme = newTheme
        // Применение темы, если не сделано в BillSettings
        document.body.className =
          newTheme === 'dark' ? 'dark-theme' : 'light-theme'
      },
      updateLanguage(newLang) {
        this.language = newLang
        // Если используется система i18n — обновляем локализацию
      },
      resetAllData() {
        // Здесь можно сбросить все данные приложения – people, positions, настройки и пр.
        this.people = []
        this.positions = []
        this.defaultTip = 10
        this.theme = 'light'
        this.language = 'ru'
        // Возвращаемся на главный экран
        this.currentScreen = 'main-component'
      },
      navigateToHome() {
        this.currentScreen = 'main-component'
      },
      removePosition(position) {
        this.positions.splice(position, 1)
      },
      addPeople(newPeople) {
        this.people = newPeople
      },
      addPosition(newPosition) {
        this.positions.push(newPosition)
      },
      showPositionsScreen() {
        this.currentScreen = 'listPositions'
      },
      showResultsScreen() {
        this.currentScreen = 'results'
      },
      calculatePersonCost(person) {
        let totalCost = 0
        for (let position of this.positions) {
          if (position.peopleEaten.includes(person)) {
            totalCost += position.cost / position.peopleEaten.length
          }
        }
        return totalCost
      },
      resetAll() {
        this.people = []
        this.positions = []
        this.currentScreen = 'main-component'
      },
    },
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

  .cont {
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 30px;
    border: 1px solid #ccc;
    max-width: 400px;
    text-align: center;
  }

  .app-title {
    font-family: 'Indie Flower', cursive;
    font-size: 32px;
    font-weight: 700;
    color: #333;
  }

  .app-icon {
    font-size: 22px;
    cursor: pointer;
    position: relative;
    bottom: 5px;
    transition: color 0.3s;
  }

  .app-icon:hover {
    color: #048bfa;
  }

  .app-icons {
    margin-left: 12px;
    right: 130px;
    margin-top: 12px;
  }

  .app-icons-home {
    font-size: 1.5em;
  }

  /* === Кнопки === */
  button,
  .btnn {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.5s;
  }

  button:hover,
  .btnn:hover {
    background-color: #048bfa;
  }

  /* Кнопка-инструкция */
  .instruction-button {
    background-color: #048bfa;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .instruction-button:hover {
    background-color: #026bb5;
  }

  /* === Нижний тег авторства === */
  .niklad-tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 14px;
  }
  .share-container {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .btnn {
    margin-top: 30px;
    background: #444;
    font-weight: 400;
    letter-spacing: 0.1em;
    position: relative;
    overflow: hidden;
  }

  .btnn::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: #27282c;
  }

  .btnn span {
    position: relative;
    z-index: 1;
  }

  .btnn .i {
    position: absolute;
    inset: 0;
  }

  .btnn .i::before,
  .btnn .i::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 6px;
    background: #27282c;
    border: 2px solid #048bfa;
    transform: translateX(-50%);
    transition: 0.5s, box-shadow 0.5s;
  }

  .btnn .i::before {
    top: -3.5px;
    left: 80%;
  }

  .btnn .i::after {
    bottom: -3.5px;
    left: 20%;
  }

  .btnn:hover .i::before {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow: 70px 0 #fff, -70px 0 #048bfa, -70px 0 0 4px #27282c,
      10px -10px #048bfa;
  }

  .btnn:hover .i::after {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow: 70px 0 #fff;
  }

  .add-person {
    margin-top: 50px;
  }

  .add-person h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .add-person form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .add-person label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .add-person-content {
  }

  .add-person ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }

  .add-person li {
    font-size: 18px;
    margin-bottom: 10px;
  }

  /* === Кнопка "Next" === */
  .next-button {
    background-color: #048bfa;
    border-radius: 4px;
    text-align: center;
  }

  .next-button:hover {
    background-color: #45a049;
  }

  /* === Блок с кнопками === */
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 60px;
    flex-wrap: wrap;
  }
  /* Модальное окно */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  /* 
  .modal-content {
    background: white;
    padding: 25px 30px;
    border-radius: 8px;
    max-width: 350px;
    text-align: left;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .modal-content h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    margin-bottom: 15px;
  }

  .modal-content ol {
    padding-left: 20px;
    margin-bottom: 20px;
  }

  .close-btn {
    background: #048bfa;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
  }

  .close-btn:hover {
    background: #026bb5;
  } */

  /* === Медиа-запросы === */
  @media (max-width: 480px) {
    .app-title {
      font-size: 24px;
    }

    .btn,
    .btnn {
      font-size: 14px;
      padding: 10px 16px;
    }

    .cont {
      padding: 20px;
      width: 90%;
    }

    .instruction-button {
      font-size: 18px;
      padding: 10px;
    }
  }
</style>
