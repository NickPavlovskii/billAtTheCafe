<template>
  <div class="position-form">
    <div :class="['input-prime-group', { error: nameError }]">
      <span class="input-prime-icon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line
            x1="6"
            y1="1"
            x2="6"
            y2="4"
          />
          <line
            x1="10"
            y1="1"
            x2="10"
            y2="4"
          />
          <line
            x1="14"
            y1="1"
            x2="14"
            y2="4"
          />
        </svg>
      </span>
      <PrimeInputText
        v-model="name"
        placeholder="Название блюда..."
        autocomplete="off"
        @focus="nameError = false"
        @keyup.enter="focusPriceField"
      />
      <button
        v-if="name"
        class="btn-clear"
        @mousedown.prevent
        @click="name = ''"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div
      id="position-form-price-wrap"
      :class="['input-prime-group', { error: priceError }]"
    >
      <span class="input-prime-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line
            x1="12"
            y1="1"
            x2="12"
            y2="23"
          />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </span>
      <PrimeInputText
        type="number"
        inputmode="decimal"
        v-model="priceRaw"
        placeholder="Стоимость, руб."
        autocomplete="off"
        min="0"
        @focus="priceError = false"
        class="price-field"
      />
      <span
        v-if="priceRaw"
        class="input-suffix"
      >
        руб.
      </span>
    </div>

    <div class="price-presets">
      <button
        v-for="preset in pricePresets"
        :key="preset"
        :class="['preset-btn', { active: priceRaw == preset }]"
        type="button"
        @click="applyPreset(preset)"
      >
        {{ preset }}
      </button>
    </div>

    <div class="people-section">
      <div class="people-label-row">
        <div class="people-label">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle
              cx="9"
              cy="7"
              r="4"
            />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Кто ел?
          <span
            v-if="peopleError"
            class="people-error-hint"
          >
            — выберите хотя бы одного
          </span>
        </div>
        <button
          type="button"
          :class="['btn-all-equal', { active: allSelected }]"
          title="Поровну на всех"
          @click="toggleSelectAll"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line
              x1="5"
              y1="9"
              x2="19"
              y2="9"
            />
            <line
              x1="5"
              y1="15"
              x2="19"
              y2="15"
            />
          </svg>
          Поровну на всех
        </button>
      </div>

      <div class="avatars-row">
        <button
          :class="[
            'avatar-chip',
            { active: allSelected, partial: someSelected && !allSelected },
          ]"
          @click="toggleSelectAll"
        >
          <div class="chip-avatar all-avatar">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline
                v-if="allSelected"
                points="20 6 9 17 4 12"
              />
              <g v-else>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </g>
            </svg>
          </div>
          <span class="chip-name">Все</span>
        </button>
        <button
          v-for="(person, i) in localPeople"
          :key="i"
          class="avatar-chip"
          :class="{ active: person.checked }"
          @click="togglePerson(person)"
        >
          <div
            class="chip-avatar"
            :style="{ background: person.checked ? getGrad(person.name) : '' }"
          >
            <svg
              v-if="person.checked"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span
              v-else
              class="chip-initial"
            >
              {{ person.name[0].toUpperCase() }}
            </span>
          </div>
          <span class="chip-name">{{ person.name }}</span>
        </button>
      </div>
    </div>

    <button
      class="btn-add-position"
      @click="onAdd"
    >
      <span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Добавить позицию
      </span>
      <i class="i"></i>
    </button>

    <transition name="modal-slide">
      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="showModal = false"
      >
        <div class="modal-sheet">
          <div class="sheet-handle"></div>
          <div class="modal-emoji">
            <Icon
              class="modal-emoji-icon"
              :icon="modalHint.icon"
            />
          </div>
          <h3>{{ modalHint.title }}</h3>
          <p>{{ modalHint.text }}</p>
          <button
            class="btn-modal-ok"
            @click="showModal = false"
          >
            <span>Понятно</span>
            <i class="i"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'

  const GRADS = [
    'linear-gradient(135deg,#048bfa,#0260c4)',
    'linear-gradient(135deg,#f05252,#c0392b)',
    'linear-gradient(135deg,#22c55e,#168d3f)',
    'linear-gradient(135deg,#f59e0b,#c97d08)',
    'linear-gradient(135deg,#8b5cf6,#6530c2)',
    'linear-gradient(135deg,#0dbfac,#07907f)',
    'linear-gradient(135deg,#ec4899,#b52277)',
  ]

  export default {
    name: 'AddPositionForm',
    components: { Icon },
    props: {
      people: { type: Array, required: true },
    },
    emits: ['add-position'],

    data() {
      return {
        name: '',
        priceRaw: '',
        showModal: false,
        allSelected: false,
        nameError: false,
        priceError: false,
        peopleError: false,
        localPeople: [],
        pricePresets: [100, 200, 300, 500, 1000],
      }
    },

    computed: {
      price() {
        const v = parseFloat(this.priceRaw)
        return isNaN(v) || v <= 0 ? null : v
      },
      isNameValid() {
        return this.name.trim().length > 0
      },
      isPriceValid() {
        return this.price !== null
      },
      isPeopleSelected() {
        return this.localPeople.some((p) => p.checked)
      },
      someSelected() {
        return this.localPeople.some((p) => p.checked)
      },
      modalHint() {
        if (!this.isNameValid) {
          return {
            icon: 'mdi:silverware-fork-knife',
            title: 'Нет названия',
            text: 'Напишите, что это за блюдо',
          }
        }
        if (!this.isPriceValid) {
          return {
            icon: 'mdi:cash',
            title: 'Укажите стоимость',
            text: 'Сколько стоит позиция?',
          }
        }
        return {
          icon: 'mdi:account-group',
          title: 'Выберите участников',
          text: 'Кто это ел?',
        }
      },
    },

    watch: {
      people: {
        immediate: true,
        handler(val) {
          this.localPeople = val.map((p) => ({ ...p, checked: false }))
          this.allSelected = false
        },
      },
    },

    methods: {
      focusPriceField() {
        this.$nextTick(() => {
          const wrap = this.$el.querySelector('#position-form-price-wrap')
          if (wrap) {
            const input = wrap.querySelector('input')
            if (input) input.focus()
          }
        })
      },
      applyPreset(value) {
        this.priceRaw = String(value)
        this.priceError = false
      },

      getGrad(name) {
        return GRADS[name.charCodeAt(0) % GRADS.length]
      },

      togglePerson(person) {
        person.checked = !person.checked
        this.allSelected = this.localPeople.every((p) => p.checked)
        this.peopleError = false
      },

      toggleSelectAll() {
        this.allSelected = !this.allSelected
        this.localPeople.forEach((p) => (p.checked = this.allSelected))
        this.peopleError = false
      },

      onAdd() {
        this.nameError = !this.isNameValid
        this.priceError = !this.isPriceValid
        this.peopleError = !this.isPeopleSelected

        if (!this.isNameValid || !this.isPriceValid || !this.isPeopleSelected) {
          this.showModal = true
          return
        }

        const position = {
          name: this.name.trim(),
          price: this.price,
          people: this.localPeople
            .filter((p) => p.checked)
            .map((p) => ({ id: p.id, name: p.name })),
        }

        this.$emit('add-position', position)

        this.name = ''
        this.priceRaw = ''
        this.allSelected = false
        this.localPeople.forEach((p) => (p.checked = false))
        this.nameError = this.priceError = this.peopleError = false
      },
    },
  }
