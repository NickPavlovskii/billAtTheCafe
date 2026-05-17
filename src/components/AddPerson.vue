<template>
  <div class="add-person-container">

    <div class="section-header">
      <h2 class="section-title"><Icon icon="mdi:account-group" class="section-title-icon" /> Участники</h2>
      <transition name="badge-pop">
        <span
          v-if="people.length > 0"
          class="count-badge"
        >{{ people.length }}</span>
      </transition>
    </div>
    <p class="section-hint">Добавьте минимум 2 человека</p>

    <div class="input-row">
      <div class="input-prime-group">
        <span class="input-prime-icon">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </span>
        <PrimeInputText
          inputmode="text"
          autocomplete="off"
          placeholder="Имя участника..."
          v-model="newPersonName"
          @keyup.enter="addPerson"
        />
        <button
          v-if="newPersonName"
          class="btn-clear"
          @mousedown.prevent
          @click="newPersonName = ''"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <button
        :class="['btn-add', { enabled: newPersonName.trim() }]"
        :disabled="!newPersonName.trim()"
        aria-label="Добавить"
        @click="addPerson"
      >
        <span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </span>
        <i class="i"></i>
      </button>
    </div>

    <p class="enter-hint">Нажмите Enter, чтобы добавить</p>

    <transition name="fade-in">
      <div
        v-if="people.length === 0"
        class="empty-state"
      >
        <div class="empty-icon-wrap">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <p class="empty-title">Здесь пока никого нет</p>
        <p class="empty-sub">Введите имя выше и нажмите «+»</p>
      </div>
    </transition>

    <div
      v-if="people.length > 0"
      class="list-wrap"
    >
      <transition-group
        name="person-anim"
        tag="div"
        class="person-list"
      >
        <div
          v-for="person in people"
          :key="person.id"
          class="person-card"
        >
          <div class="person-avatar" :style="{ background: getAvatarColor(person.name) }">
            {{ person.name[0].toUpperCase() }}
          </div>
          <span class="person-name">{{ person.name }}</span>
          <button
            class="delete-btn"
            aria-label="Удалить"
            @click="deletePerson(person)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </transition-group>
    </div>

  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { getAvatarColor as avatarColor } from '../utils/billStorage.js'

export default {
  components: { Icon },
  props: {
    people: { type: Array, required: true },
  },
  data() {
    return { newPersonName: '' }
  },
  methods: {
    getAvatarColor(name) {
      const idx = this.people.findIndex(p => p.name === name)
      return avatarColor(name, idx >= 0 ? idx : this.people.length)
    },
    deletePerson(person) {
      this.$emit('delete-person', person)
    },
    addPerson() {
      const name = this.newPersonName.trim()
      if (!name) return
      this.$emit('add-people', [...this.people, { id: Date.now(), name }])
      this.newPersonName = ''
    },
  },
}
</script>

<style scoped>
.add-person-container {
  padding: 18px 16px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 3px;
}

.section-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;
}
.section-title-icon { font-size: 22px; color: var(--accent); }

.count-badge {
  min-width: 24px;
  height: 24px;
  background: var(--step-active-bg);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
}

.section-hint {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0 0 10px;
  transition: color 0.3s;
}

.enter-hint {
  font-size: 11px;
  color: var(--label-color);
  margin: -6px 0 12px;
  text-align: center;
}

.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.input-prime-group { flex: 1; }

.btn-clear {
  background: none;
  border: none;
  padding: 4px;
  color: var(--label-color);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s;
  display: flex;
  align-items: center;
}
.btn-clear:hover { color: var(--text-secondary); }

