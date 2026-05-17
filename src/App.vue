<template>
  <div class="app-shell">
    <div
      class="cont"
      :class="{ 'has-wizard': showStepIndicator }"
    >
      <header class="top-bar">
        <icon-button
          icon="mdi:home"
          aria-label="На главную"
          class="nav-icon-btn"
          @click="navigateToHome"
        />
        <h1 class="app-title">
          <Icon icon="mdi:coffee" class="title-icon" />
          Cafe Bill Splitter
        </h1>
        <div class="top-bar-right">
          <icon-button
            icon="mdi:history"
            aria-label="История"
            class="nav-icon-btn"
            @click="navigateTo('history')"
          />
          <my-share />
          <icon-button
            icon="mdi:cog"
            aria-label="Настройки"
            class="nav-icon-btn"
            @click="navigateToSettings"
          />
        </div>
      </header>

      <transition name="step-bar">
        <div
          v-if="showStepIndicator"
          class="step-indicator"
        >
          <div
            v-for="(step, i) in steps"
            :key="i"
            :class="['step-item', { active: step.screen === currentScreen, done: isStepDone(i) }]"
          >
            <div class="step-dot">
              <Icon
                v-if="isStepDone(i)"
                icon="mdi:check"
                class="step-check"
              />
              <Icon
                v-else-if="step.icon && step.screen === currentScreen"
                :icon="step.icon"
                class="step-icon"
              />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="step-label">{{ step.label }}</span>
          </div>
        </div>
      </transition>

      <div
        v-if="showStepIndicator"
        class="progress-track"
      >
        <div
          class="progress-fill"
          :style="{ width: progressWidth }"
        />
      </div>

      <main class="screen-content">
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <main-screen
            v-if="currentScreen === 'main-component'"
            key="main"
            :has-draft="hasDraft"
            :recent-sessions="recentSessions"
            @start="navigateToPersons"
            @continue-draft="continueDraft"
            @start-fresh="startFresh"
            @open-history="navigateTo('history')"
            @restore-session="restoreSession"
          />

          <div
            v-else-if="currentScreen === 'settings'"
            key="settings"
            class="screen-wrapper settings-screen"
          >
            <BillSettings
              @update-default-tip="updateDefaultTip"
              @update-theme="updateTheme"
              @update-language="updateLanguage"
              @update-currency="updateCurrency"
              @update-rounding="updateRounding"
              @reset-all="resetAllData"
              @open-history="openHistoryFromSettings"
            />
            <div class="bottom-action">
              <back-btn @click="goBack" />
            </div>
          </div>

          <div
            v-else-if="currentScreen === 'history'"
            key="history"
            class="screen-wrapper history-screen"
          >
            <bill-history @restore="restoreSession" />
            <div class="bottom-action">
              <back-btn @click="goBack" />
            </div>
          </div>

          <div
            v-else-if="currentScreen === 'add-persons'"
            key="persons"
            class="screen-wrapper wizard-flow"
          >
            <div class="wizard-stage">
              <div class="wizard-panel">
                <add-persons
                  :people="people"
                  @add-people="addPeople"
                  @delete-person="deletePerson"
                />
              </div>
            </div>
            <div class="bottom-action wizard-footer">
              <base-btn
                text="Далее"
                rightIcon="./icons/arrow.svg"
                @click="goToNextScreen('add-positions')"
              />
            </div>
          </div>

          <div
            v-else-if="currentScreen === 'add-positions'"
            key="positions"
            class="screen-wrapper wizard-flow"
          >
            <div class="wizard-stage">
              <div class="wizard-panel">
                <add-positions
                  :people="people"
                  :positions="positions"
                  :default-tip="defaultTip"
                  :currency="currency"
                  @add-position="addPosition"
                  @remove-position="removePosition"
                />
              </div>
            </div>
            <div class="bottom-action wizard-footer">
              <back-btn @click="goBack" />
              <base-btn
                text="Результат"
                rightIcon="./icons/arrow.svg"
                @click="openPositionModal('bill-result')"
              />
            </div>
          </div>

          <div
            v-else-if="currentScreen === 'bill-result'"
            key="result"
            class="screen-wrapper wizard-flow"
          >
            <div class="wizard-stage">
              <div class="wizard-panel">
                <bill-result
                  :positions="positions"
                  :people="people"
                  :default-tip="defaultTip"
                  :currency="currency"
                  :rounding="rounding"
                  @save-history="saveToHistory"
                />
              </div>
            </div>
            <div class="bottom-action wizard-footer">
              <back-btn @click="handleResultBack" />
            </div>
          </div>
        </transition>
      </main>

      <div class="niklad-tag">@Niklad</div>
    </div>

    <transition name="modal-slide">
      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="showModal = false"
      >
        <div class="modal-sheet">
          <div class="sheet-handle" />
          <div class="modal-emoji">
            <Icon
              :icon="peopleModalIcon"
              class="modal-emoji-icon"
            />
          </div>
          <h3>{{ peopleModalTitle }}</h3>
          <p>{{ peopleModalText }}</p>
          <base-btn
            text="Понятно"
            @click="showModal = false"
          />
        </div>
      </div>
    </transition>

    <transition name="modal-slide">
      <div
        v-if="showPositionModal"
        class="modal-overlay"
        @click.self="showPositionModal = false"
      >
        <div class="modal-sheet">
          <div class="sheet-handle" />
          <div class="modal-emoji">
            <Icon
              icon="mdi:silverware-fork-knife"
              class="modal-emoji-icon"
            />
          </div>
          <h3>Мало позиций</h3>
          <p>Добавьте минимум 2 позиции, чтобы рассчитать счёт</p>
          <base-btn
            text="Ок, добавлю"
            @click="showPositionModal = false"
          />
        </div>
      </div>
    </transition>

    <Teleport to="body">
      <transition name="modal-slide">
        <div
          v-if="showSettingsModal"
          class="settings-overlay"
          @click.self="closeSettings"
        >
          <div
            class="settings-panel"
            @click.stop
          >
            <BillSettings
              show-close
              @update-default-tip="updateDefaultTip"
              @update-theme="updateTheme"
              @update-language="updateLanguage"
              @update-currency="updateCurrency"
              @update-rounding="updateRounding"
              @reset-all="resetAllData"
              @open-history="openHistoryFromSettings"
              @close="closeSettings"
            />
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script>
import AddPersons from './components/AddPerson.vue'
import AddPositions from './components/AddPosition.vue'
import BillResult from './components/BillResult.vue'
import MainScreen from './components/MainScreen.vue'
import MyShare from './components/MyShare'
import BillSettings from './components/BillSettings.vue'
import BillHistory from './components/BillHistory.vue'
import IconButton from './components/global/IconButton.vue'
import { Icon } from '@iconify/vue'
import { billResultStore } from './store/billResult.js'
import {
  loadHistory,
  saveHistoryEntry,
  loadDraft,
  saveDraft,
  clearDraft,
} from './utils/billStorage.js'