</script>

<style scoped>
  .position-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-suffix {
    font-size: 12px;
    font-weight: 700;
    color: var(--label-color);
    padding-right: 12px;
    transition: color 0.3s;
  }

  .price-field::-webkit-outer-spin-button,
  .price-field::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .price-field {
    -moz-appearance: textfield;
  }

  .btn-clear {
    background: none;
    border: none;
    padding: 6px 10px 6px 4px;
    color: var(--label-color);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .btn-clear:hover {
    color: var(--text-secondary);
  }

  .price-presets {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: -4px;
  }

  .preset-btn {
    padding: 5px 12px;
    border-radius: 100px;
    background: var(--surface);
    border: 1.5px solid var(--surface-border);
    color: var(--text-secondary);
    font-size: 12px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    transition:
      background 0.18s,
      border-color 0.18s,
      color 0.18s,
      transform 0.15s,
      box-shadow 0.18s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    line-height: 1;
  }

  .preset-btn:hover {
    background: var(--accent-soft);
    border-color: var(--accent-border);
    color: var(--accent);
  }

  .preset-btn.active {
    background: var(--accent-soft);
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent-border);
  }

  .preset-btn:active {
    transform: scale(0.93);
  }

  .people-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--surface);
    border: 2px solid var(--surface-border);
    border-radius: 10px;
    padding: 12px 12px 10px;
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .people-label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .people-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--label-color);
    transition: color 0.3s;
  }
  .people-label svg {
    color: var(--accent);
    flex-shrink: 0;
  }

  .btn-all-equal {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 100px;
    background: var(--surface);
    border: 1.5px solid var(--surface-border);
    color: var(--text-secondary);
    font-size: 10px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition:
      background 0.18s,
      border-color 0.18s,
      color 0.18s,
      box-shadow 0.18s;
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .btn-all-equal:hover {
    background: var(--accent-soft);
    border-color: var(--accent-border);
    color: var(--accent);
  }
  .btn-all-equal.active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    box-shadow: 0 2px 8px var(--accent-soft);
  }
  .btn-all-equal:active {
    transform: scale(0.94);
  }

  .people-error-hint {
    color: #e74c3c;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: none;
  }

  .avatars-row {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .avatar-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px 4px 4px;
    border-radius: 100px;
    background: var(--card-bg);
    border: 1.5px solid var(--surface-border);
    cursor: pointer;
    transition:
      border-color 0.2s,
      background 0.2s,
      box-shadow 0.2s,
      transform 0.15s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .avatar-chip:hover:not(.active) {
    border-color: var(--accent-border);
    background: var(--accent-soft);
  }

  .avatar-chip.active {
    border-color: var(--accent);
    background: var(--accent-soft);
    box-shadow: 0 0 0 2px var(--accent-border);
  }

  .avatar-chip.partial {
    border-color: var(--accent-border);
  }

  .avatar-chip:active {
    transform: scale(0.94);
  }

  .chip-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--surface-border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .avatar-chip.active .chip-avatar {
    color: #fff;
  }

  .all-avatar {
    background: var(--step-active-bg) !important;
    color: #fff;
  }

  .chip-initial {
    font-size: 11px;
    font-weight: 900;
    color: var(--text-secondary);
    transition: color 0.2s;
  }
  .avatar-chip.active .chip-initial {
    color: #fff;
  }

  .chip-name {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-secondary);
    white-space: nowrap;
    transition: color 0.2s;
  }
  .avatar-chip.active .chip-name {
    color: var(--accent);
  }

  .btn-add-position {
    position: relative;
    align-self: stretch;
    padding: 12px 30px;
    background: var(--btn-outer);
    color: var(--btn-color);
    border: none;
    border-radius: 5px;
    font-size: 1em;
    font-weight: 500;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition:
      background 0.5s,
      color 0.5s,
      letter-spacing 0.5s;
    font-family: 'Nunito', sans-serif;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    overflow: visible;
    margin-top: 4px;
  }

  .btn-add-position::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: var(--btn-inner);
    border-radius: 3px;
  }

  .btn-add-position span {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-add-position .i {
    position: absolute;
    inset: 0;
    display: block;
  }

  .btn-add-position .i::before {
    content: '';
    position: absolute;
    top: -3.5px;
    left: 80%;
    width: 10px;
    height: 6px;
    background: var(--btn-inner);
    border: 2px solid var(--btn-clip);
    transform: translateX(-50%);
    transition:
      0.5s,
      box-shadow 0.5s;
  }
  .btn-add-position .i::after {
    content: '';
    position: absolute;
    bottom: -3.5px;
    left: 20%;
    width: 10px;
    height: 6px;
    background: var(--btn-inner);
    border: 2px solid var(--btn-clip);
    transform: translateX(-50%);
    transition:
      0.5s,
      box-shadow 0.5s;
  }

  .btn-add-position:hover {
    background: var(--accent);
    color: #fff;
    letter-spacing: 0.25em;
  }
  .btn-add-position:hover .i::before {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow:
      70px 0 #fff,
      -70px 0 var(--accent),
      -70px 0 0 4px var(--btn-inner),
      10px -10px var(--accent);
  }
  .btn-add-position:hover .i::after {
    width: 6px;
    left: calc(50% - 3px);
    box-shadow: 70px 0 #fff;
  }
  .btn-add-position:active {
    transform: scale(0.97);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4, 8, 20, 0.6);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 500;
  }

  .modal-sheet {
    background: var(--modal-sheet-bg);
    border-radius: 28px 28px 0 0;
    padding: 12px 28px 36px;
    padding-bottom: calc(36px + env(safe-area-inset-bottom, 0px));
    width: 100%;
    max-width: 480px;
    text-align: center;
    border-top: 2px solid var(--modal-sheet-border);
    box-shadow: 0 -6px 40px rgba(0, 0, 0, 0.3);
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .sheet-handle {
    width: 40px;
    height: 4px;
    background: #444;
    border-radius: 4px;
    margin: 0 auto 20px;
  }

  .modal-emoji {
    margin-bottom: 12px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-emoji-icon {
    width: 44px;
    height: 44px;
    color: var(--accent);
  }

  .modal-sheet h3 {
    font-size: 18px;
    font-weight: 800;
    color: #e4eeff;
    margin: 0 0 8px;
  }

  .modal-sheet p {
    font-size: 13px;
    color: rgba(180, 200, 230, 0.55);
    margin: 0 0 22px;
    line-height: 1.6;
  }

  .btn-modal-ok {
    position: relative;
    padding: 10px 32px;
    background: var(--btn-outer);
    color: var(--btn-color);
    border: none;
    border-radius: 5px;
    font-size: 0.95em;
    font-weight: 500;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition:
      background 0.5s,
      color 0.5s,
      letter-spacing 0.5s;
    font-family: 'Nunito', sans-serif;
    -webkit-tap-highlight-color: transparent;
    overflow: visible;
  }
  .btn-modal-ok::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: var(--btn-inner);
    border-radius: 3px;
  }
  .btn-modal-ok span {
    position: relative;
    z-index: 1;
  }
  .btn-modal-ok .i {
    position: absolute;
    inset: 0;
    display: block;
  }
  .btn-modal-ok .i::before {
    content: '';
    position: absolute;
    top: -3.5px;
    left: 80%;
    width: 9px;
    height: 5px;
    background: var(--btn-inner);
    border: 2px solid var(--btn-clip);
    transform: translateX(-50%);
    transition:
      0.5s,
      box-shadow 0.5s;
  }
  .btn-modal-ok .i::after {
    content: '';
    position: absolute;
    bottom: -3.5px;
    left: 20%;
    width: 9px;
    height: 5px;
    background: var(--btn-inner);
    border: 2px solid var(--btn-clip);
    transform: translateX(-50%);
    transition:
      0.5s,
      box-shadow 0.5s;
  }
  .btn-modal-ok:hover {
    background: var(--accent);
    color: #fff;
    letter-spacing: 0.22em;
  }
  .btn-modal-ok:hover .i::before {
    width: 5px;
    left: calc(50% - 2.5px);
    box-shadow:
      60px 0 #fff,
      -60px 0 var(--accent),
      -60px 0 0 4px var(--btn-inner),
      8px -8px var(--accent);
  }
  .btn-modal-ok:hover .i::after {
    width: 5px;
    left: calc(50% - 2.5px);
    box-shadow: 60px 0 #fff;
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
    transform: translateY(80%);
  }
</style>