.btn-add {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 5px;
  background: var(--btn-outer);
  border: none;
  color: var(--btn-color);
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  overflow: visible;
  transition: background 0.5s, color 0.5s, opacity 0.3s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.btn-add::before {
  content: '';
  position: absolute;
  inset: 2px;
  background: var(--btn-inner);
  border-radius: 3px;
}

.btn-add span {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.btn-add .i { position: absolute; inset: 0; display: block; }

.btn-add .i::before {
  content: '';
  position: absolute;
  top: -3.5px;
  left: 80%;
  width: 9px;
  height: 5.5px;
  background: var(--btn-inner);
  border: 1.5px solid var(--back-btn-clip);
  transform: translateX(-50%);
  transition: 0.5s, box-shadow 0.5s;
}
.btn-add .i::after {
  content: '';
  position: absolute;
  bottom: -3.5px;
  left: 20%;
  width: 9px;
  height: 5.5px;
  background: var(--btn-inner);
  border: 1.5px solid var(--back-btn-clip);
  transform: translateX(-50%);
  transition: 0.5s, box-shadow 0.5s;
}

.btn-add.enabled { opacity: 1; }
.btn-add.enabled .i::before,
.btn-add.enabled .i::after { border-color: var(--btn-clip); }

.btn-add.enabled:hover {
  background: var(--accent);
  color: #fff;
}
.btn-add.enabled:hover .i::before {
  width: 5px;
  left: calc(50% - 2px);
  box-shadow: 30px 0 #fff, -30px 0 var(--accent), -30px 0 0 3px var(--btn-inner), 8px -8px var(--accent);
}
.btn-add.enabled:hover .i::after {
  width: 5px;
  left: calc(50% - 2px);
  box-shadow: 30px 0 #fff;
}
.btn-add.enabled:active { transform: scale(0.91); }
.btn-add:disabled { opacity: 0.3; cursor: not-allowed; }

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 28px 0;
  text-align: center;
}

.empty-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--accent-soft);
  border: 1.5px solid var(--accent-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 6px;
  transition: background 0.3s, border-color 0.3s;
}

.empty-title { font-size: 14px; font-weight: 700; color: var(--text-secondary); margin: 0; }
.empty-sub   { font-size: 12px; color: var(--label-color); margin: 0; }

.list-wrap {
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 0;
}

.person-list {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
}

.person-list::-webkit-scrollbar { width: 3px; }
.person-list::-webkit-scrollbar-track { background: transparent; }
.person-list::-webkit-scrollbar-thumb { background: var(--accent-border); border-radius: 4px; }

.person-card {
  display: flex;
  align-items: center;
  gap: 11px;
  background: var(--surface);
  border: 1.5px solid var(--surface-border);
  border-radius: 12px;
  padding: 9px 12px;
  flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.15s;
}
.person-card:hover { box-shadow: 0 2px 10px var(--accent-soft); border-color: var(--accent-border); }

.person-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 900;
  color: #fff;
  flex-shrink: 0;
}

.person-name {
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s;
}

.delete-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: var(--label-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s, transform 0.12s;
  -webkit-tap-highlight-color: transparent;
}
.delete-btn:hover  { background: rgba(231, 76, 60, 0.1); color: #e74c3c; }
.delete-btn:active { transform: scale(0.88); }

.person-anim-enter-active { transition: all 0.25s cubic-bezier(.34,1.56,.64,1); }
.person-anim-leave-active { transition: all 0.18s ease; }
.person-anim-enter-from   { opacity: 0; transform: translateY(-8px) scale(0.95); }
.person-anim-leave-to     { opacity: 0; transform: translateX(14px); }

.badge-pop-enter-active  { transition: all 0.3s cubic-bezier(.34,1.56,.64,1); }
.badge-pop-enter-from    { opacity: 0; transform: scale(0.3); }

.fade-in-enter-active { transition: all 0.3s ease; }
.fade-in-enter-from   { opacity: 0; transform: translateY(6px); }

@media (max-width: 480px) {
  .add-person-container { padding: 14px var(--mobile-padding-x, 16px) 0; }
  .input-row .btn-add { min-width: var(--mobile-tap-min, 44px); min-height: var(--mobile-tap-min, 44px); }
  .person-card { padding: 12px 14px; min-height: 52px; border-radius: 14px; }
  .delete-btn { width: 36px; height: 36px; min-width: 36px; min-height: 36px; }
}
</style>