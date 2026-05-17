<template>
  <div class="history-wrapper">
    <div class="history-header">
      <h2 class="history-title">
        <Icon
          icon="mdi:history"
          class="history-title-icon"
        />
        История расчётов
      </h2>
      <button
        v-if="sessions.length > 0"
        type="button"
        class="btn-clear-all"
        @click="confirmClearAll"
      >
        <Icon icon="mdi:trash-can-outline" />
        Очистить
      </button>
    </div>

    <div
      v-if="sessions.length === 0"
      class="empty-state"
    >
      <div class="empty-icon">
        <Icon
          icon="mdi:receipt-text-outline"
          class="empty-icon-svg"
        />
      </div>
      <p class="empty-title">Нет сохранённых счетов</p>
      <p class="empty-sub">
        Завершите расчёт на экране «Итог» — счёт сохранится автоматически
      </p>
    </div>

    <div
      v-else
      class="sessions-list"
    >
      <article
        v-for="session in sessions"
        :key="session.id"
        class="session-card"
      >
        <div class="session-top">
          <div class="session-meta">
            <span class="session-date">{{ formatDate(session.date) }}</span>
            <span class="session-people-count">
              {{ session.people.length }} чел. ·
              {{ session.positions.length }} поз.
            </span>
          </div>
          <div class="session-total">
            {{ calcTotal(session).toFixed(2) }}
            <span class="session-currency">{{ session.currency || '₽' }}</span>
          </div>
        </div>

        <div class="session-avatars">
          <div
            v-for="(person, idx) in session.people.slice(0, 5)"
            :key="person.id"
            class="session-avatar"
            :style="{ background: getAvatarColor(person.name, idx) }"
            :title="person.name"
          >
            {{ person.name[0].toUpperCase() }}
          </div>
          <div
            v-if="session.people.length > 5"
            class="session-avatar-more"
          >
            +{{ session.people.length - 5 }}
          </div>
        </div>

        <div class="session-positions-preview">
          <span
            v-for="pos in session.positions.slice(0, 4)"
            :key="pos.name + pos.price"
            class="session-pos-tag"
          >
            {{ pos.name }}
          </span>
          <span
            v-if="session.positions.length > 4"
            class="session-pos-more"
          >
            +{{ session.positions.length - 4 }}
          </span>
        </div>

        <div class="session-actions">
          <button
            type="button"
            class="session-btn restore"
            @click="$emit('restore', session)"
          >
            <Icon icon="mdi:restore" />
            Восстановить
          </button>
          <button
            type="button"
            class="session-btn delete"
            aria-label="Удалить"
            @click="deleteSession(session.id)"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import { Icon } from '@iconify/vue'
  import {
    loadHistory,
    getAvatarColor,
    calcSessionTotal,
    formatHistoryDate,
  } from '../utils/billStorage.js'

  export default {
    name: 'BillHistory',
    components: { Icon },
    emits: ['restore'],

    data() {
      return {
        sessions: [],
      }
    },

    mounted() {
      this.loadSessions()
      window.addEventListener('storage', this.loadSessions)
    },

    beforeUnmount() {
      window.removeEventListener('storage', this.loadSessions)
    },

    methods: {
      loadSessions() {
        this.sessions = loadHistory()
      },
      saveSessions() {
        localStorage.setItem('billHistory', JSON.stringify(this.sessions))
      },
      deleteSession(id) {
        this.sessions = this.sessions.filter((s) => s.id !== id)
        this.saveSessions()
      },
      confirmClearAll() {
        if (window.confirm('Удалить всю историю расчётов?')) {
          this.sessions = []
          this.saveSessions()
        }
      },
      getAvatarColor(name, index) {
        return getAvatarColor(name, index)
      },
      formatDate(iso) {
        return formatHistoryDate(iso)
      },
      calcTotal(session) {
        return calcSessionTotal(session)
      },
    },
  }
</script>

<style scoped>
  .history-wrapper {
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    min-height: 0;
  }

  .history-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .history-title {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0;
    color: var(--brown);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .history-title-icon {
    font-size: 26px;
    color: var(--orange);
  }

  .btn-clear-all {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: 1.5px solid rgba(231, 76, 60, 0.35);
    border-radius: var(--radius-sm);
    color: #c0392b;
    font-size: 12px;
    font-weight: 700;
    padding: 7px 12px;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    transition: background 0.2s;
  }
  .btn-clear-all:hover {
    background: rgba(231, 76, 60, 0.08);
  }

  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 48px 20px;
    text-align: center;
  }
  .empty-icon-svg {
    width: 64px;
    height: 64px;
    color: var(--accent-border);
  }
  .empty-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-secondary);
    margin: 0;
  }
  .empty-sub {
    font-size: 13px;
    color: var(--label-color);
    margin: 0;
    max-width: 260px;
    line-height: 1.5;
  }

  .sessions-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .session-card {
    background: #fff;
    border: 1.5px solid var(--surface-border);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }
  body.dark-theme .session-card {
    background: var(--surface);
  }
  .session-card:hover {
    border-color: var(--accent-border);
    box-shadow: 0 4px 16px var(--accent-soft);
  }

  .session-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .session-meta {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .session-date {
    font-size: 13px;
    font-weight: 800;
    color: var(--brown);
  }

  .session-people-count {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .session-total {
    font-size: 20px;
    font-weight: 900;
    color: var(--orange);
    line-height: 1;
    text-align: right;
  }
  .session-currency {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .session-avatars {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .session-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 900;
    color: #fff;
    flex-shrink: 0;
  }

  .session-avatar-more {
    font-size: 11px;
    font-weight: 800;
    color: var(--label-color);
  }

  .session-positions-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .session-pos-tag {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .session-pos-more {
    font-size: 11px;
    font-weight: 700;
    color: var(--label-color);
    padding: 4px;
  }

  .session-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 2px;
  }

  .session-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    border: none;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    transition:
      background 0.2s,
      transform 0.12s;
  }
  .session-btn:active {
    transform: scale(0.96);
  }

  .session-btn.restore {
    background: var(--accent-soft);
    color: var(--orange-dark);
    border: 1.5px solid var(--accent-border);
    flex: 1;
  }
  .session-btn.restore:hover {
    background: var(--orange);
    color: #fff;
  }

  .session-btn.delete {
    background: rgba(231, 76, 60, 0.08);
    color: #e74c3c;
    border: 1.5px solid rgba(231, 76, 60, 0.25);
    width: 40px;
    height: 40px;
    padding: 0;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    .history-wrapper {
      padding: 16px 14px;
    }
  }
</style>