export default {
  components: {
    MainScreen,
    AddPersons,
    AddPositions,
    BillResult,
    MyShare,
    BillSettings,
    BillHistory,
    IconButton,
    Icon,
  },

  data() {
    return {
      currentScreen: 'main-component',
      screenHistory: [],
      people: [],
      positions: [],
      showModal: false,
      showPositionModal: false,
      showSettingsModal: false,
      defaultTip: 10,
      theme: 'light',
      currency: '₽',
      language: 'ru',
      rounding: 'none',
      isDesktop: false,
      recentSessions: [],
      steps: [
        { label: 'Участники', icon: 'mdi:account-group', screen: 'add-persons' },
        { label: 'Позиции', icon: 'mdi:silverware-fork-knife', screen: 'add-positions' },
        { label: 'Итог', icon: 'mdi:chart-bar', screen: 'bill-result' },
      ],
    }
  },

  mounted() {
    const savedTheme = localStorage.getItem('theme')
    const savedCurrency = localStorage.getItem('currency')
    const savedRounding = localStorage.getItem('rounding')
    const savedTip = localStorage.getItem('defaultTip')
    if (savedTheme) {
      this.theme = savedTheme
      this.updateTheme(savedTheme)
    }
    if (savedCurrency) this.currency = savedCurrency
    if (savedRounding) this.rounding = savedRounding
    if (savedTip != null) this.defaultTip = Number(savedTip)
    this.refreshRecentSessions()
    this.checkDesktop()
    window.addEventListener('resize', this.checkDesktop)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkDesktop)
  },

  watch: {
    people: { handler() { this.persistDraft() }, deep: true },
    positions: { handler() { this.persistDraft() }, deep: true },
    defaultTip() { this.persistDraft() },
    currency() { this.persistDraft() },
  },

  computed: {
    hasDraft() {
      const d = loadDraft()
      return !!(d && (d.people?.length || d.positions?.length))
    },
    showStepIndicator() {
      return ['add-persons', 'add-positions', 'bill-result'].includes(this.currentScreen)
    },
    progressWidth() {
      const order = ['add-persons', 'add-positions', 'bill-result']
      return `${((order.indexOf(this.currentScreen) + 1) / order.length) * 100}%`
    },
    peopleModalIcon() {
      return this.people.length === 0 ? 'mdi:account-group' : 'mdi:plus'
    },
    peopleModalTitle() {
      return this.people.length === 0 ? 'Пока никого нет!' : 'Нужен ещё один!'
    },
    peopleModalText() {
      return this.people.length === 0
        ? 'Добавьте хотя бы двух участников, чтобы продолжить'
        : 'Добавьте ещё одного участника для расчёта'
    },
  },

  methods: {
    checkDesktop() {
      this.isDesktop = window.innerWidth >= 768
    },
    refreshRecentSessions() {
      this.recentSessions = loadHistory().slice(0, 5)
    },
    persistDraft() {
      if (this.currentScreen === 'main-component') return
      saveDraft({
        people: this.people,
        positions: this.positions,
        defaultTip: this.defaultTip,
        currency: this.currency,
        currentScreen: this.currentScreen,
      })
    },
    isStepDone(i) {
      const order = ['add-persons', 'add-positions', 'bill-result']
      return order.indexOf(this.currentScreen) > i
    },
    navigateTo(screen) {
      this.screenHistory.push(this.currentScreen)
      this.currentScreen = screen
      if (screen === 'history') this.refreshRecentSessions()
    },
    goBack() {
      this.currentScreen =
        this.screenHistory.length > 0 ? this.screenHistory.pop() : 'main-component'
      if (this.currentScreen === 'main-component') this.refreshRecentSessions()
    },
    handleResultBack() {
      if (!billResultStore.requestBack()) return
      this.goBack()
    },
    navigateToPersons() {
      this.navigateTo('add-persons')
    },
    navigateToSettings() {
      if (this.isDesktop) {
        this.showSettingsModal = true
      } else {
        this.navigateTo('settings')
      }
    },
    closeSettings() {
      this.showSettingsModal = false
    },
    openHistoryFromSettings() {
      this.closeSettings()
      this.navigateTo('history')
    },
    navigateToHome() {
      this.screenHistory = []
      this.currentScreen = 'main-component'
      this.refreshRecentSessions()
    },
    continueDraft() {
      const draft = loadDraft()
      if (!draft) return
      this.people = draft.people || []
      this.positions = draft.positions || []
      this.defaultTip = draft.defaultTip ?? this.defaultTip
      this.currency = draft.currency || this.currency
      const screen = draft.currentScreen || 'add-persons'
      this.screenHistory = []
      this.currentScreen = ['add-persons', 'add-positions', 'bill-result'].includes(screen)
        ? screen
        : 'add-persons'
    },
    startFresh() {
      clearDraft()
      this.people = []
      this.positions = []
      this.screenHistory = []
      this.navigateTo('add-persons')
    },
    goToNextScreen(next) {
      this.people.length >= 2 ? this.navigateTo(next) : (this.showModal = true)
    },
    openPositionModal(next) {
      this.positions.length >= 2 ? this.navigateTo(next) : (this.showPositionModal = true)
    },
    deletePerson(person) {
      const i = this.people.findIndex(p => p.id === person.id)
      if (i !== -1) this.people.splice(i, 1)
    },
    addPeople(list) {
      this.people = list
    },
    addPosition(pos) {
      this.positions.push(pos)
    },
    removePosition(idx) {
      this.positions.splice(idx, 1)
    },
    updateDefaultTip(tip) {
      this.defaultTip = tip
    },
    updateLanguage(lang) {
      this.language = lang
    },
    updateCurrency(c) {
      this.currency = c
    },
    updateRounding(r) {
      this.rounding = r
    },
    updateTheme(t) {
      this.theme = t
      if (t === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.body.className = prefersDark ? 'dark-theme' : 'light-theme'
      } else {
        document.body.className = t === 'dark' ? 'dark-theme' : 'light-theme'
      }
    },
    saveToHistory() {
      try {
        const sum = this.positions.reduce((s, p) => s + p.price, 0)
        const totalWithTips = sum * (1 + this.defaultTip / 100)
        const entry = {
          id: Date.now(),
          date: new Date().toISOString(),
          people: this.people,
          positions: this.positions,
          defaultTip: this.defaultTip,
          currency: this.currency,
          totalWithTips,
        }
        saveHistoryEntry(entry)
        clearDraft()
        this.refreshRecentSessions()
      } catch (_) {
        void 0
      }
    },
    resetAllData() {
      clearDraft()
      Object.assign(this.$data, {
        people: [],
        positions: [],
        defaultTip: 10,
        theme: 'light',
        currency: '₽',
        language: 'ru',
        rounding: 'none',
        currentScreen: 'main-component',
        screenHistory: [],
        showModal: false,
        showPositionModal: false,
      })
      this.updateTheme('light')
      this.refreshRecentSessions()
    },
    restoreSession(session) {
      this.people = session.people || []
      this.positions = session.positions || []
      this.defaultTip = session.defaultTip ?? this.defaultTip
      this.currency = session.currency || this.currency
      this.screenHistory = []
      this.currentScreen = 'add-positions'
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

.app-shell {
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  max-width: 100%;
  background: var(--app-bg);
  background-image: url('~@/assets/img.png');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  font-family: 'Nunito', sans-serif;
  box-sizing: border-box;
  overflow-x: hidden;
}

.cont {
  background: var(--cream);
  border-radius: var(--radius-xl);
  box-shadow: var(--card-shadow);
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  min-height: 580px;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: visible;
  display: flex;
  flex-direction: column;
  transition: background 0.3s, box-shadow 0.3s, max-width 0.3s;
}

.cont.has-wizard {
  background: var(--bar-bg);
}

.top-bar {
  display: flex;
  align-items: center;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--bar-border);
  gap: 8px;
  flex-shrink: 0;
  background: var(--bar-bg);
  transition: border-color 0.3s, background 0.3s;
  overflow: visible;
  position: relative;
  z-index: 20;
}

.app-title {
  font-family: 'Indie Flower', cursive;
  font-size: 18px;
  font-weight: 700;
  color: var(--brown);
  flex: 1;
  text-align: center;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: color 0.3s;
}
.app-title .title-icon {
  font-size: 22px;
  color: var(--orange);
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  overflow: visible;
}

.nav-icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--nav-btn-bg);
  border: 1px solid var(--nav-btn-border);
  color: var(--nav-btn-color);
  box-shadow: 0 2px 6px rgba(61, 43, 31, 0.08);
  flex-shrink: 0;
  padding: 0 !important;
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
}
.nav-icon-btn:hover {
  background: var(--orange);
  color: #fff;
  border-color: var(--orange);
}
.nav-icon-btn:active {
  transform: scale(0.92);
}
.nav-icon-btn :deep(svg) {
  color: inherit;
  width: 18px;
  height: 18px;
}

