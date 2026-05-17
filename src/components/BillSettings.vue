<template>
  <div class="settings-wrapper">
    <div class="settings-top">
      <h2 class="settings-title">Настройки</h2>
      <button
        v-if="showClose"
        type="button"
        class="btn-close"
        aria-label="Закрыть"
        @click="$emit('close')"
      >
        <Icon icon="mdi:close" />
      </button>
    </div>

    <div class="settings-body">
      <div class="card">
        <div class="card-label">Валюта</div>
        <div class="segmented">
          <button
            v-for="c in currencies"
            :key="c.symbol"
            type="button"
            :class="['seg-btn', { active: currency === c.symbol }]"
            @click="currency = c.symbol"
          >
            {{ c.symbol }}
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-label-row">
          <span class="card-label">Чаевые по умолчанию</span>
          <span class="card-value">{{ defaultTip }}%</span>
        </div>
        <input
          v-model.number="defaultTip"
          type="range"
          class="tip-slider"
          min="0"
          max="25"
          step="1"
        />
        <div class="slider-labels">
          <span>0%</span>
          <span>25%</span>
        </div>
      </div>

      <div class="card">
        <div class="card-label">Округление</div>
        <div class="segmented">
          <button
            v-for="r in roundingOptions"
            :key="r.value"
            type="button"
            :class="['seg-btn', { active: rounding === r.value }]"
            @click="rounding = r.value"
          >
            {{ r.label }}
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-label">Тема</div>
        <div class="segmented">
          <button
            v-for="t in themes"
            :key="t.value"
            type="button"
            :class="['seg-btn', { active: theme === t.value }]"
            @click="theme = t.value"
          >
            {{ t.label }}
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-label">Язык</div>
        <div class="segmented">
          <button
            v-for="l in languages"
            :key="l.value"
            type="button"
            :class="['seg-btn', { active: language === l.value }]"
            @click="language = l.value"
          >
            {{ l.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="actions">
      <button
        type="button"
        class="btn-history"
        @click="$emit('open-history')"
      >
        <Icon icon="mdi:history" class="btn-history-icon" />
        История расчётов
      </button>
      <button
        type="button"
        class="btn-reset"
        @click="resetCurrentBill"
      >
        Сбросить текущий счёт
      </button>
      <base-btn
        text="Применить"
        rightIcon="./icons/arrow.svg"
        @click="applySettings"
      />
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { clearDraft } from '../utils/billStorage.js'

export default {
  name: 'BillSettings',
  components: { Icon },
  props: {
    showClose: { type: Boolean, default: false },
  },
  emits: [
    'update-default-tip',
    'update-theme',
    'update-language',
    'update-currency',
    'update-rounding',
    'reset-all',
    'open-history',
    'close',
  ],
  data() {
    return {
      defaultTip: 10,
      theme: 'auto',
      currency: '₽',
      language: 'ru',
      rounding: 'none',
      themes: [
        { label: 'Светлая', value: 'light' },
        { label: 'Тёмная', value: 'dark' },
        { label: 'Авто', value: 'auto' },
      ],
      languages: [
        { label: 'Русский', value: 'ru' },
        { label: 'English', value: 'en' },
      ],
      roundingOptions: [
        { label: 'Выкл', value: 'none' },
        { label: 'До целых', value: 'whole' },
        { label: 'До 10', value: 'tens' },
      ],
      currencies: [
        { symbol: '₽', name: 'Рубль' },
        { symbol: '$', name: 'Доллар' },
        { symbol: '€', name: 'Евро' },
        { symbol: '₸', name: 'Тенге' },
      ],
    }
  },
  mounted() {
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      const tip = localStorage.getItem('defaultTip')
      const theme = localStorage.getItem('theme')
      const currency = localStorage.getItem('currency')
      const rounding = localStorage.getItem('rounding')
      const language = localStorage.getItem('language')
      if (tip != null) this.defaultTip = Number(tip)
      if (theme) this.theme = theme
      if (currency) this.currency = currency
      if (rounding) this.rounding = rounding
      if (language) this.language = language
      this.applyTheme(this.theme)
    },
    applyTheme(t) {
      if (t === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.body.className = prefersDark ? 'dark-theme' : 'light-theme'
      } else {
        document.body.className = t === 'dark' ? 'dark-theme' : 'light-theme'
      }
    },
    applySettings() {
      localStorage.setItem('defaultTip', this.defaultTip)
      localStorage.setItem('theme', this.theme)
      localStorage.setItem('currency', this.currency)
      localStorage.setItem('rounding', this.rounding)
      localStorage.setItem('language', this.language)
      this.$emit('update-default-tip', this.defaultTip)
      this.$emit('update-theme', this.theme)
      this.$emit('update-currency', this.currency)
      this.$emit('update-rounding', this.rounding)
      this.$emit('update-language', this.language)
      this.applyTheme(this.theme)
      if (this.showClose) this.$emit('close')
    },
    resetCurrentBill() {
      clearDraft()
      this.$emit('reset-all')
    },
  },
}
</script>

<style scoped>
.settings-wrapper {
  padding: 20px 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
  min-height: 0;
}

.settings-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.settings-title {
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0;
  color: var(--brown);
}

.btn-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid var(--surface-border);
  background: var(--surface);
  color: var(--brown);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: border-color 0.2s, background 0.2s;
}
.btn-close:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.settings-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  background: var(--surface);
  border: 1.5px solid var(--surface-border);
  border-radius: var(--radius-md);
  padding: 16px;
}

.card-label {
  font-size: 10px;
  font-weight: 800;
  color: var(--label-color);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  display: block;
}

.card-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.card-label-row .card-label {
  margin-bottom: 0;
}
.card-value {
  font-size: 16px;
  font-weight: 900;
  color: var(--orange);
}

.tip-slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--surface-border);
  border-radius: 4px;
  outline: none;
  margin: 4px 0;
}
.tip-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--orange);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(242, 153, 18, 0.45);
}
.tip-slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--orange);
  border: none;
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--label-color);
  font-weight: 600;
}

.segmented {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.seg-btn {
  flex: 1;
  min-width: 0;
  padding: 10px 8px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--surface-border);
  background: #fff;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}
body.dark-theme .seg-btn {
  background: var(--card-bg);
}
.seg-btn.active {
  background: var(--orange);
  color: #fff;
  border-color: var(--orange);
}
.seg-btn:hover:not(.active) {
  border-color: var(--accent-border);
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  flex-shrink: 0;
}

.btn-history {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: #fff;
  border: 1.5px solid var(--surface-border);
  color: var(--brown);
  font-size: 13px;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
body.dark-theme .btn-history {
  background: var(--surface);
}
.btn-history:hover {
  border-color: var(--accent-border);
  background: var(--accent-soft);
}
.btn-history-icon {
  font-size: 18px;
  color: var(--orange);
}

.btn-reset {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: transparent;
  border: 1.5px solid rgba(192, 57, 43, 0.4);
  color: #c0392b;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-reset:hover {
  background: rgba(192, 57, 43, 0.08);
}

</style>