.step-indicator {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 20px 12px;
  flex-shrink: 0;
  background: var(--bar-bg);
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  position: relative;
}
.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 18px;
  left: calc(50% + 20px);
  right: calc(-50% + 20px);
  height: 2px;
  background: var(--step-track);
  border-radius: 2px;
  transition: background 0.3s;
}
.step-item.done:not(:last-child)::after {
  background: var(--step-done-line);
}

.step-dot {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--step-dot-bg);
  border: 2px solid var(--step-dot-border);
  color: var(--step-dot-color);
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 1;
}
.step-check,
.step-icon {
  font-size: 18px;
}
.step-item.active .step-dot {
  background: var(--step-active-bg);
  color: #fff;
  border-color: transparent;
  box-shadow: var(--step-active-shadow);
  transform: scale(1.1);
}
.step-item.done .step-dot {
  background: var(--step-done-bg);
  color: var(--step-done-color);
  border-color: transparent;
}

.step-label {
  font-size: 10px;
  font-weight: 800;
  color: var(--step-label);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color 0.3s;
}
.step-item.active .step-label {
  color: var(--step-label-active);
}
.step-item.done .step-label {
  color: var(--step-label-done);
}

.progress-track {
  height: 3px;
  background: var(--progress-track);
  flex-shrink: 0;
}
.progress-fill {
  height: 100%;
  background: var(--progress-fill);
  border-radius: 0 2px 2px 0;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.screen-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.screen-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.wizard-flow {
  background: var(--screen-bg);
  position: relative;
}
.wizard-flow::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('~@/assets/img.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: min(100%, 420px) auto;
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}
.wizard-stage {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px 14px 0;
  min-height: 0;
  position: relative;
  z-index: 1;
}
.wizard-panel {
  flex: 1;
  background: var(--screen-card-bg);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
}
.wizard-footer {
  position: relative;
  z-index: 1;
  background: transparent;
  padding: 12px 16px 18px;
}

.bottom-action {
  padding: 10px 20px 18px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--bottom-action-bg);
  transition: background 0.3s;
}

.history-screen,
.settings-screen {
  background: var(--cream);
}

.settings-overlay {
  position: fixed;
  inset: 0;
  background: rgba(43, 27, 23, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.settings-panel {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 400px;
  max-height: min(90vh, 720px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 48px rgba(43, 27, 23, 0.28);
  border: 1px solid var(--surface-border);
}

.niklad-tag {
  position: absolute;
  bottom: 6px;
  right: 12px;
  font-size: 10px;
  color: var(--watermark);
  font-weight: 700;
  pointer-events: none;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(43, 27, 23, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}
@media (min-width: 768px) {
  .modal-overlay {
    align-items: center;
    padding: 24px;
  }
}

.modal-sheet {
  background: var(--modal-sheet-bg);
  border-radius: 28px 28px 0 0;
  padding: 12px 28px 36px;
  padding-bottom: calc(36px + env(safe-area-inset-bottom, 0px));
  width: 100%;
  max-width: 420px;
  text-align: center;
  border-top: 3px solid var(--modal-sheet-border);
  box-shadow: 0 -8px 40px rgba(43, 27, 23, 0.2);
  transition: background 0.3s;
}
@media (min-width: 768px) {
  .modal-sheet {
    border-radius: var(--radius-lg);
    border-top: none;
    border: 2px solid var(--modal-sheet-border);
  }
}
.sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--surface-border);
  border-radius: 4px;
  margin: 0 auto 20px;
}
.modal-emoji {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-emoji-icon {
  width: 48px;
  height: 48px;
  color: var(--accent);
}
.modal-sheet h3 {
  font-size: 20px;
  font-weight: 800;
  color: var(--modal-text);
  margin: 0 0 10px;
}
.modal-sheet p {
  font-size: 14px;
  color: var(--modal-subtext);
  margin: 0 0 24px;
  line-height: 1.6;
}

.slide-fade-enter-active {
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

.step-bar-enter-active {
  transition: all 0.3s ease;
}
.step-bar-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.modal-slide-enter-active {
  transition: all 0.32s cubic-bezier(0.32, 1, 0.56, 1);
}
.modal-slide-leave-active {
  transition: all 0.2s ease;
}
.modal-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(60%);
}
@media (min-width: 768px) {
  .modal-slide-enter-from,
  .modal-slide-leave-to {
    transform: scale(0.95);
    opacity: 0;
  }
}

@media (max-width: 480px) {
  .app-shell {
    width: 100%;
    max-width: 100%;
    min-height: 100dvh;
    padding: 0;
    margin: 0;
    align-items: stretch;
    justify-content: flex-start;
    background: transparent;
    background-image: none;
    box-sizing: border-box;
  }
  .cont {
    width: 100%;
    max-width: 100%;
    min-height: 100dvh;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    box-sizing: border-box;
    padding-left: env(safe-area-inset-left, 0px);
    padding-right: env(safe-area-inset-right, 0px);
  }
  .top-bar {
    padding: calc(16px + env(safe-area-inset-top, 0px)) var(--mobile-padding-x, 16px) 14px;
  }
  .nav-icon-btn {
    width: 40px;
    height: 40px;
  }
  .wizard-stage {
    padding: 12px 0 0;
  }
  .wizard-panel {
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
  .wizard-footer {
    padding: 14px var(--mobile-padding-x, 16px) calc(18px + env(safe-area-inset-bottom, 0px));
  }
  .bottom-action {
    padding: 14px var(--mobile-padding-x, 16px) calc(18px + env(safe-area-inset-bottom, 0px));
  }
}
</style>
